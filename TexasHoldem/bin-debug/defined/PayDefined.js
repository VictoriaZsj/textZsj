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
 * 商城选项的定义
 * */
var PayDefined = (function (_super) {
    __extends(PayDefined, _super);
    function PayDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayDefined.GetInstance = function () {
        if (!PayDefined._instance) {
            PayDefined._instance = new PayDefined();
        }
        if (DefinedManager.IsParsed(PayDefined.ShoppingConfig) == false) {
            PayDefined._instance.initialize();
        }
        return PayDefined._instance;
    };
    PayDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(PayDefined.ShoppingConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    PayDefined.prototype.getDefinitionbyAwardId = function (awardId) {
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.awardId == awardId) {
                return def;
            }
        }
        return null;
    };
    PayDefined.ShoppingConfig = "payList";
    return PayDefined;
}(BaseDefined));
__reflect(PayDefined.prototype, "PayDefined");
/**
 * 商城选项的定义
 * */
var ShoppingDefinition = (function () {
    function ShoppingDefinition() {
    }
    return ShoppingDefinition;
}());
__reflect(ShoppingDefinition.prototype, "ShoppingDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=PayDefined.js.map