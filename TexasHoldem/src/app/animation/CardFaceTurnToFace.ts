/**
 * 翻牌
 */
class CardFaceTurnToFace extends BaseAnimation<CardFaceComponent>{
	public target: CardFaceComponent;

	private _backFaceMatrix: egret.Matrix;
	private _frontFaceMatrix: egret.Matrix;

	public callback: Delegate;

	public reset()
	{
		super.reset();
		this.target.visible = true
		let tmpMatrix: egret.Matrix = this.target.initMatrix.clone();
		tmpMatrix.tx = this.target.matrix.tx;
		tmpMatrix.ty = this.target.matrix.ty;
		this.target.matrix = tmpMatrix;
		this._backFaceMatrix = new egret.Matrix(1, 0, 0, 1);
		this._frontFaceMatrix = new egret.Matrix(0.122, 0.047);
		this.target.initElementsShow();
		this.target.backFace.matrix = this.target.frontFaceImg.matrix = new egret.Matrix();
	}
	public run()
	{
		super.run();
		let backFaceTween: egret.Tween = egret.Tween.get(this._backFaceMatrix, { onChange: this.onBackFaceChange.bind(this) });
		backFaceTween.to({ a: 0.0243, b: -0.023 }, 100).wait(10).call(this.onBackFaceChangeOver, this);
		backFaceTween.play();
	}
	private onBackFaceChange()
	{
		this.target.backFace.matrix = this._backFaceMatrix;
	}
	private onBackFaceChangeOver()
	{
		this.target.backFace.visible = false;
		this.target.frontFaceImg.matrix = this._frontFaceMatrix;
		this.target.frontFaceImg.visible = true;

		let frontFaceTween: egret.Tween = egret.Tween.get(this._frontFaceMatrix, { onChange: this.onFrontFaceChange.bind(this) });
		frontFaceTween.to({ a: 0.731, b: 0.285 }, 100).wait(10).call(this.runOver, this);
		frontFaceTween.play();
	}
	private onFrontFaceChange()
	{
		this.target.frontFaceImg.matrix = this._frontFaceMatrix;
	}
	public runOver()
	{
		super.runOver();
		this.target.frontFaceImg.visible = false;
		this.target.cardGroup.visible = true;
		if (this.callback)
		{
			this.callback.invoke();
		}
	}
	public clear()
	{
		if (this._frontFaceMatrix)
		{
			egret.Tween.removeTweens(this._frontFaceMatrix);
		}
		if (this._backFaceMatrix)
		{
			egret.Tween.removeTweens(this._backFaceMatrix);
		}
	}
}