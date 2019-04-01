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
 * 用户等级的定义
 * */
var ExpDefined = (function (_super) {
    __extends(ExpDefined, _super);
    function ExpDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpDefined.GetInstance = function () {
        if (!ExpDefined._instance) {
            ExpDefined._instance = new ExpDefined();
        }
        if (DefinedManager.IsParsed(ExpDefined.expConfig) == false) {
            ExpDefined._instance.initialize();
        }
        return ExpDefined._instance;
    };
    ExpDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ExpDefined.expConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    ExpDefined.expConfig = "exp";
    return ExpDefined;
}(BaseDefined));
__reflect(ExpDefined.prototype, "ExpDefined");
/**
* 用户等级的定义
* */
var ExpDefinition = (function () {
    function ExpDefinition() {
    }
    return ExpDefinition;
}());
__reflect(ExpDefinition.prototype, "ExpDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ExpDefined.js.map