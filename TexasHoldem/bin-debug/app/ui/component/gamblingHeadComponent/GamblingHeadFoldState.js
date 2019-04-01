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
 * 弃牌状态 后继状态----->亮牌|等待下一局|站起
 */
var GamblingHeadFoldState = (function (_super) {
    __extends(GamblingHeadFoldState, _super);
    function GamblingHeadFoldState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadFoldState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.maskImg.visible = true;
        this.context.showBase();
        this.context.showChipsComponent();
        if (this.context.bindData) {
            this.context.infoLabel.text = PlayerInfo.getStateDes(this.context.bindData.state);
            this.context.foldCardAnim.run(GamblingPanelSetting.DILAPoint, null, null, null);
        }
    };
    GamblingHeadFoldState.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
        GamblingManager.OneLoopOverEvent.addListener(this.boardCardChangeHandler, this);
    };
    GamblingHeadFoldState.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
        GamblingManager.OneLoopOverEvent.removeListener(this.boardCardChangeHandler, this);
    };
    /**
     * 弃牌状态推送了结算信息 看看是否亮牌
     */
    GamblingHeadFoldState.prototype.roundOverHandler = function () {
        this.context.chipsShowComponent.visible = false;
        if (this.context.bindData && GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.roleHandCardList) {
            var len = GamblingManager.roundOverInfo.roleHandCardList.length;
            for (var i = 0; i < len; i++) {
                if (this.context.bindData.roleId == GamblingManager.roundOverInfo.roleHandCardList[i].roleId) {
                    this.switchToBrightCard(); //弃牌状态，收到了手牌信息
                    return;
                }
            }
        }
        if (this.context.bindData) {
            this.waitNext();
        }
    };
    GamblingHeadFoldState.prototype.switchToBrightCard = function () {
        this.context.maskImg.visible = false;
        this.context.infoLabel.text = PlayerInfo.getStateDes(PlayerState.BrightCard);
        this.context.showBase();
        this.context.chipsShowComponent.visible = false;
        if (this.context.bindData && this.context.bindData.cardList && this.context.bindData.cardList.length >= 2) {
            this.context.cardFace1.init(this.context.bindData.cardList[0]);
            this.context.cardFace2.init(this.context.bindData.cardList[1]);
            this.context.cardAnimationSpt.runBrightCard(this.waitNext, this);
        }
    };
    /**
    * 公共牌推送 下一轮开始
    */
    GamblingHeadFoldState.prototype.boardCardChangeHandler = function () {
        this.context.chipsShowComponent.visible = false;
    };
    return GamblingHeadFoldState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadFoldState.prototype, "GamblingHeadFoldState");
//# sourceMappingURL=GamblingHeadFoldState.js.map