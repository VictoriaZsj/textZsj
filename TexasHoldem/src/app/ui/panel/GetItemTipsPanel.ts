/**
 * 获得道具面板(appendData传Array<ItemGetInfo>类型)
 */
class GetItemTipsPanel extends BasePanel
{
	public getItemList: eui.List;
	public getItemScroller: eui.Scroller;
	private _disappearTween: egret.Tween;
	public constructor()
	{
		super();
		this.layer = UILayerType.Tips;
		this.setTouchChildren(false);
		this.setTouchEnable(false);
		this.maskAlpha = 1;
		this.skinName = UISkinName.GetItemTipsPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}

	public init(appendData: any)
	{
		super.init(appendData);
		UIUtil.listRenderer(this.getItemList, this.getItemScroller, GetItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, false);
		if (this.panelData)
		{
			this.getItemList.dataProvider = new eui.ArrayCollection(appendData);
			this.removeTweenEvents();
			this.createTween();
		}
	}
	protected onEnable(event: eui.UIEvent)
	{
		super.onEnable(event);
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