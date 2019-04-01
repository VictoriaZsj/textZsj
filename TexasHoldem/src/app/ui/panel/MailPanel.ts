/**
 * 邮箱面板
 */
class MailPanel extends BasePanel
{
	public tab: TabComponent;
	public mailList: eui.List;
	public mailScroller: eui.Scroller;

	public constructor()
	{
		super();
		this.skinName = UISkinName.MailPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.isCloseButtonTween = false;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		let array = new Array<String>("系统邮箱", "系统通知", "私人邮箱");
		this.tab.init(array);
		this.tab.isTween = false;
		UIUtil.listRenderer(this.mailList, this.mailScroller, MailItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		if(MailManager.isMailListChange)
		{
			MailManager.clearList();
			MailManager.RequestMailList(0, GameSetting.MaxMailNum);
		}
		MailManager.unReadCount = 0;
		this.mailScroller.viewport.scrollV = 0;
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.tab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
		MailManager.getMailListEvent.addListener(this.getMailList, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.tab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
		MailManager.getMailListEvent.removeListener(this.getMailList, this);
	}

	private getMailList()
	{
		this.refreshUI();
	}
	/**
     * 渲染信息
    */
	private refreshUI()
	{
		this.mailList.dataProvider = new eui.ArrayCollection(MailManager.mailList);
	}

	private onBarItemTap(e: eui.ItemTapEvent): void
	{
		this.mailList.dataProvider = new eui.ArrayCollection(MailManager.getListByType(e.itemIndex)); 
	}
}