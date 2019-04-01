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
 * 排行榜面板
 */
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.RankPanel;
        return _this;
    }
    RankPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isCloseButtonTween = false;
    };
    RankPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var array = new Array("财富", "等级", "VIP");
        this.rankTypeTab.init(array);
        this.rankTypeTab.isTween = false;
        this.rankTypeTab.setSelectIndex(0);
        array = new Array("全部", "好友");
        this.listTypeTab.init(array);
        this.listTypeTab.isTween = false;
        this.listTypeTab.setSelectIndex(0);
        this.currentRankType = this.rankTypeTab.tabBar.selectedIndex;
        this.currentListType = this.listTypeTab.tabBar.selectedIndex;
        UIUtil.listRenderer(this.rankList, this.rankScroller, RankItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    RankPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        RankManager.reqRankList(this.getListType(this.currentRankType, this.currentListType));
        this.rankScroller.viewport.scrollV = 0;
    };
    RankPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.rankTypeTab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRankTypeTabTap, this);
        this.listTypeTab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTypeTabTap, this);
        RankManager.getRankListEvent.addListener(this.getRankList, this);
    };
    RankPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.rankTypeTab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRankTypeTabTap, this);
        this.listTypeTab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTypeTabTap, this);
        RankManager.getRankListEvent.removeListener(this.getRankList, this);
    };
    RankPanel.prototype.getRankList = function (type) {
        this.refreshUI();
    };
    /**
     * 渲染信息
    */
    RankPanel.prototype.refreshUI = function () {
        this.rankList.dataProvider = new eui.ArrayCollection(RankManager.currentRankList);
    };
    RankPanel.prototype.onRankTypeTabTap = function (e) {
        this.currentRankType = e.itemIndex;
        this.currentListType = RankListType.All;
        RankManager.reqRankList(this.getListType(this.currentRankType, this.currentListType));
    };
    RankPanel.prototype.onListTypeTabTap = function (e) {
        this.currentListType = e.itemIndex;
        RankManager.reqRankList(this.getListType(this.currentRankType, this.currentListType));
    };
    /**
     * 计算发送得的type类型
     */
    RankPanel.prototype.getListType = function (rankType, listType) {
        if (rankType == RankType.Vip) {
            this.listTypeTab.visible = false;
            return ReqRankType.Vip;
        }
        else {
            this.listTypeTab.visible = true;
            return rankType * 2 + listType + 1;
        }
    };
    return RankPanel;
}(BasePanel));
__reflect(RankPanel.prototype, "RankPanel");
var RankType;
(function (RankType) {
    /**
     * 财富
     */
    RankType[RankType["Gold"] = 0] = "Gold";
    /**
     * 等级
     */
    RankType[RankType["Level"] = 1] = "Level";
    /**
     * Vip
     */
    RankType[RankType["Vip"] = 2] = "Vip";
})(RankType || (RankType = {}));
var RankListType;
(function (RankListType) {
    /**
     * 所有
     */
    RankListType[RankListType["All"] = 0] = "All";
    /**
     * 朋友
     */
    RankListType[RankListType["Friend"] = 1] = "Friend";
})(RankListType || (RankListType = {}));
var ReqRankType;
(function (ReqRankType) {
    /**
     * 财富
     */
    ReqRankType[ReqRankType["Gold"] = 1] = "Gold";
    /**
     * 好友财富
     */
    ReqRankType[ReqRankType["FriendGold"] = 2] = "FriendGold";
    /**
     * 等级
     */
    ReqRankType[ReqRankType["Level"] = 3] = "Level";
    /**
     * 好友等级
     */
    ReqRankType[ReqRankType["FriendLevel"] = 4] = "FriendLevel";
    /**
     * Vip
     */
    ReqRankType[ReqRankType["Vip"] = 5] = "Vip";
})(ReqRankType || (ReqRankType = {}));
//# sourceMappingURL=RankPanel.js.map