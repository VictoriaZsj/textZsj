/**
 * 牌局面板移动支持
 */
class GamblingPanelMoveSupport extends BaseGamblingPanelSupport
{
	private readonly toNum = 300;
	private _isMove: boolean = false;
	private _lastStageX: number;

	private _moveHandler: GamblingGameGroupMove;
	private _initMatrix: egret.Matrix;

	public initialize()
	{
		super.initialize();
		this._isMove = false;
		this._moveHandler = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.GamblingGameGroupMove);
		this._moveHandler.setTarget(this.target.gameGroup);
	}
	public move()
	{
		this._lastStageX = -1;
		this._initMatrix = null;
		if (this.target.gameGroup.x > 0)
		{
			this._moveHandler.run(0);
		}
		else
		{
			this._moveHandler.run(this.toNum);
		}
	}
	public onEnable()
	{
		this.target.optionsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionsTapHandler, this);
		this.target.gameGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this, true);
		this.target.gameGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true);
	}
	public onDisable()
	{
		this.target.gameGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this, true);
		this.target.gameGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true);
		this.target.optionsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.optionsTapHandler, this);
	}
	private onTouchEnd(e: egret.TouchEvent)
	{
		if (e.target == this.target.gameGroup)
		{
			this.stop();
			this._initMatrix = null;
		}
	}
	private onTouchMove(e: egret.TouchEvent)
	{
		if (e.target == this.target.gameGroup)
		{
			if (!this._initMatrix)
			{
				this._initMatrix = this.target.gameGroup.matrix
			}
			let offsetX: number = 0;
			if (this._lastStageX != -1)
			{
				offsetX = e.stageX - this._lastStageX;
			}
			else
			{
				this._lastStageX = e.stageX;
			}

			this._initMatrix.tx += offsetX;

			if (this._initMatrix.tx > this.toNum)
			{
				this._initMatrix.tx = this.toNum;
			}
			if (this._initMatrix.tx < 0)
			{
				this._initMatrix.tx = 0;
			}
			this.target.gameGroup.matrix = this._initMatrix;
			this._isMove = true;
		}
	}
	private stop()
	{
		if (this._isMove) //移动了才抛送事件
		{
			if (this.target.gameGroup.x > this.toNum / 2)
			{
				this._moveHandler.run(this.toNum);
			}
			else
			{
				this._moveHandler.run(0);
			}
		}
	}
	private optionsTapHandler(event: egret.TouchEvent)
	{
		this.move();
	}
}