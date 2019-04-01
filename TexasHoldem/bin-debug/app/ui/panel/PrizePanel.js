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
 * 我的奖品面板
*/
var PrizePanel = (function (_super) {
    __extends(PrizePanel, _super);
    function PrizePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.PrizePanel;
        return _this;
    }
    PrizePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIUtil.listRenderer(this.notReceiveList, this.notReceiveScroller, MyAwardPanelItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.hasReceiveList, this.hasReceiveScroller, MyAwardPanelItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.notReceiveScroller.scrollPolicyH = this.hasReceiveScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.disAwardGroup.visible = this.enAwardGroup.visible = this.disHasReceiveGroup.visible = false;
        this.nameLabel.type = this.telLabel.type = this.qqLabel.type = this.emailLabel.type = this.addressLabel.type = egret.TextFieldType.INPUT;
        var array = new Array();
        array.push(this.notReceiveGroup);
        array.push(this.hasReceiveGroup);
        array.push(this.receiveAwardInfoGroup);
        this.tabComponent.init(array);
    };
    PrizePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        //发送获得我的奖品列表信息的请求
        // MyAwardManager.reqGetAwardList();
        this.setAwardListInfo(); //todo 测试代码
    };
    PrizePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        PrizeManager.onGetAwardListEvent.addListener(this.setAwardListInfo, this);
        this.tabComponent.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        this.saveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveBtnClick, this);
    };
    PrizePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        PrizeManager.onGetAwardListEvent.removeListener(this.setAwardListInfo, this);
        this.tabComponent.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabClickHandler, this);
        this.saveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveBtnClick, this);
    };
    /**
     * 选项卡按钮点击事件
    */
    PrizePanel.prototype.onTabClickHandler = function (e) {
        if (e.itemIndex == 0) {
            //发送请求更新未领取奖品列表
            // MyAwardManager.reqGetAwardList();
            this.setAwardListInfo(); //todo 测试代码
        }
        else if (e.itemIndex == 1) {
            if (PrizeManager.hasReceiveList.length > 0) {
                PrizeManager.renderFlag = 2;
                this.hasReceiveList.dataProvider = new eui.ArrayCollection(PrizeManager.hasReceiveList);
                this.enHasReceiveGroup.visible = true;
                this.disHasReceiveGroup.visible = false;
            }
            else {
                this.enHasReceiveGroup.visible = false;
                this.disHasReceiveGroup.visible = true;
            }
        }
        else if (e.itemIndex == 2) {
            this.nameLabel.text = UserManager.userInfo.addressName;
            this.telLabel.text = UserManager.userInfo.phoneNum;
            this.qqLabel.text = UserManager.userInfo.qqNum;
            this.emailLabel.text = UserManager.userInfo.address;
        }
    };
    /**
     * 领奖信息保存
    */
    PrizePanel.prototype.onSaveBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.nameLabel.text || this.telLabel.text || this.qqLabel.text || this.emailLabel.text) {
            if (this.nameLabel.text.trim() == UserManager.userInfo.addressName && this.telLabel.text.trim() == UserManager.userInfo.phoneNum && this.qqLabel.text.trim() == UserManager.userInfo.qqNum && this.emailLabel.text.trim() == UserManager.userInfo.address) {
                return;
            }
            else {
                //发送保存请求  
                PrizeManager.reqSaveInfo(this.nameLabel.text.trim(), parseInt(this.telLabel.text.trim()), parseInt(this.qqLabel.text.trim()), this.emailLabel.text.trim(), this.addressLabel.text.trim());
            }
        }
        else {
            UIManager.showFloatTips("领奖信息必须填写完整！");
        }
    };
    /**
     * 设置未领取奖品列表信息
    */
    PrizePanel.prototype.setAwardListInfo = function () {
        //todo 测试代码
        if (!PrizeManager.notReceiveList) {
            PrizeManager.notReceiveList = new Array();
        }
        if (!PrizeManager.hasReceiveList) {
            PrizeManager.hasReceiveList = new Array();
        }
        PrizeManager.hasReceiveList = [];
        PrizeManager.notReceiveList = [];
        var arr1 = new PrizeInfo();
        arr1.id = 1;
        arr1.name = "100元话费";
        arr1.state = PrizeState.NotReceive;
        var arr2 = new PrizeInfo();
        arr2.id = 2;
        arr2.name = "100元话费";
        arr2.state = PrizeState.NotReceive;
        var arr3 = new PrizeInfo();
        arr3.id = 3;
        arr3.name = "10元话费";
        arr3.des = "可兑换10元话费";
        arr3.effectType = 3;
        arr3.state = PrizeState.Underway;
        PrizeManager.notReceiveList.push(arr1);
        PrizeManager.notReceiveList.push(arr2);
        PrizeManager.hasReceiveList.push(arr3);
        //
        if (PrizeManager.notReceiveList.length > 0) {
            PrizeManager.renderFlag = 1;
            this.enAwardGroup.visible = true;
            this.notReceiveList.dataProvider = new eui.ArrayCollection(PrizeManager.notReceiveList);
        }
        else {
            this.disAwardGroup.visible = true;
        }
    };
    return PrizePanel;
}(BasePanel));
__reflect(PrizePanel.prototype, "PrizePanel");
//# sourceMappingURL=PrizePanel.js.map