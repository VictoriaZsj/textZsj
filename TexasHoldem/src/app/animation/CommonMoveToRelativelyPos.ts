/**
 * 通用基于当前相对位置移动
 */
class CommonMoveToRelativelyPos extends BaseAnimation<egret.DisplayObject>
{
	private _callBack: Delegate;
	public run(hcenter: number, vcenter: number, callBack: Function, thisObj: any)
	{
		super.run(hcenter, vcenter, callBack, thisObj);
		this._callBack = new Delegate(callBack, thisObj);
		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.to({ horizontalCenter: hcenter, verticalCenter: vcenter }, 300, egret.Ease.sineIn).call(this.runOver, this);
	}
	public runOver()
	{
		super.runOver();
		this._callBack.invoke();
	}
	public clear()
	{
		super.clear();
		this._callBack = null;
	}
}