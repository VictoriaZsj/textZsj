/**
 * 活动中心面板
 */
class ActivityPanel extends BackHomeAnimePanel
{
    public activityScroller: eui.Scroller;
    public activityList: eui.List;

    public constructor()
    {
        super();
        this.skinName = UISkinName.ActivityPanel;
    }

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        UIUtil.listRenderer(this.activityList, this.activityScroller, ActivityItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.activityScroller.viewport.scrollV = 0;
        this.refreshList();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
    }
    private refreshList()
    {
        this.activityList.dataProvider = new eui.ArrayCollection(ActivityManager.showList);
    }
}