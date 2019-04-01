/**
 * 活动列表渲染项
 */
class ActivityItemRenderer extends BaseItemRenderer<ActivityInfo>
{
    public itemImg:eui.Image//图片
    public itemTitleLabel:eui.Label//标题
    public itemDesLabel//描述

    public constructor()
	{
		super();
		this.skinName = UIRendererSkinName.ActivityItemRenderer;
	}
    protected createChildren()
	{
		this.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
    protected dataChanged(): void
	{
        super.dataChanged();
        this.refresh();
    }

    private refresh()
    {
        if(this.bindData)
        {
            this.itemTitleLabel.text = this.bindData.definition.name;
            this.itemDesLabel.text = this.bindData.definition.des;
            this.itemImg.source = this.bindData.definition.icon;
        }
    }

    private onClick()
    {
        ActivityManager.showActivityPanelByType(this.bindData);
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}