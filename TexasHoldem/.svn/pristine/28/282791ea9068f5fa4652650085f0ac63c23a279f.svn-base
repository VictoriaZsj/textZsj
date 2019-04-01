/**
 * 空状态 后继状态 --->坐下
 */
class GamblingHeadEmptyState extends BaseGamblingHeadState
{
	public run()
	{
		super.run();
		this.context.maskImg.visible = true;
		this.context.headIcon.init(null);
		this.context.bgImg.visible = true;
		this.context.chipsShowComponent.visible = false;
	}
	protected sitOrStandHandler(obj: any)
	{
		if (obj.state == BuyInGameState.Sit) //空状态只可能切换到坐下状态，没有站起状态
		{
			this.sitDown();
		}
	}
}