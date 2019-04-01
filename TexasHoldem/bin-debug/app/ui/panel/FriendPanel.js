var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 好友面板
*/
var FriendPanel = (function (_super) {
    __extends(FriendPanel, _super);
    function FriendPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.FriendPanel;
        return _this;
    }
    FriendPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.searchText.maxChars = 15;
        this._ly = UIUtil.getVTileLayout(1, 1, egret.VerticalAlign.TOP);
        this._giftly = UIUtil.getVTileLayout(1, 1, egret.VerticalAlign.TOP);
        this._requestly = UIUtil.getVTileLayout(1, 1, egret.VerticalAlign.TOP);
        this._addly = UIUtil.getVTileLayout(1, 1, egret.VerticalAlign.TOP);
        this.list.layout = this._ly;
        this.giftList.layout = this._giftly;
        this.requestList.layout = this._requestly;
        this.addList.layout = this._addly;
        UIUtil.listRenderer(this.list, this.scroller, FriendItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.giftList, this.giftScroller, GiftItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.requestList, this.requestScroller, FriendRequestItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.addList, this.addScroller, AddFriendItemRenderer, ScrollViewDirection.Vertical_T_D);
        this.scroller.scrollPolicyH = this.giftScroller.scrollPolicyH = this.requestScroller.scrollPolicyH = this.addScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        var array = new Array();
        array.push(this.tabGroup);
        array.push(this.giftTabGroup);
        array.push(this.requestTabGroup);
        array.push(this.addTabGroup);
        this.friendTabCompontent.init(array);
    };
    FriendPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.hasFriendGroup.visible = false;
        this.noFriendGroup.visible = false;
        this.hasGiftGroup.visible = false;
        this.noGiftGroup.visible = false;
        this.hasRequestGroup.visible = false;
        this.noRequestGroup.visible = false;
        this.setFriendListInfo();
    };
    FriendPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        UserManager.getOtherUserInfoEa.addListener(this.setFriendDetailInfo, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClickHandler, this);
        this.addList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onAddListClickHandler, this);
        this.requestList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRequestListClickHandler, this);
        this.inviteLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteFriend, this);
        this.friendTabCompontent.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        FriendManager.onReceiveGiftEvent.addListener(this.receiveGiftSuccess, this);
        this.fastReceiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fastReceive, this);
        FriendManager.onFriendRequestEvent.addListener(this.setFriendRequestList, this);
        FriendManager.onReceiveFriendRequestEvent.addListener(this.refreshFriendRequestList, this);
        this.searchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.searchPlayer, this);
        this.searchText.addEventListener(eui.UIEvent.CHANGE, this.searchTextChange, this);
        FriendManager.onSearchPlayerEvent.addListener(this.setAddList, this);
        FriendManager.onRemovePlayerEvent.addListener(this.removePlayerSuccess, this);
        FriendManager.onRefreshInfoEvent.addListener(this.refreshUI, this);
    };
    FriendPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        UserManager.getOtherUserInfoEa.removeListener(this.setFriendDetailInfo, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClickHandler, this);
        this.addList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onAddListClickHandler, this);
        this.requestList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRequestListClickHandler, this);
        this.inviteLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteFriend, this);
        this.friendTabCompontent.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        FriendManager.onReceiveGiftEvent.removeListener(this.receiveGiftSuccess, this);
        this.fastReceiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fastReceive, this);
        FriendManager.onFriendRequestEvent.removeListener(this.setFriendRequestList, this);
        FriendManager.onReceiveFriendRequestEvent.removeListener(this.refreshFriendRequestList, this);
        this.searchBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.searchPlayer, this);
        this.searchText.removeEventListener(eui.UIEvent.CHANGE, this.searchTextChange, this);
        FriendManager.onSearchPlayerEvent.removeListener(this.setAddList, this);
        FriendManager.onRemovePlayerEvent.removeListener(this.removePlayerSuccess, this);
        FriendManager.onRefreshInfoEvent.removeListener(this.refreshUI, this);
    };
    /**
     * 刷新UI
    */
    FriendPanel.prototype.refreshUI = function () {
        if (FriendManager.refreshUIFlag == FriendUIType.FriendList) {
            this.setFriendListInfo();
        }
        else if (FriendManager.refreshUIFlag == FriendUIType.GiftList) {
            if (FriendManager.giftList.length > 0) {
                this._dp = new eui.ArrayCollection(FriendManager.giftList);
                this.giftList.dataProvider = this._dp;
                this.hasGiftGroup.visible = true;
                this.fastReceiveBtn.enabled = true;
                this.noGiftGroup.visible = false;
            }
            else {
                this.noGiftGroup.visible = true;
                this.fastReceiveBtn.enabled = false;
            }
        }
        else if (FriendManager.refreshUIFlag == FriendUIType.RequestList) {
            this.setFriendRequestList();
        }
    };
    /**
     * 删除好友成功
    */
    FriendPanel.prototype.removePlayerSuccess = function () {
        if (FriendManager.friendList.length <= 0) {
            this.hasFriendGroup.visible = false;
            this.noFriendGroup.visible = true;
        }
        this._dp = new eui.ArrayCollection(FriendManager.friendList);
        this.list.dataProvider = this._dp;
    };
    /**
     * 监听搜索框内容改变
    */
    FriendPanel.prototype.searchTextChange = function (event) {
        if (this.searchText.text.trim().length <= 0) {
            this.searchBtn.visible = false;
        }
        else {
            this.searchBtn.visible = true;
        }
    };
    /**
     * 设置添加查询列表的数据
    */
    FriendPanel.prototype.setAddList = function () {
        if (FriendManager.searchList && FriendManager.searchList.length > 0) {
            this._dp = new eui.ArrayCollection(FriendManager.searchList);
            this.addList.dataProvider = this._dp;
        }
    };
    /**
     * 搜索按钮事件
    */
    FriendPanel.prototype.searchPlayer = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.searchText.text.trim().length > 0) {
            FriendManager.reqSearchPlayer(this.searchText.text.trim());
        }
    };
    /**
     * 接受或拒绝好友请求成功接受广播后续执行事件
    */
    FriendPanel.prototype.refreshFriendRequestList = function () {
        if (FriendManager.requestFriendList.length > 0) {
            this._dp = new eui.ArrayCollection(FriendManager.requestFriendList);
            this.requestList.dataProvider = this._dp;
        }
        else {
            this.noRequestGroup.visible = true;
            this.hasRequestGroup.visible = false;
        }
    };
    /**
     * 获取好友请求列表成功后接受广播后续执行事件
    */
    FriendPanel.prototype.setFriendRequestList = function () {
        if (FriendManager.requestFriendList && FriendManager.requestFriendList.length > 0) {
            this._dp = new eui.ArrayCollection(FriendManager.requestFriendList);
            this.requestList.dataProvider = this._dp;
            this.hasRequestGroup.visible = true;
            this.noRequestGroup.visible = false;
        }
        else {
            this.noRequestGroup.visible = true;
            this.hasRequestGroup.visible = false;
        }
    };
    /**
     * 快速领取好友金币按钮的操作
    */
    FriendPanel.prototype.fastReceive = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveGift(0);
    };
    /**
     * 领取好友金币成功后续执行事件
    */
    FriendPanel.prototype.receiveGiftSuccess = function () {
        if (FriendManager.giftList.length <= 0) {
            this.hasGiftGroup.visible = false;
            this.noGiftGroup.visible = true;
            this.fastReceiveBtn.enabled = false;
        }
        this._dp = new eui.ArrayCollection(FriendManager.giftList);
        this.giftList.dataProvider = this._dp;
        AlertManager.showAlert("您已成功领取好友赠送的" + FriendManager.getGoldNum + "金币！");
    };
    /**
     * 选项卡按钮点击事件
    */
    FriendPanel.prototype.onTabClickHandler = function (e) {
        if (e.itemIndex == 1) {
            if (FriendManager.isGiftLisFirstOpen) {
                FriendManager.giftList = [];
                if (FriendManager.friendList && FriendManager.friendList.length > 0) {
                    for (var _i = 0, _a = FriendManager.friendList; _i < _a.length; _i++) {
                        var def = _a[_i];
                        if (def.getGold == 1) {
                            if (!FriendManager.giftList) {
                                FriendManager.giftList = new Array();
                            }
                            FriendManager.giftList.push(def);
                        }
                    }
                    if (FriendManager.giftList.length > 0) {
                        this._dp = new eui.ArrayCollection(FriendManager.giftList);
                        this.giftList.dataProvider = this._dp;
                        this.hasGiftGroup.visible = true;
                        this.fastReceiveBtn.enabled = true;
                        this.noGiftGroup.visible = false;
                    }
                    else {
                        this.noGiftGroup.visible = true;
                        this.fastReceiveBtn.enabled = false;
                    }
                }
                else {
                    this.noGiftGroup.visible = true;
                    this.fastReceiveBtn.enabled = false;
                }
                FriendManager.isGiftLisFirstOpen = false;
            }
        }
        else if (e.itemIndex == 2) {
            if (FriendManager.isRequestLisFirstOpen) {
                FriendManager.reqFriendRequest();
                FriendManager.isRequestLisFirstOpen = false;
            }
        }
        else if (e.itemIndex == 3) {
            this.searchText.text = "";
            FriendManager.searchList = [];
            this._dp = new eui.ArrayCollection(FriendManager.searchList);
            this.addList.dataProvider = this._dp;
            this.searchText.setFocus();
            this.searchBtn.visible = false;
        }
    };
    /**
     * 邀请好友按钮点击事件
    */
    FriendPanel.prototype.inviteFriend = function () {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        if (ChannelManager.hasWeixin) {
            UIManager.showFloatTips("打开微信"); //todo 测试代码
        }
        else {
            AlertManager.showAlert("您未安装微信，分享失败。");
        }
    };
    /**
     * 好友列表点击事件
    */
    FriendPanel.prototype.onListClickHandler = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        if (this.list.selectedItem) {
            UserManager.reqGetOtherUserInfo(this.list.selectedItem.roleId);
            FriendManager.userInfoPanelStyle = 3;
        }
    };
    /**
     * 搜索到的用户列表点击事件
    */
    FriendPanel.prototype.onAddListClickHandler = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        if (this.addList.selectedItem) {
            UserManager.reqGetOtherUserInfo(this.addList.selectedItem.roleId);
            if (FriendManager.isFriend(this.addList.selectedItem.roleId)) {
                FriendManager.userInfoPanelStyle = 3;
            }
            else {
                FriendManager.userInfoPanelStyle = FriendInfoType.Send;
            }
        }
    };
    /**
     * 好友请求列表点击事件
    */
    FriendPanel.prototype.onRequestListClickHandler = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        if (this.requestList.selectedItem) {
            UserManager.reqGetOtherUserInfo(this.requestList.selectedItem.roleId);
            FriendManager.userInfoPanelStyle = FriendInfoType.Receive;
        }
    };
    /**
     * 获取好友面板信息成功后接受广播执行的操作
    */
    FriendPanel.prototype.setFriendDetailInfo = function () {
        if (FriendManager.userInfoPanelStyle == FriendInfoType.Receive || FriendManager.userInfoPanelStyle == FriendInfoType.Send) {
            UIManager.showPanel(UIModuleName.UserInfoPanel, { type: FriendManager.userInfoPanelStyle });
        }
        else {
            UIManager.showPanel(UIModuleName.UserInfoPanel);
        }
    };
    FriendPanel.prototype.setFriendListInfo = function () {
        if (FriendManager.friendList && FriendManager.friendList.length > 0) {
            this._dp = new eui.ArrayCollection(FriendManager.friendList);
            this.list.dataProvider = this._dp;
            this.hasFriendGroup.visible = true;
            this.noFriendGroup.visible = false;
        }
        else {
            this.noFriendGroup.visible = true;
            this.hasFriendGroup.visible = false;
        }
    };
    return FriendPanel;
}(BackHomeAnimePanel));
__reflect(FriendPanel.prototype, "FriendPanel");
//# sourceMappingURL=FriendPanel.js.map