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
 * 聊天信息项面板
*/
var ChatItemRenderer = (function (_super) {
    __extends(ChatItemRenderer, _super);
    function ChatItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ChatItemRenderer;
        return _this;
    }
    ChatItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    ChatItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.textLabel.text = this.bindData.name + ":" + this.bindData.message;
            this.bgImage.height = this.textLabel.height + 10;
        }
    };
    return ChatItemRenderer;
}(BaseItemRenderer));
__reflect(ChatItemRenderer.prototype, "ChatItemRenderer");
//# sourceMappingURL=ChatItemRenderer.js.map