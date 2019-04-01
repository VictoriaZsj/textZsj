/**
 * 我的奖品面板
*/
class PrizePanel extends BasePanel
{
    private nameLabel: eui.Label;
    private telLabel: eui.Label;
    private qqLabel: eui.Label;
    private emailLabel: eui.Label;
    private addressLabel: eui.Label;
    private notReceiveGroup: eui.Group;
    private hasReceiveGroup: eui.Group;
    private receiveAwardInfoGroup: eui.Group;
    private enAwardGroup: eui.Group;
    private enHasReceiveGroup: eui.Group;
    private disAwardGroup: eui.Group;
    private disHasReceiveGroup: eui.Group;
    private notReceiveList: eui.List;
    private hasReceiveList: eui.List;
    private notReceiveScroller: eui.Scroller;
    private hasReceiveScroller: eui.Scroller;
    private tabComponent: TabComponent;
    /**
     * 参加锦标赛按钮
    */
    private joinChampionshipsBtn: eui.Button;
    /**
     * 保存按钮
    */
    private saveBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UISkinName.PrizePanel;
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        UIUtil.listRenderer(this.notReceiveList, this.notReceiveScroller, MyAwardPanelItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.hasReceiveList, this.hasReceiveScroller, MyAwardPanelItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.notReceiveScroller.scrollPolicyH = this.hasReceiveScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.disAwardGroup.visible = this.enAwardGroup.visible = this.disHasReceiveGroup.visible = false;
        this.nameLabel.type = this.telLabel.type = this.qqLabel.type = this.emailLabel.type = this.addressLabel.type = egret.TextFieldType.INPUT;
        let array: Array<eui.Group> = new Array<eui.Group>();
        array.push(this.notReceiveGroup);
        array.push(this.hasReceiveGroup);
        array.push(this.receiveAwardInfoGroup);
        this.tabComponent.init(array);
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        //发送获得我的奖品列表信息的请求
        // MyAwardManager.reqGetAwardList();
        this.setAwardListInfo();  //todo 测试代码
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        PrizeManager.onGetAwardListEvent.addListener(this.setAwardListInfo, this);
        this.tabComponent.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveBtnClick, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        PrizeManager.onGetAwardListEvent.removeListener(this.setAwardListInfo, this);
        this.tabComponent.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        this.saveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveBtnClick, this);
    }
    /**
     * 选项卡按钮点击事件
    */
    private onTabClickHandler(e: eui.ItemTapEvent): void
    {
        if (e.itemIndex == 0)
        {
            //发送请求更新未领取奖品列表
            // MyAwardManager.reqGetAwardList();
            this.setAwardListInfo();  //todo 测试代码
        } else if (e.itemIndex == 1)
        {
            if (PrizeManager.hasReceiveList.length > 0)
            {
                PrizeManager.renderFlag = 2;
                this.hasReceiveList.dataProvider = new eui.ArrayCollection(PrizeManager.hasReceiveList);
                this.enHasReceiveGroup.visible = true;
                this.disHasReceiveGroup.visible = false;
            } else
            {
                this.enHasReceiveGroup.visible = false;
                this.disHasReceiveGroup.visible = true;
            }
        } else if (e.itemIndex == 2)
        {
            this.nameLabel.text = UserManager.userInfo.addressName;
            this.telLabel.text = UserManager.userInfo.phoneNum;
            this.qqLabel.text = UserManager.userInfo.qqNum;
            this.emailLabel.text = UserManager.userInfo.address;
        }
    }
    /**
     * 领奖信息保存
    */
    private onSaveBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this.nameLabel.text || this.telLabel.text || this.qqLabel.text || this.emailLabel.text)
        {
            if (this.nameLabel.text.trim() == UserManager.userInfo.addressName && this.telLabel.text.trim() == UserManager.userInfo.phoneNum && this.qqLabel.text.trim() == UserManager.userInfo.qqNum && this.emailLabel.text.trim() == UserManager.userInfo.address)
            {
                return;
            } else
            {
                //发送保存请求  
                PrizeManager.reqSaveInfo(this.nameLabel.text.trim(), parseInt(this.telLabel.text.trim()), parseInt(this.qqLabel.text.trim()), this.emailLabel.text.trim(), this.addressLabel.text.trim());
            }
        } else
        {
            UIManager.showFloatTips("领奖信息必须填写完整！");
        }
    }
    /**
     * 设置未领取奖品列表信息
    */
    private setAwardListInfo()
    {
        //todo 测试代码
        if (!PrizeManager.notReceiveList)
        {
            PrizeManager.notReceiveList = new Array<PrizeInfo>();
        }
        if (!PrizeManager.hasReceiveList)
        {
            PrizeManager.hasReceiveList = new Array<PrizeInfo>();
        }
        PrizeManager.hasReceiveList = [];
        PrizeManager.notReceiveList = [];
        let arr1: PrizeInfo = new PrizeInfo();
        arr1.id = 1;
        arr1.name = "100元话费";
        arr1.state = PrizeState.NotReceive;
        let arr2: PrizeInfo = new PrizeInfo();
        arr2.id = 2;
        arr2.name = "100元话费";
        arr2.state = PrizeState.NotReceive;
        let arr3: PrizeInfo = new PrizeInfo();
        arr3.id = 3;
        arr3.name = "10元话费";
        arr3.des = "可兑换10元话费";
        arr3.effectType = 3;
        arr3.state = PrizeState.Underway;
        PrizeManager.notReceiveList.push(arr1);
        PrizeManager.notReceiveList.push(arr2);
        PrizeManager.hasReceiveList.push(arr3);
        //
        if (PrizeManager.notReceiveList.length > 0)
        {
            PrizeManager.renderFlag = 1;
            this.enAwardGroup.visible = true;
            this.notReceiveList.dataProvider = new eui.ArrayCollection(PrizeManager.notReceiveList);
        } else
        {
            this.disAwardGroup.visible = true;
        }
    }
}