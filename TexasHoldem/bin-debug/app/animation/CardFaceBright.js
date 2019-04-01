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
 * 亮牌
 */
var CardFaceBright = (function (_super) {
    __extends(CardFaceBright, _super);
    function CardFaceBright() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardFaceBright.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.initElementsShow2();
        this.target.scaleX = 2;
        this.target.scaleY = 2;
        this.target.rotation = 0;
        this.target.alpha = 0.3;
        this.target.y = this.target.initMatrix.ty;
        this.target.cardGroup.rotation = 0;
    };
    CardFaceBright.prototype.run = function (rotation, initOffsetX, x, y, callBack, thisObj) {
        _super.prototype.run.call(this, rotation, y);
        this.target.x = this.target.initMatrix.tx - initOffsetX;
        var tween = egret.Tween.get(this.target);
        this._callBack = new Delegate(callBack, thisObj);
        tween.to({ x: this.target.initMatrix.tx + x, y: this.target.initMatrix.ty + y, scaleX: 1, scaleY: 1, alpha: 1 }, 300);
        tween.play();
        var preR;
        if (rotation > 0) {
            preR = 3;
        }
        else {
            preR = -2;
        }
        var cardTween = egret.Tween.get(this.target.cardGroup);
        cardTween.to({ rotation: preR }, 300).wait(10).to({ rotation: rotation }, 100).call(this.runOver, this);
        cardTween.play();
    };
    CardFaceBright.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        if (this._callBack) {
            this._callBack.invoke();
        }
    };
    CardFaceBright.prototype.clear = function () {
        _super.prototype.clear.call(this);
        if (this.target.cardGroup) {
            egret.Tween.removeTweens(this.target.cardGroup);
        }
    };
    return CardFaceBright;
}(BaseAnimation));
__reflect(CardFaceBright.prototype, "CardFaceBright");
//# sourceMappingURL=CardFaceBright.js.map