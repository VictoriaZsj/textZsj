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
 * 活动列表渲染项
 */
var ActivityItemRenderer = (function (_super) {
    __extends(ActivityItemRenderer, _super);
    function ActivityItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ActivityItemRenderer;
        return _this;
    }
    ActivityItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    ActivityItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.refresh();
    };
    ActivityItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
            this.itemTitleLabel.text = this.bindData.definition.name;
            this.itemDesLabel.text = this.bindData.definition.des;
            this.itemImg.source = this.bindData.definition.icon;
        }
    };
    ActivityItemRenderer.prototype.onClick = function () {
        ActivityManager.showActivityPanelByType(this.bindData);
    };
    ActivityItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return ActivityItemRenderer;
}(BaseItemRenderer));
__reflect(ActivityItemRenderer.prototype, "ActivityItemRenderer");
//# sourceMappingURL=ActivityItemRenderer.js.map