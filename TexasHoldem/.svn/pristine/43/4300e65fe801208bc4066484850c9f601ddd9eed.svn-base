/**
 * 已经说过话的状态不包括弃牌 后继状态 ----> 等待说话|弃牌|比牌|站起
 */
class GamblingHeadActionedState extends BaseGamblingHeadState
{
	public run()
	{
		super.run();
		this.context.showBase();
		this.context.maskImg.visible = false;
		this.context.showChipsComponent();
		if (this.context.bindData)
		{
			this.context.infoLabel.text = PlayerInfo.getStateDes(this.context.bindData.state);
			this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
		GamblingManager.OneLoopOverEvent.addListener(this.boardCardChangeHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
		GamblingManager.OneLoopOverEvent.removeListener(this.boardCardChangeHandler, this);
	}
	/**
     * 切换到比牌
     */
	private roundOverHandler()
	{
		if (this.context.bindData)
		{
			this.thanTheCard();
		}
	}
	/**
	 * 公共牌推送
	 */
	private boardCardChangeHandler()
	{
		if (GamblingManager.roomInfo && GamblingManager.roomInfo.cardList)
		{
			let len: number = GamblingManager.roomInfo.cardList.length;
			if (len < GamblingManager.MaxBoardNum)
			{
				this.context.chipsShowComponent.visible = false;
				this.waitAction();
			}
		}
	}
}