var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 头像组件状态执行接口 大部分的状态都可以直接切换到站起状态
 */
var BaseGamblingHeadState = (function () {
    function BaseGamblingHeadState(context) {
        this.context = context;
    }
    BaseGamblingHeadState.prototype.run = function () {
        this.context.hideAll();
        this.onEnable();
    };
    BaseGamblingHeadState.prototype.onEnable = function () {
        GamblingManager.SitOrStandEvent.addListener(this.sitOrStandHandler, this);
    };
    BaseGamblingHeadState.prototype.onDisable = function () {
        GamblingManager.SitOrStandEvent.removeListener(this.sitOrStandHandler, this);
    };
    BaseGamblingHeadState.prototype.sitOrStandHandler = function (obj) {
        if (this.context.bindData && obj.pInfo.roleId == this.context.bindData.roleId && obj.state == BuyInGameState.Stand) {
            this.empty();
        }
    };
    /**
     * 空状态
     */
    BaseGamblingHeadState.prototype.empty = function () {
        this.context.changeState(this.context.emptyState);
    };
    /**
     * 刚坐下状态
     */
    BaseGamblingHeadState.prototype.sitDown = function () {
        this.context.changeState(this.context.sitDownState);
    };
    /**
     * 等待说话状态
     */
    BaseGamblingHeadState.prototype.waitAction = function () {
        this.context.changeState(this.context.waitActionState);
    };
    /**
     * 在说话状态
     */
    BaseGamblingHeadState.prototype.onAction = function () {
        this.context.changeState(this.context.onActionState);
    };
    /**
     * 已说话状态
     */
    BaseGamblingHeadState.prototype.actioned = function () {
        this.context.changeState(this.context.actionedState);
    };
    /**
     * 弃牌状态
     */
    BaseGamblingHeadState.prototype.fold = function () {
        this.context.changeState(this.context.foldState);
    };
    /**
     * 比牌
     */
    BaseGamblingHeadState.prototype.thanTheCard = function () {
        this.context.changeState(this.context.thanTheCard);
    };
    /**
     * 等待下一局
     */
    BaseGamblingHeadState.prototype.waitNext = function () {
        this.context.changeState(this.context.waitNextActionState);
    };
    /**
     * 一局开始
     */
    BaseGamblingHeadState.prototype.roundStart = function () {
        this.context.changeState(this.context.roundStartState);
    };
    return BaseGamblingHeadState;
}());
__reflect(BaseGamblingHeadState.prototype, "BaseGamblingHeadState");
//# sourceMappingURL=BaseGamblingHeadState.js.map