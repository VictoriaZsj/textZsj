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
 * 锦标赛赛事奖品的定义
 * */
var ChampionshipPrizeDefined = (function (_super) {
    __extends(ChampionshipPrizeDefined, _super);
    function ChampionshipPrizeDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionshipPrizeDefined.GetInstance = function () {
        if (!ChampionshipPrizeDefined._instance) {
            ChampionshipPrizeDefined._instance = new ChampionshipPrizeDefined();
        }
        if (DefinedManager.IsParsed(ChampionshipPrizeDefined.championshipPrizeConfig) == false) {
            ChampionshipPrizeDefined._instance.initialize();
        }
        return ChampionshipPrizeDefined._instance;
    };
    ChampionshipPrizeDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ChampionshipPrizeDefined.championshipPrizeConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    /**
     * 根据type类型获得championshipPrize的集合数组
    */
    ChampionshipPrizeDefined.prototype.getChampionshipPrizeList = function (type) {
        if (this.dataList != null) {
            var ChampionshipPrizeList = new Array();
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.type == type) {
                    if (def.start != def.end) {
                        for (var i = def.start; i <= def.end - def.start; i++) {
                            var info = new ChampionshipPrizeDefinition();
                            info.id = def.id;
                            info.start = i;
                            info.end = i;
                            info.type = def.type;
                            info.awardId = def.awardId;
                            ChampionshipPrizeList.push(def);
                        }
                    }
                    else {
                        ChampionshipPrizeList.push(def);
                    }
                }
            }
            return ChampionshipPrizeList;
        }
    };
    ChampionshipPrizeDefined.championshipPrizeConfig = "championshipPrize";
    return ChampionshipPrizeDefined;
}(BaseDefined));
__reflect(ChampionshipPrizeDefined.prototype, "ChampionshipPrizeDefined");
/**
 * 奖品的定义
 * */
var ChampionshipPrizeDefinition = (function () {
    function ChampionshipPrizeDefinition() {
    }
    return ChampionshipPrizeDefinition;
}());
__reflect(ChampionshipPrizeDefinition.prototype, "ChampionshipPrizeDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ChampionshipPrizeDefined.js.map