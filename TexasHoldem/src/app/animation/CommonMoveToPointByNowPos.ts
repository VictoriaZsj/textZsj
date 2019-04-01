/**
 * 基于当前位置移动到某点(通用)
 */
class CommonMoveToPointByNowPos extends BaseAnimation<egret.DisplayObject>
{
	public run(x: number, y: number)
	{
		super.run(x, y);
		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.to({ x: x, y: y }, 300, egret.Ease.sineIn).call(this.runOver, this);
	}
}