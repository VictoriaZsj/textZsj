/**
 * 弃牌状态 后继状态----->亮牌|等待下一局|站起
 */
class GamblingHeadFoldState extends BaseGamblingHeadState
{
	public run()
	{
		super.run();
		this.context.maskImg.visible = true;
		this.context.showBase();
		this.context.showChipsComponent();
		if (this.context.bindData)
		{
			this.context.infoLabel.text = PlayerInfo.getStateDes(this.context.bindData.state);
			this.context.foldCardAnim.run(GamblingPanelSetting.DILAPoint, null, null, null);
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
	 * 弃牌状态推送了结算信息 看看是否亮牌
 	 */
	private roundOverHandler()
	{
		this.context.chipsShowComponent.visible = false;
		if (this.context.bindData && GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.roleHandCardList) //看看是否切换到亮牌状态
		{
			let len: number = GamblingManager.roundOverInfo.roleHandCardList.length;
			for (let i: number = 0; i < len; i++)
			{
				if (this.context.bindData.roleId == GamblingManager.roundOverInfo.roleHandCardList[i].roleId)
				{
					this.switchToBrightCard(); //弃牌状态，收到了手牌信息
					return;
				}
			}
		}
		if (this.context.bindData)
		{
			this.waitNext();
		}
	}
	private switchToBrightCard()
	{
		this.context.maskImg.visible = false;
		this.context.infoLabel.text = PlayerInfo.getStateDes(PlayerState.BrightCard);
		this.context.showBase();
		this.context.chipsShowComponent.visible = false;
		if (this.context.bindData && this.context.bindData.cardList && this.context.bindData.cardList.length >= 2)
		{
			this.context.cardFace1.init(this.context.bindData.cardList[0]);
			this.context.cardFace2.init(this.context.bindData.cardList[1]);
			this.context.cardAnimationSpt.runBrightCard(this.waitNext, this);
		}
	}
	/**
 	* 公共牌推送 下一轮开始
 	*/
	private boardCardChangeHandler()
	{
		this.context.chipsShowComponent.visible = false;
	}
}