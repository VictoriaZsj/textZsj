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
 * 本家手牌2动画
 */
var SelfCard2Appear = (function (_super) {
    __extends(SelfCard2Appear, _super);
    function SelfCard2Appear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfCard2Appear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177);
        this.target.matrix = this.tsfMatrix;
    };
    SelfCard2Appear.prototype.run = function () {
        _super.prototype.run.call(this);
        var tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
        tween.to({ a: 0.966, b: 0.26, c: -0.26, d: 0.966 }, 300).call(this.runOver, this);
    };
    SelfCard2Appear.prototype.change = function () {
        this.target.matrix = this.tsfMatrix;
    };
    return SelfCard2Appear;
}(BaseAnimation));
__reflect(SelfCard2Appear.prototype, "SelfCard2Appear");
//# sourceMappingURL=SelfCard2Appear.js.map