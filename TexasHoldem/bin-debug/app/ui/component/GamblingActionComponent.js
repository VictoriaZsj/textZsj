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
 * 操作组件
 */
var GamblingActionComponent = (function (_super) {
    __extends(GamblingActionComponent, _super);
    function GamblingActionComponent() {
        var _this = _super.call(this) || this;
        _this.skinName = UIComponentSkinName.GamblingActionComponent;
        return _this;
    }
    GamblingActionComponent.prototype.hideAll = function () {
        this.brightCardBtn.visible = false;
        this.preActionGroup.visible = false;
        this.raiseGroup.visible = false;
        this.actionGroup.visible = false;
    };
    return GamblingActionComponent;
}(BaseComponent));
__reflect(GamblingActionComponent.prototype, "GamblingActionComponent");
//# sourceMappingURL=GamblingActionComponent.js.map