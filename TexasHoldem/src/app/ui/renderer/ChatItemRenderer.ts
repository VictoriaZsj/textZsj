/**
 * 聊天信息项面板
*/
class ChatItemRenderer extends BaseItemRenderer<ChatInfo>
{
    /**
     * 昵称
    */
    public textLabel: eui.Label;
    /**
     * 背景图片
    */
    public bgImage: eui.Image;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ChatItemRenderer;
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
            this.textLabel.text = this.bindData.name + ":" + this.bindData.message;
            this.bgImage.height = this.textLabel.height + 10;
        }
    }
}