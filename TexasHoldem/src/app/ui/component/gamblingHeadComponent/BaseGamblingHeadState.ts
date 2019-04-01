/**
 * 头像组件状态执行接口 大部分的状态都可以直接切换到站起状态
 */
abstract class BaseGamblingHeadState
{
	public context: GamblingHeadComponent;
	public constructor(context: GamblingHeadComponent)
	{
		this.context = context;
	}
	public run()
	{
		this.context.hideAll();
		this.onEnable();
	}
	public onEnable()
	{
		GamblingManager.SitOrStandEvent.addListener(this.sitOrStandHandler, this);
	}
	public onDisable()
	{
		GamblingManager.SitOrStandEvent.removeListener(this.sitOrStandHandler, this);
	}
	protected sitOrStandHandler(obj: any) 
	{
		if (this.context.bindData && (obj.pInfo as PlayerInfo).roleId == this.context.bindData.roleId && obj.state == BuyInGameState.Stand) //坐下状态只能站起状态 切换到空状态
		{
			this.empty();
		}
	}
	/**
	 * 空状态
	 */
	public empty()
	{
		this.context.changeState(this.context.emptyState);
	}
	/**
	 * 刚坐下状态
	 */
	public sitDown()
	{
		this.context.changeState(this.context.sitDownState);
	}
	/**
	 * 等待说话状态
	 */
	public waitAction()
	{
		this.context.changeState(this.context.waitActionState);
	}
	/**
	 * 在说话状态
	 */
	public onAction()
	{
		this.context.changeState(this.context.onActionState);
	}
	/**
	 * 已说话状态
	 */
	public actioned()
	{
		this.context.changeState(this.context.actionedState);
	}
	/**
	 * 弃牌状态 
	 */
	public fold()
	{
		this.context.changeState(this.context.foldState);
	}
	/**
	 * 比牌
	 */
	public thanTheCard()
	{
		this.context.changeState(this.context.thanTheCard);
	}
	/**
	 * 等待下一局
	 */
	public waitNext()
	{
		this.context.changeState(this.context.waitNextActionState);
	}
	/**
	 * 一局开始
	 */
	public roundStart()
	{
		this.context.changeState(this.context.roundStartState);
	}
}