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
 * 牌局移动面板
 */
var GamblingGameGroupMove = (function (_super) {
    __extends(GamblingGameGroupMove, _super);
    function GamblingGameGroupMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingGameGroupMove.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    GamblingGameGroupMove.prototype.run = function (x) {
        _super.prototype.run.call(this, x);
        var tween = egret.Tween.get(this.target);
        tween.to({ x: x }, 300, egret.Ease.sineIn).call(this.runOver, this);
    };
    GamblingGameGroupMove.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
    };
    return GamblingGameGroupMove;
}(BaseAnimation));
__reflect(GamblingGameGroupMove.prototype, "GamblingGameGroupMove");
//# sourceMappingURL=GamblingGameGroupMove.js.map