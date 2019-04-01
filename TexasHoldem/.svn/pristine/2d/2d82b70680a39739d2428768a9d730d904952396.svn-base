/**
 * 签到金币列表
*/
class SignInGoldItemRenderer extends BaseItemRenderer<SignInInfo>{
     public signInDayLabel:eui.Label;//签到天数
     public signInGoldLabel:eui.Label;//签到领取金币数
     public signInCheck:eui.Image;
    
    public constructor(){
        super();
		this.skinName=UIRendererSkinName.SignInGoldItemRenderer;
    }
	protected dataChanged(): void
	{
		super.dataChanged();
        this.signInCheck.visible=false;
        if(this.bindData)
        {
            let awardDef=AwardDefined.GetInstance().getAwardDefinition(this.bindData.definition.awardId);
            if(awardDef)
            {
                let str=StringConstant.empty;
                for(let def of awardDef.rewardList)
                {
                    str+=def.definition.name+def.count.toString();
                }
                this.signInGoldLabel.text=str;
            }
            this.signInDayLabel.text="第"+this.bindData.definition.day.toString()+"天";
        }
	}
}