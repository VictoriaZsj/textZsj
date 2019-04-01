/**
 * 本家手牌2动画
 */
class SelfCard2Appear extends BaseAnimation<CardFaceComponent>
{
	public target: CardFaceComponent;
	private tsfMatrix: egret.Matrix;

	public reset()
	{
		super.reset();
		this.tsfMatrix = new egret.Matrix(0.27, -0.36, 0.037, 0.177);
		this.target.matrix = this.tsfMatrix;
	}
	public run()
	{
		super.run();
		let tween: egret.Tween = egret.Tween.get(this.tsfMatrix, { onChange: this.change.bind(this) });
		tween.to({ a: 0.966, b: 0.26, c: -0.26, d: 0.966 }, 300).call(this.runOver, this);
	}
	private change()
	{
		this.target.matrix = this.tsfMatrix;
	}
}