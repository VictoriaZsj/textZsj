/**
 * 一局开始状态 后继状态-------->发牌|站起
 */
class GamblingHeadRoundStartState extends BaseGamblingHeadState
{
	public run()
	{
		super.run();
		this.context.infoLabel.visible = true;
		this.context.headIcon.visible = true;
		this.context.chipsLabel.visible = true;
		this.context.maskImg.visible = false;
		this.context.chipsShowComponent.visible = false;
		if (this.context.bindData)
		{
			this.context.infoLabel.text = this.context.bindData.userInfo.name;
			this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
			this.context.headIcon.init(this.context.bindData);
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.ActionPosChangeEvent.addListener(this.posChangeHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.ActionPosChangeEvent.removeListener(this.posChangeHandler, this);
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
		else
		{
			this.waitAction();
		}
	}
}