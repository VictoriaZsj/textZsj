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
 * 锦标赛赛事信息盲注项
 */
var BlindItemRenderer = (function (_super) {
    __extends(BlindItemRenderer, _super);
    function BlindItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.BlindItemRenderer;
        return _this;
    }
    BlindItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    BlindItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.rebuyImg.visible = this.addonImg.visible = false;
            this.rankLabel.text = this.bindData.id.toString();
            this.blindLabel.text = this.bindData.sBlind + "/" + this.bindData.bBlind;
            if (ChampionshipManager.nowBlindRank && this.bindData.id == ChampionshipManager.nowBlindRank) {
                this.rankLabel.textColor = ColorUtil.Golden;
                this.blindLabel.textColor = ColorUtil.Golden;
                this.anteLabel.textColor = ColorUtil.Golden;
                this.timeLabel.textColor = ColorUtil.Golden;
                ChampionshipManager.nowBlindItem = this;
            }
            else {
                this.rankLabel.textColor = ColorUtil.White;
                this.blindLabel.textColor = ColorUtil.White;
                this.anteLabel.textColor = ColorUtil.White;
                this.timeLabel.textColor = ColorUtil.White;
            }
            if (!this.bindData.preBet) {
                this.anteLabel.text = "0";
            }
            else {
                this.anteLabel.text = this.bindData.preBet.toString();
            }
            this.timeLabel.text = this.bindData.upTime + "秒";
            if (this.bindData.addon) {
                this.addonImg.visible = true;
            }
            if (this.bindData.rebuy) {
                this.rebuyImg.visible = true;
            }
        }
    };
    return BlindItemRenderer;
}(BaseItemRenderer));
__reflect(BlindItemRenderer.prototype, "BlindItemRenderer");
//# sourceMappingURL=BlindItemRenderer.js.map