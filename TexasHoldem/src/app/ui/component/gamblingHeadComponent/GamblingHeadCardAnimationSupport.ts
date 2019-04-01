/**
 * 头像组件动画
 */
class GamblingHeadCardAnimationSupport
{
	private _actionList: Dictionary<string, IAnimationHandler<any>>;
	private _initY: number;
	/**
 	* 本家手牌Y坐标
 	*/
	private readonly _selfY: number = 100;
	public context: GamblingHeadComponent;
	public constructor(target: GamblingHeadComponent)
	{
		this.context = target;
	}
	public initialize()
	{
		if (!this._actionList)
		{
			this._initY = this.context.cardFace1.y;
			this._actionList = new Dictionary<string, IAnimationHandler<any>>();
		}
	}
	/**
 	* 发牌跑自己的手牌动画
	*/
	public runSelfCard()
	{
		this.context.cardFace1.y = this.context.cardFace2.y = this._selfY;
		let run: SelfCard1Appear = <SelfCard1Appear>this.getAnimation(AnimationType.SelfCard1Appear, this.context.cardFace1, 1);
		let run2: SelfCard2Appear = <SelfCard2Appear>this.getAnimation(AnimationType.SelfCard2Appear, this.context.cardFace2, 2);
		run.run(run2);
	}
	/**
 	* 一局完了亮牌
 	*/
	public runBrightCard(callBack: Function, thisObj: any)
	{
		this.startRunBrightCard(this.context.cardFace1, 30, -10, 0, -15, null, null, 1);
		this.startRunBrightCard(this.context.cardFace2, 60, 13, 30, -15, callBack, this, 2);
	}
	public startRunBrightCard(target: CardFaceComponent, rotation: number, initOffsetX: number, x: number, y: number, callBack: Function, thisObj: any, index: number)
	{
		this.context.cardFace1.y = this.context.cardFace2.y = this._initY;
		let run: CardFaceBright = <CardFaceBright>this.getAnimation(AnimationType.CardFaceBright, target, index);
		run.run(initOffsetX, rotation, x, y, callBack, thisObj);
	}
	/**
	 * 比牌动画
	 */
	public runThanTheCardAnim(point1: egret.Point, point2: egret.Point)
	{
		this.startRunThanTheCardAnim(point1, this.context.cardFace1, 1);
		this.startRunThanTheCardAnim(point2, this.context.cardFace2, 2);
	}
	private startRunThanTheCardAnim(point: egret.Point, target: CardFaceComponent, index: number)
	{
		this.context.cardFace1.y = this.context.cardFace2.y = this._initY;
		let run: CardFaceMoveToPoint = <CardFaceMoveToPoint>this.getAnimation(AnimationType.CardFaceMoveToPoint, target, index);
		run.nextAnimation = this.getAnimation(AnimationType.CardFaceTurnToFace, target, index);
		run.run(point);
	}

	private getAnimation(type: AnimationType, target: CardFaceComponent, index: number): IAnimationHandler<CardFaceComponent>
	{
		if (!this._actionList)
		{
			this._actionList = new Dictionary<string, IAnimationHandler<any>>();
		}
		let key: string = type.toString() + "_" + index.toString();
		if (!this._actionList.containsKey(key))
		{
			let run: IAnimationHandler<CardFaceComponent> = AnimationFactory.getCardFaceAnimation(type);
			run.setTarget(target);
			this._actionList.add(key, run);
			return run;
		}
		return this._actionList.getValue(key);
	}
}