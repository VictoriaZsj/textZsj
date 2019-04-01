/**
 * 进入私人房输入密码面板
*/
class EnterRoomPwdPanel extends BasePanel
{
    /**
    * 输入密码显示组
   */
    protected labelGroup: eui.Group;

    protected label1: NumComponent;
    protected label2: NumComponent;
    protected label3: NumComponent;
    protected label4: NumComponent;
    protected label5: NumComponent;
    protected label6: NumComponent;

    protected _labelList: Array<NumComponent>;

    protected callback: Function;
    protected openPanelName: string;

    public constructor(flag: boolean)
    {
        super();
        for (let i: number = 1; i <= 6; i++)
        {
            this["label" + i.toString()] = new NumComponent();
        }
        if (!flag)
        {
            this.skinName = UISkinName.EnterRoomPwdPanel;
        }
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.isCloseButtonTween = false;
        this._labelList = new Array<NumComponent>();
        for (let i: number = 1; i <= 6; i++)
        {
            this._labelList.push(this["label" + i.toString()]);
            this.labelGroup.addChild(this["label" + i.toString()]);
        }
        this.setGrayMask(false);
        this.callback = this.enterPwd;
        this.openPanelName = UIModuleName.EnterRoomPwdPanel;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        //重置
        this.resetLabel();
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.callback, target: this, isbgNotCanClick: true });
        UIManager.showPanel(this.openPanelName);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
    }
    /**
     * 关闭面板
    */
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        super.onCloseBtnClickHandler(event);
        UIManager.closePanel(this.openPanelName);
        PlayingFieldManager.onCloseKeyboardEvent.dispatch();
        this.resetLabel();
    }
    /**
     * 重置密码框内容
    */
    protected resetLabel()
    {
        for (let childLabel of this._labelList)
        {
            childLabel.refresh();
        }
    }
    /**
     * 输入密码
    */
    protected enterPwd(type: number, num?: string)
    {
        if (num)
        {
            let label: NumComponent = this.getUnWriteLabel();
            if (label)
            {
                label.refresh(parseInt(num));
            }
        }
        if (type == 1)  //键盘数字键按下
        {
            let str: string = this.getRoomPwd();
            if (str.length > 5)
            {
                let roompwd: number = parseInt(str);
                if (roompwd <= 0 || roompwd.toString().length < 6)
                {
                    UIManager.showFloatTips("房间密码不对！");
                    return;
                }
                GamblingManager.reqEnterRoom(roompwd);
                // RoomManager.reqJoinRoom(roompwd, SocketManager.requestSessionMax);
                // UIManager.showFloatTips("发送加入房间请求" + PlayingFieldManager.roomId);
            }
        } else if (type == 2)  //键盘删除键按下
        {
            let delLabel: NumComponent = this.getWirteLabel();
            if (delLabel)
            {
                delLabel.refresh();
            }
        } else if (type == 3)  //键盘清除键按下
        {
            this.resetLabel();
        }
    }
    protected getUnWriteLabel(): NumComponent
    {
        let label: NumComponent;
        for (let i: number = 0; i < this._labelList.length; i++)
        {
            label = this._labelList[i];
            if (label.label1 && !label.label1.text)
            {
                return label;
            }
        }
        return null;
    }
    protected getWirteLabel(): NumComponent
    {
        let label: NumComponent;
        for (let i: number = this._labelList.length - 1; i >= 0; i--)
        {
            label = this._labelList[i];
            if (label.label1 && label.label1.text)
            {
                return label;
            }
        }
        return null;
    }
    /**
     * 获得密码
    */
    protected getRoomPwd()
    {
        let str: string = StringConstant.empty;
        for (let i: number = 0; i < this._labelList.length; i++)
        {
            str += this._labelList[i].label1.text;
        }
        return str;
    }
}