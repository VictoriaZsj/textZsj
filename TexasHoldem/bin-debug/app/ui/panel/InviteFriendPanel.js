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
 * 邀请好友面板
 */
var InviteFriendPanel = (function (_super) {
    __extends(InviteFriendPanel, _super);
    function InviteFriendPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.InviteFriendPanel;
        return _this;
    }
    InviteFriendPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIUtil.listRenderer(this.inviteFriendList, this.inviteFriend_scroller, InviteFriendListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    InviteFriendPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.checkAll.selected = false;
        if (FriendManager.friendList) {
            this.infoList = new Array();
            for (var i = 0; i < FriendManager.friendList.length; i++) {
                var iInfo = new InviteInfo();
                iInfo.friendInfo = FriendManager.friendList[i];
                this.infoList.push(iInfo);
            }
        }
    };
    InviteFriendPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.setFriendListInfo();
    };
    InviteFriendPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.checkAll.addEventListener(egret.Event.CHANGE, this.checkAllHandler, this);
        this.inviteFriendList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.checkBtnHandler, this);
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInviteHandler, this);
    };
    InviteFriendPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.checkAll.removeEventListener(egret.Event.CHANGE, this.checkAllHandler, this);
        this.inviteFriendList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.checkBtnHandler, this);
        this.inviteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInviteHandler, this);
        this.infoList = null;
    };
    InviteFriendPanel.prototype.setFriendListInfo = function () {
        if (this.infoList) {
            this._dp = new eui.ArrayCollection(this.infoList);
            this.inviteFriendList.dataProvider = this._dp;
        }
    };
    InviteFriendPanel.prototype.checkAllHandler = function () {
        if (this.infoList) {
            for (var i = 0; i < this.infoList.length; i++) {
                this.infoList[i].state = this.checkAll.selected;
                var item = this.getItem(this.infoList[i].friendInfo);
                if (item) {
                    item.setChecked(this.checkAll.selected);
                }
            }
        }
    };
    InviteFriendPanel.prototype.getItem = function (friendInfo) {
        for (var i = 0; i < this.inviteFriendList.numChildren; i++) {
            var inviteFriendListItem = this.inviteFriendList.getChildAt(i);
            if (inviteFriendListItem.bindData.friendInfo == friendInfo) {
                return inviteFriendListItem;
            }
        }
        return null;
    };
    InviteFriendPanel.prototype.checkBtnHandler = function (event) {
        var itemIndex = event.itemIndex;
        var inviteFriendListItem = this.inviteFriendList.getChildAt(itemIndex);
        var state = !inviteFriendListItem.isCheckedBtn.selected;
        inviteFriendListItem.bindData.state = state;
        inviteFriendListItem.setChecked(state);
        if (!state) {
            this.checkAll.selected = state;
        }
    };
    InviteFriendPanel.prototype.sendInviteHandler = function () {
        var friendIdArray = new Array();
        if (this.infoList) {
            for (var i = 0; i < this.infoList.length; i++) {
                if (this.infoList[i].state) {
                    friendIdArray.push(FriendManager.friendList[i].roleId);
                }
            }
            if (friendIdArray.length > 0) {
                this.onCloseBtnClickHandler(null);
                AlertManager.showAlert("好友邀请已发送");
                UIManager.showPanel(UIModuleName.FriendMsgPanel, FriendMsgType.InviteMsg);
                // let callback:Function = function()
                // {
                // 	AlertManager.showSingleAlert("好友邀请已发送");
                // 	UIManager.showPanel(UIModuleName.FriendMsgPanel,FriendMsgType.inviteMsg);					
                // }
                // SocketManager.Send(Command.Req_SendGameInvite_3608, { "Id": roomId, "roleId": friendIdArray},callback); 
            }
        }
    };
    return InviteFriendPanel;
}(BackHomeAnimePanel));
__reflect(InviteFriendPanel.prototype, "InviteFriendPanel");
var InviteInfo = (function () {
    function InviteInfo() {
    }
    return InviteInfo;
}());
__reflect(InviteInfo.prototype, "InviteInfo");
//# sourceMappingURL=InviteFriendPanel.js.map