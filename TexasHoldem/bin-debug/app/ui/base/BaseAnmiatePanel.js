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
 * 基础动画面板，有入场动画的
 */
var BaseAnmiatePanel = (function (_super) {
    __extends(BaseAnmiatePanel, _super);
    function BaseAnmiatePanel() {
        var _this = _super.call(this) || this;
        _this.maskAlpha = 1;
        return _this;
    }
    BaseAnmiatePanel.prototype.init = function (appendData) {
        if (appendData && appendData.prePaneName != null) {
            this.prePaneName = appendData.prePaneName;
        }
    };
    BaseAnmiatePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.isEnterOver = false;
        egret.Tween.removeTweens(this.anmGroup);
        egret.Tween.removeTweens(this.anmGroup1);
        egret.Tween.removeTweens(this.titleImg);
        if (this.grayMask) {
            egret.Tween.removeTweens(this.grayMask);
        }
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = -100;
        this.anmGroup.alpha = 1;
        enter.to({ y: 0, alpha: 1 }, 260, egret.Ease.circOut);
        enter = egret.Tween.get(this.anmGroup1);
        this.anmGroup1.y = 1280;
        this.anmGroup.alpha = 0;
        enter.to({ y: 100, alpha: 1 }, 260, egret.Ease.circOut);
        enter = egret.Tween.get(this.titleImg);
        this.titleImg.y = -100;
        enter.wait(300).to({ y: 10 }, 200).call(this.onEnterAnmComplete.bind(this));
        if (this.grayMask) {
            enter = egret.Tween.get(this.grayMask);
            this.grayMask.alpha = 0;
            enter.to({ alpha: 1 }, 260, egret.Ease.backOut);
        }
    };
    BaseAnmiatePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    BaseAnmiatePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.isEnterOver = false;
    };
    BaseAnmiatePanel.prototype.onEnterAnmComplete = function () {
        this.isEnterOver = true;
    };
    BaseAnmiatePanel.prototype.onCloseBtnClickHandler = function (event) {
        if (event) {
            SoundManager.playButtonEffect(event.target);
        }
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 0;
        this.anmGroup.alpha = 1;
        enter.to({ y: -100, alpha: 1 }, 500, egret.Ease.circOut);
        enter = egret.Tween.get(this.anmGroup1);
        this.anmGroup1.y = 100;
        this.anmGroup.alpha = 1;
        enter.to({ y: 1280, alpha: 0 }, 500, egret.Ease.circOut).call(this.onCloseAnmComplete.bind(this));
        if (this.grayMask) {
            enter = egret.Tween.get(this.grayMask);
            this.grayMask.alpha = 0.7;
            enter.to({ alpha: 0.1 }, 400, egret.Ease.backOut);
        }
        if (this.prePaneName) {
            UIManager.showPanel(this.prePaneName);
        }
    };
    BaseAnmiatePanel.prototype.onCloseAnmComplete = function () {
        UIManager.closePanel(this);
    };
    return BaseAnmiatePanel;
}(BasePanel));
__reflect(BaseAnmiatePanel.prototype, "BaseAnmiatePanel");
//# sourceMappingURL=BaseAnmiatePanel.js.map