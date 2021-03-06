/**
 * 动画
 */
class AnimationFactory
{
	/**
	 * 获取卡牌动画
	 */
	public static getCardFaceAnimation(type: AnimationType): IAnimationHandler<CardFaceComponent>
	{
		let animationHandler: IAnimationHandler<CardFaceComponent>;
		switch (type)
		{
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
	}
	/**
	 * 获取显示对象动画
	 */
	public static getDisplayObjectContainerAnimation(type: AnimationType): IAnimationHandler<egret.DisplayObject>
	{
		let animationHandler: IAnimationHandler<egret.DisplayObject>;
		switch (type)
		{
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
	}
	/**
	 * 获取赢牌动画
	*/
    public static getWinCardAnim(parent:eui.Group): egret.MovieClip
    {
        if (parent.numChildren != 0)
        {
            parent.removeChildren();
        }
        let data: any = RES.getRes(MovieClipData.WinCard_Json);
        let txtr: egret.Texture = RES.getRes(MovieClipData.WinCard_Png);
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        let winCardMc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData());
        parent.addChild(winCardMc);
        //todo
        winCardMc.scaleX = 0.75;
		winCardMc.scaleY = 0.72;
        winCardMc.anchorOffsetX = 10-winCardMc.width / 2;
        winCardMc.anchorOffsetY = 12-winCardMc.height / 2;
        winCardMc.play();
        return winCardMc;
    }
	/**
	 * 获取坐下动画
	*/
    public static getSeatAnim(parent:eui.Group):egret.MovieClip
    {
        if (parent.numChildren != 0)
        {
            parent.removeChildren();
        }
        let data: any = RES.getRes(MovieClipData.SeatDown_Json);
        let txtr: egret.Texture = RES.getRes(MovieClipData.SeatDown_Png);
        let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        let seatDownMc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData());
        //todo
		parent.addChild(seatDownMc);
        seatDownMc.scaleX = seatDownMc.scaleY = 0.5;
        seatDownMc.anchorOffsetX =225-seatDownMc.width / 2;
        seatDownMc.anchorOffsetY =65-seatDownMc.height / 2;
        seatDownMc.play();
        return seatDownMc;
    }
}