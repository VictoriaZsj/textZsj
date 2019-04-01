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
 *  活动页面（具有图文内容的活动）
 */
var NormalActivityPanel = (function (_super) {
    __extends(NormalActivityPanel, _super);
    function NormalActivityPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.NormalActivityPanel;
        return _this;
    }
    NormalActivityPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    NormalActivityPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this.info = appendData;
        }
        UIUtil.listRenderer(this.activityList, this.activityScroller, ActivityAwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    NormalActivityPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        if (this.info) {
            //this.activityImg.source = this.info.definition.imgId
            this.titleLabel.text = this.info.definition.name;
            this.desLabel.text = this.info.definition.des2;
        }
    };
    NormalActivityPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    NormalActivityPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return NormalActivityPanel;
}(BaseAnmiatePanel));
__reflect(NormalActivityPanel.prototype, "NormalActivityPanel");
//# sourceMappingURL=NormalActivityPanel.js.map