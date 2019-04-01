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
 * 等待下一局 后继状态 -------> 一局开始状态|站起
 */
var GamblingHeadWiatNextState = (function (_super) {
    __extends(GamblingHeadWiatNextState, _super);
    function GamblingHeadWiatNextState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._lastRoundNum = 0;
        return _this;
    }
    GamblingHeadWiatNextState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.infoLabel.visible = true;
        this.context.headIcon.visible = true;
        this.context.chipsLabel.visible = true;
        this.context.maskImg.visible = true;
        this.context.chipsShowComponent.visible = false;
        if (this.context.bindData) {
            this.context.infoLabel.text = this.context.bindData.userInfo.name;
            this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
            this.context.headIcon.init(this.context.bindData);
        }
        if (this._lastRoundNum != GamblingManager.roomInfo.roundNum) {
            this._lastRoundNum = GamblingManager.roomInfo.roundNum;
            this.nextRoundStartHandler();
        }
        if (GamblingManager.roomInfo.roundNum) {
            this._lastRoundNum = GamblingManager.roomInfo.roundNum;
        }
    };
    GamblingHeadWiatNextState.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
    };
    GamblingHeadWiatNextState.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
    };
    /**
     * 下一局开始
     */
    GamblingHeadWiatNextState.prototype.nextRoundStartHandler = function () {
        if (this.context.bindData) {
            this.roundStart();
        }
    };
    return GamblingHeadWiatNextState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadWiatNextState.prototype, "GamblingHeadWiatNextState");
//# sourceMappingURL=GamblingHeadWiatNextState.js.map