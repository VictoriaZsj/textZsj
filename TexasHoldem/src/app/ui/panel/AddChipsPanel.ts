/**
 * 加注面板
 */
class AddChipsPanel extends BasePanel
{
	public addChipsVs: eui.VSlider;
	public countLable: eui.Label;

	private _posX: number;
	private _posY: number;
	public constructor()
	{
		super();
		this.skinName = UISkinName.AddChipsPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.isMaskClickClose = true;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		//设置存入滑动条进度
		this.addChipsVs.value = appendData.minChips;
		this.countLable.text = this.addChipsVs.value.toString();
		this.addChipsVs.minimum = appendData.minChips;
		this.addChipsVs.maximum = appendData.maxChips
		//每次滚动最小刻度数
		this.addChipsVs.snapInterval = appendData.bBlind;
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addChipsVs.addEventListener(egret.Event.CHANGE, this.addChipsHandle, this);
		this.addChipsVs.thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
		this.addChipsVs.thumb.addEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
		GamblingManager.ActionOverEvent.addListener(this.actionOverHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.addChipsVs.removeEventListener(egret.Event.CHANGE, this.addChipsHandle, this);
		this.addChipsVs.thumb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
		this.addChipsVs.thumb.removeEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
		GamblingManager.ActionOverEvent.removeListener(this.actionOverHandler, this);
	}
	/**
	 * 加注变化
	*/
	private addChipsHandle()
	{
		this.countLable.text = this.addChipsVs.value.toString();
	}

	/**
	 * 确定加注
	*/
	private confirmAddChips(event: egret.TouchEvent)
	{
		switch (event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				this._posX = event.stageX;
				this._posY = event.stageY;
				break;
			case egret.TouchEvent.TOUCH_END:
				if (event.stageX == this._posX && event.stageY == this._posY)
				{
					if (this.addChipsVs.value > 0)
					{
						GamblingManager.reqAction(PlayerState.Raise, this.addChipsVs.value);
						console.log("加注：", this.addChipsVs.value);
					}
				}
				break;
		}
	}
	private actionOverHandler()
	{
		this.onCloseBtnClickHandler(null);
	}
}