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
 * 发牌支持
 */
var GamblingPanelFlopCardSupport = (function (_super) {
    __extends(GamblingPanelFlopCardSupport, _super);
    function GamblingPanelFlopCardSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelFlopCardSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.target.flopCardImg1.visible = false;
        this.target.flopCardImg2.visible = false;
        if (!this._animation1) {
            this._animation1 = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
            this._animation1.setTarget(this.target.flopCardImg1);
            this._animation2 = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
            this._animation2.setTarget(this.target.flopCardImg2);
            this.target.flopCardImg1.scaleX = this.target.flopCardImg1.scaleY = 0.1;
        }
    };
    GamblingPanelFlopCardSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.HandCardComeEvent.addListener(this.handCardComeHandler, this);
    };
    GamblingPanelFlopCardSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.HandCardComeEvent.removeListener(this.handCardComeHandler, this);
    };
    GamblingPanelFlopCardSupport.prototype.handCardComeHandler = function () {
        this.target.flopCardImg1.visible = false;
        this.target.flopCardImg2.visible = false;
        this._flopRound = 0;
        this._startPos = 0;
        this._nowPos = 0;
        this._runIndex = 0;
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            pitInfo.headComponent.flopIndex = 0; //发牌计数清零
        }
        this.runNext();
    };
    GamblingPanelFlopCardSupport.prototype.runNext = function () {
        if (GamblingManager.roomInfo) {
            var headComponent = void 0;
            var animation = void 0;
            if (this._startPos == 0) {
                this._startPos = GamblingManager.roomInfo.sBlindPos;
                headComponent = this.target.getHeadComponent(this._startPos);
                this._nowPos = this._startPos;
                this._runIndex++;
                if (headComponent) {
                    animation = this.getAnimation();
                    animation.run(new egret.Point(headComponent.horizontalCenter, headComponent.verticalCenter), this.runOver, this, headComponent);
                }
            }
            else {
                var pInfo = this.target.getNextPlayerInfo(this._nowPos);
                if (pInfo.pos == this._startPos) {
                    this._flopRound++;
                }
                if (this._flopRound <= 2) {
                    this._nowPos = pInfo.pos;
                    this._runIndex++;
                    headComponent = this.target.getHeadComponent(this._nowPos);
                    if (headComponent) {
                        animation = this.getAnimation();
                        animation.run(new egret.Point(headComponent.horizontalCenter, headComponent.verticalCenter), this.runOver, this, headComponent);
                    }
                }
                else {
                    //发牌完毕
                    this.target.flopCardImg1.visible = false;
                    this.target.flopCardImg2.visible = false;
                }
            }
        }
    };
    GamblingPanelFlopCardSupport.prototype.runOver = function (params) {
        params.flopIndex++;
        //是自己
        if (params.bindData && params.bindData.roleId == UserManager.userInfo.roleId) {
            params.showHaveCardImg(false);
            params.cardAnimationSpt.runSelfCard();
        }
        this.runNext();
    };
    /**
     * 获取动画
     */
    GamblingPanelFlopCardSupport.prototype.getAnimation = function () {
        if (this._runIndex % 2 == 1) {
            this.target.flopCardImg1.visible = true;
            return this._animation1;
        }
        else {
            this.target.flopCardImg2.visible = true;
            return this._animation2;
        }
    };
    return GamblingPanelFlopCardSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelFlopCardSupport.prototype, "GamblingPanelFlopCardSupport");
//# sourceMappingURL=GamblingPanelFlopCardSupport.js.map