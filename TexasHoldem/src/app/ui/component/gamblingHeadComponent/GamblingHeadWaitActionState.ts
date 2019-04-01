/**
 * 等待说话状态 后继状态------>站起|说话
 */
class GamblingHeadWaitActionState extends BaseGamblingHeadState
{
	public run()
	{
		super.run();
		this.context.maskImg.visible = false;
		this.context.showBase();
		this.context.showChipsComponent();
		if (this.context.bindData && this.context.bindData.roleId != UserManager.userInfo.roleId) //本家不显示有牌状态图片
		{
			this.context.showHaveCardImg(true);
		}
		if (this.context.bindData)
		{
			this.context.infoLabel.text = this.context.bindData.userInfo.name;
			this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
		GamblingManager.ActionPosChangeEvent.addListener(this.posChangeHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
		GamblingManager.ActionPosChangeEvent.removeListener(this.posChangeHandler, this);
	}
	/**
	 * 等待状态推送了结算信息 切换到比牌状态
 	 */
	private roundOverHandler()
	{
		this.context.chipsShowComponent.visible = false;
		if (this.context.bindData)
		{
			this.thanTheCard();
		}
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
}