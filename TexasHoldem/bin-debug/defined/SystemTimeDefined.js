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
 * 活动时间定义
*/
var SystemTimeDefined = (function (_super) {
    __extends(SystemTimeDefined, _super);
    function SystemTimeDefined() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = new Dictionary();
        return _this;
    }
    SystemTimeDefined.GetInstance = function () {
        if (!SystemTimeDefined._instance) {
            SystemTimeDefined._instance = new SystemTimeDefined();
        }
        if (DefinedManager.IsParsed(SystemTimeDefined.systemTimeConfig) == false) {
            SystemTimeDefined._instance.initialize();
        }
        return SystemTimeDefined._instance;
    };
    SystemTimeDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(SystemTimeDefined.systemTimeConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
        if (this.dataList && this.dataList.length > 0) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                var info = new SystemTimeDefinition();
                info.id = def.id;
                info.span = new Array();
                var spanList = def.span;
                for (var _b = 0, spanList_1 = spanList; _b < spanList_1.length; _b++) {
                    var sdef = spanList_1[_b];
                    var spanDef = new SystemTimeSpanDefinition();
                    spanDef.id = sdef.id;
                    spanDef.type = sdef.type;
                    spanDef.start = sdef.start;
                    if (sdef.end) {
                        spanDef.end = sdef.end;
                    }
                    else {
                        if (sdef.start[6]) {
                            spanDef.end = new Array(9999, 1, 1, 23, 59, 59, sdef.start[6]);
                        }
                        else {
                            spanDef.end = new Array(9999, 1, 1, 23, 59, 59);
                        }
                    }
                    info.span.push(spanDef);
                }
                this.list.add(info.id, info);
            }
        }
    };
    SystemTimeDefined.prototype.GetSystemTimeDefinition = function (id) {
        var keys = this.list.getKeys();
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (this.list.getValue(key).id == id) {
                return this.list.getValue(key);
            }
        }
        return null;
    };
    SystemTimeDefined.systemTimeConfig = "systemTime";
    return SystemTimeDefined;
}(BaseDefined));
__reflect(SystemTimeDefined.prototype, "SystemTimeDefined");
/**
 * 活动时间定义
*/
var SystemTimeDefinition = (function () {
    function SystemTimeDefinition() {
    }
    return SystemTimeDefinition;
}());
__reflect(SystemTimeDefinition.prototype, "SystemTimeDefinition", ["IBaseDefintion"]);
/**
 * 活动时间子元素的定义
 * */
var SystemTimeSpanDefinition = (function () {
    function SystemTimeSpanDefinition() {
    }
    return SystemTimeSpanDefinition;
}());
__reflect(SystemTimeSpanDefinition.prototype, "SystemTimeSpanDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=SystemTimeDefined.js.map