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
 * 比赛1分钟开始倒计时提醒面板
 */
var MinuteRemindPanel = (function (_super) {
    __extends(MinuteRemindPanel, _super);
    function MinuteRemindPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.MinuteRemindPanel;
        return _this;
    }
    MinuteRemindPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.setGrayMask(false);
        this.anmGroup.touchEnabled = false;
    };
    MinuteRemindPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.enterAnime();
        this.countDownNum = 60;
        Tick.AddSecondsInvoke(this.countDown, this);
    };
    MinuteRemindPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMacth, this);
    };
    MinuteRemindPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMacth, this);
        Tick.AddSecondsInvoke(this.countDown, this);
    };
    /**
     * 入场动画
    */
    MinuteRemindPanel.prototype.enterAnime = function () {
        egret.Tween.removeTweens(this.anmGroup);
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = -100;
        enter.to({ y: 0 }, 200);
    };
    /**
     * 退场动画
    */
    MinuteRemindPanel.prototype.outAnime = function () {
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 0;
        enter.to({ y: -100 }, 200).call(this.onCloseAnmComplete, this);
    };
    MinuteRemindPanel.prototype.onCloseAnmComplete = function () {
        clearTimeout(this.timer);
        UIManager.closePanel(UIModuleName.MinuteRemindPanel);
    };
    /**
     * 立即进入
    */
    MinuteRemindPanel.prototype.enterMacth = function () {
        UIManager.showFloatTips("立即进入" + this.panelData.id); //todo 测试代码
    };
    /**
     * 倒计时
    */
    MinuteRemindPanel.prototype.countDown = function () {
        this.countDownNum--;
        this.desLabel.text = "您报名的比赛将于" + ChampionshipManager.countDownFormat(this.countDownNum, false) + "秒后开始！";
        if (this.countDownNum <= 0) {
            this.desLabel.text = "比赛即将开始";
            Tick.RemoveSecondsInvoke(this.countDown, this);
            this.timer = egret.setTimeout(this.outAnime, this, 500);
        }
    };
    return MinuteRemindPanel;
}(BasePanel));
__reflect(MinuteRemindPanel.prototype, "MinuteRemindPanel");
//# sourceMappingURL=MinuteRemindPanel.js.map