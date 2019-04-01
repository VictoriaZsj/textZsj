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
 * 游戏场面板房间列表项渲染
 */
var PlayingFieldItemRenderer = (function (_super) {
    __extends(PlayingFieldItemRenderer, _super);
    function PlayingFieldItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.PlayingFieldItemRenderer;
        return _this;
    }
    PlayingFieldItemRenderer.prototype.createChildren = function () {
        this.toggleBtn0.touchEnabled = this.toggleBtn1.touchEnabled = this.toggleBtn2.touchEnabled = this.toggleBtn3.touchEnabled = this.toggleBtn4.touchEnabled = this.toggleBtn5.touchEnabled = this.toggleBtn6.touchEnabled = this.toggleBtn7.touchEnabled = this.toggleBtn8.touchEnabled = false;
        for (var i = 0; i < 9; i++) {
            this["toggleBtn" + i].visible = false;
        }
        this.dataChanged();
    };
    PlayingFieldItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            if (this.bindData.id.toString().length < 5) {
                this.roomIdLabel.text = (Array(5).join('0') + this.bindData.id).slice(-5);
            }
            else {
                this.roomIdLabel.text = this.bindData.id.toString();
            }
            this.blindLabel.text = MathUtil.formatNum(this.bindData.smallBlind) + "/" + MathUtil.formatNum(this.bindData.bigBlind);
            this.buyLabel.text = MathUtil.formatNum(this.bindData.minBuy) + "/" + MathUtil.formatNum(this.bindData.maxBuy);
            if (this.bindData.pattern == Pattern.AllIn) {
                this.patternImage.source = "zhouhuiyuan_png";
            }
            else if (this.bindData.pattern == Pattern.Fast) {
                this.patternImage.source = "yuehuiyuan_png";
            }
            else if (this.bindData.pattern == Pattern.Ante) {
                this.patternImage.source = ImageSource.TestImg;
            }
            else if (this.bindData.pattern == Pattern.NoUpperLimit) {
                this.patternImage.source = ImageSource.TestImg;
            }
            for (var i = 0; i < this.bindData.maxPlayer; i++) {
                this["toggleBtn" + i].visible = true;
            }
            for (var j = 0; j < this.bindData.player; j++) {
                this["toggleBtn" + j].selected = true;
            }
        }
    };
    return PlayingFieldItemRenderer;
}(BaseItemRenderer));
__reflect(PlayingFieldItemRenderer.prototype, "PlayingFieldItemRenderer");
//# sourceMappingURL=PlayingFieldItemRenderer.js.map