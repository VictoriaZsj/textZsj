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
 *屏蔽词
*/
var ForbiddenDefined = (function (_super) {
    __extends(ForbiddenDefined, _super);
    function ForbiddenDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForbiddenDefined.GetInstance = function () {
        if (!ForbiddenDefined._instance) {
            ForbiddenDefined._instance = new ForbiddenDefined();
        }
        if (DefinedManager.IsParsed(ForbiddenDefined.forbiddenConfig) == false) {
            ForbiddenDefined._instance.initialize();
        }
        return ForbiddenDefined._instance;
    };
    ForbiddenDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ForbiddenDefined.forbiddenConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    ForbiddenDefined.forbiddenConfig = "forbidden";
    return ForbiddenDefined;
}(BaseDefined));
__reflect(ForbiddenDefined.prototype, "ForbiddenDefined");
/**
* 屏蔽词的定义
*/
var ForbiddenDefinition = (function () {
    function ForbiddenDefinition() {
    }
    return ForbiddenDefinition;
}());
__reflect(ForbiddenDefinition.prototype, "ForbiddenDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ForbiddenDefined.js.map