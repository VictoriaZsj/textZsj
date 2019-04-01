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
 * 锦标赛赛事列表项面板
*/
var ChampionshipItemRenderer = (function (_super) {
    __extends(ChampionshipItemRenderer, _super);
    function ChampionshipItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ChampionshipItemRenderer;
        return _this;
    }
    ChampionshipItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    ChampionshipItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.rebuyImg.visible = false;
            this.addonImg.visible = false;
            this.goldImg.visible = false;
            this.notStartGroup.visible = false;
            this.underwayLabel.visible = false;
            this.enterBtn.visible = false;
            this.applyBtn.visible = false;
            this.waitLabel.visible = false;
            // this.iconImg.source = this.bindData.icon;
            this.iconImg.source = ImageSource.TestImg; //todo 测试代码
            this.nameLabel.text = this.bindData.definition.name;
            this.numLabel.text = this.bindData.applyNum + "/" + this.bindData.definition.bNum;
            if (this.bindData.isApply == 1) {
                this.waitLabel.visible = true;
            }
            else {
                this.applyBtn.visible = true;
            }
            var flag = false;
            if (ItemManager.itemList && ItemManager.itemList.length > 0) {
                for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
                    var def = _a[_i];
                    if (this.bindData.definition.ticketId == def.id) {
                        flag = true;
                        break;
                    }
                }
            }
            if (flag) {
                this.priceLabel.text = this.bindData.definition.name + "门票";
                this.priceLabel.x = 0;
            }
            else {
                this.goldImg.visible = true;
                this.priceLabel.text = this.bindData.definition.signCost + "+" + this.bindData.definition.serveCost;
            }
            if (this.bindData.definition.addon) {
                this.addonImg.visible = true;
            }
            if (this.bindData.definition.rebuy) {
                this.rebuyImg.visible = true;
            }
            if (TimeManager.GetServerUtcTimestamp() >= this.bindData.startTime) {
                this.countDownOver();
            }
            else if ((this.bindData.startTime - TimeManager.GetServerUtcTimestamp()) <= 300) {
                this.notStartGroup.visible = true;
                this.timeDesLabel.text = "即将开始";
                this.countDownNum = Math.floor(this.bindData.startTime - TimeManager.GetServerUtcTimestamp());
                Tick.AddSecondsInvoke(this.countDown, this);
                if ((this.bindData.startTime - TimeManager.GetServerUtcTimestamp()) < 60) {
                    if (this.bindData.isApply == 1) {
                        this.waitLabel.visible = false;
                        this.enterBtn.visible = true;
                    }
                }
            }
            else {
                this.notStartGroup.visible = true;
                var date = new Date(this.bindData.startTime * 1000);
                if (this.bindData.startTime - TimeManager.GetServerUtcTimestamp() > 3600 * 24) {
                    this.timeDesLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
                }
                else {
                    this.timeDesLabel.text = "今日";
                }
                this.timeLabel.text = DateTimeUtil.formatDate(date, DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.applyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onaApplyBtnClick, this);
            this.applyBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterBtnClick, this);
            this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            ChampionshipManager.onRequestJoinEvent.addListener(this.requestJoinSuccess, this);
        }
    };
    ChampionshipItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.applyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onaApplyBtnClick, this);
        this.applyBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterBtnClick, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        ChampionshipManager.onRequestJoinEvent.removeListener(this.requestJoinSuccess, this);
        Tick.RemoveSecondsInvoke(this.countDown, this);
    };
    /**
     * 立即报名成功
    */
    ChampionshipItemRenderer.prototype.requestJoinSuccess = function (joinWay) {
        this.applyBtn.visible = false;
        this.bindData.isApply = 1;
        this.bindData.applyNum++;
        this.bindData.joinWay = joinWay;
        this.numLabel.text = this.bindData.applyNum + "/" + this.bindData.definition.bNum;
        var time = this.bindData.startTime - TimeManager.GetServerUtcTimestamp();
        if (time <= 60) {
            if (time < 0) {
                UIManager.showFloatTips('直接进入比赛房间'); // todo 测试代码
            }
            else {
                this.enterBtn.visible = true;
            }
        }
        else {
            this.waitLabel.visible = true;
        }
    };
    /**
     * 立即报名点击事件
    */
    ChampionshipItemRenderer.prototype.onaApplyBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        var flag = ItemManager.isHaveTicket(this.bindData.definition.ticketId);
        if (flag) {
            // ChampionshipManager.reqRequestJoin(this.bindData.id, JoinChampionshipWay.Ticket);
        }
        else {
            if (UserManager.userInfo.gold >= this.bindData.definition.signCost + this.bindData.definition.serveCost) {
                // ChampionshipManager.reqRequestJoin(this.bindData.id, JoinChampionshipWay.Gold);                
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
    ChampionshipItemRenderer.prototype.openShoppingPanel = function () {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShoppingGpIndex.Gold });
        UIManager.closePanel(UIModuleName.ChampionshipPanel);
    };
    /**
     * 立即进入
    */
    ChampionshipItemRenderer.prototype.onEnterBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        //todo 还要判断是不是已经进入过被淘汰了  淘汰了就不可以进了
        if (TimeManager.GetServerUtcTimestamp() > this.bindData.startTime) {
            UIManager.showFloatTips("直接进入比赛房间");
        }
        else {
            UIManager.showFloatTips("进入准备房间");
        }
    };
    /**
     * 取消冒泡
    */
    ChampionshipItemRenderer.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    /**
     * 显示比赛进行中
    */
    ChampionshipItemRenderer.prototype.showUnderway = function () {
        this.underwayLabel.visible = true;
        this.notStartGroup.visible = false;
        this.enterBtn.visible = false;
        this.applyBtn.visible = false;
        this.waitLabel.visible = false;
        this.underwayLabel.text = "比赛进行中";
        ChampionshipManager.onRefreshUIEvent.dispatch(this.bindData.id);
    };
    /**
     * 倒计时
    */
    ChampionshipItemRenderer.prototype.countDown = function () {
        this.countDownNum--;
        this.timeLabel.text = ChampionshipManager.countDownFormat(this.countDownNum, false);
        if (this.countDownNum < 60 && this.bindData.isApply == 1) {
            this.waitLabel.visible = false;
            this.enterBtn.visible = true;
        }
        if (this.countDownNum <= 0) {
            this.countDownOver();
        }
    };
    /**
     * 倒计时结束操作(延迟时间内操作)
    */
    ChampionshipItemRenderer.prototype.countDownOver = function () {
        if (this.bindData.definition.delaySign) {
            if (TimeManager.GetServerUtcTimestamp() >= this.bindData.startTime + this.bindData.definition.delaySign) {
                this.showUnderway();
            }
            else {
                this.notStartGroup.visible = true;
                this.timeDesLabel.text = "延迟报名";
                if (this.bindData.isApply == 1) {
                    this.waitLabel.visible = false;
                    this.enterBtn.visible = true;
                }
                this.countDownNum = Math.floor(this.bindData.startTime + this.bindData.definition.delaySign - TimeManager.GetServerUtcTimestamp());
                Tick.AddSecondsInvoke(this.countDown, this);
            }
        }
        else {
            this.showUnderway();
        }
    };
    return ChampionshipItemRenderer;
}(BaseItemRenderer));
__reflect(ChampionshipItemRenderer.prototype, "ChampionshipItemRenderer");
//# sourceMappingURL=ChampionshipItemRenderer.js.map