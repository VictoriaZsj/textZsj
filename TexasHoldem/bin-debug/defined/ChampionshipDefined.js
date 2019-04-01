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
 * 锦标赛定义
*/
var ChampionshipDefined = (function (_super) {
    __extends(ChampionshipDefined, _super);
    function ChampionshipDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionshipDefined.GetInstance = function () {
        if (!ChampionshipDefined._instance) {
            ChampionshipDefined._instance = new ChampionshipDefined();
        }
        if (DefinedManager.IsParsed(ChampionshipDefined.championshipConfig) == false) {
            ChampionshipDefined._instance.initialize();
        }
        return ChampionshipDefined._instance;
    };
    ChampionshipDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ChampionshipDefined.championshipConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    ChampionshipDefined.championshipConfig = "championship";
    return ChampionshipDefined;
}(BaseDefined));
__reflect(ChampionshipDefined.prototype, "ChampionshipDefined");
/**
 * 锦标赛定义
 * */
var ChampionshipDefinition = (function () {
    function ChampionshipDefinition() {
    }
    return ChampionshipDefinition;
}());
__reflect(ChampionshipDefinition.prototype, "ChampionshipDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ChampionshipDefined.js.map