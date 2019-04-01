/**
 * 添加好友项面板
*/
class AddFriendItemRenderer extends BaseItemRenderer<BaseFriendInfo>
{
    /**
     * 头像
    */
    private headImg: eui.Image;
    /**
     * 昵称
    */
    private nameLabel: eui.Label;
    /**
     * id
    */
    private idLabel: eui.Label;
    /**
     * 添加按钮
    */
    private addBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.AddFriendItemRenderer;
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
            this.headImg.source = ImageSource.TestImg;
            this.nameLabel.text = this.bindData.name;
            this.idLabel.text = this.bindData.roleId.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            FriendManager.onAddPlayerEvent.addListener(this.addPlayerSuccess, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        FriendManager.onAddPlayerEvent.removeListener(this.addPlayerSuccess, this);
    }
    /**
     * 发送添加请求成功后接受广播执行的操作
    */
    private addPlayerSuccess()
    {
        AlertManager.showAlertByString("已向对方发送好友申请。");
    }
    /**
     *添加按钮点击事件
    */
    private onAddBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqAddPlayer(this.bindData.roleId);
    }
    private cancelBubble(event:egret.TouchEvent)
    {
        event.stopImmediatePropagation();        
    }
}