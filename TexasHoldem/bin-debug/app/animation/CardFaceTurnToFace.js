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
 * 翻牌
 */
var CardFaceTurnToFace = (function (_super) {
    __extends(CardFaceTurnToFace, _super);
    function CardFaceTurnToFace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardFaceTurnToFace.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.visible = true;
        var tmpMatrix = this.target.initMatrix.clone();
        tmpMatrix.tx = this.target.matrix.tx;
        tmpMatrix.ty = this.target.matrix.ty;
        this.target.matrix = tmpMatrix;
        this._backFaceMatrix = new egret.Matrix(1, 0, 0, 1);
        this._frontFaceMatrix = new egret.Matrix(0.122, 0.047);
        this.target.initElementsShow();
        this.target.backFace.matrix = this.target.frontFaceImg.matrix = new egret.Matrix();
    };
    CardFaceTurnToFace.prototype.run = function () {
        _super.prototype.run.call(this);
        var backFaceTween = egret.Tween.get(this._backFaceMatrix, { onChange: this.onBackFaceChange.bind(this) });
        backFaceTween.to({ a: 0.0243, b: -0.023 }, 100).wait(10).call(this.onBackFaceChangeOver, this);
        backFaceTween.play();
    };
    CardFaceTurnToFace.prototype.onBackFaceChange = function () {
        this.target.backFace.matrix = this._backFaceMatrix;
    };
    CardFaceTurnToFace.prototype.onBackFaceChangeOver = function () {
        this.target.backFace.visible = false;
        this.target.frontFaceImg.matrix = this._frontFaceMatrix;
        this.target.frontFaceImg.visible = true;
        var frontFaceTween = egret.Tween.get(this._frontFaceMatrix, { onChange: this.onFrontFaceChange.bind(this) });
        frontFaceTween.to({ a: 0.731, b: 0.285 }, 100).wait(10).call(this.runOver, this);
        frontFaceTween.play();
    };
    CardFaceTurnToFace.prototype.onFrontFaceChange = function () {
        this.target.frontFaceImg.matrix = this._frontFaceMatrix;
    };
    CardFaceTurnToFace.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.frontFaceImg.visible = false;
        this.target.cardGroup.visible = true;
        if (this.callback) {
            this.callback.invoke();
        }
    };
    CardFaceTurnToFace.prototype.clear = function () {
        if (this._frontFaceMatrix) {
            egret.Tween.removeTweens(this._frontFaceMatrix);
        }
        if (this._backFaceMatrix) {
            egret.Tween.removeTweens(this._backFaceMatrix);
        }
    };
    return CardFaceTurnToFace;
}(BaseAnimation));
__reflect(CardFaceTurnToFace.prototype, "CardFaceTurnToFace");
//# sourceMappingURL=CardFaceTurnToFace.js.map