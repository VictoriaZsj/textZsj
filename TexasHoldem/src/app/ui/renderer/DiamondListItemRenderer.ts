/**
 * 商城钻石列表
*/
class DiamondListItemRenderer extends BaseItemRenderer<ShoppingInfo>{
    public diamondImg: eui.Image;//钻石图片；
    public diamondNum: eui.Label;//钻石数量；
    public diamondBtn: eui.Button;//钻石（元）；

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.DiamondListItemRenderer;
    }
    protected createChildren()
    {
        this.dataChanged();
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData && this.diamondImg != null)
        {
            let awardDef = AwardDefined.GetInstance().getAwardDefinition(this.bindData.definition.awardId);
            if(awardDef)
            {
                this.diamondImg.source = this.bindData.definition.iconName;
                this.diamondNum.text = awardDef.name;
                for (let def of awardDef.costList)
                {
                    if (def.type == CostType.RMB)
                    {
                        this.diamondBtn.label = def.count.toString();
                        break;
                    }
                }
            }
        }
    }
}