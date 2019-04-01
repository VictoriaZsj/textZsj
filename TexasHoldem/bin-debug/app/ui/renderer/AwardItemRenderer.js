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
 * 锦标赛赛事信息奖励项
 */
var AwardItemRenderer = (function (_super) {
    __extends(AwardItemRenderer, _super);
    function AwardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AwardItemRenderer;
        return _this;
    }
    AwardItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    AwardItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.rankLabel.text = this.bindData.rank.toString();
            this.awardDesLabel.text = this.bindData.des;
        }
    };
    return AwardItemRenderer;
}(BaseItemRenderer));
__reflect(AwardItemRenderer.prototype, "AwardItemRenderer");
//# sourceMappingURL=AwardItemRenderer.js.map