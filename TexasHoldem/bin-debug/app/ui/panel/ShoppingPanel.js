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
 * 商城面板
*/
var ShoppingPanel = (function (_super) {
    __extends(ShoppingPanel, _super);
    // public cardComp:CardFaceComponent;
    // public winCardComp:WinCardComponent;
    function ShoppingPanel() {
        var _this = _super.call(this) || this;
        _this._isMaskClickClose = true;
        _this.skinName = UISkinName.ShoppingPanel;
        return _this;
    }
    // 只执行一次
    ShoppingPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.gold_scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.diamond_scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        if (!this.gold_dp) {
            this.gold_dp = new eui.ArrayCollection();
        }
        if (!this.diamond_dp) {
            this.diamond_dp = new eui.ArrayCollection();
        }
        ;
        if (!this.vip_dp) {
            this.vip_dp = new eui.ArrayCollection();
        }
        ;
        UIUtil.listRenderer(this.goldList, this.gold_scroller, GoldListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.diamondList, this.diamond_scroller, DiamondListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.vipList, this.vip_scroller, VipListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.diamondNumLabel.text = MathUtil.formatNum(UserManager.userInfo.diamond);
        this.goldNumLabel.text = MathUtil.formatNum(UserManager.userInfo.gold);
    };
    // 每次打开都会执行
    ShoppingPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var array = new Array();
        array.push(this.goldGroup);
        array.push(this.diamondGroup);
        array.push(this.vipGroup);
        if (appendData && appendData.tab != null) {
            this.shoppingTab.init(array, { enterTabindex: appendData.tab });
        }
        else {
            this.shoppingTab.init(array);
        }
    };
    ShoppingPanel.prototype.onEnterAnmComplete = function () {
        if (this.isLoadComplete) {
            this.refreshUI();
        }
        _super.prototype.onEnterAnmComplete.call(this);
    };
    ShoppingPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        // 购买金币
        this.goldList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.BuyClickHandler, this);
        this.diamondList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.BuyClickHandler, this);
        this.vipList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.BuyClickHandler, this);
        ShoppingManager.buyOverAction.addListener(this.refreshProperty, this); // 添加事件监听
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        UIUtil.hideScrollerBar(this.gold_scroller);
        UIUtil.hideScrollerBar(this.diamond_scroller);
        UIUtil.hideScrollerBar(this.vip_scroller);
    };
    ShoppingPanel.prototype.onClickHandler = function () {
        // this.cardComp.seatPlay();
        // this.winCardComp.winPlay()
    };
    ShoppingPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.goldList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.BuyClickHandler, this);
        this.diamondList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.BuyClickHandler, this);
        this.vipList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.BuyClickHandler, this);
        ShoppingManager.buyOverAction.removeListener(this.refreshProperty, this); // 移除事件监听
    };
    /**
     * 点击按钮状态改变事件处理
    */
    ShoppingPanel.prototype.changeActive = function (event) {
        event.target.selected == true;
        if (event.target.selected != this.activeBtnFlage)
            this.activeBtnFlage.selected = false;
        this.activeBtnFlage = event.target;
    };
    /**
     * 渲染信息
    */
    ShoppingPanel.prototype.refreshUI = function () {
        this.gold_dp = new eui.ArrayCollection(ShoppingManager.goldList);
        this.goldList.dataProvider = this.gold_dp;
        this.diamond_dp = new eui.ArrayCollection(ShoppingManager.diamondList);
        this.diamondList.dataProvider = this.diamond_dp;
        this.vip_dp = new eui.ArrayCollection(ShoppingManager.vipList);
        this.vipList.dataProvider = this.vip_dp;
        this.diamondNumLabel.text = MathUtil.formatNum(UserManager.userInfo.diamond);
        this.goldNumLabel.text = MathUtil.formatNum(UserManager.userInfo.gold);
    };
    ShoppingPanel.prototype.refreshProperty = function () {
        this.diamondNumLabel.text = MathUtil.formatNum(UserManager.userInfo.diamond);
        this.goldNumLabel.text = MathUtil.formatNum(UserManager.userInfo.gold);
        UIManager.showFloatTips("购买成功了");
    };
    /**
     * 购买金币/钻石选择
    */
    ShoppingPanel.prototype.BuyClickHandler = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        var awardDef;
        switch (event.target) {
            case this.goldList:
                awardDef = AwardDefined.GetInstance().getAwardDefinition(this.goldList.selectedItem.definition.awardId);
                if (awardDef) {
                    var goldIndex = awardDef.costType.indexOf(CostType.RMB);
                    AlertManager.showAlertObj({ message: StringUtil.format("是否花费{0}元，购买{1}？", awardDef.costNum[goldIndex], awardDef.name), OnConfirm: this.tryPay, confirmParam: this.goldList.selectedItem, isSingle: false });
                }
                break;
            case this.diamondList:
                awardDef = AwardDefined.GetInstance().getAwardDefinition(this.diamondList.selectedItem.definition.awardId);
                if (awardDef) {
                    var diamondIndex = awardDef.costType.indexOf(CostType.RMB);
                    AlertManager.showAlertObj({ message: StringUtil.format("是否花费{0}元，购买{1}？", awardDef.costNum[diamondIndex], awardDef.name), OnConfirm: this.tryPay, confirmParam: this.diamondList.selectedItem, isSingle: false });
                }
                break;
            case this.vipList:
                awardDef = AwardDefined.GetInstance().getAwardDefinition(this.vipList.selectedItem.definition.awardId);
                if (awardDef) {
                    var vipIndex = awardDef.costType.indexOf(CostType.Diamond);
                    if (UserManager.userInfo.diamond >= awardDef.costNum[vipIndex]) {
                        AlertManager.showAlertObj({ message: StringUtil.format("是否花费{0}钻石，购买{1}？", awardDef.costNum[vipIndex], awardDef.name), OnConfirm: this.tryPay, confirmParam: this.vipList.selectedItem, isSingle: false });
                    }
                    else {
                        CostManager.showBuyDiamond(this.goDiamondGp.bind(this));
                    }
                }
                break;
        }
    };
    ShoppingPanel.prototype.goDiamondGp = function () {
        this.shoppingTab.setSelectIndex(ShoppingGpIndex.Diamond);
    };
    ShoppingPanel.prototype.tryPay = function (obj) {
        if (obj) {
            ChannelManager.PaySend(obj.id);
        }
    };
    return ShoppingPanel;
}(BackHomeAnimePanel));
__reflect(ShoppingPanel.prototype, "ShoppingPanel");
//# sourceMappingURL=ShoppingPanel.js.map