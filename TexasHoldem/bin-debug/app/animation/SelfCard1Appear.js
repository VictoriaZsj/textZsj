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
 * 本家手牌1动画
 */
var SelfCard1Appear = (function (_super) {
    __extends(SelfCard1Appear, _super);
    function SelfCard1Appear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfCard1Appear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.tsfMatrix = new egret.Matrix(0.0465, -0.0617, 0.0156, 0.075);
        this.target.matrix = this.tsfMatrix;
    };
    SelfCard1Appear.prototype.run = function (nextAnimation) {
        _super.prototype.run.call(this);
        this._nextAnimation = nextAnimation;
        var tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
        tween.to({ a: 0.938, b: -0.345, c: 0.345, d: 0.938 }, 300).call(this.runOver, this);
    };
    SelfCard1Appear.prototype.change = function () {
        this.target.matrix = this.tsfMatrix;
    };
    SelfCard1Appear.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        if (this._nextAnimation) {
            this._nextAnimation.run();
        }
    };
    return SelfCard1Appear;
}(BaseAnimation));
__reflect(SelfCard1Appear.prototype, "SelfCard1Appear");
//# sourceMappingURL=SelfCard1Appear.js.map