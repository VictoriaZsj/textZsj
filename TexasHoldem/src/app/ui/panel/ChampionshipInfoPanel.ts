/**
 * 锦标赛赛事信息面板
 */
class ChampionshipInfoPanel extends BasePanel
{
    public matchInfoTab: TabComponent;
    /**
     * 选项卡内容group
    */
    public baseInfoGroup: eui.Group;
    public outsGroup: eui.Group;
    public rankGroup: eui.Group;
    public blindGroup: eui.Group;
    public awardGroup: eui.Group;
    /**
     * 有无用户参加内容group
    */
    public hasJoinGroup: eui.Group;
    public noJoinGroup: eui.Group;
    /**
     * 涨盲信息group
    */
    public surplusTimeGroup: eui.Group;
    /**
     * 赛况中赛事未开始的涨盲内容group
    */
    public notStartGroup: eui.Group;
    /**
     * 赛事名字
    */
    public nameLabel: eui.Label;
    /**
     * 报名费
    */
    public applicationFeeLabel: eui.Label;
    /**
     * 比赛时间
    */
    public timeLabel: eui.Label;
    /**
     * 参赛人数
    */
    public joinNumLabel: eui.Label;
    /**
     * 初始筹码
    */
    public initChipLabel: eui.Label;
    /**
     * 重购group
    */
    public rebuyGroup: eui.Group;
    /**
     * 增购group
    */
    public addonGroup: eui.Group;
    /**
     * 重购描述
    */
    public rebuyDesLabel: eui.Label;
    /**
     * 增购描述
    */
    public addonDesLabel: eui.Label;
    /**
     * 报名按钮
    */
    public applicationBtn: eui.Button;
    /**
     * 退赛按钮
    */
    public withdrawBtn: eui.Button;
    /**
     * 排名
    */
    public rankLabel: eui.Label;
    /**
     * 参赛人数
    */
    public joinLabel: eui.Label;
    /**
     * 比赛进行时间
    */
    public forTimeLabel: eui.Label;
    /**
     * 涨盲剩余时间
    */
    public surplusTimeLabel: eui.Label;
    /**
     * 当前盲注
    */
    public nowBlindLabel: eui.Label;
    /**
     * 前注
    */
    public nowAnteLabel: eui.Label;
    /**
     * 下级盲注
    */
    public nextBlindLabel: eui.Label;
    /**
     * 下级前注
    */
    public nextAnteLabel: eui.Label;
    /**
     * scroller
    */
    public rankScroller: eui.Scroller;
    public blindScroller: eui.Scroller;
    public awardScroller: eui.Scroller;
    /**
     * list
    */
    public rankList: eui.List;
    public blindList: eui.List;
    public awardList: eui.List;

    public nthRebuy: number;
    public nthAddon: number;
    public countUpLabel: eui.Label;
    public countDownLabel: eui.Label;
    public countUpNum: number;
    public countDownNum: number;

    public championshipInfo: MatchRoomInfo = new MatchRoomInfo();

