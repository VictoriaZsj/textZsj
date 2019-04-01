/**
 * 获得道具渲染项
 */
class GetItemRenderer extends BaseItemRenderer<ItemGetInfo>
{
    public itemImg: eui.Image;
    public nameLabel: eui.Label;
    public numLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GetItemRenderer;
    }
    protected createChildren()
    {
        this.dataChanged();
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.itemImg.source = ImageSource.Default_Head;
            //this.itemImg.source = ItemDefined.GetInstance().getDefinition(this.bindData.id).icon;
            this.nameLabel.text = ItemDefined.GetInstance().getDefinition(this.bindData.id).name;
            this.numLabel.text = this.bindData.count.toString();
        }
    }
}