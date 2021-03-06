/**
 * 坐下状态  后继状态------->发牌|等待下一局|等待操作|说话|站起
 */
class GamblingHeadSitDownState extends BaseGamblingHeadState
{
	public run()
	{
		super.run();
		this.context.maskImg.visible = true;
		this.context.sitDown.visible = true; //坐下动画
		this.context.showBase();
		this.context.chipsShowComponent.visible = false;
		if (this.context.bindData)
		{
			this.context.infoLabel.text = this.context.bindData.userInfo.name;
			this.context.headIcon.init(this.context.bindData);
			this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.ActionPosChangeEvent.addListener(this.posChangeHandler, this);
		GamblingManager.PlayerListStateChangeEvent.addListener(this.playerListStateChangeHandler, this);
		GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.ActionPosChangeEvent.removeListener(this.posChangeHandler, this);
		GamblingManager.PlayerListStateChangeEvent.removeListener(this.playerListStateChangeHandler, this);
		GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
	}
	/**
	 * 说话位置变更
	 */
	private posChangeHandler()
	{
		if (this.context.bindData && GamblingManager.roomInfo && this.context.bindData.pos == GamblingManager.roomInfo.pos)
		{
			this.onAction();
		}
	}
	/**
	 * 玩家列表状态推送
	 */
	private playerListStateChangeHandler()
	{
		if (this.context.bindData)
		{
			if (this.context.bindData.state == PlayerState.WaitAction)
			{
				this.waitAction(); //发牌之后等待操作
			}
			else if (this.context.bindData.state == PlayerState.WaitNext)
			{
				this.waitNext(); //等待下一局
			}
		}
	}
	/**
	 * 发牌
	 */
	private nextRoundStartHandler()
	{
		if (this.context.bindData && this.context.bindData.state != PlayerState.WaitNext)
		{
			this.roundStart();
		}
	}
}