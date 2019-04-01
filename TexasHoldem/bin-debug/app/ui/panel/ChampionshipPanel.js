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
 * 锦标赛面板
 */
var ChampionshipPanel = (function (_super) {
    __extends(ChampionshipPanel, _super);
    function ChampionshipPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.ChampionshipPanel;
        return _this;
    }
    ChampionshipPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIUtil.listRenderer(this.matchList, this.matchScroller, ChampionshipItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.signedUpList, this.signedUpScroller, ChampionshipItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.ticketList, this.ticketScroller, MyTicketItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.resultList, this.resultScroller, OutsItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.matchScroller.scrollPolicyH = this.signedUpScroller.scrollPolicyH = this.ticketScroller.scrollPolicyH = this.resultScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.hasMatchGroup.visible = this.noMatchGroup.visible = this.hasSignedUpGroup.visible = this.noSignedUpGroup.visible = this.hasTicketGroup.visible = this.noTicketGroup.visible = this.hasResultGroup.visible = this.noResultGroup.visible = false;
        var array = new Array();
        array.push(this.matchGroup);
        array.push(this.signedUpGroup);
        array.push(this.ticketsGroup);
        array.push(this.resultsGroup);
        this.matchTab.init(array);
    };
    ChampionshipPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        ChampionshipManager.getMatchListInfo();
    };
    ChampionshipPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.matchTab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.getMatchDetail, this);
        ChampionshipManager.onGetMatchListEvent.addListener(this.setMatchListInfo, this);
        ChampionshipManager.onGetRecentActionInfoEvent.addListener(this.setRecentActionListInfo, this);
        ChampionshipManager.onRefreshUIEvent.addListener(this.refreshUI, this);
        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showHelpPanel, this);
        ChampionshipManager.OnJoinNumPushEvent.addListener(this.refreshApplication, this);
    };
    ChampionshipPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.matchTab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.getMatchDetail, this);
        ChampionshipManager.onGetMatchListEvent.removeListener(this.setMatchListInfo, this);
        ChampionshipManager.onGetRecentActionInfoEvent.removeListener(this.setRecentActionListInfo, this);
        ChampionshipManager.onRefreshUIEvent.removeListener(this.refreshUI, this);
        this.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showHelpPanel, this);
        ChampionshipManager.OnJoinNumPushEvent.removeListener(this.refreshApplication, this);
    };
    /**
     * 更新已报名列表报名人数数据
    */
    ChampionshipPanel.prototype.refreshApplication = function () {
        if (ChampionshipManager.joinNumList && ChampionshipManager.joinNumList.length > 0) {
            for (var _i = 0, _a = ChampionshipManager.joinNumList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (ChampionshipManager.applicationList && ChampionshipManager.applicationList.length > 0) {
                    for (var _b = 0, _c = ChampionshipManager.applicationList; _b < _c.length; _b++) {
                        var applicationInfo = _c[_b];
                        if (def.id == applicationInfo.id) {
                            applicationInfo.applyNum = def.num;
                        }
                    }
                }
            }
        }
    };
    /**
     * 刷新UI
    */
    ChampionshipPanel.prototype.refreshUI = function (id) {
        if (ChampionshipManager.matchList && ChampionshipManager.matchList.length > 0) {
            for (var i = 0; i < ChampionshipManager.matchList.length; i++) {
                if (ChampionshipManager.matchList[i].id == id) {
                    ChampionshipManager.matchList.splice(i, 1);
                    break;
                }
            }
            this.setMatchListInfo();
        }
        if (ChampionshipManager.applicationList) {
            for (var i = 0; i < ChampionshipManager.applicationList.length; i++) {
                if (ChampionshipManager.applicationList[i].id == id) {
                    ChampionshipManager.applicationList.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * 点击赛事列表获取赛事详细信息
    */
    ChampionshipPanel.prototype.getMatchDetail = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        if (this.matchList.selectedItem) {
            UIManager.showPanel(UIModuleName.ChampionshipInfoPanel, { championshipInfo: this.matchList.selectedItem });
        }
    };
    /**
     * 设置最近赛况列表信息
    */
    ChampionshipPanel.prototype.setRecentActionListInfo = function () {
        //  todo 测试代码
        ArrayUtil.Clear(ChampionshipManager.outsList);
        if (!ChampionshipManager.outsList) {
            ChampionshipManager.outsList = new Array();
        }
        var rank1 = new ChampionshipRankInfo;
        rank1.award = "获得10元话费";
        rank1.head = ImageSource.TestImg;
        rank1.name = "张";
        rank1.rank = 1;
        var rank2 = new ChampionshipRankInfo;
        rank2.award = "获得10元话费";
        rank2.head = ImageSource.TestImg;
        rank2.name = "张";
        rank2.rank = 2;
        var arr1 = new OutsInfo;
        arr1.id = 1;
        arr1.name = "10元话费赛";
        arr1.time = 1502692427;
        var arr2 = new OutsInfo;
        arr2.id = 1;
        arr2.name = "10元话费赛";
        arr2.time = 1502692427;
        var arr3 = new OutsInfo;
        arr3.id = 1;
        arr3.name = "10元话费赛";
        arr3.time = 1502692427;
        if (!arr1.rankList) {
            arr1.rankList = new Array();
        }
        if (!arr2.rankList) {
            arr2.rankList = new Array();
        }
        if (!arr3.rankList) {
            arr3.rankList = new Array();
        }
        arr1.rankList.push(rank1);
        arr1.rankList.push(rank2);
        arr2.rankList.push(rank1);
        arr3.rankList.push(rank1);
        ChampionshipManager.outsList.push(arr1);
        ChampionshipManager.outsList.push(arr2);
        ChampionshipManager.outsList.push(arr3);
        //
        if (ChampionshipManager.outsList && ChampionshipManager.outsList.length > 0) {
            this.hasResultGroup.visible = true;
            this.noResultGroup.visible = false;
            this.resultList.dataProvider = new eui.ArrayCollection(ChampionshipManager.outsList);
        }
        else {
            this.noResultGroup.visible = true;
            this.hasResultGroup.visible = false;
        }
    };
    /**
     * 设置赛事列表信息
    */
    ChampionshipPanel.prototype.setMatchListInfo = function () {
        if (ChampionshipManager.matchList && ChampionshipManager.matchList.length > 0) {
            this.hasMatchGroup.visible = true;
            this.noMatchGroup.visible = false;
            this.matchList.dataProvider = new eui.ArrayCollection(ChampionshipManager.matchList);
        }
        else {
            this.noMatchGroup.visible = true;
            this.hasMatchGroup.visible = false;
        }
    };
    /**
     * 设置已报名赛事列表信息
    */
    ChampionshipPanel.prototype.setSignedUpListInfo = function () {
        if (ChampionshipManager.applicationList && ChampionshipManager.applicationList.length > 0) {
            this.hasSignedUpGroup.visible = true;
            this.noSignedUpGroup.visible = false;
            this.signedUpList.dataProvider = new eui.ArrayCollection(ChampionshipManager.applicationList);
        }
        else {
            this.noSignedUpGroup.visible = true;
            this.hasSignedUpGroup.visible = false;
        }
    };
    /**
     * 设置我的门票列表信息
    */
    ChampionshipPanel.prototype.setMyTicketListInfo = function () {
        ArrayUtil.Clear(ChampionshipManager.myTicketList);
        if (ItemManager.itemList && ItemManager.itemList.length > 0) {
            this.hasTicketGroup.visible = true;
            this.noTicketGroup.visible = false;
            for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.id == EntranceTicketType.TenTelephoneCharge || def.id == EntranceTicketType.MillionGold || def.id == EntranceTicketType.HundredDiamond) {
                    var info = new ItemInfo();
                    info.id = def.id;
                    ChampionshipManager.myTicketList.push(info);
                }
            }
            this.ticketList.dataProvider = new eui.ArrayCollection(ChampionshipManager.myTicketList);
        }
        else {
            this.hasTicketGroup.visible = false;
            this.noTicketGroup.visible = true;
        }
    };
    /**
     * 选项卡按钮点击事件
    */
    ChampionshipPanel.prototype.onTabClickHandler = function (e) {
        if (e.itemIndex == 0) {
            ChampionshipManager.getMatchListInfo();
        }
        else if (e.itemIndex == 1) {
            this.setSignedUpListInfo();
        }
        else if (e.itemIndex == 2) {
            this.setMyTicketListInfo();
        }
        else if (e.itemIndex == 3) {
            // ChampionshipManager.reqGetRecentActionInfo();
            this.setRecentActionListInfo(); //todo 测试代码
        }
    };
    /**
     * ?按钮点击事件
    */
    ChampionshipPanel.prototype.showHelpPanel = function () {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        UIManager.showPanel(UIModuleName.TextInfoPanel, TextId.PlayWay);
    };
    return ChampionshipPanel;
}(BackHomeAnimePanel));
__reflect(ChampionshipPanel.prototype, "ChampionshipPanel");
//# sourceMappingURL=ChampionshipPanel.js.map