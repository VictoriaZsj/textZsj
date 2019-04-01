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
 * 比赛20秒开始提醒面板
 */
var SecondRemindPanel = (function (_super) {
    __extends(SecondRemindPanel, _super);
    function SecondRemindPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.SecondRemindPanel;
        return _this;
    }
    SecondRemindPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isCloseButtonTween = false;
    };
    SecondRemindPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.countDownNum = 20;
        Tick.AddSecondsInvoke(this.countDown, this);
    };
    SecondRemindPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
    };
    SecondRemindPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
        Tick.RemoveSecondsInvoke(this.countDown, this);
    };
    /**
     * 立即进入
    */
    SecondRemindPanel.prototype.enterMatch = function () {
        UIManager.showFloatTips("立即进入" + this.panelData.id); //todo 测试代码
    };
    /**
     * 倒计时
    */
    SecondRemindPanel.prototype.countDown = function () {
        this.countDownNum--;
        this.desLabel.text = "您报名的比赛将于" + ChampionshipManager.countDownFormat(this.countDownNum, false) + "秒后开始，请立即进入比赛！";
        if (this.countDownNum <= 0) {
            this.desLabel.text = "比赛即将开始";
            Tick.RemoveSecondsInvoke(this.countDown, this);
        }
    };
    return SecondRemindPanel;
}(BasePanel));
__reflect(SecondRemindPanel.prototype, "SecondRemindPanel");
//# sourceMappingURL=SecondRemindPanel.js.map