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
 * 数字组件
 */
var NumComponent = (function (_super) {
    __extends(NumComponent, _super);
    function NumComponent() {
        var _this = _super.call(this) || this;
        _this.skinName = UIComponentSkinName.NumComponent;
        return _this;
    }
    NumComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    NumComponent.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.bindData) {
            this.label1.text = this.bindData.toString();
        }
    };
    NumComponent.prototype.refresh = function (num) {
        if (this.label1) {
            if (num != undefined) {
                this.label1.text = num.toString();
            }
            else {
                this.label1.text = StringConstant.empty;
            }
        }
    };
    return NumComponent;
}(BaseComponent));
__reflect(NumComponent.prototype, "NumComponent");
//# sourceMappingURL=NumComponent.js.map