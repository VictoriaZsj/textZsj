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
 * 活动中心面板
 */
var ActivityPanel = (function (_super) {
    __extends(ActivityPanel, _super);
    function ActivityPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.ActivityPanel;
        return _this;
    }
    ActivityPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    ActivityPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        UIUtil.listRenderer(this.activityList, this.activityScroller, ActivityItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    ActivityPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.activityScroller.viewport.scrollV = 0;
        this.refreshList();
    };
    ActivityPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    ActivityPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    ActivityPanel.prototype.refreshList = function () {
        this.activityList.dataProvider = new eui.ArrayCollection(ActivityManager.showList);
    };
    return ActivityPanel;
}(BackHomeAnimePanel));
__reflect(ActivityPanel.prototype, "ActivityPanel");
//# sourceMappingURL=ActivityPanel.js.map