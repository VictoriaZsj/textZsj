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
 * 文本信息的定义
 * */
var TextDefined = (function (_super) {
    __extends(TextDefined, _super);
    function TextDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextDefined.GetInstance = function () {
        if (!TextDefined._instance) {
            TextDefined._instance = new TextDefined();
        }
        if (DefinedManager.IsParsed(TextDefined.textConfig) == false) {
            TextDefined._instance.initialize();
        }
        return TextDefined._instance;
    };
    TextDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(TextDefined.textConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
        var reg = /\\n/g;
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var val = _a[_i];
            val.text = val.text.replace(reg, "\n");
        }
    };
    TextDefined.textConfig = "text";
    return TextDefined;
}(BaseDefined));
__reflect(TextDefined.prototype, "TextDefined");
/**
 * 文本的定义
 * */
var TextDefinition = (function () {
    function TextDefinition() {
    }
    return TextDefinition;
}());
__reflect(TextDefinition.prototype, "TextDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=TextDefined.js.map