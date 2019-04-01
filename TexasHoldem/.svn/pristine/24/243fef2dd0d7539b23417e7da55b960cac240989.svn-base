/**
 * 活动页面（只有一张图片）
 */
class SimplePicturePanel extends BaseAnmiatePanel
{
    public titleLabel:eui.Label;
    public activityScroller: eui.Scroller;
    public activityImg: eui.Image;
    public desLabel: eui.Label;

    private info: ActivityInfo;
    public constructor()
    {
        super();
        this.skinName = UISkinName.SimplePicturePanel;
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
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.activityScroller.viewport.scrollV = 0;
        if (this.info)
        {
            //this.activityImg.source = this.info.definition.imgId
            this.titleLabel.text = this.info.definition.name;
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