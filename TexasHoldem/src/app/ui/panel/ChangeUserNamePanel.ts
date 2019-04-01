/**
 * 修改昵称面板 
 */
class ChangeUserNamePanel extends BasePanel
{
    public nameTextLabel: eui.EditableText;//输入框
    public randomBtn: eui.Button;//随机按钮
    public changeNameBtn: eui.Button;//修改

    public constructor()
    {
        super();
        this.isCloseButtonTween = false;
        this.skinName = UISkinName.ChangeUserNamePanel;
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.nameTextLabel.text = UserManager.userInfo.name;
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }
    /**
	 * 点击面板按钮事件处理
	*/
    private clickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        switch (event.target)
        {
            case this.randomBtn:
                this.nameTextLabel.text = UserUtil.randomNickName(UserManager.userInfo.sex);
                break;
            case this.changeNameBtn:
                if (UserUtil.isLegalNickName(this.nameTextLabel.text))
                {
                    UserManager.editUserName(this.nameTextLabel.text);
                }
                break;
        }

    }
}