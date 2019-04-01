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
 * 签到选项的定义
 * */
var SignInDefined = (function (_super) {
    __extends(SignInDefined, _super);
    function SignInDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignInDefined.GetInstance = function () {
        if (!SignInDefined._instance) {
            SignInDefined._instance = new SignInDefined();
        }
        if (DefinedManager.IsParsed(SignInDefined.SignInConfig) == false) {
            SignInDefined._instance.initialize();
        }
        return SignInDefined._instance;
    };
    SignInDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(SignInDefined.SignInConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    SignInDefined.prototype.getDefinitionbyAwardId = function (awardId) {
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.awardId == awardId) {
                return def;
            }
        }
        return null;
    };
    SignInDefined.SignInConfig = "activity_signin";
    return SignInDefined;
}(BaseDefined));
__reflect(SignInDefined.prototype, "SignInDefined");
/**
 * 签到选项的定义
 * */
var SignInDefinition = (function () {
    function SignInDefinition() {
    }
    return SignInDefinition;
}());
__reflect(SignInDefinition.prototype, "SignInDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=SignInDefined.js.map