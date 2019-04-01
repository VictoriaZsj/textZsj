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
 * 空状态 后继状态 --->坐下
 */
var GamblingHeadEmptyState = (function (_super) {
    __extends(GamblingHeadEmptyState, _super);
    function GamblingHeadEmptyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadEmptyState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.maskImg.visible = true;
        this.context.headIcon.init(null);
        this.context.bgImg.visible = true;
        this.context.chipsShowComponent.visible = false;
    };
    GamblingHeadEmptyState.prototype.sitOrStandHandler = function (obj) {
        if (obj.state == BuyInGameState.Sit) {
            this.sitDown();
        }
    };
    return GamblingHeadEmptyState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadEmptyState.prototype, "GamblingHeadEmptyState");
//# sourceMappingURL=GamblingHeadEmptyState.js.map