/**
 * 商城金币列表
*/
class GoldListItemRenderer extends BaseItemRenderer<ShoppingInfo>{
    public goldImg: eui.Image;//钻石图片；
    public goldNum: eui.Label;//钻石数量；
    public goldCount: eui.Label;//钻石计算；
    public goldBtn: eui.Button;//钻石（元）；

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GoldListItemRenderer;
    }
    protected createChildren()
    {
        this.dataChanged();
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData && this.goldImg != null)
        {
            let awardDef=AwardDefined.GetInstance().getAwardDefinition(this.bindData.definition.awardId);
            if (awardDef)
            {
                this.goldImg.source = this.bindData.definition.iconName;
                this.goldNum.text = awardDef.name;
                this.goldCount.text = awardDef.des;
                for (let def of awardDef.costList)
                {
                    if (def.type == CostType.RMB)
                    {
                        this.goldBtn.label = def.count.toString();
                    }
                }
            }
        }
    }
}