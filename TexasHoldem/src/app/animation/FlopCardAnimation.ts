/**
 * 发牌/弃牌动画
 */
class FlopCardAnimation extends BaseAnimation<egret.DisplayObject>{
	public target: egret.DisplayObject;
	private _initMatrix: egret.Matrix;

	private _initH: number;
	private _initV: number;

	private _angleVec: Vector2D;
	private _callBack: Delegate;
	private _params:any;
	private _runStart: number;
	private readonly _runTime: number = 300;


	public constructor()
	{
		super();
		this._angleVec = new Vector2D(0, 0);
	}
	public reset()
	{
		super.reset();
		if (!this._initMatrix)
		{
			this._initMatrix = this.target.matrix;
			if ((this.target as eui.Image))
			{
				this._initH = (this.target as eui.Image).horizontalCenter;
				this._initV = (this.target as eui.Image).verticalCenter;
			}
		}
		this.target.alpha = 1;
		this.target.matrix = this._initMatrix;
		if ((this.target as eui.Image))
		{
			(this.target as eui.Image).horizontalCenter = this._initH;
			(this.target as eui.Image).verticalCenter = this._initV;
		}
	}
	public run(point: egret.Point, callBack: Function, thisObj: any, params:any)
	{
		super.run(point);
		this._angleVec.x = point.x - this._initH;
		this._angleVec.y = point.y - this._initV;
		this._params = params;
		this._callBack = new Delegate(callBack, thisObj);

		let angle: number = this._angleVec.angle;
		angle = angle * MathUtil.Radian2Angle;
		let tween: egret.Tween = egret.Tween.get(this.target);

		tween.to({ horizontalCenter: point.x, verticalCenter: point.y, scaleX: 1, scaleY: 1, alpha: 0.3, rotation: angle }, this._runTime).call(this.runOver, this);
		this._runStart = egret.getTimer();

		Tick.addFrameInvoke(this.runNext, this);
	}
	private runNext()
	{
		if (egret.getTimer() - this._runStart > this._runTime - 100)
		{
			this._callBack.invoke(this._params);
		}
	}
	public clear()
	{
		super.clear();
		this._callBack = null;
	}
}