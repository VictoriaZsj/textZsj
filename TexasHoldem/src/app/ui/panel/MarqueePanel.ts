/**
 * 跑马灯界面
 */
class MarqueePanel extends BasePanel
{
	public bgImg: eui.Image;
	public textLabel: eui.Label;
	public scroller: eui.Scroller;
	public textGroup: eui.Group;
	private move: egret.Tween;
	public constructor()
	{
		super();
		this.isTween = false;
		this.panelAlignType = PanelAlignType.Center_Top;
		this.offsetV = 200;
		this.layer = UILayerType.Tips;

		this.setTouchChildren(false);
		this.setTouchEnable(false);
		this.setGrayMask(false);
		this.skinName = UISkinName.MarqueePanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		this.scroller.viewport = this.textGroup;
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		egret.Tween.removeTweens(this.scroller.viewport);
		if (appendData)
		{
			this.textLabel.text = appendData;
		}
	}
	protected onRender(event: egret.Event)
	{
		ChatManager.isOnMessage = true;
		this.move = new egret.Tween(this.scroller.viewport, null, null);
		let duration: number = this.textLabel.textWidth * 20;
		let targetPos: number = this.textLabel.textWidth;
		this.scroller.viewport.scrollH = -620;
		if (duration < 10000)
		{
			duration = 10000;
		}
		this.move.to({ scrollH: targetPos }, duration).call(this.onTweenGroupComplete, this);
		this.move.play();
		// console.log("this.textLabel.textWidth", targetPos);
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		UIUtil.hideScrollerBar(this.scroller, true, true);
		if (!this.panelData)
		{
			UIManager.showFloatTips("跑马灯内容为空！");
			this.onTweenGroupComplete();
		}
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		ChatManager.isOnMessage = false;
		egret.Tween.removeTweens(this.scroller.viewport);
	}
	private onTweenGroupComplete()
	{
		egret.Tween.removeTweens(this.textGroup);
		this.onCloseBtnClickHandler(null);
		ChatManager.nextMessage();
	}
}