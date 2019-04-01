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
 * 买入游戏面板
 */
var BuyAccessGamePanel = (function (_super) {
    __extends(BuyAccessGamePanel, _super);
    function BuyAccessGamePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.BuyAccessGamePanel;
        return _this;
    }
    BuyAccessGamePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    BuyAccessGamePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (UserManager.userInfo.gold < appendData.minNum) {
            this.buyAccessGp.visible = false;
            this.unEnoughGoldHandle(appendData.minNum);
            this.unEnoughGoldGp.visible = true;
        }
        else {
            this.unEnoughGoldGp.visible = false;
            this.buyAccessGp.visible = true;
            this.smallestLabel.text = MathUtil.formatNum(appendData.minNum);
            this.biggestLabel.text = MathUtil.formatNum(appendData.maxNum);
            this.currentProperty.text = MathUtil.formatNum(UserManager.userInfo.gold);
            this.buyAccessHs.minimum = appendData.minNum;
            this.buyAccessHs.maximum = appendData.maxNum;
            this.buyAccessHs.value = this.buyAccessHs.minimum;
            this.buyAccessHs.snapInterval = appendData.bBlind;
            this.countLable.text = "$" + MathUtil.formatNum(this.buyAccessHs.value);
            if (GamblingManager.roomInfo) {
                if (GamblingManager.roomInfo.isAutoBuy != undefined) {
                    this.autoBuyCheck.selected = GamblingManager.roomInfo.isAutoBuy;
                }
                else {
                    this.autoBuyCheck.selected = true; //默认选中
                }
            }
        }
    };
    BuyAccessGamePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    BuyAccessGamePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.buyAccessHs.addEventListener(egret.Event.CHANGE, this.countBuyGold, this);
        this.buyNowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
        this.shoppingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
        this.buyAccessBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyAccessHandle, this);
        GamblingManager.BuyInGameEvent.addListener(this.buyInGameHandler, this);
        GamblingManager.AddCoinEvent.addListener(this.buyInGameHandler, this);
    };
    BuyAccessGamePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.buyAccessHs.removeEventListener(egret.Event.CHANGE, this.countBuyGold, this);
        this.buyNowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
        this.shoppingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
        this.buyAccessBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyAccessHandle, this);
        GamblingManager.BuyInGameEvent.removeListener(this.buyInGameHandler, this);
        GamblingManager.AddCoinEvent.removeListener(this.buyInGameHandler, this);
    };
    /**
     * 进入商城充值
     */
    BuyAccessGamePanel.prototype.goShopping = function (event) {
        this.onCloseBtnClickHandler(null);
        UIManager.showPanel(UIModuleName.ShoppingPanel);
    };
    /**
     * 买入游戏处理
    */
    BuyAccessGamePanel.prototype.buyAccessHandle = function (event) {
        if (this.panelData.isAddCoin) {
            GamblingManager.reqAddCoin(this.buyAccessHs.value);
        }
        else {
            GamblingManager.reqBuyInGame(this.buyAccessHs.value, this.autoBuyCheck.selected, this.panelData.pos);
        }
    };
    BuyAccessGamePanel.prototype.buyInGameHandler = function () {
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 金币不足处理
    */
    BuyAccessGamePanel.prototype.unEnoughGoldHandle = function (smallestGold) {
        //当前资产与最小买入的差值
        var goldOffset = smallestGold - UserManager.userInfo.gold;
        // let awardDef = AwardDefined.GetInstance().(ShoppingManager.awardGoldList.id,ShoppingManager.awardGoldList)
        // let goldIndex=awardDef.costType.indexOf(CostType.RMB);
        if (ShoppingManager.awardGoldList.length > 0) {
            for (var i = 0; i < ShoppingManager.awardGoldList.length; i++) {
                if (i == 0) {
                    if (goldOffset < ShoppingManager.awardGoldList[i].rewardNum[0]) {
                        this.priceLabel.text = "仅需" + ShoppingManager.awardGoldList[i].costNum[0] + "元";
                        this.goldLabel.text = ShoppingManager.awardGoldList[i].name;
                        return;
                    }
                }
                ;
                if (i > 0) {
                    if (ShoppingManager.awardGoldList[i - 1].rewardNum[0] < goldOffset && goldOffset < ShoppingManager.awardGoldList[i].rewardNum[0]) {
                        this.priceLabel.text = "仅需" + ShoppingManager.awardGoldList[i].costNum[0] + "元";
                        this.goldLabel.text = ShoppingManager.awardGoldList[i].name;
                        return;
                    }
                }
            }
        }
    };
    /**
     * 计算买入金币
    */
    BuyAccessGamePanel.prototype.countBuyGold = function (event) {
        this.countLable.text = "$" + MathUtil.formatNum(this.buyAccessHs.value);
    };
    return BuyAccessGamePanel;
}(BasePanel));
__reflect(BuyAccessGamePanel.prototype, "BuyAccessGamePanel");
//# sourceMappingURL=BuyAccessGamePanel.js.map