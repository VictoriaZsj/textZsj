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
 * 快捷输入项面板
*/
var FastChatItemRenderer = (function (_super) {
    __extends(FastChatItemRenderer, _super);
    function FastChatItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.FastChatItemRenderer;
        return _this;
    }
    FastChatItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    FastChatItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.desLabel.text = this.bindData.des;
            this.bgImage.height = this.desLabel.height + 16;
        }
    };
    return FastChatItemRenderer;
}(BaseItemRenderer));
__reflect(FastChatItemRenderer.prototype, "FastChatItemRenderer");
//# sourceMappingURL=FastChatItemRenderer.js.map