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
 * 游戏场面板
 */
var PlayingFieldPanel = (function (_super) {
    __extends(PlayingFieldPanel, _super);
    function PlayingFieldPanel() {
        var _this = _super.call(this) || this;
        /**
         * 升降序排序标记
        */
        _this.blindIsUpSort = true;
        _this.playNumIsUpSort = true;
        _this.roomIdIsUpSort = true;
        _this.buyIsUpSort = true;
        _this.skinName = UISkinName.PlayingFieldPanel;
        return _this;
    }
    PlayingFieldPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._ly = UIUtil.getVTileLayout(1, 1, egret.VerticalAlign.TOP);
        this.list.layout = this._ly;
        UIUtil.listRenderer(this.list, this.scroller, PlayingFieldItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.searchLable.type = egret.TextFieldType.INPUT;
        this.playingFieldTabCompontent.init(["初级场", "中级场", "高级场"]);
    };
    PlayingFieldPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        //重置
        this.searchLable.text = "";
        this.roomInfoList = new Array();
        PlayingFieldManager.reqRoomListInfo(PlayingFieldPattern.PrimaryPattern);
    };
    PlayingFieldPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRoomClickHandler, this);
        this.searchLable.addEventListener(egret.TouchEvent.FOCUS_IN, this.showKeyboard, this);
        this.playingFieldTabCompontent.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        PlayingFieldManager.onGetRoomListEvent.addListener(this.setRoomListInfo, this);
    };
    PlayingFieldPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRoomClickHandler, this);
        this.searchLable.removeEventListener(egret.TouchEvent.FOCUS_IN, this.showKeyboard, this);
        this.playingFieldTabCompontent.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        PlayingFieldManager.onGetRoomListEvent.removeListener(this.setRoomListInfo, this);
    };
    /**
     * tabBar切换事件
    */
    PlayingFieldPanel.prototype.onTabClickHandler = function (e) {
        if (e.itemIndex == 0) {
            PlayingFieldManager.reqRoomListInfo(PlayingFieldPattern.PrimaryPattern);
        }
        else if (e.itemIndex == 1) {
            PlayingFieldManager.reqRoomListInfo(PlayingFieldPattern.MiddlePattern);
        }
        else {
            PlayingFieldManager.reqRoomListInfo(PlayingFieldPattern.HighPattern);
        }
    };
    /**
     * 写入列表默认数据
    */
    PlayingFieldPanel.prototype.setRoomListInfo = function () {
        if (PlayingFieldManager.roomList.length > 0) {
            ArrayUtil.Clear(this.roomInfoList);
            for (var _i = 0, _a = PlayingFieldManager.roomList; _i < _a.length; _i++) {
                var def = _a[_i];
                this.roomInfoList.push(def);
            }
        }
        this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.blindUpSort)); //默认盲注升序排序
        this.list.dataProvider = this._dp;
    };
    /**
     * 搜索框获得焦点触发的操作
    */
    PlayingFieldPanel.prototype.showKeyboard = function () {
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.searchRoom, target: this });
    };
    /**
     * 点击房间ID触发的操作
    */
    PlayingFieldPanel.prototype.roomIdSort = function () {
        if (this.roomIdIsUpSort) {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.roomIdUpSort));
        }
        else {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.roomIdDownSort));
        }
        this.roomIdIsUpSort = !this.roomIdIsUpSort;
        this.refreshUI();
    };
    /**
     * 点击在玩人数触发的操作
    */
    PlayingFieldPanel.prototype.playerNumSort = function () {
        if (this.playNumIsUpSort) {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.roomPlayNumUpSort));
        }
        else {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.roomPlayNumDownSort));
        }
        this.playNumIsUpSort = !this.playNumIsUpSort;
        this.refreshUI();
    };
    /**
     * 点击小、大盲注触发的操作
    */
    PlayingFieldPanel.prototype.blindSort = function () {
        if (this.blindIsUpSort) {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.blindUpSort));
        }
        else {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.blindDownSort));
        }
        this.blindIsUpSort = !this.blindIsUpSort;
        this.refreshUI();
    };
    /**
     * 点击最小、最大买入触发的操作
    */
    PlayingFieldPanel.prototype.buySort = function () {
        if (this.buyIsUpSort) {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.blindUpSort));
        }
        else {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.blindDownSort));
        }
        this.buyIsUpSort = !this.buyIsUpSort;
        this.refreshUI();
    };
    /**
     * 刷新页面
    */
    PlayingFieldPanel.prototype.refreshUI = function () {
        this.list.dataProvider = this._dp;
    };
    /**
     * 面板按钮事件处理
    */
    PlayingFieldPanel.prototype.clickHandler = function (event) {
        switch (event.target) {
            case this.roomIdLable:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.roomIdSort();
                break;
            case this.playerNumLable:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.playerNumSort();
                break;
            case this.blindLable:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.blindSort();
                break;
            case this.buyLable:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.buySort();
                break;
            case this.startGameBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                // todo 开始游戏
                UIManager.showFloatTips("快速加入游戏");
                break;
            case this.createPrivateRoomBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.createPrivateRoom();
                break;
        }
    };
    /**
     * 创建私人房
    */
    PlayingFieldPanel.prototype.createPrivateRoom = function () {
        //判断是不是vip,来确定是否具有创建私人房的权限
        if (!VipManager.isVip()) {
            var type = ShoppingGpIndex.Vip;
            AlertManager.showConfirm("私人房仅对VIP开放，您现在还不是VIP，是否马上开通？", this.openShoppingPanel, null, type);
        }
        else {
            UIManager.showPanel(UIModuleName.CreateRoomPwdPanel);
        }
    };
    /**
     * 搜索房间
    */
    PlayingFieldPanel.prototype.searchRoom = function (type, num) {
        if (type == 1) {
            if (this.searchLable.text.length < 5) {
                this.searchLable.text = this.searchLable.text + num;
            }
        }
        else if (type == 2) {
            if (this.searchLable.text.length > 0) {
                this.searchLable.text = this.searchLable.text.slice(0, this.searchLable.text.length - 1);
            }
        }
        else if (type == 3) {
            this.searchLable.text = "";
        }
        else if (type == 4) {
            return;
        }
        else {
            return;
        }
        var str = this.searchLable.text;
        if (str.length > 0) {
            var result = new Array();
            if (PlayingFieldManager.roomList.length > 0) {
                for (var _i = 0, _a = PlayingFieldManager.roomList; _i < _a.length; _i++) {
                    var def = _a[_i];
                    if ((Array(5).join('0') + def.id).slice(-5).toString().indexOf(str) >= 0) {
                        result.push(def);
                    }
                }
                this._dp = new eui.ArrayCollection(result.sort(SortUtil.blindUpSort));
            }
        }
        else {
            this._dp = new eui.ArrayCollection(this.roomInfoList.sort(SortUtil.blindUpSort));
        }
        this.refreshUI();
    };
    /**
     * 房间信息列表点击触发事件
    */
    PlayingFieldPanel.prototype.onRoomClickHandler = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        if (this.list.selectedItem) {
            if (UserManager.userInfo.gold >= this.list.selectedItem.minBuy) {
                if (this.list.selectedItem.type == 11) {
                    PlayingFieldManager.roomId = this.list.selectedItem.id;
                    UIManager.showPanel(UIModuleName.EnterRoomPwdPanel);
                }
                else {
                    //进入房间
                    GamblingManager.reqEnterRoom(this.list.selectedItem.id);
                    // UIManager.showFloatTips("发送加入房间请求" + this.list.selectedItem.id);  //todo 测试代码
                }
            }
            else {
                var type = ShoppingGpIndex.Gold;
                AlertManager.showConfirm("提示：金币不足，是否花费648购买1200万金币？", this.openShoppingPanel, null, type);
            }
        }
    };
    /**
     * 打开商城面板
    */
    PlayingFieldPanel.prototype.openShoppingPanel = function (type) {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: type });
        UIManager.closePanel(UIModuleName.PlayingFieldPanel);
    };
    return PlayingFieldPanel;
}(BackHomeAnimePanel));
__reflect(PlayingFieldPanel.prototype, "PlayingFieldPanel");
//# sourceMappingURL=PlayingFieldPanel.js.map