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
 * 锦标赛赛事信息排名项
 */
var ChampionshipRankItemRenderer = (function (_super) {
    __extends(ChampionshipRankItemRenderer, _super);
    function ChampionshipRankItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.RankItemRenderer;
        return _this;
    }
    ChampionshipRankItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    ChampionshipRankItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.rankLabel.text = RankManager.getRankDes(this.bindData.rank, true);
        this.headImg.source = this.bindData.head;
        this.nameLabel.text = this.bindData.name;
        this.numLabel.text = this.bindData.num.toString();
    };
    return ChampionshipRankItemRenderer;
}(BaseItemRenderer));
__reflect(ChampionshipRankItemRenderer.prototype, "ChampionshipRankItemRenderer");
//# sourceMappingURL=ChampionshipRankItemRenderer.js.map