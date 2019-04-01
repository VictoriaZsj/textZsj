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
 * 已经说过话的状态不包括弃牌 后继状态 ----> 等待说话|弃牌|比牌|站起
 */
var GamblingHeadActionedState = (function (_super) {
    __extends(GamblingHeadActionedState, _super);
    function GamblingHeadActionedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadActionedState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.showBase();
        this.context.maskImg.visible = false;
        this.context.showChipsComponent();
        if (this.context.bindData) {
            this.context.infoLabel.text = PlayerInfo.getStateDes(this.context.bindData.state);
            this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
        }
    };
    GamblingHeadActionedState.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
        GamblingManager.OneLoopOverEvent.addListener(this.boardCardChangeHandler, this);
    };
    GamblingHeadActionedState.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
        GamblingManager.OneLoopOverEvent.removeListener(this.boardCardChangeHandler, this);
    };
    /**
     * 切换到比牌
     */
    GamblingHeadActionedState.prototype.roundOverHandler = function () {
        if (this.context.bindData) {
            this.thanTheCard();
        }
    };
    /**
     * 公共牌推送
     */
    GamblingHeadActionedState.prototype.boardCardChangeHandler = function () {
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.cardList) {
            var len = GamblingManager.roomInfo.cardList.length;
            if (len < GamblingManager.MaxBoardNum) {
                this.context.chipsShowComponent.visible = false;
                this.waitAction();
            }
        }
    };
    return GamblingHeadActionedState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadActionedState.prototype, "GamblingHeadActionedState");
//# sourceMappingURL=GamblingHeadActionedState.js.map