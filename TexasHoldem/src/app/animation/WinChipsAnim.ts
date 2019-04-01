/**
 * 赢取筹码动画
 */
class WinChipsAnim extends BaseAnimation<eui.Label>
{
	private _initMaxtrix: egret.Matrix;
	public reset()
	{
		super.reset();
		if (!this._initMaxtrix)
		{
			this._initMaxtrix = this.target.matrix;
		}
		this.target.matrix = this._initMaxtrix;
		this.target.alpha = 1;
	}
	public run()
	{
		super.run();
		let tween: egret.Tween = egret.Tween.get(this.target);
		tween.to({ y: this._initMaxtrix.ty - 50 }, 300, egret.Ease.backOut).wait(3000).to({ alpha: 0 }, 300).call(this.runOver);
	}
	public runOver()
	{
		super.runOver();
		this.target.visible = false;
	}
}