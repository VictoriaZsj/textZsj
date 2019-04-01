/**
 * 任务项
 */
class AssignmentItemRenderer extends BaseItemRenderer<AchievementInfo>
{
    public achieveImg: eui.Image;
    public desLabel: eui.Label;
    public rewardLabel: eui.Label;
    public rewardImg: eui.Image;
    public takePrizeBtn: eui.Button;
    public gotoBtn: eui.Button;
    public processImg: eui.Image;
    public processLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.AssignmentItemRenderer;
    }

    protected createChildren()
    {
        this.dataChanged();
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            //this.achieveImg.source = this.bindData.definition.icon;
            this.desLabel.text = this.bindData.definition.name;
            this.rewardLabel.text = this.bindData.definition.rewardNum.toString();
            //this.rewardImg.source = this.bindData.definition.rewardId;
            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    }

    private refreshiUI()
    {
        let groupInfo: BaseAchieveProcessInfo = AchieveProcessManager.getAchieveProcessInfoByGroup(this.bindData.definition.group);
        this.processImg.width = 300;
        if (!this.bindData.isComplete)
        {
            this.processImg.width *= groupInfo.process / this.bindData.definition.para1;
            this.processLabel.text = groupInfo.process + "/" + this.bindData.definition.para1;
            this.gotoBtn.visible = true;
            this.takePrizeBtn.visible = false;
        }
        else
        {
            this.processLabel.text = this.bindData.definition.para1 + "/" + this.bindData.definition.para1;
            this.gotoBtn.visible = false;
            this.takePrizeBtn.visible = true;
        }
    }

    private onClick(event: egret.TouchEvent)
    {
        switch (event.target)
        {
            case this.takePrizeBtn:
                AchievementManager.reqTakeAchievePrize(this.bindData.id);
                break;
            case this.gotoBtn:
                
                break;
        }
    }

    public onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }


}