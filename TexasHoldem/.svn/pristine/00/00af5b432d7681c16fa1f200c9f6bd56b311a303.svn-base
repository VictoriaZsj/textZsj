/// <summary>
/// 转圈loading
/// </summary>
class LoadingPanel extends BasePanel
{
	private image: eui.Image;
	private _time: number;
	private _isOut: boolean;
	private _allowTimeout: boolean;
	private _timeStamp: number = 0;
	public loading: egret.tween.TweenGroup;

	public constructor()
	{
		super();
		this.maskAlpha = 0.01;
		this.skinName = UISkinName.LoadingPanel;
	}

	protected onAwake(event: eui.UIEvent)
	{
		this.isTween = false;
		super.onAwake(event)
	}

	public init(appendData: any)
	{
		this._allowTimeout = true;
		if (appendData)
		{
			this._allowTimeout = appendData as boolean;
		}
		this._time = egret.getTimer();
		this._isOut = false;
	}
	protected onEnable(event: eui.UIEvent)
	{
		super.onEnable(event);
		this.loading.play();
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	protected onDisable(event: eui.UIEvent)
	{
		super.onDisable(event);
		this.loading.pause();
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	private update(event: egret.Event)
	{
		if (this._allowTimeout && this._isOut == false)
		{
			let offsetTime = egret.getTimer() - this._time;
			if (offsetTime >= ProjectDefined.GetInstance().getValue(ProjectDefined.onTimeOut))
			{
				this._isOut = true;
				UIManager.closePanel(UIModuleName.LoadingPanel);
				UIManager.dispatchEvent(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout);
			}
		}
	}
}