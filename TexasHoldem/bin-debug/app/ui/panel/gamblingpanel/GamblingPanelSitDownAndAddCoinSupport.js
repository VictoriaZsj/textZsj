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
 * 坐下/增加金币 逻辑支持
 */
var GamblingPanelSitDownAndAddCoinSupport = (function (_super) {
    __extends(GamblingPanelSitDownAndAddCoinSupport, _super);
    function GamblingPanelSitDownAndAddCoinSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelSitDownAndAddCoinSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            pit.headComponent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
        }
        this.target.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyTapHandler, this);
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            pit.headComponent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
        }
        this.target.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyTapHandler, this);
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.pitTouchHandler = function (event) {
        var headComponent = event.currentTarget;
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            if (pit.headComponent == headComponent && GamblingManager.roomInfo) {
                var pos = this.target.getPlayerPos(pit);
                var maxNum = Math.min(GamblingManager.roomInfo.definition.bBuyin, UserManager.userInfo.gold);
                var minNum = GamblingManager.roomInfo.definition.sBuyin;
                var bBlind = GamblingManager.roomInfo.bBlind;
                UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { isAddCoin: false, maxNum: maxNum, minNum: minNum, bBlind: bBlind, pos: pos });
                break;
            }
        }
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.buyTapHandler = function (event) {
        if (GamblingManager.self) {
            var maxNum = GamblingManager.self.bankRoll + UserManager.userInfo.gold;
            maxNum = Math.min(GamblingManager.roomInfo.definition.bBuyin, maxNum);
            var minNum = GamblingManager.self.bankRoll;
            if (minNum >= maxNum) {
                //UIManager.showFloatTips("金币已达上限！");
                //return;
                minNum = maxNum;
            }
            var bBlind = GamblingManager.roomInfo.bBlind;
            UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { isAddCoin: true, maxNum: maxNum, minNum: minNum, bBlind: bBlind });
        }
        else {
            UIManager.showPanel(UIModuleName.ShoppingPanel);
        }
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return GamblingPanelSitDownAndAddCoinSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelSitDownAndAddCoinSupport.prototype, "GamblingPanelSitDownAndAddCoinSupport");
//# sourceMappingURL=GamblingPanelSitDownAndAddCoinSupport.js.map