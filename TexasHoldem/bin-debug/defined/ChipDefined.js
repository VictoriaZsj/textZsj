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
 * 筹码的定义
 * */
var ChipsDefined = (function (_super) {
    __extends(ChipsDefined, _super);
    function ChipsDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChipsDefined.GetInstance = function () {
        if (!ChipsDefined._instance) {
            ChipsDefined._instance = new ChipsDefined();
        }
        if (DefinedManager.IsParsed(ChipsDefined.chipsConfig) == false) {
            ChipsDefined._instance.initialize();
        }
        return ChipsDefined._instance;
    };
    ChipsDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ChipsDefined.chipsConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    /**
     * 获取筹码定义
     */
    ChipsDefined.prototype.getChipsDefinition = function (id) {
        for (var _i = 0, _a = ChipsDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.id == id) {
                return def;
            }
        }
        return null;
    };
    ChipsDefined.chipsConfig = "chips";
    return ChipsDefined;
}(BaseDefined));
__reflect(ChipsDefined.prototype, "ChipsDefined");
/**
 * 筹码选项的定义
 * */
var ChipsDefinition = (function () {
    function ChipsDefinition() {
    }
    return ChipsDefinition;
}());
__reflect(ChipsDefinition.prototype, "ChipsDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ChipDefined.js.map