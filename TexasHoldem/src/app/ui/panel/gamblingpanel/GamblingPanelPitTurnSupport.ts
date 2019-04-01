/**
 * 坐下位置转动
 */
class GamblingPanelPitTurnSupport extends BaseGamblingPanelSupport
{
	private _nowRunIndex: number;
	/**
	 * 是否是顺时针
	 */
	private _isClockwise: boolean;

	private _offset: number;

	public initialize()
	{
		super.initialize();
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.BuyInGameEvent.addListener(this.onBuyInGame, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.BuyInGameEvent.removeListener(this.onBuyInGame, this);
	}
	public onBuyInGame(pos: number)
	{
		let pitInfo: GamblingPitInfo = this.target.getPitInfo(pos);
		this._offset = GamblingManager.maxSeats + (GamblingPanelSetting.MinPitIndex - pitInfo.index);
		this._isClockwise = pitInfo.index > GamblingPanelSetting.centerNum;
		this._nowRunIndex = 0;
		this.runNext();
	}
	public runNext()
	{
		let point: egret.Point;
		let virtualPitIndex: number;
		let pitInfo: GamblingPitInfo;
		for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
		{
			pitInfo = this.target.pitList[i];
			if (this._isClockwise) //顺时针
			{
				virtualPitIndex = GamblingPanelSetting.getNextIndex(pitInfo.index, this._nowRunIndex);
			}
			else
			{
				virtualPitIndex = GamblingPanelSetting.getPreIndex(pitInfo.index, this._nowRunIndex);
			}
			point = GamblingPanelSetting.headPosList[virtualPitIndex];
			if (i == GamblingManager.maxSeats)
			{
				pitInfo.headComponent.turnAnim.run(point.x, point.y, this.tryRunNext, this);
			}
			else
			{
				pitInfo.headComponent.turnAnim.run(point.x, point.y, null, null);
			}
		}
		this._nowRunIndex++;
	}
	private tryRunNext()
	{
		if (this._nowRunIndex >= this._offset) //旋转完毕
		{
			let pitInfo: GamblingPitInfo;
			for (let i: number = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++)
			{
				pitInfo = this.target.pitList[i];
				//移动完毕改变坑位的索引 位置变了，最下面的坑位始终要在1号位
				pitInfo.index = GamblingPanelSetting.getNextIndex(pitInfo.index, this._offset);
			}
			this.target.setPit(); //重新设置坑位信息
		}
		else
		{
			this.runNext();
		}
	}
}