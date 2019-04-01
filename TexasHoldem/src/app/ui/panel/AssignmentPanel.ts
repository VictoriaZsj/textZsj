/**
 * 任务面板
 */
class AssignmentPanel extends BackHomeAnimePanel
{
    public assignmentTab: TabComponent;
    public achieveScroller: eui.Scroller;
    public achieveList: eui.List;

    public constructor()
    {
        super();
        this.skinName = UISkinName.AssignmentPanel;
    }

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        let array = new Array<String>("每日任务", "每周任务", "成长任务");
        this.assignmentTab.init(array);
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AssignmentItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.achieveScroller.viewport.scrollV = 0;
        this.assignmentTab.setSelectIndex(0);
        this.refreshList();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.assignmentTab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        AchievementManager.achieveChangeEvent.addListener(this.refreshList, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.assignmentTab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        AchievementManager.achieveChangeEvent.removeListener(this.refreshList, this);
    }
    private refreshList()
    {
        let list : Array<AchievementInfo> = AchievementManager.getShowAchieveListByType(this.assignmentTab.tabBar.selectedIndex + 1);
        this.achieveList.dataProvider = new eui.ArrayCollection(list);
    }
    private onBarItemTap(e: eui.ItemTapEvent): void
    {
        this.refreshList();
    }
}