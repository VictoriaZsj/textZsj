/**
 * 比牌状态 后继状态---->等待下一局|站起
 */
class GamblingHeadThanTheCardState extends BaseGamblingHeadState
{
	private _point1: egret.Point;
	private _point2: egret.Point;
	public run()
	{
		super.run();

		this.context.maskImg.visible = false;
		this.context.cardFace1.visible = true;
		this.context.cardFace2.visible = true;
		this.context.showBase();

		this.context.showChipsComponent();
		if (this._point1)
		{
			this._point1 = new egret.Point(0, 0);
			this._point2 = new egret.Point(30, 0);
		}
		this.context.cardAnimationSpt.runThanTheCardAnim(this._point1, this._point2);
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