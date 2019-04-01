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
 * 兑换奖品的定义
 * */
var AwardDefined = (function (_super) {
    __extends(AwardDefined, _super);
    function AwardDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AwardDefined.GetInstance = function () {
        if (!AwardDefined._instance) {
            AwardDefined._instance = new AwardDefined();
        }
        if (DefinedManager.IsParsed(AwardDefined.awardConfig) == false) {
            AwardDefined._instance.initialize();
        }
        return AwardDefined._instance;
    };
    AwardDefined.prototype.initialize = function () {
        this.awardDefinitionDic = new Dictionary();
        var obj = DefinedManager.GetData(AwardDefined.awardConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            this.setAwardInfoDefinitionList(def);
            this.awardDefinitionDic.add(def.id, def);
        }
    };
    AwardDefined.prototype.setAwardInfoDefinitionList = function (awardDef) {
        if (awardDef.costType) {
            awardDef.costList = new Array();
            for (var i = 0; i < awardDef.costType.length; i++) {
                var cost = new AwardInfoDefinition();
                cost.type = awardDef.costType[i];
                if (awardDef.costId) {
                    cost.id = awardDef.costId[i];
                }
                if (awardDef.costNum) {
                    cost.count = awardDef.costNum[i];
                }
                awardDef.costList.push(cost);
            }
        }
        if (awardDef.rewardType) {
            awardDef.rewardList = new Array();
            for (var i = 0; i < awardDef.rewardType.length; i++) {
                var reward = new AwardInfoDefinition();
                reward.type = awardDef.rewardType[i];
                if (awardDef.rewardId) {
                    reward.id = awardDef.rewardId[i];
                }
                if (awardDef.rewardNum) {
                    reward.count = awardDef.rewardNum[i];
                }
                awardDef.rewardList.push(reward);
            }
        }
    };
    /**
     * 获取道具定义
     */
    AwardDefined.prototype.getAwardDefinition = function (id) {
        for (var _i = 0, _a = AwardDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.id == id) {
                return def;
            }
        }
        return null;
    };
    /**
     * 获取某一兑换ID前置ID列表是否空
     */
    AwardDefined.prototype.getPrevIdIsNull = function (id) {
        var def = this.getAwardDefinition(id);
        return def.preId == null;
    };
    AwardDefined.awardConfig = "award";
    return AwardDefined;
}(BaseDefined));
__reflect(AwardDefined.prototype, "AwardDefined");
/**
 * 奖品的定义
 * */
var AwardDefinition = (function () {
    function AwardDefinition() {
    }
    return AwardDefinition;
}());
__reflect(AwardDefinition.prototype, "AwardDefinition", ["IBaseDefintion"]);
/**
 *  配表中奖励的结构体封装
 */
var AwardInfoDefinition = (function () {
    function AwardInfoDefinition() {
    }
    Object.defineProperty(AwardInfoDefinition.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = AwardDefined.GetInstance().getAwardDefinition(this._id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwardInfoDefinition.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    return AwardInfoDefinition;
}());
__reflect(AwardInfoDefinition.prototype, "AwardInfoDefinition");
//# sourceMappingURL=AwardDefined.js.map