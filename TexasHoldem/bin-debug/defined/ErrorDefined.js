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
 * 错误的定义
 * */
var ErrorDefined = (function (_super) {
    __extends(ErrorDefined, _super);
    function ErrorDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorDefined.GetInstance = function () {
        if (ErrorDefined._instance == null) {
            ErrorDefined._instance = new ErrorDefined();
        }
        if (DefinedManager.IsParsed(ErrorDefined.errorConfig) == false) {
            ErrorDefined._instance.initialize();
        }
        return ErrorDefined._instance;
    };
    ErrorDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ErrorDefined.errorConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    ErrorDefined.prototype.getDetails = function (id) {
        var def = this.getDefinition(id);
        if (def) {
            return def.des;
        }
        return StringConstant.empty;
    };
    ErrorDefined.errorConfig = "error";
    return ErrorDefined;
}(BaseDefined));
__reflect(ErrorDefined.prototype, "ErrorDefined");
/**
 * 错误码定义
 */
var ErrorDefinition = (function () {
    function ErrorDefinition() {
    }
    return ErrorDefinition;
}());
__reflect(ErrorDefinition.prototype, "ErrorDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ErrorDefined.js.map