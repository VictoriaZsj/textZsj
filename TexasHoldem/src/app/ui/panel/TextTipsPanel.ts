/**
 * 文本tips面板
 */
class TextTipsPanel extends BasePanel
{
	public label: eui.Label;
	private _disappearTween: egret.Tween;

	public constructor()
	{
		super();
		this.layer = UILayerType.Tips;
		this.setTouchChildren(false);
		this.setTouchEnable(false);

		this.setGrayMask(false);
		this.skinName = UISkinName.TextTipsPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		// this.tweenGroup.addChildAt(this.grayMask, 0);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (this.panelData)
		{
			this.label.text = this.panelData;
			this.removeTweenEvents();
			this.createTween();
		}
	}
	protected onEnable(event: eui.UIEvent)
	{
		super.onEnable(event);
		// this.grayMask.width = this.label.textWidth + 20;
		// this.grayMask.height = this.label.textHeight + 20;
	}
	private createTween()
	{
		this.alpha = 1;
		this._disappearTween = new egret.Tween(this, null, null);
		this._disappearTween.wait(800).to({ alpha: 0 }, 500, egret.Ease.quadOut).call(this.onPlayOver, this);
		this._disappearTween.play();
	}
	private onPlayOver(thisObject: any)
	{
		this.onCloseBtnClickHandler(null);
		this._disappearTween = null;
	}
	protected onDisable(event: eui.UIEvent)
	{
		super.onDisable(event);
		this.removeTweenEvents();
	}
	private removeTweenEvents()
	{
		if (this._disappearTween)
		{
			egret.Tween.removeTweens(this);
			this._disappearTween = null;
		}
	}
}