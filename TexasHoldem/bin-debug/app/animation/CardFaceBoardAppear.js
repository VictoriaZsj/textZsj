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
 * 公共牌出现
 */
var CardFaceBoardAppear = (function (_super) {
    __extends(CardFaceBoardAppear, _super);
    function CardFaceBoardAppear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardFaceBoardAppear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.alpha = 0.1;
        this.target.visible = true;
        this.target.initElementsShow();
        this.target.backFace.matrix = this.target.frontFaceImg.matrix = new egret.Matrix();
        if (!this._initAppearMatrix) {
            this.target.scaleX = this.target.scaleY = 0.1;
            this._initAppearMatrix = this.target.matrix.clone();
        }
        this.target.matrix = this._initAppearMatrix;
        if (this._initH == undefined) {
            this._initH = this.target.horizontalCenter;
            this._initV = this.target.verticalCenter;
        }
        this.target.horizontalCenter = this._initH;
        this.target.verticalCenter = this._initV;
    };
    CardFaceBoardAppear.prototype.run = function (point, delay) {
        if (delay === void 0) { delay = 0; }
        _super.prototype.run.call(this, point, delay);
        this._nextDelay = delay;
        this._moveToPoint = point;
        var moveTween = egret.Tween.get(this.target);
        moveTween.to({ horizontalCenter: point.x, verticalCenter: point.y, alpha: 1, scaleX: 1, scaleY: 1 }, 300).wait(10).call(this.runOver, this);
        moveTween.play();
    };
    CardFaceBoardAppear.prototype.runOver = function () {
        if (this.nextAnimation && this._nextDelay >= 0) {
            this._timeId = egret.setTimeout(this.runNext, this, this._nextDelay);
        }
        else {
            this.clear();
        }
    };
    CardFaceBoardAppear.prototype.runNext = function () {
        this.clear();
        if (this.nextAnimation) {
            this.nextAnimation.run();
        }
    };
    CardFaceBoardAppear.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._nextDelay = undefined;
        this._moveToPoint = null;
        clearTimeout(this._timeId);
    };
    return CardFaceBoardAppear;
}(BaseAnimation));
__reflect(CardFaceBoardAppear.prototype, "CardFaceBoardAppear");
//# sourceMappingURL=CardFaceBoardAppear.js.map