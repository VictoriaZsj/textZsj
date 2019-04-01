/**
 * 按钮位逻辑支持
 */
class GamblingPanelButtonPosSupport extends BaseGamblingPanelSupport
{
	private moveAnim: CommonMoveToPointByNowPos;
	public initialize()
	{
		super.initialize();
		if (!this.moveAnim)
		{
			this.moveAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.CommonMoveToPointByNowPos);
			this.moveAnim.setTarget(this.target.buttonPosFlagImg);
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.NextRoundStartEvent.addListener(this.onNextRoundStart, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.NextRoundStartEvent.removeListener(this.onNextRoundStart, this);
	}
	/**
	 * 是否需要延迟todo
	 */
	private onNextRoundStart()
	{
		let pitInfo: GamblingPitInfo = this.target.getPitInfo(GamblingManager.roomInfo.buttonPos);
		if (pitInfo)
		{
			let p: egret.Point = GamblingPanelSetting.buttonPosList[pitInfo.index];
			this.moveAnim.run(p.x, p.y);
		}
	}
}