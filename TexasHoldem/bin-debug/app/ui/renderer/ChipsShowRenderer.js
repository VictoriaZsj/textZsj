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
 * 底池 边池筹码显示项
 */
var ChipsShowRenderer = (function (_super) {
    __extends(ChipsShowRenderer, _super);
    function ChipsShowRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ChipsShowRenderer;
        return _this;
    }
    ChipsShowRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    ChipsShowRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData > 0 && this.chips) {
            this.chips.init(this.bindData);
        }
    };
    return ChipsShowRenderer;
}(BaseItemRenderer));
__reflect(ChipsShowRenderer.prototype, "ChipsShowRenderer");
//# sourceMappingURL=ChipsShowRenderer.js.map