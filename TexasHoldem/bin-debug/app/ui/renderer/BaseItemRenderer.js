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
 * 基础项渲染信息
 */
var BaseItemRenderer = (function (_super) {
    __extends(BaseItemRenderer, _super);
    function BaseItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "";
        return _this;
    }
    BaseItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    BaseItemRenderer.prototype.dataChanged = function () {
        this.bindData = this.data;
    };
    BaseItemRenderer.prototype.destroy = function () {
    };
    return BaseItemRenderer;
}(eui.ItemRenderer));
__reflect(BaseItemRenderer.prototype, "BaseItemRenderer");
//# sourceMappingURL=BaseItemRenderer.js.map