    public constructor()
    {
        super();
        this.skinName = UISkinName.ChampionshipInfoPanel;
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        UIUtil.listRenderer(this.rankList, this.rankScroller, ChampionshipRankItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.blindList, this.blindScroller, BlindItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.awardList, this.awardScroller, AwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.rankScroller.scrollPolicyH = this.blindScroller.scrollPolicyH = this.awardScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        let array: Array<eui.Group> = new Array<eui.Group>();
        array.push(this.baseInfoGroup);
        array.push(this.outsGroup);
        array.push(this.rankGroup);
        array.push(this.blindGroup);
        array.push(this.awardGroup);
        this.matchInfoTab.init(array);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.championshipInfo = appendData.championshipInfo;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.rebuyGroup.visible = this.addonGroup.visible = this.applicationBtn.visible = this.withdrawBtn.visible = this.hasJoinGroup.visible = this.noJoinGroup.visible = false;
        this.setApplicationInfo();
        this.setAwardInfo();

        // ChampionshipManager.reqOutsInfo(this.championshipInfo.id);
        // tod 测试代码
        if (!ChampionshipManager.matchOutsInfo)
        {
            ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
        }
        let blindInfo: ChampionshipBlindDefinition = ChampionshipBlindDefined.GetInstance().getDefinition(5);
        if (blindInfo.preBet)
        {
            ChampionshipManager.matchOutsInfo.nowAnte = blindInfo.preBet;
        }
        ChampionshipManager.matchOutsInfo.nowSBlind = blindInfo.sBlind;
        ChampionshipManager.matchOutsInfo.nowBBlind = blindInfo.bBlind;
        blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(6);
        if (blindInfo.preBet)
        {
            ChampionshipManager.matchOutsInfo.nextAnte = blindInfo.preBet;
        }
        ChampionshipManager.matchOutsInfo.nextSBlind = blindInfo.sBlind;
        ChampionshipManager.matchOutsInfo.nextBBlind = blindInfo.bBlind;
        ChampionshipManager.matchOutsInfo.rank = 12;
        ChampionshipManager.matchOutsInfo.addBlindTime = 10;
        this.setOutsInfo();
        //

        ChampionshipManager.nowBlindRank = 5;  //todo 测试代码
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.matchInfoTab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        ChampionshipManager.OnOutsInfoEvent.addListener(this.setOutsInfo, this);
        ChampionshipManager.OnRankInfoEvent.addListener(this.setRankInfo, this);
        this.applicationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplicationBtnClick, this);
        this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdrawBtnClick, this);
        ChampionshipManager.OnWithdrawEvent.addListener(this.closePanel, this);
        ChampionshipManager.onRequestJoinEvent.addListener(this.joinSuccess, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.matchInfoTab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        ChampionshipManager.OnOutsInfoEvent.removeListener(this.setOutsInfo, this);
        ChampionshipManager.OnRankInfoEvent.removeListener(this.setRankInfo, this);
        Tick.RemoveSecondsInvoke(this.countDown, this);
        Tick.RemoveSecondsInvoke(this.countUp, this);
        this.applicationBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplicationBtnClick, this);
        this.withdrawBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdrawBtnClick, this);
        ChampionshipManager.OnWithdrawEvent.removeListener(this.closePanel, this);
        ChampionshipManager.onRequestJoinEvent.removeListener(this.joinSuccess, this);

    }

    /**
     * 报名成功执行的事件
    */
    private joinSuccess()
    {
        this.applicationBtn.visible = false;
        this.withdrawBtn.visible = true;
    }
    /**
     * 退赛成功后关闭面板
    */
    private closePanel(joinWay: JoinChampionshipWay)
    {
        UIManager.closePanel(UIModuleName.ChampionshipInfoPanel);
        UIManager.closePanel(UIModuleName.ChampionshipPanel);
        if (joinWay == JoinChampionshipWay.Ticket)
        {
            AlertManager.showAlert("退赛成功，您的门票已返回账户");
        } else
        {
            AlertManager.showAlert("退赛成功，报名费已返回账户");
        }
    }
    /**
     * 退赛按钮点击事件
    */
    private onWithdrawBtnClick(event: TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (TimeManager.GetServerUtcTimestamp() >= this.championshipInfo.startTime)
        {
            AlertManager.showAlert("比赛已经开启，不可退赛。");
        } else if (this.championshipInfo.joinWay == JoinChampionshipWay.Ticket)
        {
            // ChampionshipManager.reqWithdraw(this.championshipInfo.id, this.championshipInfo.joinWay);
            UIManager.showFloatTips('退赛');  //todo 测试代码
        } else
        {
            AlertManager.showConfirm("提示：主动退赛仅退还报名费，服务费将不予退还。", this.confirmWithdraw);
        }
    }
    /**
     * 退赛提示框确认退赛按钮执行事件
    */
    private confirmWithdraw()
    {
        // ChampionshipManager.reqWithdraw(this.championshipInfo.id, this.championshipInfo.joinWay);
        UIManager.showFloatTips('退赛');  //todo 测试代码        
    }
    /**
     * 报名按钮点击事件
    */
    private onApplicationBtnClick(event: TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        let flag: boolean = ItemManager.isHaveTicket(this.championshipInfo.definition.ticketId);
        if (flag)   //此处发送协议传递给后台的参数待协商
        {
            // ChampionshipManager.reqRequestJoin(this.championshipInfo.id, JoinChampionshipWay.Ticket);
        } else
        {
            if (UserManager.userInfo.gold >= this.championshipInfo.definition.signCost + this.championshipInfo.definition.serveCost)
            {
                // ChampionshipManager.reqRequestJoin(this.championshipInfo.id, JoinChampionshipWay.Gold);
            } else
            {
                AlertManager.showConfirm("提示：金币不足，是否花费648购买1200万金币？", this.openShoppingPanel);
            }
        }
        UIManager.showFloatTips('立即报名');  //todo 测试代码
    }
    /**
     * 打开商城面板
    */
    private openShoppingPanel()
    {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShoppingGpIndex.Gold });
        UIManager.closePanel(UIModuleName.ChampionshipPanel);
        UIManager.closePanel(UIModuleName.ChampionshipInfoPanel);
    }
    /**
     * 设置奖励信息
    */
    private setAwardInfo()
    {
        let prizeListInfo: Array<ChampionshipPrizeDefinition> = ChampionshipManager.getAwardList(this.championshipInfo.id);
        if (!ChampionshipManager.awardList)
        {
            ChampionshipManager.awardList = new Array<ChampionshipAwardInfo>();
        }
        ChampionshipManager.awardList.length = 0;
        if (prizeListInfo && prizeListInfo.length > 0)
        {
            for (let def of prizeListInfo)
            {
                let info: ChampionshipAwardInfo = new ChampionshipAwardInfo();
                let des: string = ChampionshipManager.getAwardName(def);
                if (des)
                {
                    info.des = des;
                    info.rank = def.start;
                    ChampionshipManager.awardList.push(info);
                }
            }
        }
        if (ChampionshipManager.awardList.length > 0)
        {
            this.awardList.dataProvider = new eui.ArrayCollection(ChampionshipManager.awardList);
        }
    }
    /**
     * 设置盲注信息
    */
    private setBlindInfo()
    {
        if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0)
        {
            this.blindList.dataProvider = new eui.ArrayCollection(ChampionshipManager.blindList);
        }
    }
    /**
     * 设置排名信息
    */
    private setRankInfo()
    {
        if (ChampionshipManager.rankList && ChampionshipManager.rankList.length > 0)
        {
            this.hasJoinGroup.visible = true;
            this.noJoinGroup.visible = false;
            this.rankList.dataProvider = new eui.ArrayCollection(ChampionshipManager.rankList);
        } else
        {
            this.hasJoinGroup.visible = false;
            this.noJoinGroup.visible = true;
        }
    }
    /**
     * 设置赛况信息
    */
    private setOutsInfo()
    {
        if (ChampionshipManager.matchOutsInfo)
        {
            this.rankLabel.text = "0";
            this.joinLabel.text = "0";
            this.nowAnteLabel.text = "0";
            this.nextAnteLabel.text = "0";
            this.forTimeLabel.text = "00:00:00";
            this.forTimeLabel.text = "00:00:00";
            this.surplusTimeGroup.visible = this.notStartGroup.visible = false;
            if (ChampionshipManager.matchOutsInfo.rank)
            {
                this.rankLabel.text = ChampionshipManager.matchOutsInfo.rank.toString();
            }
            if (this.championshipInfo.applyNum)
            {
                this.joinLabel.text = this.championshipInfo.applyNum.toString();
            }
            let num: number = Math.floor(TimeManager.GetServerUtcTimestamp()) - this.championshipInfo.startTime;
            if (num > 0)
            {
                this.countUpNum = num;
                this.countUpLabel = this.forTimeLabel;
                Tick.AddSecondsInvoke(this.countUp, this);
                this.surplusTimeGroup.visible = true;
                this.notStartGroup.visible = false;
                this.countDownNum = ChampionshipManager.matchOutsInfo.addBlindTime;
                this.countDownLabel = this.surplusTimeLabel;
                Tick.AddSecondsInvoke(this.countDown, this);
            } else
            {
                this.surplusTimeGroup.visible = false;
                this.notStartGroup.visible = true;
            }
            this.nowBlindLabel.text = ChampionshipManager.matchOutsInfo.nowSBlind + "/" + ChampionshipManager.matchOutsInfo.nowBBlind;
            if (ChampionshipManager.matchOutsInfo.nowAnte)
            {
                this.nowAnteLabel.text = ChampionshipManager.matchOutsInfo.nowAnte.toString();
            }
            this.nextBlindLabel.text = ChampionshipManager.matchOutsInfo.nextSBlind + "/" + ChampionshipManager.matchOutsInfo.nextBBlind;
            if (ChampionshipManager.matchOutsInfo.nextAnte)
            {
                this.nextAnteLabel.text = ChampionshipManager.matchOutsInfo.nextAnte.toString();
            }
        }
    }
    /**
     * 设置概述信息
    */
    private setApplicationInfo()
    {
        this.nameLabel.text = this.championshipInfo.definition.name;
        this.applicationFeeLabel.text = this.championshipInfo.definition.signCost + "金币" + "+" + this.championshipInfo.definition.serveCost + "服务费 " + "或 " + this.championshipInfo.definition.name + "门票1张";
        let date: Date = new Date(this.championshipInfo.startTime * 1000);
        if (this.championshipInfo.definition.delaySign)
        {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + " " + DateTimeUtil.formatDate(date, DateTimeUtil.Format_Standard_NoSecond).split(" ")[1] + "（延迟报名" + Math.floor(this.championshipInfo.definition.delaySign / 60) + "分钟）";
        } else
        {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + " " + DateTimeUtil.formatDate(date, DateTimeUtil.Format_Standard_NoSecond).split(" ")[1]
        }
        this.joinNumLabel.text = this.championshipInfo.definition.sNum + "-" + this.championshipInfo.definition.bNum + "人";
        this.initChipLabel.text = this.championshipInfo.definition.initialChips.toString();
        if (this.championshipInfo.definition.rebuy || this.championshipInfo.definition.addon)
        {
            this.getChampionshipBlindInfo(this.championshipInfo.definition.blindType);
        }
        if (this.championshipInfo.definition.rebuy)
        {
            this.rebuyGroup.visible = true;
            this.rebuyDesLabel.textFlow = TextUtil.parser(
                '可重构比赛，次数：' +
                '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.rebuy + '次' + '</font>' +
                '，第' + '<font color="#ff7f50" size="24">' + this.nthRebuy + '</font>' +
                '个盲注级别前可用' + '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.signCost + '金币' + '</font>' +
                '兑换' + '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.initialChips + '比赛筹码' + '</font>'
            );
        }
        if (this.championshipInfo.definition.addon)
        {
            this.addonGroup.visible = true;
            this.addonDesLabel.textFlow = TextUtil.parser(
                '可增构比赛，次数：' +
                '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.addon + '次' + '</font>' +
                '，第' + '<font color="#ff7f50" size="24">' + this.nthAddon + '</font>' +
                '个盲注级别前可用' + '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.signCost + '金币' + '</font>' +
                '兑换' + '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.initialChips * 2 + '比赛筹码' + '</font>'
            );
        }
        if (this.championshipInfo.isApply)
        {
            this.withdrawBtn.visible = true;
        } else
        {
            this.applicationBtn.visible = true;
        }
    }
    /**
     * 选项卡点击事件
    */
    private onTabClickHandler(e: eui.ItemTapEvent): void
    {
        if (e.itemIndex == 1)
        {
            // ChampionshipManager.reqOutsInfo(this.championshipInfo.id);
            // tod 测试代码
            if (!ChampionshipManager.matchOutsInfo)
            {
                ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
            }
            let blindInfo: ChampionshipBlindDefinition = ChampionshipBlindDefined.GetInstance().getDefinition(5);
            if (blindInfo.preBet)
            {
                ChampionshipManager.matchOutsInfo.nowAnte = blindInfo.preBet;
            }
            ChampionshipManager.matchOutsInfo.nowSBlind = blindInfo.sBlind;
            ChampionshipManager.matchOutsInfo.nowBBlind = blindInfo.bBlind;
            blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(6);
            if (blindInfo.preBet)
            {
                ChampionshipManager.matchOutsInfo.nextAnte = blindInfo.preBet;
            }
            ChampionshipManager.matchOutsInfo.nextSBlind = blindInfo.sBlind;
            ChampionshipManager.matchOutsInfo.nextBBlind = blindInfo.bBlind;
            ChampionshipManager.matchOutsInfo.rank = 12;
            ChampionshipManager.matchOutsInfo.addBlindTime = 10;
            this.setOutsInfo();
            //
        } else if (e.itemIndex == 2)
        {
            // ChampionshipManager.reqRankInfo(this.championshipInfo.id);
            this.setRankInfo() //todo 测试代码
        }
    }
    /**
     * 获得盲注,重购,增购的信息
    */
    private getChampionshipBlindInfo(type: number)
    {
        if (!ChampionshipManager.blindList)
        {
            ChampionshipManager.blindList = new Array<ChampionshipBlindDefinition>();
        }
        ChampionshipManager.blindList.length = 0;
        for (let def of ChampionshipBlindDefined.GetInstance().dataList)
        {
            if (def.type == type)
            {
                ChampionshipManager.blindList.push(def);
                if (def.rebuy)
                {
                    this.nthRebuy = def.id;
                }
                if (def.addon)
                {
                    this.nthAddon = def.id;
                }
            }
        }
        this.setBlindInfo();
    }
    /**
     * 倒计时
    */
    private countDown()
    {
        this.countDownNum--;
        this.countDownLabel.text = ChampionshipManager.countDownFormat(this.countDownNum, false);
        if (this.countDownNum <= 0)
        {
            Tick.RemoveSecondsInvoke(this.countDown, this);
            if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0 && ChampionshipManager.nowBlindRank < ChampionshipManager.blindList.length)
            {
                ChampionshipManager.nowBlindRank++;
                this.refreshNowBlindColor();
                let blindInfo: ChampionshipBlindDefinition = ChampionshipBlindDefined.GetInstance().getDefinition(ChampionshipManager.nowBlindRank);
                if (blindInfo.preBet)
                {
                    ChampionshipManager.matchOutsInfo.nowAnte = blindInfo.preBet;
                }
                ChampionshipManager.matchOutsInfo.nowSBlind = blindInfo.sBlind;
                ChampionshipManager.matchOutsInfo.nowBBlind = blindInfo.bBlind;
                if (ChampionshipManager.nowBlindRank < ChampionshipManager.blindList.length)
                {
                    blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(ChampionshipManager.nowBlindRank + 1);

                }
                if (blindInfo.preBet)
                {
                    ChampionshipManager.matchOutsInfo.nextAnte = blindInfo.preBet;
                }
                ChampionshipManager.matchOutsInfo.nextSBlind = blindInfo.sBlind;
                ChampionshipManager.matchOutsInfo.nextBBlind = blindInfo.bBlind;
                // ChampionshipManager.matchOutsInfo.addBlindTime = blindInfo.upTime;
                ChampionshipManager.matchOutsInfo.addBlindTime = 10;  //todo 测试代码
                this.setOutsInfo();
            }
        }
    }
    /**
     * 更新当前盲注级别的颜色
    */
    private refreshNowBlindColor()
    {
        let rank = this.blindList.getChildIndex(ChampionshipManager.nowBlindItem);  //避免滚动导致blindList中的项index值发生改变，所以要更新重新拿一次当前项的索引值
        ChampionshipManager.nowBlindItem.rankLabel.textColor = ColorUtil.White;
        ChampionshipManager.nowBlindItem.blindLabel.textColor = ColorUtil.White;
        ChampionshipManager.nowBlindItem.anteLabel.textColor = ColorUtil.White;
        ChampionshipManager.nowBlindItem.timeLabel.textColor = ColorUtil.White;
        if (rank < this.blindList.numChildren - 1)
        {
            let item: BlindItemRenderer = this.blindList.getChildAt(rank + 1) as BlindItemRenderer;
            item.rankLabel.textColor = ColorUtil.Golden;
            item.blindLabel.textColor = ColorUtil.Golden;
            item.anteLabel.textColor = ColorUtil.Golden;
            item.timeLabel.textColor = ColorUtil.Golden;
            ChampionshipManager.nowBlindItem = item;
        }
    }
    /**
     * 正计时
    */
    private countUp()
    {
        this.countUpNum++;
        this.countUpLabel.text = ChampionshipManager.countDownFormat(this.countUpNum, true);
        if (this.countUpNum >= 359999)
        {
            Tick.RemoveSecondsInvoke(this.countUp, this);
        }
    }
}