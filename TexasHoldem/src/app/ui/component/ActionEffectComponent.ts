/**
 * 行为特效组件
 */
class ActionEffectComponent extends BaseComponent<ActionInfo>
{
	public effectTweenGroup: egret.tween.TweenGroup;
	public imgAction: eui.Image;
	public imgBg:eui.Image;
	public constructor()
	{
		super();
		this.skinName = UIComponentSkinName.ActionEffectComponent;
	}
	protected createChildren()
	{
		super.createChildren();
		this.effectTweenGroup.stop();
		
	}
	protected rendererStart(event: egret.Event)
	{
		super.rendererStart(event);
		this.imgBg.alpha = 0;
		this.imgAction.alpha = 0;
		// this.imgAction.source = ImageSource.getActionEffectImgSource(this.bindData.actionType);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.imgAction.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
		this.effectTweenGroup.addEventListener(egret.Event.COMPLETE, this.onTweenComplete, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.effectTweenGroup.removeEventListener(egret.Event.COMPLETE, this.onTweenComplete, this);
		this.imgAction.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(event: egret.Event)
	{
		this.imgAction.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
		this.effectTweenGroup.play();
	}
	private onTweenComplete(event: egret.Event)
	{
		if (this.parent)
		{
			this.parent.removeChild(this);
		}
		this.destroy();
	}
}