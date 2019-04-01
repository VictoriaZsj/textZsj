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
 * 签到面板
 */
var SignInPanel = (function (_super) {
    __extends(SignInPanel, _super);
    function SignInPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.SignInPanel;
        return _this;
    }
    SignInPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        if (!this.signIn_dp) {
            this.signIn_dp = new eui.ArrayCollection();
        }
        this.imgArray = new Array();
        this.signImg1.visible = false;
        this.signImg2.visible = false;
        this.signImg3.visible = false;
        this.signImg4.visible = false;
        this.signImg5.visible = false;
        this.signImg6.visible = false;
        this.signImg7.visible = false;
        this.imgArray.push(this.signImg1);
        this.imgArray.push(this.signImg2);
        this.imgArray.push(this.signImg3);
        this.imgArray.push(this.signImg4);
        this.imgArray.push(this.signImg5);
        this.imgArray.push(this.signImg6);
        this.imgArray.push(this.signImg7);
        UIUtil.listRenderer(this.signInList, this.signIn_scroller, SignInGoldItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    SignInPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (ActivityManager.signInHandler.isTodaySignIn) {
            this.signInBtn.touchEnabled = false;
            FilterUtil.setGray(this.signInBtn);
        }
        else if (!ActivityManager.signInHandler.isTodaySignIn) {
            this.signInBtn.touchEnabled = true;
            FilterUtil.setDefault(this.signInBtn);
        }
        this.refreshUI();
    };
    SignInPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.signIn_dp = new eui.ArrayCollection(ActivityManager.signInHandler.signInList);
        this.signInList.dataProvider = this.signIn_dp;
        this.defLabel(SignInDay.signInThree);
        this.defLabel(SignInDay.signInFive);
        this.defLabel(SignInDay.signInSeven);
    };
    SignInPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.signInBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        UIUtil.hideScrollerBar(this.signIn_scroller);
    };
    SignInPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.signInBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    /**
     * 点击签到
    */
    SignInPanel.prototype.onClickHandler = function () {
        var callBack = function () {
            ActivityManager.signInHandler.isTodaySignIn;
            this.signInBtn.touchEnabled = false;
            ActivityManager.signInHandler.signInDayNum = ActivityManager.signInHandler.signInDayNum + 1;
            ActivityManager.signInHandler.lastTime = this.today.getTime();
            this.refreshUI();
        };
        var index = ActivityManager.signInHandler.signInDayNum - 1;
        var signInGoldItemRenderer = this.signInList.getChildAt(index);
        var id = signInGoldItemRenderer.bindData.definition.id;
        var subId = signInGoldItemRenderer.bindData.definition.subId;
        PropertyManager.OpenGet();
        SocketManager.AddCommandListener(Command.Activity_GetPrize_3202, callBack, this);
        SocketManager.Send(Command.Activity_GetPrize_3202, { "Id": id, "subId": subId });
    };
    /**
     * 相应奖励描述
    */
    SignInPanel.prototype.defLabel = function (dayNum) {
        var awardDef = AwardDefined.GetInstance().getAwardDefinition(ActivityManager.signInHandler.signInList[dayNum].definition.pilePrize);
        for (var _i = 0, _a = awardDef.rewardList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (dayNum == SignInDay.signInThree) {
                this.threeDay.text = "金币x" + def.count.toString();
            }
            if (dayNum == SignInDay.signInFive) {
                this.fiveDay.text = "金币x" + def.count.toString();
            }
            if (dayNum = SignInDay.signInSeven) {
                this.sevenDay.text = "钻石x" + def.count.toString();
            }
        }
    };
    /**
     * 刷新签到天数UI
    */
    SignInPanel.prototype.refreshUI = function () {
        for (var i = 0; i < ActivityManager.signInHandler.signInDayNum - 1; i++) {
            var signInGoldItemRenderer = this.signInList.getChildAt(i);
            signInGoldItemRenderer.signInCheck.visible = true;
            this.imgArray[i].visible = true;
        }
    };
    return SignInPanel;
}(BasePanel));
__reflect(SignInPanel.prototype, "SignInPanel");
//# sourceMappingURL=SignInPanel.js.map