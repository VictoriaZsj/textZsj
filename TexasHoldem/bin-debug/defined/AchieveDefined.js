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
 * 成就的定义
 * */
var AchieveDefined = (function (_super) {
    __extends(AchieveDefined, _super);
    function AchieveDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AchieveDefined.GetInstance = function () {
        if (!AchieveDefined._instance) {
            AchieveDefined._instance = new AchieveDefined();
        }
        if (DefinedManager.IsParsed(AchieveDefined.achieveConfig) == false) {
            AchieveDefined._instance.initialize();
        }
        return AchieveDefined._instance;
    };
    AchieveDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(AchieveDefined.achieveConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    /**
     * 获取成就/任务定义
     */
    AchieveDefined.prototype.getAchieveDefintion = function (id) {
        for (var _i = 0, _a = AchieveDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.id == id) {
                return def;
            }
        }
        return null;
    };
    AchieveDefined.prototype.getAchieveDefintionByGroup = function (group) {
        for (var _i = 0, _a = AchieveDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.group == group) {
                return def;
            }
        }
        return null;
    };
    /**
     * 获取某一兑换ID前置ID列表是否空
     */
    AchieveDefined.prototype.getPrevIdIsNull = function (id) {
        var def = this.getAchieveDefintion(id);
        return def.preId == null;
    };
    /**
     * 获取所有任务组id
     */
    AchieveDefined.prototype.getAchieveGroup = function () {
        var result = new Array();
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (result.indexOf(def.group) == -1) {
                result.push(def.group);
            }
        }
        return result;
    };
    AchieveDefined.achieveConfig = "achieve";
    return AchieveDefined;
}(BaseDefined));
__reflect(AchieveDefined.prototype, "AchieveDefined");
/**
 * 成就/任务的定义
 * */
var AchieveDefintion = (function () {
    function AchieveDefintion() {
    }
    return AchieveDefintion;
}());
__reflect(AchieveDefintion.prototype, "AchieveDefintion", ["IBaseDefintion"]);
//# sourceMappingURL=AchieveDefined.js.map