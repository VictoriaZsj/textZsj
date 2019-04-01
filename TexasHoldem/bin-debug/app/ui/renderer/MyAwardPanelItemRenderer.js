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
 * 我的礼物渲染项
 */
var MyAwardPanelItemRenderer = (function (_super) {
    __extends(MyAwardPanelItemRenderer, _super);
    function MyAwardPanelItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.MyAwardPanelItemRenderer;
        return _this;
    }
    MyAwardPanelItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    MyAwardPanelItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.takePrizeBtn.visible = this.takeDesLabel.visible = this.itemDesLabel.visible = false;
            this.itemImg.source = "fang_ka";
            this.itemTitleLabel.text = this.bindData.name;
            if (PrizeManager.renderFlag == 1) {
                this.takePrizeBtn.visible = true;
                this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeAward, this);
            }
            else if (PrizeManager.renderFlag == 2) {
                this.takeDesLabel.visible = this.itemDesLabel.visible = true;
                this.itemDesLabel.text = this.bindData.des;
                if (this.bindData.state == PrizeState.Complete) {
                    if (this.bindData.effectType == PrizeEffectType.Kind) {
                        this.takeDesLabel.text = "已发货";
                    }
                    else if (this.bindData.effectType == PrizeEffectType.Cost) {
                        this.takeDesLabel.text = "已充值";
                    }
                }
                else if (this.bindData.state == PrizeState.Underway) {
                    if (this.bindData.effectType == PrizeEffectType.Kind) {
                        this.takeDesLabel.text = "等待发货";
                    }
                    else if (this.bindData.effectType == PrizeEffectType.Cost) {
                        this.takeDesLabel.text = "充值中";
                    }
                }
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    };
    MyAwardPanelItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.takePrizeBtn) {
            this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeAward, this);
        }
    };
    //领取礼物
    MyAwardPanelItemRenderer.prototype.onTakeAward = function () {
        if (!UserManager.userInfo.addressName) {
            AlertManager.showAlert("您尚未填写领奖信息，请填写后再领取奖品");
        }
        else {
            if (this.bindData.effectType == PrizeEffectType.Kind) {
                //实物订单确认界面
            }
            else {
                //话费订单确认界面
            }
        }
    };
    return MyAwardPanelItemRenderer;
}(BaseItemRenderer));
__reflect(MyAwardPanelItemRenderer.prototype, "MyAwardPanelItemRenderer");
//# sourceMappingURL=MyAwardPanelItemRenderer.js.map