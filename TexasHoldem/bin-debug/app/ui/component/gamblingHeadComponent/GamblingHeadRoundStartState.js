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
 * 一局开始状态 后继状态-------->发牌|站起
 */
var GamblingHeadRoundStartState = (function (_super) {
    __extends(GamblingHeadRoundStartState, _super);
    function GamblingHeadRoundStartState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadRoundStartState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.infoLabel.visible = true;
        this.context.headIcon.visible = true;
        this.context.chipsLabel.visible = true;
        this.context.maskImg.visible = false;
        this.context.chipsShowComponent.visible = false;
        if (this.context.bindData) {
            this.context.infoLabel.text = this.context.bindData.userInfo.name;
            this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
            this.context.headIcon.init(this.context.bindData);
        }
    };
    GamblingHeadRoundStartState.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.ActionPosChangeEvent.addListener(this.posChangeHandler, this);
    };
    GamblingHeadRoundStartState.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.ActionPosChangeEvent.removeListener(this.posChangeHandler, this);
    };
    /**
    * 说话位置变更
    */
    GamblingHeadRoundStartState.prototype.posChangeHandler = function () {
        if (this.context.bindData && GamblingManager.roomInfo && this.context.bindData.pos == GamblingManager.roomInfo.pos) {
            this.onAction();
        }
        else {
            this.waitAction();
        }
    };
    return GamblingHeadRoundStartState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadRoundStartState.prototype, "GamblingHeadRoundStartState");
//# sourceMappingURL=GamblingHeadRoundStartState.js.map