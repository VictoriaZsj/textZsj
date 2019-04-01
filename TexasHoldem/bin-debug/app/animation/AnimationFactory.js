var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 动画
 */
var AnimationFactory = (function () {
    function AnimationFactory() {
    }
    /**
     * 获取卡牌动画
     */
    AnimationFactory.getCardFaceAnimation = function (type) {
        var animationHandler;
        switch (type) {
            case AnimationType.CardFaceBoardAppear:
                animationHandler = new CardFaceBoardAppear();
                break;
            case AnimationType.CardFaceBright:
                animationHandler = new CardFaceBright();
                break;
            case AnimationType.CardFaceMoveToPoint:
                animationHandler = new CardFaceMoveToPoint();
                break;
            case AnimationType.CardFaceTurnToFace:
                animationHandler = new CardFaceTurnToFace();
                break;
            case AnimationType.SelfCard1Appear:
                animationHandler = new SelfCard1Appear();
                break;
            case AnimationType.SelfCard2Appear:
                animationHandler = new SelfCard2Appear();
                break;
            default:
                break;
        }
        return animationHandler;
    };
    /**
     * 获取显示对象动画
     */
    AnimationFactory.getDisplayObjectContainerAnimation = function (type) {
        var animationHandler;
        switch (type) {
            case AnimationType.FlopCard:
                animationHandler = new FlopCardAnimation();
                break;
            case AnimationType.GamblingGameGroupMove:
                animationHandler = new GamblingGameGroupMove();
                break;
            case AnimationType.CommonMoveToPointByNowPos:
                animationHandler = new CommonMoveToPointByNowPos();
                break;
            case AnimationType.CommonMoveToRelativelyPos:
                animationHandler = new CommonMoveToRelativelyPos();
                break;
            case AnimationType.WinChips:
                animationHandler = new WinChipsAnim();
                break;
            default:
                break;
        }
        return animationHandler;
    };
    /**
     * 获取赢牌动画
    */
    AnimationFactory.getWinCardAnim = function (parent) {
        if (parent.numChildren != 0) {
            parent.removeChildren();
        }
        var data = RES.getRes(MovieClipData.WinCard_Json);
        var txtr = RES.getRes(MovieClipData.WinCard_Png);
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var winCardMc = new egret.MovieClip(mcFactory.generateMovieClipData());
        parent.addChild(winCardMc);
        //todo
        winCardMc.scaleX = 0.75;
        winCardMc.scaleY = 0.72;
        winCardMc.anchorOffsetX = 10 - winCardMc.width / 2;
        winCardMc.anchorOffsetY = 12 - winCardMc.height / 2;
        winCardMc.play();
        return winCardMc;
    };
    /**
     * 获取坐下动画
    */
    AnimationFactory.getSeatAnim = function (parent) {
        if (parent.numChildren != 0) {
            parent.removeChildren();
        }
        var data = RES.getRes(MovieClipData.SeatDown_Json);
        var txtr = RES.getRes(MovieClipData.SeatDown_Png);
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var seatDownMc = new egret.MovieClip(mcFactory.generateMovieClipData());
        //todo
        parent.addChild(seatDownMc);
        seatDownMc.scaleX = seatDownMc.scaleY = 0.5;
        seatDownMc.anchorOffsetX = 225 - seatDownMc.width / 2;
        seatDownMc.anchorOffsetY = 65 - seatDownMc.height / 2;
        seatDownMc.play();
        return seatDownMc;
    };
    return AnimationFactory;
}());
__reflect(AnimationFactory.prototype, "AnimationFactory");
//# sourceMappingURL=AnimationFactory.js.map