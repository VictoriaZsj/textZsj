var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消费管理
 */
var CostManager = (function () {
    function CostManager() {
    }
    /**
     * 验证钻石不足
     */
    CostManager.verifyDiamond = function (diamond, isShowTips) {
        if (isShowTips === void 0) { isShowTips = false; }
        if (diamond <= UserManager.userInfo.diamond) {
            return true;
        }
        if (isShowTips) {
            CostManager.showBuyDiamond();
        }
        return false;
    };
    /**
     * 显示购买钻石提示
     */
    CostManager.showBuyDiamond = function (callback) {
        if (callback) {
            AlertManager.showConfirm("钻石数量不足，是否前往充值？", callback);
        }
        else {
            CostManager.currentTab = ShoppingGpIndex.Diamond;
            AlertManager.showConfirm("钻石数量不足，是否前往充值？", CostManager.gotoShoppingPanel);
        }
    };
    /**
     * 验证金币不足
     */
    CostManager.verifyGold = function (gold, isShowTips) {
        if (isShowTips === void 0) { isShowTips = false; }
        if (gold <= UserManager.userInfo.gold) {
            return true;
        }
        if (isShowTips) {
            CostManager.showBuyGold();
        }
        return false;
    };
    /**
     * 显示购买金币提示
     */
    CostManager.showBuyGold = function (callback) {
        if (callback) {
            AlertManager.showConfirm("金币数量不足，是否前往充值？", callback);
        }
        else {
            CostManager.currentTab = ShoppingGpIndex.Gold;
            AlertManager.showConfirm("金币数量不足，是否前往充值？", CostManager.gotoShoppingPanel);
        }
    };
    CostManager.gotoShoppingPanel = function () {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: CostManager.currentTab });
    };
    CostManager.currentTab = 0;
    return CostManager;
}());
__reflect(CostManager.prototype, "CostManager");
//# sourceMappingURL=CostManager.js.map