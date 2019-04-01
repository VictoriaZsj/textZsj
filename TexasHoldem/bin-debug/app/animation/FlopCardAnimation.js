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
 * 发牌/弃牌动画
 */
var FlopCardAnimation = (function (_super) {
    __extends(FlopCardAnimation, _super);
    function FlopCardAnimation() {
        var _this = _super.call(this) || this;
        _this._runTime = 300;
        _this._angleVec = new Vector2D(0, 0);
        return _this;
    }
    FlopCardAnimation.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (!this._initMatrix) {
            this._initMatrix = this.target.matrix;
            if (this.target) {
                this._initH = this.target.horizontalCenter;
                this._initV = this.target.verticalCenter;
            }
        }
        this.target.alpha = 1;
        this.target.matrix = this._initMatrix;
        if (this.target) {
            this.target.horizontalCenter = this._initH;
            this.target.verticalCenter = this._initV;
        }
    };
    FlopCardAnimation.prototype.run = function (point, callBack, thisObj, params) {
        _super.prototype.run.call(this, point);
        this._angleVec.x = point.x - this._initH;
        this._angleVec.y = point.y - this._initV;
        this._params = params;
        this._callBack = new Delegate(callBack, thisObj);
        var angle = this._angleVec.angle;
        angle = angle * MathUtil.Radian2Angle;
        var tween = egret.Tween.get(this.target);
        tween.to({ horizontalCenter: point.x, verticalCenter: point.y, scaleX: 1, scaleY: 1, alpha: 0.3, rotation: angle }, this._runTime).call(this.runOver, this);
        this._runStart = egret.getTimer();
        Tick.addFrameInvoke(this.runNext, this);
    };
    FlopCardAnimation.prototype.runNext = function () {
        if (egret.getTimer() - this._runStart > this._runTime - 100) {
            this._callBack.invoke(this._params);
        }
    };
    FlopCardAnimation.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._callBack = null;
    };
    return FlopCardAnimation;
}(BaseAnimation));
__reflect(FlopCardAnimation.prototype, "FlopCardAnimation");
//# sourceMappingURL=FlopCardAnimation.js.map