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
 * 按钮位逻辑支持
 */
var GamblingPanelButtonPosSupport = (function (_super) {
    __extends(GamblingPanelButtonPosSupport, _super);
    function GamblingPanelButtonPosSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelButtonPosSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        if (!this.moveAnim) {
            this.moveAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.CommonMoveToPointByNowPos);
            this.moveAnim.setTarget(this.target.buttonPosFlagImg);
        }
    };
    GamblingPanelButtonPosSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.NextRoundStartEvent.addListener(this.onNextRoundStart, this);
    };
    GamblingPanelButtonPosSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.NextRoundStartEvent.removeListener(this.onNextRoundStart, this);
    };
    /**
     * 是否需要延迟todo
     */
    GamblingPanelButtonPosSupport.prototype.onNextRoundStart = function () {
        var pitInfo = this.target.getPitInfo(GamblingManager.roomInfo.buttonPos);
        if (pitInfo) {
            var p = GamblingPanelSetting.buttonPosList[pitInfo.index];
            this.moveAnim.run(p.x, p.y);
        }
    };
    return GamblingPanelButtonPosSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelButtonPosSupport.prototype, "GamblingPanelButtonPosSupport");
//# sourceMappingURL=GamblingPanelButtonPosSupport.js.map