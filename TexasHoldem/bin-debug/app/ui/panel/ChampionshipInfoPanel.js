var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 锦标赛赛事信息面板
 */
var ChampionshipInfoPanel = (function (_super) {
    __extends(ChampionshipInfoPanel, _super);
    function ChampionshipInfoPanel() {
        var _this = _super.call(this) || this;
        _this.championshipInfo = new MatchRoomInfo();
        _this.skinName = UISkinName.ChampionshipInfoPanel;
        return _this;
    }
    ChampionshipInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIUtil.listRenderer(this.rankList, this.rankScroller, ChampionshipRankItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.blindList, this.blindScroller, BlindItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.awardList, this.awardScroller, AwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.rankScroller.scrollPolicyH = this.blindScroller.scrollPolicyH = this.awardScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        var array = new Array();
        array.push(this.baseInfoGroup);
        array.push(this.outsGroup);
        array.push(this.rankGroup);
        array.push(this.blindGroup);
        array.push(this.awardGroup);
        this.matchInfoTab.init(array);
    };
    ChampionshipInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.championshipInfo = appendData.championshipInfo;
    };
    ChampionshipInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.rebuyGroup.visible = this.addonGroup.visible = this.applicationBtn.visible = this.withdrawBtn.visible = this.hasJoinGroup.visible = this.noJoinGroup.visible = false;
        this.setApplicationInfo();
        this.setAwardInfo();
        // ChampionshipManager.reqOutsInfo(this.championshipInfo.id);
        // tod 测试代码
        if (!ChampionshipManager.matchOutsInfo) {
            ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
        }
        var blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(5);
        if (blindInfo.preBet) {
            ChampionshipManager.matchOutsInfo.nowAnte = blindInfo.preBet;
        }
        ChampionshipManager.matchOutsInfo.nowSBlind = blindInfo.sBlind;
        ChampionshipManager.matchOutsInfo.nowBBlind = blindInfo.bBlind;
        blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(6);
        if (blindInfo.preBet) {
            ChampionshipManager.matchOutsInfo.nextAnte = blindInfo.preBet;
        }
        ChampionshipManager.matchOutsInfo.nextSBlind = blindInfo.sBlind;
        ChampionshipManager.matchOutsInfo.nextBBlind = blindInfo.bBlind;
        ChampionshipManager.matchOutsInfo.rank = 12;
        ChampionshipManager.matchOutsInfo.addBlindTime = 10;
        this.setOutsInfo();
        //
        ChampionshipManager.nowBlindRank = 5; //todo 测试代码
    };
    ChampionshipInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.matchInfoTab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        ChampionshipManager.OnOutsInfoEvent.addListener(this.setOutsInfo, this);
        ChampionshipManager.OnRankInfoEvent.addListener(this.setRankInfo, this);
        this.applicationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplicationBtnClick, this);
        this.withdrawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdrawBtnClick, this);
        ChampionshipManager.OnWithdrawEvent.addListener(this.closePanel, this);
        ChampionshipManager.onRequestJoinEvent.addListener(this.joinSuccess, this);
    };
    ChampionshipInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.matchInfoTab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        ChampionshipManager.OnOutsInfoEvent.removeListener(this.setOutsInfo, this);
        ChampionshipManager.OnRankInfoEvent.removeListener(this.setRankInfo, this);
        Tick.RemoveSecondsInvoke(this.countDown, this);
        Tick.RemoveSecondsInvoke(this.countUp, this);
        this.applicationBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onApplicationBtnClick, this);
        this.withdrawBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWithdrawBtnClick, this);
        ChampionshipManager.OnWithdrawEvent.removeListener(this.closePanel, this);
        ChampionshipManager.onRequestJoinEvent.removeListener(this.joinSuccess, this);
    };
    /**
     * 报名成功执行的事件
    */
    ChampionshipInfoPanel.prototype.joinSuccess = function () {
        this.applicationBtn.visible = false;
        this.withdrawBtn.visible = true;
    };
    /**
     * 退赛成功后关闭面板
    */
    ChampionshipInfoPanel.prototype.closePanel = function (joinWay) {
        UIManager.closePanel(UIModuleName.ChampionshipInfoPanel);
        UIManager.closePanel(UIModuleName.ChampionshipPanel);
        if (joinWay == JoinChampionshipWay.Ticket) {
            AlertManager.showAlert("退赛成功，您的门票已返回账户");
        }
        else {
            AlertManager.showAlert("退赛成功，报名费已返回账户");
        }
    };
    /**
     * 退赛按钮点击事件
    */
    ChampionshipInfoPanel.prototype.onWithdrawBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (TimeManager.GetServerUtcTimestamp() >= this.championshipInfo.startTime) {
            AlertManager.showAlert("比赛已经开启，不可退赛。");
        }
        else if (this.championshipInfo.joinWay == JoinChampionshipWay.Ticket) {
            // ChampionshipManager.reqWithdraw(this.championshipInfo.id, this.championshipInfo.joinWay);
            UIManager.showFloatTips('退赛'); //todo 测试代码
        }
        else {
            AlertManager.showConfirm("提示：主动退赛仅退还报名费，服务费将不予退还。", this.confirmWithdraw);
        }
    };
    /**
     * 退赛提示框确认退赛按钮执行事件
    */
    ChampionshipInfoPanel.prototype.confirmWithdraw = function () {
        // ChampionshipManager.reqWithdraw(this.championshipInfo.id, this.championshipInfo.joinWay);
        UIManager.showFloatTips('退赛'); //todo 测试代码        
    };
    /**
     * 报名按钮点击事件
    */
    ChampionshipInfoPanel.prototype.onApplicationBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        var flag = ItemManager.isHaveTicket(this.championshipInfo.definition.ticketId);
        if (flag) {
            // ChampionshipManager.reqRequestJoin(this.championshipInfo.id, JoinChampionshipWay.Ticket);
        }
        else {
            if (UserManager.userInfo.gold >= this.championshipInfo.definition.signCost + this.championshipInfo.definition.serveCost) {
                // ChampionshipManager.reqRequestJoin(this.championshipInfo.id, JoinChampionshipWay.Gold);
            }
            else {
                AlertManager.showConfirm("提示：金币不足，是否花费648购买1200万金币？", this.openShoppingPanel);
            }
        }
        UIManager.showFloatTips('立即报名'); //todo 测试代码
    };
    /**
     * 打开商城面板
    */
    ChampionshipInfoPanel.prototype.openShoppingPanel = function () {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShoppingGpIndex.Gold });
        UIManager.closePanel(UIModuleName.ChampionshipPanel);
        UIManager.closePanel(UIModuleName.ChampionshipInfoPanel);
    };
    /**
     * 设置奖励信息
    */
    ChampionshipInfoPanel.prototype.setAwardInfo = function () {
        var prizeListInfo = ChampionshipManager.getAwardList(this.championshipInfo.id);
        if (!ChampionshipManager.awardList) {
            ChampionshipManager.awardList = new Array();
        }
        ChampionshipManager.awardList.length = 0;
        if (prizeListInfo && prizeListInfo.length > 0) {
            for (var _i = 0, prizeListInfo_1 = prizeListInfo; _i < prizeListInfo_1.length; _i++) {
                var def = prizeListInfo_1[_i];
                var info = new ChampionshipAwardInfo();
                var des = ChampionshipManager.getAwardName(def);
                if (des) {
                    info.des = des;
                    info.rank = def.start;
                    ChampionshipManager.awardList.push(info);
                }
            }
        }
        if (ChampionshipManager.awardList.length > 0) {
            this.awardList.dataProvider = new eui.ArrayCollection(ChampionshipManager.awardList);
        }
    };
    /**
     * 设置盲注信息
    */
    ChampionshipInfoPanel.prototype.setBlindInfo = function () {
        if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0) {
            this.blindList.dataProvider = new eui.ArrayCollection(ChampionshipManager.blindList);
        }
    };
    /**
     * 设置排名信息
    */
    ChampionshipInfoPanel.prototype.setRankInfo = function () {
        if (ChampionshipManager.rankList && ChampionshipManager.rankList.length > 0) {
            this.hasJoinGroup.visible = true;
            this.noJoinGroup.visible = false;
            this.rankList.dataProvider = new eui.ArrayCollection(ChampionshipManager.rankList);
        }
        else {
            this.hasJoinGroup.visible = false;
            this.noJoinGroup.visible = true;
        }
    };
    /**
     * 设置赛况信息
    */
    ChampionshipInfoPanel.prototype.setOutsInfo = function () {
        if (ChampionshipManager.matchOutsInfo) {
            this.rankLabel.text = "0";
            this.joinLabel.text = "0";
            this.nowAnteLabel.text = "0";
            this.nextAnteLabel.text = "0";
            this.forTimeLabel.text = "00:00:00";
            this.forTimeLabel.text = "00:00:00";
            this.surplusTimeGroup.visible = this.notStartGroup.visible = false;
            if (ChampionshipManager.matchOutsInfo.rank) {
                this.rankLabel.text = ChampionshipManager.matchOutsInfo.rank.toString();
            }
            if (this.championshipInfo.applyNum) {
                this.joinLabel.text = this.championshipInfo.applyNum.toString();
            }
            var num = Math.floor(TimeManager.GetServerUtcTimestamp()) - this.championshipInfo.startTime;
            if (num > 0) {
                this.countUpNum = num;
                this.countUpLabel = this.forTimeLabel;
                Tick.AddSecondsInvoke(this.countUp, this);
                this.surplusTimeGroup.visible = true;
                this.notStartGroup.visible = false;
                this.countDownNum = ChampionshipManager.matchOutsInfo.addBlindTime;
                this.countDownLabel = this.surplusTimeLabel;
                Tick.AddSecondsInvoke(this.countDown, this);
            }
            else {
                this.surplusTimeGroup.visible = false;
                this.notStartGroup.visible = true;
            }
            this.nowBlindLabel.text = ChampionshipManager.matchOutsInfo.nowSBlind + "/" + ChampionshipManager.matchOutsInfo.nowBBlind;
            if (ChampionshipManager.matchOutsInfo.nowAnte) {
                this.nowAnteLabel.text = ChampionshipManager.matchOutsInfo.nowAnte.toString();
            }
            this.nextBlindLabel.text = ChampionshipManager.matchOutsInfo.nextSBlind + "/" + ChampionshipManager.matchOutsInfo.nextBBlind;
            if (ChampionshipManager.matchOutsInfo.nextAnte) {
                this.nextAnteLabel.text = ChampionshipManager.matchOutsInfo.nextAnte.toString();
            }
        }
    };
    /**
     * 设置概述信息
    */
    ChampionshipInfoPanel.prototype.setApplicationInfo = function () {
        this.nameLabel.text = this.championshipInfo.definition.name;
        this.applicationFeeLabel.text = this.championshipInfo.definition.signCost + "金币" + "+" + this.championshipInfo.definition.serveCost + "服务费 " + "或 " + this.championshipInfo.definition.name + "门票1张";
        var date = new Date(this.championshipInfo.startTime * 1000);
        if (this.championshipInfo.definition.delaySign) {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + " " + DateTimeUtil.formatDate(date, DateTimeUtil.Format_Standard_NoSecond).split(" ")[1] + "（延迟报名" + Math.floor(this.championshipInfo.definition.delaySign / 60) + "分钟）";
        }
        else {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + " " + DateTimeUtil.formatDate(date, DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
        }
        this.joinNumLabel.text = this.championshipInfo.definition.sNum + "-" + this.championshipInfo.definition.bNum + "人";
        this.initChipLabel.text = this.championshipInfo.definition.initialChips.toString();
        if (this.championshipInfo.definition.rebuy || this.championshipInfo.definition.addon) {
            this.getChampionshipBlindInfo(this.championshipInfo.definition.blindType);
        }
        if (this.championshipInfo.definition.rebuy) {
            this.rebuyGroup.visible = true;
            this.rebuyDesLabel.textFlow = TextUtil.parser('可重构比赛，次数：' +
                '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.rebuy + '次' + '</font>' +
                '，第' + '<font color="#ff7f50" size="24">' + this.nthRebuy + '</font>' +
                '个盲注级别前可用' + '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.signCost + '金币' + '</font>' +
                '兑换' + '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.initialChips + '比赛筹码' + '</font>');
        }
        if (this.championshipInfo.definition.addon) {
            this.addonGroup.visible = true;
            this.addonDesLabel.textFlow = TextUtil.parser('可增构比赛，次数：' +
                '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.addon + '次' + '</font>' +
                '，第' + '<font color="#ff7f50" size="24">' + this.nthAddon + '</font>' +
                '个盲注级别前可用' + '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.signCost + '金币' + '</font>' +
                '兑换' + '<font color="#ff7f50" size="24">' + this.championshipInfo.definition.initialChips * 2 + '比赛筹码' + '</font>');
        }
        if (this.championshipInfo.isApply) {
            this.withdrawBtn.visible = true;
        }
        else {
            this.applicationBtn.visible = true;
        }
    };
    /**
     * 选项卡点击事件
    */
    ChampionshipInfoPanel.prototype.onTabClickHandler = function (e) {
        if (e.itemIndex == 1) {
            // ChampionshipManager.reqOutsInfo(this.championshipInfo.id);
            // tod 测试代码
            if (!ChampionshipManager.matchOutsInfo) {
                ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
            }
            var blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(5);
            if (blindInfo.preBet) {
                ChampionshipManager.matchOutsInfo.nowAnte = blindInfo.preBet;
            }
            ChampionshipManager.matchOutsInfo.nowSBlind = blindInfo.sBlind;
            ChampionshipManager.matchOutsInfo.nowBBlind = blindInfo.bBlind;
            blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(6);
            if (blindInfo.preBet) {
                ChampionshipManager.matchOutsInfo.nextAnte = blindInfo.preBet;
            }
            ChampionshipManager.matchOutsInfo.nextSBlind = blindInfo.sBlind;
            ChampionshipManager.matchOutsInfo.nextBBlind = blindInfo.bBlind;
            ChampionshipManager.matchOutsInfo.rank = 12;
            ChampionshipManager.matchOutsInfo.addBlindTime = 10;
            this.setOutsInfo();
            //
        }
        else if (e.itemIndex == 2) {
            // ChampionshipManager.reqRankInfo(this.championshipInfo.id);
            this.setRankInfo(); //todo 测试代码
        }
    };
    /**
     * 获得盲注,重购,增购的信息
    */
    ChampionshipInfoPanel.prototype.getChampionshipBlindInfo = function (type) {
        if (!ChampionshipManager.blindList) {
            ChampionshipManager.blindList = new Array();
        }
        ChampionshipManager.blindList.length = 0;
        for (var _i = 0, _a = ChampionshipBlindDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.type == type) {
                ChampionshipManager.blindList.push(def);
                if (def.rebuy) {
                    this.nthRebuy = def.id;
                }
                if (def.addon) {
                    this.nthAddon = def.id;
                }
            }
        }
        this.setBlindInfo();
    };
    /**
     * 倒计时
    */
    ChampionshipInfoPanel.prototype.countDown = function () {
        this.countDownNum--;
        this.countDownLabel.text = ChampionshipManager.countDownFormat(this.countDownNum, false);
        if (this.countDownNum <= 0) {
            Tick.RemoveSecondsInvoke(this.countDown, this);
            if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0 && ChampionshipManager.nowBlindRank < ChampionshipManager.blindList.length) {
                ChampionshipManager.nowBlindRank++;
                this.refreshNowBlindColor();
                var blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(ChampionshipManager.nowBlindRank);
                if (blindInfo.preBet) {
                    ChampionshipManager.matchOutsInfo.nowAnte = blindInfo.preBet;
                }
                ChampionshipManager.matchOutsInfo.nowSBlind = blindInfo.sBlind;
                ChampionshipManager.matchOutsInfo.nowBBlind = blindInfo.bBlind;
                if (ChampionshipManager.nowBlindRank < ChampionshipManager.blindList.length) {
                    blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(ChampionshipManager.nowBlindRank + 1);
                }
                if (blindInfo.preBet) {
                    ChampionshipManager.matchOutsInfo.nextAnte = blindInfo.preBet;
                }
                ChampionshipManager.matchOutsInfo.nextSBlind = blindInfo.sBlind;
                ChampionshipManager.matchOutsInfo.nextBBlind = blindInfo.bBlind;
                // ChampionshipManager.matchOutsInfo.addBlindTime = blindInfo.upTime;
                ChampionshipManager.matchOutsInfo.addBlindTime = 10; //todo 测试代码
                this.setOutsInfo();
            }
        }
    };
    /**
     * 更新当前盲注级别的颜色
    */
    ChampionshipInfoPanel.prototype.refreshNowBlindColor = function () {
        var rank = this.blindList.getChildIndex(ChampionshipManager.nowBlindItem); //避免滚动导致blindList中的项index值发生改变，所以要更新重新拿一次当前项的索引值
        ChampionshipManager.nowBlindItem.rankLabel.textColor = ColorUtil.White;
        ChampionshipManager.nowBlindItem.blindLabel.textColor = ColorUtil.White;
        ChampionshipManager.nowBlindItem.anteLabel.textColor = ColorUtil.White;
        ChampionshipManager.nowBlindItem.timeLabel.textColor = ColorUtil.White;
        if (rank < this.blindList.numChildren - 1) {
            var item = this.blindList.getChildAt(rank + 1);
            item.rankLabel.textColor = ColorUtil.Golden;
            item.blindLabel.textColor = ColorUtil.Golden;
            item.anteLabel.textColor = ColorUtil.Golden;
            item.timeLabel.textColor = ColorUtil.Golden;
            ChampionshipManager.nowBlindItem = item;
        }
    };
    /**
     * 正计时
    */
    ChampionshipInfoPanel.prototype.countUp = function () {
        this.countUpNum++;
        this.countUpLabel.text = ChampionshipManager.countDownFormat(this.countUpNum, true);
        if (this.countUpNum >= 359999) {
            Tick.RemoveSecondsInvoke(this.countUp, this);
        }
    };
    return ChampionshipInfoPanel;
}(BasePanel));
__reflect(ChampionshipInfoPanel.prototype, "ChampionshipInfoPanel");
//# sourceMappingURL=ChampionshipInfoPanel.js.map