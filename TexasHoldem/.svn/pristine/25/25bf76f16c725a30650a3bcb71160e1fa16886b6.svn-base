/**
 * 正在说话状态 后继状态 -----> 已说话|弃牌|站起
 */
class GamblingHeadOnActionState extends BaseGamblingHeadState
{
	public run()
	{
		super.run();
		this.context.maskImg.visible = false;
		this.context.cdImg.visible = true;
		this.context.cdComponent.visible = true;

		if (GamblingManager.roomInfo)
		{
			if (GamblingManager.roomInfo.posTime > 0)
			{
				let offsetTime: number = TimeManager.GetServerUtcTimestamp() - GamblingManager.roomInfo.posTime;
				Tick.AddTimeoutInvoke(this.actionTimeOut, offsetTime, this);
			}
			else
			{
				Tick.AddTimeoutInvoke(this.actionTimeOut, GamblingManager.roomInfo.definition.cd, this);
			}
			this.context.cdComponent.start(GamblingManager.roomInfo.posTime);
		}
		this.context.showBase();
		this.context.showChipsComponent();
		if (this.context.bindData && this.context.bindData.roleId != UserManager.userInfo.roleId)
		{
			this.context.showHaveCardImg(true);
		}
		if (this.context.bindData)
		{
			this.context.infoLabel.text = PlayerInfo.getStateDes(this.context.bindData.state);
			this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.PlayerStateChangeEvent.addListener(this.playerStateChangeHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.PlayerStateChangeEvent.removeListener(this.playerStateChangeHandler, this);
		Tick.RemoveTimeoutInvoke(this.actionTimeOut, this);
	}
	/**
	 * 玩家状态变更
	 */
	private playerStateChangeHandler(obj: any)
	{
		if (this.context.bindData && obj.roleId == this.context.bindData.roleId)
		{
			switch (this.context.bindData.state)
			{
				case PlayerState.Check:
				case PlayerState.Raise:
				case PlayerState.AllIn:
				case PlayerState.Call:
					this.context.showChipsComponent(obj.num);
					this.actioned();
					break;
				case PlayerState.Fold:
					this.fold();
					break;
			}
		}
	}
	private actionTimeOut()
	{
		GamblingManager.reqTimeOut();
	}
}