/**
 * 比赛1分钟开始倒计时提醒面板
 */
class MinuteRemindPanel extends BasePanel
{
    public anmGroup: eui.Group;
	/**
	 * 按钮
	*/
    public enterBtn: eui.Button;
    /**
     * 描述信息
    */
    public desLabel: eui.Label;

    private countDownNum: number;
    private timer;

    public constructor()
    {
        super();
        this.skinName = UISkinName.MinuteRemindPanel;
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.setGrayMask(false);
        this.anmGroup.touchEnabled = false;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.enterAnime();
        this.countDownNum = 60;
        Tick.AddSecondsInvoke(this.countDown, this);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMacth, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMacth, this);
        Tick.AddSecondsInvoke(this.countDown, this);
    }

    /**
     * 入场动画
    */
    private enterAnime()
    {
        egret.Tween.removeTweens(this.anmGroup);
        let enter: egret.Tween = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = -100;
        enter.to({ y: 0 }, 200);
    }
    /**
     * 退场动画
    */
    private outAnime()
    {
        let enter: egret.Tween = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 0;
        enter.to({ y: -100 }, 200).call(this.onCloseAnmComplete, this);
    }
    private onCloseAnmComplete()
    {
        clearTimeout(this.timer);
        UIManager.closePanel(UIModuleName.MinuteRemindPanel);
    }
    /**
     * 立即进入
    */
    private enterMacth()
    {
        UIManager.showFloatTips("立即进入" + this.panelData.id);  //todo 测试代码
    }
    /**
	 * 倒计时
	*/
    private countDown()
    {
        this.countDownNum--;
        this.desLabel.text = "您报名的比赛将于" + ChampionshipManager.countDownFormat(this.countDownNum, false) + "秒后开始！";
        if (this.countDownNum <= 0)
        {
            this.desLabel.text = "比赛即将开始";
            Tick.RemoveSecondsInvoke(this.countDown, this);
            this.timer = egret.setTimeout(this.outAnime, this, 500);
        }
    }
}