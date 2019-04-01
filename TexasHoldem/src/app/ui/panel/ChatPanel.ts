/**
 * 聊天面板
*/
class ChatPanel extends BasePanel
{
    public scroller: eui.Scroller;
    public faceScroller: eui.Scroller;
    public fastScroller: eui.Scroller;
    public list: eui.List;
    public faceList: eui.List;
    public fastList: eui.List;
    public faceGroup: eui.Group;
    public fastGroup: eui.Group;
    public keyBoradGroup: eui.Group;
    public fastChatFlag: boolean;

    /**
     * 发送按钮
    */
    public sendBtn: eui.Button;
    /**
     * 没入座时表情group的遮罩
    */
    public disGroup: eui.Group;
    /**
     * 输入框
    */
    public writeLabel: eui.EditableText;
    /**
     * 表情按钮
    */
    public faceBtn: eui.ToggleButton;
    /**
     * 快捷输入按钮
    */
    public fastEnterBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UISkinName.ChatPanel;
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        UIUtil.listRenderer(this.list, this.scroller, ChatItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.faceList, this.faceScroller, FaceItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.fastList, this.fastScroller, FastChatItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.scroller.scrollPolicyH = this.faceScroller.scrollPolicyH = this.fastScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.disGroup.visible = this.faceGroup.visible = this.fastGroup.visible = false;
        this.faceBtn.selected = true;
        this.fastChatFlag = true;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.setChatInfo();  //todo 测试代码
        this.refreshUI();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);  //todo 测试代码
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.faceBtn.addEventListener(egret.Event.CHANGE, this.changeActive, this);
        this.writeLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFocus, this);
        this.scroller.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.faceList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFaceClick, this);
        this.fastList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFastChatClick, this);
        ChatManager.pushChatMessageEa.addListener(this.setChatInfo, this);
        this.writeLabel.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
        ChatManager.onSendChatMsgEvent.addListener(this.showChatMsg, this);
        this.fastEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setFastChatInfo, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);  //todo 测试代码    
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.faceBtn.removeEventListener(egret.Event.CHANGE, this.changeActive, this);
        this.writeLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getFocus, this);
        this.scroller.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.faceList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFaceClick, this);
        this.fastList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFastChatClick, this);
        ChatManager.pushChatMessageEa.removeListener(this.setChatInfo, this);
        ChatManager.onSendChatMsgEvent.removeListener(this.showChatMsg, this);
        this.fastEnterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setFastChatInfo, this);
    }
    /**
     * 点击快捷输入列表发送内容
    */
    private onFastChatClick(e: eui.ItemTapEvent)
    {
        //判断用户是否入座  未入座消息在哪都不显示  todo 待添加
        if (1)  //todo 测试代码
        {
            if (this.fastList.selectedItem)
            {
                //发送聊天的通知给服务器
                ChatManager.reqSendChatMsg(this.fastList.selectedItem.des, ChatMessageType.Maquee);
            }
        }
    }
    /**
     * 设置快捷输入内容
    */
    private setFastChatInfo()
    {
        if (this.fastChatFlag)
        {
            this.fastList.dataProvider = new eui.ArrayCollection(FastChatDefined.GetInstance().dataList);
            this.fastChatFlag = false;
        }
    }
    /**
     * 显示聊天消息
    */
    public showChatMsg(msg: any)
    {
        if (msg.type == ChatMessageType.Maquee)
        {
            ChatManager.messageList.push(msg);
            this.refreshUI();
            //给游戏房间界面发通知 参数 ：message 聊天内容文本  待添加
        } else if (msg.type == ChatMessageType.InRoom)
        {
            //给游戏房间界面发通知   参数 ：id 表情id   待添加
            UIManager.showFloatTips(msg.message);
        }
    }
    /**
     * 发送聊天信息
    */
    private sendMsg(event: egret.TouchEvent)
    {
        //判断用户是否入座  未入座消息在哪都不显示  todo 待添加
        if (1)  //todo 测试代码
        {
            if (this.writeLabel.text.trim())
            {
                //发送聊天的通知给服务器
                ChatManager.reqSendChatMsg(this.writeLabel.text, ChatMessageType.Maquee);
                UIManager.showFloatTips(this.writeLabel.text);  //todo 测试代码
                this.writeLabel.text = "";  //todo 测试代码
            }
        }
    }
    /**
     * 点击表情触发事件
    */
    private onFaceClick(e: eui.ItemTapEvent)
    {
        if (this.faceList.selectedItem)
        {
            // this.closePanel();
            ChatManager.reqSendChatMsg(this.faceList.selectedItem.id, ChatMessageType.InRoom);
            UIManager.showFloatTips("发送表情" + this.faceList.selectedItem.id);  //todo 测试代码
            console.log(this.faceList.selectedItem);
        }
    }
    /**
     * 获得焦点
    */
    private getFocus()
    {
        this.writeLabel.setFocus();
    }
    /**
     * 键盘图标与表情图标切换事件
    */
    private changeActive()
    {
        this.fastGroup.visible = false;
        if (this.faceBtn.selected)
        {
            this.faceGroup.visible = false;
            this.writeLabel.setFocus();
            UIManager.showFloatTips("系统键盘调出");
        } else
        {
            // todo 测试代码
            if (!ChatManager.faceList)
            {
                ChatManager.faceList = new Array<Face>();
            }
            if (ChatManager.faceList.length <= 0)
            {

                for (let i = 1; i < 50; i++)
                {
                    ChatManager.faceList[i - 1] = new Face();
                    ChatManager.faceList[i - 1].id = i;
                    ChatManager.faceList[i - 1].source = ImageSource.TestImg;
                }
                this.faceList.dataProvider = new eui.ArrayCollection(ChatManager.faceList);
            }
            //
            this.faceGroup.visible = true;
            //判断玩家是否处于坐下状态
            if (1)  //todo 测试代码
            {
                this.disGroup.visible = false;
            } else
            {
                this.disGroup.visible = true;
            }
        }
    }
    /**
     * 点击事件处理
    */
    private onClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        switch (event.target)
        {
            case this.fastEnterBtn:
                this.fastGroup.visible = true;
                this.faceGroup.visible = false;
                break;
            case this.keyBoradGroup:
                this.closePanel();
                break;
        }
    }
    /**
     * 设置聊天信息列表数据
    */
    private setChatInfo()
    {
        // todo 测试代码
        if (!ChatManager.messageList)
        {
            ChatManager.messageList = new Array<ChatInfo>();
        }
        let arr1: ChatInfo = new ChatInfo();
        arr1.name = "1111";
        arr1.message = "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
        arr1.type = 1;
        let arr2: ChatInfo = new ChatInfo();
        arr2.name = "2222";
        arr2.message = "222222222222222222222222222222222222222222";
        arr2.type = 1;
        ChatManager.messageList.push(arr1);
        ChatManager.messageList.push(arr2);
        //
        if (ChatManager.messageList.length > 0)
        {
            this.refreshUI();
        }
    }
    /**
     * 刷新UI
    */
    private refreshUI()
    {
        this.list.dataProvider = new eui.ArrayCollection(ChatManager.messageList);
    }
    /**
     * 关闭面板
    */
    private closePanel()
    {
        UIManager.closePanel(UIModuleName.ChatPanel);
    }
}