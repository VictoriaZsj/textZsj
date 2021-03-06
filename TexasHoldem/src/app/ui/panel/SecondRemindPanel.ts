/**
 * 比赛20秒开始提醒面板
 */
class SecondRemindPanel extends BasePanel
{
	/**
	 * 描述信息
	*/
	public desLabel: eui.Label;
	/**
	 * 立即进入按钮
	*/
	public enterBtn: eui.Label;

	private countDownNum: number;

	public constructor()
	{
		super();
		this.skinName = UISkinName.SecondRemindPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.isCloseButtonTween = false;
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		this.countDownNum = 20;
		Tick.AddSecondsInvoke(this.countDown, this);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
		Tick.RemoveSecondsInvoke(this.countDown, this);
	}

	/**
	 * 立即进入
	*/
	private enterMatch()
	{
		UIManager.showFloatTips("立即进入" + this.panelData.id);  //todo 测试代码
	}
	/**
	 * 倒计时
	*/
	private countDown()
	{
		this.countDownNum--;
		this.desLabel.text = "您报名的比赛将于" + ChampionshipManager.countDownFormat(this.countDownNum, false) + "秒后开始，请立即进入比赛！";
		if (this.countDownNum <= 0)
		{
			this.desLabel.text = "比赛即将开始";
			Tick.RemoveSecondsInvoke(this.countDown, this);
		}
	}
}