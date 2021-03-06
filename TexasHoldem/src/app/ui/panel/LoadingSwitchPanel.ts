/**
 * 场景加载切换面板
 */
class LoadingSwitchPanel extends BasePanel
{
	// public progressImg: eui.Image;
	// public infoTxt: eui.Label;
	public mcGroup: eui.Group;
	public loading: any;

	private _mcFactory: egret.MovieClipDataFactory;
	private _saiziMc: egret.MovieClip;

	public constructor()
	{
		super();
		this.skinName = UISkinName.LoadingSwitchPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		let data: any = RES.getRes(MovieClipData.SaiZi_Json);
		let txtr: egret.Texture = RES.getRes(MovieClipData.SaiZi_Png);

		this._mcFactory = new egret.MovieClipDataFactory(data, txtr);
		this._saiziMc = new egret.MovieClip(this._mcFactory.generateMovieClipData());
		this.mcGroup.addChild(this._saiziMc);
		this._saiziMc.play();
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.updateProgress(0, StringConstant.empty);
		if (appendData)
		{
			this.updateProgress(appendData.value, appendData.info)
		}
		this.loading.play();
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this._saiziMc.addEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this._saiziMc.removeEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
		this.loading.pause();
	}
	private onPlayComplete(event: egret.Event)
	{
		this._saiziMc.gotoAndPlay(1);
	}
	public updateProgress(value: number, str: string)
	{
		if (this.isLoadComplete && value)
		{
			// this.progressImg.width = this.progressImg.maxWidth * value;
			// this.infoTxt.text = str;
		}
	}
}