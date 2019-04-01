/**
 * 等待下一局 后继状态 -------> 一局开始状态|站起
 */
class GamblingHeadWiatNextState extends BaseGamblingHeadState
{
	private _lastRoundNum: number = 0;
	public run()
	{
		super.run();
		this.context.infoLabel.visible = true;
		this.context.headIcon.visible = true;
		this.context.chipsLabel.visible = true;
		this.context.maskImg.visible = true;
		this.context.chipsShowComponent.visible = false;
		if (this.context.bindData)
		{
			this.context.infoLabel.text = this.context.bindData.userInfo.name;
			this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
			this.context.headIcon.init(this.context.bindData);
		}
		if (this._lastRoundNum != GamblingManager.roomInfo.roundNum)
		{
			this._lastRoundNum = GamblingManager.roomInfo.roundNum;
			this.nextRoundStartHandler();
		}
		if (GamblingManager.roomInfo.roundNum)
		{
			this._lastRoundNum = GamblingManager.roomInfo.roundNum;
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
	}
	/**
 	 * 下一局开始
 	 */
	private nextRoundStartHandler()
	{
		if (this.context.bindData)
		{
			this.roundStart();
		}
	}
}