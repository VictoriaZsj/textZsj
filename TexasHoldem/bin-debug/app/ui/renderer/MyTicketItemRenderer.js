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
 * 添加好友项面板
*/
var MyTicketItemRenderer = (function (_super) {
    __extends(MyTicketItemRenderer, _super);
    function MyTicketItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.MyTicketItemRenderer;
        return _this;
    }
    MyTicketItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    MyTicketItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            // this.iconImg.source = this.bindData.definition.icon;
            this.iconImg.source = ImageSource.TestImg; //todo 测试代码
            this.nameLabel.text = this.bindData.definition.name;
            this.desLabel.text = this.bindData.definition.des;
            this.numLabel.text = this.bindData.count.toString();
        }
    };
    return MyTicketItemRenderer;
}(BaseItemRenderer));
__reflect(MyTicketItemRenderer.prototype, "MyTicketItemRenderer");
//# sourceMappingURL=MyTicketItemRenderer.js.map