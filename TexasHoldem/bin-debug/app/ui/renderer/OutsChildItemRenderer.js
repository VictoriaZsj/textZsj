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
 * 锦标赛最近赛况折叠项面板
*/
var OutsChildItemRenderer = (function (_super) {
    __extends(OutsChildItemRenderer, _super);
    function OutsChildItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.OutsChildItemRenderer;
        return _this;
    }
    OutsChildItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    OutsChildItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.headImg.source = this.bindData.head;
            this.rankLabel.text = RankManager.getRankDes(this.bindData.rank, true);
            this.userNameLabel.text = this.bindData.name;
            this.awardLabel.text = this.bindData.award;
        }
    };
    return OutsChildItemRenderer;
}(BaseItemRenderer));
__reflect(OutsChildItemRenderer.prototype, "OutsChildItemRenderer");
//# sourceMappingURL=OutsChildItemRenderer.js.map