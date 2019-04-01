/**
 * 亮牌
 */
class CardFaceBright extends BaseAnimation<CardFaceComponent>{
	public target: CardFaceComponent;
	private _callBack: Delegate;

	public reset()
	{
		super.reset();
		this.target.initElementsShow2();
		this.target.scaleX = 2;
		this.target.scaleY = 2;
		this.target.rotation = 0;
		this.target.alpha = 0.3;
		this.target.y = this.target.initMatrix.ty;
		this.target.cardGroup.rotation = 0;
	}
	public run(rotation: number, initOffsetX: number, x: number, y: number, callBack: Function, thisObj: any)
	{
		super.run(rotation, y);
		this.target.x = this.target.initMatrix.tx - initOffsetX;
		let tween: egret.Tween = egret.Tween.get(this.target);
		this._callBack = new Delegate(callBack, thisObj);

		tween.to({ x: this.target.initMatrix.tx + x, y: this.target.initMatrix.ty + y, scaleX: 1, scaleY: 1, alpha: 1 }, 300);
		tween.play();
		let preR: number;
		if (rotation > 0)
		{
			preR = 3;
		}
		else
		{
			preR = -2;
		}
		let cardTween: egret.Tween = egret.Tween.get(this.target.cardGroup);
		cardTween.to({ rotation: preR }, 300).wait(10).to({ rotation: rotation }, 100).call(this.runOver, this);
		cardTween.play();
	}
	public runOver()
	{
		super.runOver();
		if (this._callBack)
		{
			this._callBack.invoke();
		}
	}
	public clear()
	{
		super.clear();
		if (this.target.cardGroup)
		{
			egret.Tween.removeTweens(this.target.cardGroup);
		}
	}
}