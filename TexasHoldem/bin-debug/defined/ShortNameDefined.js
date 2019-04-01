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
 * 转换字段名
 * */
var ShortNameDefined = (function (_super) {
    __extends(ShortNameDefined, _super);
    function ShortNameDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShortNameDefined.GetInstance = function () {
        if (ShortNameDefined._instance == null) {
            ShortNameDefined._instance = new ShortNameDefined();
        }
        if (DefinedManager.IsParsed(ShortNameDefined.shortConfig) == false) {
            ShortNameDefined._instance.initialize();
        }
        return ShortNameDefined._instance;
    };
    ShortNameDefined.prototype.initialize = function () {
        this.shortNameKv = DefinedManager.GetData(ShortNameDefined.shortConfig);
    };
    ShortNameDefined.prototype.convertEnter = function (targetObj) {
        if (targetObj != null) {
            var list = targetObj;
            if (list.length) {
                for (var i = 0; i < list.length; i++) {
                    this.convertEnter(list[i]);
                }
                return targetObj;
            }
            else {
                return this.convert(targetObj);
            }
        }
        return null;
    };
    /*转换字段名定义*/
    ShortNameDefined.prototype.convert = function (targetObj) {
        if (targetObj) {
            // if (typeof targetObj == "Array<Object>")
            // {
            // 	console.log("此转换仅支持对象转换");
            // 	return null;
            // }
            for (var key in targetObj) {
                var convertedKey = this.getConvertKey(key);
                if (convertedKey) {
                    targetObj[convertedKey] = targetObj[key];
                    delete targetObj[key];
                }
            }
            return targetObj;
        }
        return null;
    };
    ShortNameDefined.prototype.getConvertKey = function (key) {
        if (this.shortNameKv) {
            for (var shortKey in this.shortNameKv) {
                if (key == shortKey) {
                    return this.shortNameKv[key];
                }
            }
        }
        return "";
    };
    ShortNameDefined.shortConfig = "shortName";
    return ShortNameDefined;
}(BaseDefined));
__reflect(ShortNameDefined.prototype, "ShortNameDefined");
//# sourceMappingURL=ShortNameDefined.js.map