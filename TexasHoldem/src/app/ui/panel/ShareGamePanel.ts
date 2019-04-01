/**
 * 分享面板
 */
class ShareGamePanel extends BasePanel
{
	public weixinShareBtn: eui.Button;
	public friendCircleShareBtn: eui.Button;
	public constructor()
	{
		super();
        this._isMaskClickClose = true;
		this.skinName = UISkinName.ShareGamePanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
	}
	private clickHandler(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		switch (event.target)
		{
			case this.weixinShareBtn:
				UIManager.showFloatTips("微信");
				break;
			case this.friendCircleShareBtn:
				UIManager.showFloatTips("朋友圈");
				break;
		}
	}
}