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
 * 游戏按钮
 */
var GameButton = (function (_super) {
    __extends(GameButton, _super);
    function GameButton() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onEnable, _this);
        _this.btnProxy = _this;
        return _this;
    }
    GameButton.prototype.createChildren = function () {
        this._isTweenOver = true;
        this._initSx = this.scaleX;
        this._initSy = this.scaleY;
    };
    GameButton.prototype.onTouchBegin = function (event) {
        _super.prototype.onTouchBegin.call(this, event);
        this._isTweenOver = false;
        egret.Tween.removeTweens(this.btnProxy.btnImg);
        var tween = egret.Tween.get(this.btnProxy.btnImg, { onChange: this.update.bind(this) });
        tween.to({ scaleX: 1.05, scaleY: 1.05 }, 255).call(this.tweenComplete.bind(this));
        UIUtil.setGlowerFilter(this.btnProxy.btnImg);
    };
    GameButton.prototype.tweenComplete = function () {
        this._isTweenOver = true;
    };
    GameButton.prototype.onTouchCancle = function (event) {
        _super.prototype.onTouchCancle.call(this, event);
        this.buttonReleased();
    };
    GameButton.prototype.buttonReleased = function () {
        egret.Tween.removeTweens(this.btnProxy.btnImg);
        var tween = egret.Tween.get(this.btnProxy.btnImg, { onChange: this.update.bind(this) });
        tween.to({ scaleX: 1, scaleY: 1 }, 255);
        UIUtil.clearFilters(this.btnProxy.btnImg);
    };
    GameButton.prototype.update = function () {
        if (this._initW != undefined && this._initH != undefined) {
            var nowW = this.btnProxy.btnImg.scaleX * this._initW;
            var nowH = this.btnProxy.btnImg.scaleY * this._initH;
            var nowX = -(nowW - this._initW) / 2;
            var nowY = -(nowH - this._initH) / 2;
            this.btnProxy.btnImg.x = nowX;
            this.btnProxy.btnImg.y = nowY;
            // console.log(this._initW, nowW, nowX, nowY);
        }
    };
    GameButton.prototype.rendererStart = function (event) {
        this._initW = this.btnProxy.btnImg.width;
        this._initH = this.btnProxy.btnImg.height;
        this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
    };
    GameButton.prototype.onEnable = function (event) {
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
        this.addEventListener(egret.Event.RENDER, this.rendererStart, this);
        this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    GameButton.prototype.onDisable = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
        this.removeEventListener(egret.TouchEvent.RENDER, this.rendererStart, this);
        this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
        this.btnProxy.btnImg.x = this.btnProxy.btnImg.y = 0;
        // this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    return GameButton;
}(eui.Button));
__reflect(GameButton.prototype, "GameButton");
//# sourceMappingURL=GameButton.js.map