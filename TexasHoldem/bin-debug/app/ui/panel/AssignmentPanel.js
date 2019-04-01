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
 * 任务面板
 */
var AssignmentPanel = (function (_super) {
    __extends(AssignmentPanel, _super);
    function AssignmentPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.AssignmentPanel;
        return _this;
    }
    AssignmentPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    AssignmentPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var array = new Array("每日任务", "每周任务", "成长任务");
        this.assignmentTab.init(array);
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AssignmentItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    AssignmentPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.achieveScroller.viewport.scrollV = 0;
        this.assignmentTab.setSelectIndex(0);
        this.refreshList();
    };
    AssignmentPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.assignmentTab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        AchievementManager.achieveChangeEvent.addListener(this.refreshList, this);
    };
    AssignmentPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.assignmentTab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        AchievementManager.achieveChangeEvent.removeListener(this.refreshList, this);
    };
    AssignmentPanel.prototype.refreshList = function () {
        var list = AchievementManager.getShowAchieveListByType(this.assignmentTab.tabBar.selectedIndex + 1);
        this.achieveList.dataProvider = new eui.ArrayCollection(list);
    };
    AssignmentPanel.prototype.onBarItemTap = function (e) {
        this.refreshList();
    };
    return AssignmentPanel;
}(BackHomeAnimePanel));
__reflect(AssignmentPanel.prototype, "AssignmentPanel");
//# sourceMappingURL=AssignmentPanel.js.map