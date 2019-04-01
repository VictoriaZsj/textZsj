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
 * 正在说话状态 后继状态 -----> 已说话|弃牌|站起
 */
var GamblingHeadOnActionState = (function (_super) {
    __extends(GamblingHeadOnActionState, _super);
    function GamblingHeadOnActionState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadOnActionState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.maskImg.visible = false;
        this.context.cdImg.visible = true;
        this.context.cdComponent.visible = true;
        if (GamblingManager.roomInfo) {
            if (GamblingManager.roomInfo.posTime > 0) {
                var offsetTime = TimeManager.GetServerUtcTimestamp() - GamblingManager.roomInfo.posTime;
                Tick.AddTimeoutInvoke(this.actionTimeOut, offsetTime, this);
            }
            else {
                Tick.AddTimeoutInvoke(this.actionTimeOut, GamblingManager.roomInfo.definition.cd, this);
            }
            this.context.cdComponent.start(GamblingManager.roomInfo.posTime);
        }
        this.context.showBase();
        this.context.showChipsComponent();
        if (this.context.bindData && this.context.bindData.roleId != UserManager.userInfo.roleId) {
            this.context.showHaveCardImg(true);
        }
        if (this.context.bindData) {
            this.context.infoLabel.text = PlayerInfo.getStateDes(this.context.bindData.state);
            this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
        }
    };
    GamblingHeadOnActionState.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.PlayerStateChangeEvent.addListener(this.playerStateChangeHandler, this);
    };
    GamblingHeadOnActionState.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.PlayerStateChangeEvent.removeListener(this.playerStateChangeHandler, this);
        Tick.RemoveTimeoutInvoke(this.actionTimeOut, this);
    };
    /**
     * 玩家状态变更
     */
    GamblingHeadOnActionState.prototype.playerStateChangeHandler = function (obj) {
        if (this.context.bindData && obj.roleId == this.context.bindData.roleId) {
            switch (this.context.bindData.state) {
                case PlayerState.Check:
                case PlayerState.Raise:
                case PlayerState.AllIn:
                case PlayerState.Call:
                    this.context.showChipsComponent(obj.num);
                    this.actioned();
                    break;
                case PlayerState.Fold:
                    this.fold();
                    break;
            }
        }
    };
    GamblingHeadOnActionState.prototype.actionTimeOut = function () {
        GamblingManager.reqTimeOut();
    };
    return GamblingHeadOnActionState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadOnActionState.prototype, "GamblingHeadOnActionState");
//# sourceMappingURL=GamblingHeadOnActionState.js.map