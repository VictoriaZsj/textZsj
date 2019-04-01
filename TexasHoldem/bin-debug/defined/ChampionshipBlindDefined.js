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
 * 锦标赛盲注定义
*/
var ChampionshipBlindDefined = (function (_super) {
    __extends(ChampionshipBlindDefined, _super);
    function ChampionshipBlindDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionshipBlindDefined.GetInstance = function () {
        if (!ChampionshipBlindDefined._instance) {
            ChampionshipBlindDefined._instance = new ChampionshipBlindDefined();
        }
        if (DefinedManager.IsParsed(ChampionshipBlindDefined.championshipBlindConfig) == false) {
            ChampionshipBlindDefined._instance.initialize();
        }
        return ChampionshipBlindDefined._instance;
    };
    ChampionshipBlindDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ChampionshipBlindDefined.championshipBlindConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    ChampionshipBlindDefined.championshipBlindConfig = "championshipBlind";
    return ChampionshipBlindDefined;
}(BaseDefined));
__reflect(ChampionshipBlindDefined.prototype, "ChampionshipBlindDefined");
/**
 * 锦标赛盲注定义
 * */
var ChampionshipBlindDefinition = (function () {
    function ChampionshipBlindDefinition() {
    }
    return ChampionshipBlindDefinition;
}());
__reflect(ChampionshipBlindDefinition.prototype, "ChampionshipBlindDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ChampionshipBlindDefined.js.map