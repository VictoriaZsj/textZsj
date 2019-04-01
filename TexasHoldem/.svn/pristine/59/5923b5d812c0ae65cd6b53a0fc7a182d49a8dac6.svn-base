/**
 * 牌局移动面板
 */
class GamblingGameGroupMove extends BaseAnimation<egret.DisplayObject>
{
	public reset()
	{
		super.reset();
	}
	public run(x: number)
	{
		super.run(x);
		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.to({ x: x }, 300, egret.Ease.sineIn).call(this.runOver, this);
	}

	public runOver()
	{
		super.runOver();
	}
}