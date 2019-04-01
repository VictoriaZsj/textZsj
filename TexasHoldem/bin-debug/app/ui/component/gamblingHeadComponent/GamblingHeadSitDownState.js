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
 * 坐下状态  后继状态------->发牌|等待下一局|等待操作|说话|站起
 */
var GamblingHeadSitDownState = (function (_super) {
    __extends(GamblingHeadSitDownState, _super);
    function GamblingHeadSitDownState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadSitDownState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.maskImg.visible = true;
        this.context.sitDown.visible = true; //坐下动画
        this.context.showBase();
        this.context.chipsShowComponent.visible = false;
        if (this.context.bindData) {
            this.context.infoLabel.text = this.context.bindData.userInfo.name;
            this.context.headIcon.init(this.context.bindData);
            this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
        }
    };
    GamblingHeadSitDownState.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.ActionPosChangeEvent.addListener(this.posChangeHandler, this);
        GamblingManager.PlayerListStateChangeEvent.addListener(this.playerListStateChangeHandler, this);
        GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
    };
    GamblingHeadSitDownState.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.ActionPosChangeEvent.removeListener(this.posChangeHandler, this);
        GamblingManager.PlayerListStateChangeEvent.removeListener(this.playerListStateChangeHandler, this);
        GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
    };
    /**
     * 说话位置变更
     */
    GamblingHeadSitDownState.prototype.posChangeHandler = function () {
        if (this.context.bindData && GamblingManager.roomInfo && this.context.bindData.pos == GamblingManager.roomInfo.pos) {
            this.onAction();
        }
    };
    /**
     * 玩家列表状态推送
     */
    GamblingHeadSitDownState.prototype.playerListStateChangeHandler = function () {
        if (this.context.bindData) {
            if (this.context.bindData.state == PlayerState.WaitAction) {
                this.waitAction(); //发牌之后等待操作
            }
            else if (this.context.bindData.state == PlayerState.WaitNext) {
                this.waitNext(); //等待下一局
            }
        }
    };
    /**
     * 发牌
     */
    GamblingHeadSitDownState.prototype.nextRoundStartHandler = function () {
        if (this.context.bindData && this.context.bindData.state != PlayerState.WaitNext) {
            this.roundStart();
        }
    };
    return GamblingHeadSitDownState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadSitDownState.prototype, "GamblingHeadSitDownState");
//# sourceMappingURL=GamblingHeadSitDownState.js.map