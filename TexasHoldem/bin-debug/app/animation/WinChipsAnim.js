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
 * 赢取筹码动画
 */
var WinChipsAnim = (function (_super) {
    __extends(WinChipsAnim, _super);
    function WinChipsAnim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WinChipsAnim.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (!this._initMaxtrix) {
            this._initMaxtrix = this.target.matrix;
        }
        this.target.matrix = this._initMaxtrix;
        this.target.alpha = 1;
    };
    WinChipsAnim.prototype.run = function () {
        _super.prototype.run.call(this);
        var tween = egret.Tween.get(this.target);
        tween.to({ y: this._initMaxtrix.ty - 50 }, 300, egret.Ease.backOut).wait(3000).to({ alpha: 0 }, 300).call(this.runOver);
    };
    WinChipsAnim.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.visible = false;
    };
    return WinChipsAnim;
}(BaseAnimation));
__reflect(WinChipsAnim.prototype, "WinChipsAnim");
//# sourceMappingURL=WinChipsAnim.js.map