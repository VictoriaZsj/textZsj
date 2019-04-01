/**
 * 成就信息面板
 */
class AchievementItemPanel extends BasePanel
{
    public item: AchievementItemRenderer;
    public achieveName: eui.Label;
    public progress: eui.Label;
    public des: eui.Label;
    public complete: eui.Label;

    private info: AchievementInfo;

    public constructor()
    {
        super();
        this.skinName = UISkinName.AchievementItemPanel;
        this._isMaskClickClose = true;
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
            this.info = appendData as AchievementInfo;
        }
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.item.init(this.info);
        this.achieveName.text = this.info.definition.name;
        this.progress.text = this.info.definition.para1.toString();
        this.des.text = this.info.definition.description;
        this.complete.visible = this.info.isComplete;
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