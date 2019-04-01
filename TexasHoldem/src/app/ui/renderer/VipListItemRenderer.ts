/**
 * 商城vip列表
*/
class VipListItemRenderer extends BaseItemRenderer<ShoppingInfo>{
     public vipImg:eui.Image;//vip图片；
     public monthVip:eui.Label;//vip数量；
     public desVip:eui.Label;//vip描述
     public vipCountBtn:eui.Button;//钻石（元）；
    
    public constructor(){
        super();
		this.skinName=UIRendererSkinName.VipListItemRenderer;
    }
     protected createChildren()
	{
		this.dataChanged();
	}
	protected dataChanged(): void
	{
		super.dataChanged();
        if(this.bindData&&this.vipImg!=null)
        {
            let awardDef=AwardDefined.GetInstance().getAwardDefinition(this.bindData.definition.awardId);
            this.vipImg.source=this.bindData.definition.iconName;  
            this.monthVip.text=awardDef.name;
            for (let def of awardDef.costList)
            {
                if (def.type == CostType.Diamond)
                {
                    this.vipCountBtn.label = def.count.toString()+"钻石";
                }
            }
        }
	}
}