var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 头像组件动画
 */
var GamblingHeadCardAnimationSupport = (function () {
    function GamblingHeadCardAnimationSupport(target) {
        /**
        * 本家手牌Y坐标
        */
        this._selfY = 100;
        this.context = target;
    }
    GamblingHeadCardAnimationSupport.prototype.initialize = function () {
        if (!this._actionList) {
            this._initY = this.context.cardFace1.y;
            this._actionList = new Dictionary();
        }
    };
    /**
    * 发牌跑自己的手牌动画
    */
    GamblingHeadCardAnimationSupport.prototype.runSelfCard = function () {
        this.context.cardFace1.y = this.context.cardFace2.y = this._selfY;
        var run = this.getAnimation(AnimationType.SelfCard1Appear, this.context.cardFace1, 1);
        var run2 = this.getAnimation(AnimationType.SelfCard2Appear, this.context.cardFace2, 2);
        run.run(run2);
    };
    /**
    * 一局完了亮牌
    */
    GamblingHeadCardAnimationSupport.prototype.runBrightCard = function (callBack, thisObj) {
        this.startRunBrightCard(this.context.cardFace1, 30, -10, 0, -15, null, null, 1);
        this.startRunBrightCard(this.context.cardFace2, 60, 13, 30, -15, callBack, this, 2);
    };
    GamblingHeadCardAnimationSupport.prototype.startRunBrightCard = function (target, rotation, initOffsetX, x, y, callBack, thisObj, index) {
        this.context.cardFace1.y = this.context.cardFace2.y = this._initY;
        var run = this.getAnimation(AnimationType.CardFaceBright, target, index);
        run.run(initOffsetX, rotation, x, y, callBack, thisObj);
    };
    /**
     * 比牌动画
     */
    GamblingHeadCardAnimationSupport.prototype.runThanTheCardAnim = function (point1, point2) {
        this.startRunThanTheCardAnim(point1, this.context.cardFace1, 1);
        this.startRunThanTheCardAnim(point2, this.context.cardFace2, 2);
    };
    GamblingHeadCardAnimationSupport.prototype.startRunThanTheCardAnim = function (point, target, index) {
        this.context.cardFace1.y = this.context.cardFace2.y = this._initY;
        var run = this.getAnimation(AnimationType.CardFaceMoveToPoint, target, index);
        run.nextAnimation = this.getAnimation(AnimationType.CardFaceTurnToFace, target, index);
        run.run(point);
    };
    GamblingHeadCardAnimationSupport.prototype.getAnimation = function (type, target, index) {
        if (!this._actionList) {
            this._actionList = new Dictionary();
        }
        var key = type.toString() + "_" + index.toString();
        if (!this._actionList.containsKey(key)) {
            var run = AnimationFactory.getCardFaceAnimation(type);
            run.setTarget(target);
            this._actionList.add(key, run);
            return run;
        }
        return this._actionList.getValue(key);
    };
    return GamblingHeadCardAnimationSupport;
}());
__reflect(GamblingHeadCardAnimationSupport.prototype, "GamblingHeadCardAnimationSupport");
//# sourceMappingURL=GamblingHeadCardAnimationSupport.js.map