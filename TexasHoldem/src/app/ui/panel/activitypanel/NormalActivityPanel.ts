/**
 *  活动页面（具有图文内容的活动）
 */
class NormalActivityPanel extends BaseAnmiatePanel
{
    public titleLabel:eui.Label;
    public activityImg: eui.Image;
    public desLabel: eui.Label;
    public activityScroller:eui.Scroller;
    public activityList:eui.List;

    private info: ActivityInfo;
    public constructor()
    {
        super();
        this.skinName = UISkinName.NormalActivityPanel;
    }

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }

    public init(appendData: any)
    {
        super.init(appendData);
        if (appendData)
        {
            this.info = appendData;
        }
        UIUtil.listRenderer(this.activityList, this.activityScroller, ActivityAwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        if (this.info)
        {
            //this.activityImg.source = this.info.definition.imgId
            this.titleLabel.text = this.info.definition.name;
            this.desLabel.text = this.info.definition.des2;
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
    }
}