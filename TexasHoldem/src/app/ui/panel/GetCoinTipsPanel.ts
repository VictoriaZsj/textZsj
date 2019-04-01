/**
 * 获得金币面板
 */
class GetCoinTipsPanel extends BasePanel
{
	public coinGroup: eui.Group;
	public textLabel: eui.Label;
	private _disappearTween: egret.Tween;
	/**
	 * 粒子系统
	 */
	private ptc: particle.GravityParticleSystem;
	public constructor()
	{
		super();
		this.layer = UILayerType.Tips;
		this.setTouchChildren(false);
		this.setTouchEnable(false);

		this.setGrayMask(false);
		this.skinName = UISkinName.GetCoinTipsPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}

	public init(appendData: any)
	{
		super.init(appendData);
		if (this.panelData)
		{
			this.textLabel.text = this.panelData;
			this.removeTweenEvents();
			this.creatCoinTween();
			this.createTween();
		}
	}
	protected onEnable(event: eui.UIEvent)
	{
		super.onEnable(event);
	}

	private creatCoinTween()
	{
		if (!this.ptc)
		{
			let texture: egret.Texture = RES.getRes(ParticleSource.GetCoin_Img);
			let config: any = RES.getRes(ParticleSource.GetCoin_Json);
			this.ptc = new particle.GravityParticleSystem(texture, config);
		}
		this.addChild(this.ptc);
		this.ptc.start(1000);
	}

	private createTween()
	{
		this.alpha = 1;
		this._disappearTween = new egret.Tween(this, null, null);
		this._disappearTween.wait(2000).to({ alpha: 1 }, 50, egret.Ease.quadOut).call(this.onPlayOver, this);
		this._disappearTween.play();
	}
	private onPlayOver(thisObject: any)
	{
		this.onCloseBtnClickHandler(null);
		this._disappearTween = null;
		this.ptc.stop(true);
		this.removeChild(this.ptc);
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