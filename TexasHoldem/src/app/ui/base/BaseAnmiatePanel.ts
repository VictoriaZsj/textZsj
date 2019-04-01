/**
 * 基础动画面板，有入场动画的
 */
class BaseAnmiatePanel extends BasePanel
{
	public anmGroup: eui.Group;
	public anmGroup1: eui.Group;
	protected isEnterOver: boolean;
	public titleImg: eui.Image;

	public prePaneName: string;
	public constructor()
	{
		super();
		this.maskAlpha = 1;
	}
	public init(appendData: any)
	{
		if (appendData && appendData.prePaneName != null)
		{
			this.prePaneName = appendData.prePaneName;
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		this.isEnterOver = false;
		egret.Tween.removeTweens(this.anmGroup);
		egret.Tween.removeTweens(this.anmGroup1);
		egret.Tween.removeTweens(this.titleImg);
		if (this.grayMask)
		{
			egret.Tween.removeTweens(this.grayMask);
		}

		let enter: egret.Tween = egret.Tween.get(this.anmGroup);
		this.anmGroup.y = -100;
		this.anmGroup.alpha = 1;
		enter.to({ y: 0, alpha: 1 }, 260, egret.Ease.circOut);

		enter = egret.Tween.get(this.anmGroup1);
		this.anmGroup1.y = 1280;
		this.anmGroup.alpha = 0;
		enter.to({ y: 100, alpha: 1 }, 260, egret.Ease.circOut);

		enter = egret.Tween.get(this.titleImg);
		this.titleImg.y = -100;
		enter.wait(300).to({ y: 10 }, 200).call(this.onEnterAnmComplete.bind(this));

		if (this.grayMask)
		{
			enter = egret.Tween.get(this.grayMask);
			this.grayMask.alpha = 0;
			enter.to({ alpha: 1 }, 260, egret.Ease.backOut);
		}
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.isEnterOver = false;
	}
	protected onEnterAnmComplete()
	{
		this.isEnterOver = true;
	}
	protected onCloseBtnClickHandler(event: egret.TouchEvent): void
	{
		if (event)
		{
			SoundManager.playButtonEffect(event.target);
		}
		let enter: egret.Tween = egret.Tween.get(this.anmGroup);
		this.anmGroup.y = 0;
		this.anmGroup.alpha = 1;
		enter.to({ y: -100, alpha: 1 }, 500, egret.Ease.circOut);

		enter = egret.Tween.get(this.anmGroup1);
		this.anmGroup1.y = 100;
		this.anmGroup.alpha = 1;
		enter.to({ y: 1280, alpha: 0 }, 500, egret.Ease.circOut).call(this.onCloseAnmComplete.bind(this));

		if (this.grayMask)
		{
			enter = egret.Tween.get(this.grayMask);
			this.grayMask.alpha = 0.7;
			enter.to({ alpha: 0.1 }, 400, egret.Ease.backOut);
		}
		if (this.prePaneName)
		{
			UIManager.showPanel(this.prePaneName);
		}

	}
	protected onCloseAnmComplete()
	{
		UIManager.closePanel(this);
	}
}