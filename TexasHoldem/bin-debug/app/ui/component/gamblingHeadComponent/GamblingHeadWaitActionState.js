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
 * 等待说话状态 后继状态------>站起|说话
 */
var GamblingHeadWaitActionState = (function (_super) {
    __extends(GamblingHeadWaitActionState, _super);
    function GamblingHeadWaitActionState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadWaitActionState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.maskImg.visible = false;
        this.context.showBase();
        this.context.showChipsComponent();
        if (this.context.bindData && this.context.bindData.roleId != UserManager.userInfo.roleId) {
            this.context.showHaveCardImg(true);
        }
        if (this.context.bindData) {
            this.context.infoLabel.text = this.context.bindData.userInfo.name;
            this.context.chipsLabel.text = this.context.bindData.bankRoll.toString();
        }
    };
    GamblingHeadWaitActionState.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
        GamblingManager.ActionPosChangeEvent.addListener(this.posChangeHandler, this);
    };
    GamblingHeadWaitActionState.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
        GamblingManager.ActionPosChangeEvent.removeListener(this.posChangeHandler, this);
    };
    /**
     * 等待状态推送了结算信息 切换到比牌状态
     */
    GamblingHeadWaitActionState.prototype.roundOverHandler = function () {
        this.context.chipsShowComponent.visible = false;
        if (this.context.bindData) {
            this.thanTheCard();
        }
    };
    /**
     * 说话位置变更
     */
    GamblingHeadWaitActionState.prototype.posChangeHandler = function () {
        if (this.context.bindData && GamblingManager.roomInfo && this.context.bindData.pos == GamblingManager.roomInfo.pos) {
            this.onAction();
        }
    };
    return GamblingHeadWaitActionState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadWaitActionState.prototype, "GamblingHeadWaitActionState");
//# sourceMappingURL=GamblingHeadWaitActionState.js.map