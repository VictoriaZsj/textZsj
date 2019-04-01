/**
 * 添加好友项面板
*/
class MyTicketItemRenderer extends BaseItemRenderer<ItemInfo>
{
    /**
     * 门票icon
    */
    private iconImg: eui.Image;
    /**
     * 名字
    */
    private nameLabel: eui.Label;
    /**
     * 描述
    */
    private desLabel: eui.Label;
    /**
     * 数量
    */
    private numLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.MyTicketItemRenderer;
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
            // this.iconImg.source = this.bindData.definition.icon;
            this.iconImg.source = ImageSource.TestImg;  //todo 测试代码
            this.nameLabel.text = this.bindData.definition.name;
            this.desLabel.text = this.bindData.definition.des;
            this.numLabel.text = this.bindData.count.toString();
        }
    }
}