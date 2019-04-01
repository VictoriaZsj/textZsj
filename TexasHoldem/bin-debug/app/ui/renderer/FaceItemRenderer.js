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
 * 表情项面板
*/
var FaceItemRenderer = (function (_super) {
    __extends(FaceItemRenderer, _super);
    function FaceItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.FaceItemRenderer;
        return _this;
    }
    FaceItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    FaceItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.faceImg.source = ImageSource.TestImg;
        }
    };
    return FaceItemRenderer;
}(BaseItemRenderer));
__reflect(FaceItemRenderer.prototype, "FaceItemRenderer");
//# sourceMappingURL=FaceItemRenderer.js.map