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
 * 文本tips面板
 */
var TextTipsPanel = (function (_super) {
    __extends(TextTipsPanel, _super);
    function TextTipsPanel() {
        var _this = _super.call(this) || this;
        _this.layer = UILayerType.Tips;
        _this.setTouchChildren(false);
        _this.setTouchEnable(false);
        _this.setGrayMask(false);
        _this.skinName = UISkinName.TextTipsPanel;
        return _this;
    }
    TextTipsPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        // this.tweenGroup.addChildAt(this.grayMask, 0);
    };
    TextTipsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (this.panelData) {
            this.label.text = this.panelData;
            this.removeTweenEvents();
            this.createTween();
        }
    };
    TextTipsPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        // this.grayMask.width = this.label.textWidth + 20;
        // this.grayMask.height = this.label.textHeight + 20;
    };
    TextTipsPanel.prototype.createTween = function () {
        this.alpha = 1;
        this._disappearTween = new egret.Tween(this, null, null);
        this._disappearTween.wait(800).to({ alpha: 0 }, 500, egret.Ease.quadOut).call(this.onPlayOver, this);
        this._disappearTween.play();
    };
    TextTipsPanel.prototype.onPlayOver = function (thisObject) {
        this.onCloseBtnClickHandler(null);
        this._disappearTween = null;
    };
    TextTipsPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeTweenEvents();
    };
    TextTipsPanel.prototype.removeTweenEvents = function () {
        if (this._disappearTween) {
            egret.Tween.removeTweens(this);
            this._disappearTween = null;
        }
    };
    return TextTipsPanel;
}(BasePanel));
__reflect(TextTipsPanel.prototype, "TextTipsPanel");
//# sourceMappingURL=TextTipsPanel.js.map