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
 * 比牌状态 后继状态---->等待下一局|站起
 */
var GamblingHeadThanTheCardState = (function (_super) {
    __extends(GamblingHeadThanTheCardState, _super);
    function GamblingHeadThanTheCardState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadThanTheCardState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.maskImg.visible = false;
        this.context.cardFace1.visible = true;
        this.context.cardFace2.visible = true;
        this.context.showBase();
        this.context.showChipsComponent();
        if (this._point1) {
            this._point1 = new egret.Point(0, 0);
            this._point2 = new egret.Point(30, 0);
        }
        this.context.cardAnimationSpt.runThanTheCardAnim(this._point1, this._point2);
    };
    GamblingHeadThanTheCardState.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
    };
    GamblingHeadThanTheCardState.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
    };
    /**
     * 下一局开始
     */
    GamblingHeadThanTheCardState.prototype.nextRoundStartHandler = function () {
        if (this.context.bindData) {
            this.roundStart();
        }
    };
    return GamblingHeadThanTheCardState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadThanTheCardState.prototype, "GamblingHeadThanTheCardState");
//# sourceMappingURL=GamblingHeadThanTheCardState.js.map