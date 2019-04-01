/**
 * 本家手牌1动画
 */
class SelfCard1Appear extends BaseAnimation<CardFaceComponent>
{
	public target: CardFaceComponent;
	private tsfMatrix: egret.Matrix;
	private _nextAnimation: BaseAnimation<CardFaceComponent>;

	public reset()
	{
		super.reset();
		this.tsfMatrix = new egret.Matrix(0.0465, -0.0617, 0.0156, 0.075);
		this.target.matrix = this.tsfMatrix;
	}
	public run(nextAnimation: BaseAnimation<CardFaceComponent>)
	{
		super.run();
		this._nextAnimation = nextAnimation;
		let tween: egret.Tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
		tween.to({ a: 0.938, b: -0.345, c: 0.345, d: 0.938 }, 300).call(this.runOver, this);
	}
	private change()
	{
		this.target.matrix = this.tsfMatrix;
	}
	public runOver()
	{
		super.runOver();
		if (this._nextAnimation)
		{
			this._nextAnimation.run();
		}
	}
}