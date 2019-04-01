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
 * 随机昵称
*/
var NameDefined = (function (_super) {
    __extends(NameDefined, _super);
    function NameDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NameDefined.GetInstance = function () {
        if (!NameDefined._instance) {
            NameDefined._instance = new NameDefined();
        }
        if (DefinedManager.IsParsed(NameDefined.nameConfig) == false) {
            NameDefined._instance.initialize();
        }
        return NameDefined._instance;
    };
    NameDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(NameDefined.nameConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
        this.getRange();
    };
    /**
     * 获得范围值
    */
    NameDefined.prototype.getRange = function () {
        if (this.dataList && this.dataList.length > 0) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (!this.lastNameRange) {
                    if (!def.name) {
                        this.lastNameRange = def.id - 1;
                    }
                }
                if (!this.bboyFirstNameRange) {
                    if (!def.boy) {
                        this.bboyFirstNameRange = def.id - 1;
                    }
                }
            }
            if (!(this.lastNameRange || this.bboyFirstNameRange)) {
                console.log("获取姓名或男孩名范围失败");
            }
        }
    };
    NameDefined.nameConfig = "name";
    return NameDefined;
}(BaseDefined));
__reflect(NameDefined.prototype, "NameDefined");
/**
* 随机昵称的定义
*/
var NameDefinition = (function () {
    function NameDefinition() {
    }
    return NameDefinition;
}());
__reflect(NameDefinition.prototype, "NameDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=NameDefined.js.map