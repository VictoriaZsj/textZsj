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
 * 活动奖励渲染项
 */
var ActivityAwardItemRenderer = (function (_super) {
    __extends(ActivityAwardItemRenderer, _super);
    function ActivityAwardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ActivityAwardItemRenderer;
        return _this;
    }
    ActivityAwardItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    ActivityAwardItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.refresh();
    };
    ActivityAwardItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
        }
    };
    ActivityAwardItemRenderer.prototype.onClick = function () {
        ActivityManager.showActivityPanelByType(this.bindData);
    };
    ActivityAwardItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return ActivityAwardItemRenderer;
}(BaseItemRenderer));
__reflect(ActivityAwardItemRenderer.prototype, "ActivityAwardItemRenderer");
//# sourceMappingURL=ActivityAwardItemRenderer.js.map