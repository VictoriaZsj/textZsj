/**
 * 牌局玩家头像组件
 */
class GamblingHeadComponent extends BaseComponent<PlayerInfo>{

	/**
	 * 默认背景图片
	 */
	public bgImg: eui.Image;
	public headIcon: CommonIcon;
	public holdCardScroller: eui.Scroller;

	/**
	 * 手里有牌状态显示 左边卡牌
	 */
	public leftCard1: eui.Image;
	public leftCard2: eui.Image;
	/**
	 * 手里有牌状态显示 右边卡牌
	 */
	public rightCard1: eui.Image;
	public rightCard2: eui.Image;

	public vipGroup: eui.Group;
	public vipLabel: eui.Label;
	public infoLabel: eui.Label;
	public chipsLabel: eui.Label;
	public chipsAnimLabel: eui.Label;
	/**
	 * 赢了的效果
	 */
	public winEffectImg: eui.Image;

	/**
	 * 卡牌1
	 */
	public cardFace1: CardFaceComponent;
	/**
	 * 卡牌2
	 */
	public cardFace2: CardFaceComponent;
	/**
	 * 灰色遮罩图片
	 */
	public maskImg: eui.Image;
	/**
	 * CD图片
	 */
	public cdImg: eui.Image;
	/**
	 * 弃牌动画图片
	 */
	public foldBackCard: eui.Image;
	/**
	 * CD效果组件
	 */
	public cdComponent: GamblingCdComponent;
	/**
	 * 刚坐下的图片标示
	 */
	public sitDown: eui.Image;

	//转圈动画捆绑
	public turnAnim: CommonMoveToRelativelyPos;
	/**
	 * 弃牌动画
	 */
	public foldCardAnim: FlopCardAnimation;

	private _nowState: BaseGamblingHeadState;
	/**
	 * 当前状态
	 */
	public get nowState(): BaseGamblingHeadState
	{
		return this._nowState;
	}
	/**
	 * 筹码组件控制
	 */
	public chipsShowComponent: ChipsShowComponent;
	/**
	 * 赢取筹码动画
	 */
	private _winChipsAnim: WinChipsAnim;
	/**
	 * 卡牌动画
	 */
	private _cardAnimationSpt: GamblingHeadCardAnimationSupport;
	public get cardAnimationSpt(): GamblingHeadCardAnimationSupport
	{
		return this._cardAnimationSpt;
	}

	//--------------------------状态控制------------------------------
	private _emptyState: GamblingHeadEmptyState;
	/**
	 * 空状态
	 */
	public get emptyState(): GamblingHeadEmptyState
	{
		return this._emptyState;
	}
	private _waitNextState: GamblingHeadWiatNextState;
	/**
	 * 等待下一局状态
	 */
	public get waitNextActionState(): GamblingHeadWiatNextState
	{
		return this._waitNextState;
	}
	private _foldState: GamblingHeadFoldState;
	/**
	 * 弃牌状态
	 */
	public get foldState(): GamblingHeadFoldState
	{
		return this._foldState;
	}
	private _actionedState: GamblingHeadActionedState;
	/**
	 * 已说话状态
	 */
	public get actionedState(): GamblingHeadActionedState
	{
		return this._actionedState;
	}
	private _waitActionState: GamblingHeadWaitActionState;
	/**
	 * 等待说话状态
	 */
	public get waitActionState(): GamblingHeadWaitActionState
	{
		return this._waitActionState;
	}
	private _onActionState: GamblingHeadOnActionState;
	/**
	 * 说话中状态
	 */
	public get onActionState(): GamblingHeadOnActionState
	{
		return this._onActionState;
	}
	private _sitDownState: GamblingHeadSitDownState;
	/**
	 * 坐下状态
	 */
	public get sitDownState(): GamblingHeadSitDownState
	{
		return this._sitDownState;
	}
	private _roundStartState: GamblingHeadRoundStartState;
	/**
	 * 一局开始
	 */
	public get roundStartState(): GamblingHeadRoundStartState
	{
		return this._roundStartState;
	}
	private _thanTheCard: GamblingHeadThanTheCardState;
	/**
	 * 比牌状态
	 */
	public get thanTheCard(): GamblingHeadThanTheCardState
	{
		return this._thanTheCard;
	}
	//--------------------------状态控制 end------------------------------

	private _pitIndex: number;
	public get pitIndex(): number
	{
		return this._pitIndex;
	}

	private _flopIndex: number;
	/**
	 * 发牌索引
	 */
	public get flopIndex(): number
	{
		return this._flopIndex;
	}

	public set flopIndex(value: number)
	{
		this.showHaveCardImg(false);
		if (this.pitIndex <= GamblingPanelSetting.centerNum)
		{
			if (value == 1)
			{
				this.leftCard1.visible = true;
			}
			else if (value == 2)
			{
				this.leftCard1.visible = this.leftCard2.visible = true;
			}
		}
		else
		{
			if (value == 1)
			{
				this.rightCard1.visible = true;
			}
			else if (value == 2)
			{
				this.rightCard1.visible = this.rightCard2.visible = true;
			}
		}
		this._flopIndex = value;
	}

	public constructor()
	{
		super();
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		/**
		 * 坐下转动动画
		 */
		this.turnAnim = <CommonMoveToRelativelyPos>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.CommonMoveToRelativelyPos);
		this.turnAnim.setTarget(this);

		/**
		 * 弃牌动画
		 */
		this.foldCardAnim = <FlopCardAnimation>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
		this.foldCardAnim.setTarget(this.foldBackCard);

		this._winChipsAnim = <WinChipsAnim>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.WinChips);
		this._winChipsAnim.setTarget(this.chipsAnimLabel);

		this._emptyState = new GamblingHeadEmptyState(this);
		this._waitNextState = new GamblingHeadWiatNextState(this);
		this._foldState = new GamblingHeadFoldState(this);
		this._actionedState = new GamblingHeadActionedState(this);
		this._waitActionState = new GamblingHeadWaitActionState(this);
		this._onActionState = new GamblingHeadOnActionState(this);
		this._sitDownState = new GamblingHeadSitDownState(this);
		this._roundStartState = new GamblingHeadRoundStartState(this);
		this._thanTheCard = new GamblingHeadThanTheCardState(this);

		this._cardAnimationSpt = new GamblingHeadCardAnimationSupport(this);
	}
	public init(data: PlayerInfo)
	{
		super.init(data);
		this.changeState(this._emptyState);
	}
	/**
	 * 断线重连
	 */
	public offlineConnect()
	{
		if (this.bindData)
		{
			let state: BaseGamblingHeadState = this.getState();
			if (state)
			{
				this.changeState(state);
			}
			else
			{
				console.log("玩家状态异常：" + this.bindData.state + PlayerInfo.getStateDes(this.bindData.state));
			}
		}
	}
	/**
	 * 设置坑位
	 */
	public setPit(pit: number)
	{
		this._pitIndex = pit;
	}
	public changeState(state: BaseGamblingHeadState)
	{
		if (this._nowState)
		{
			this._nowState.onDisable();
		}
		this._nowState = state;
		this._nowState.run();
	}
	protected rendererStart(event: egret.Event)
	{
		super.rendererStart(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		if (this._nowState)
		{
			this._nowState.onDisable();
		}
	}
	/**
 	* 隐藏全部
 	*/
	public hideAll()
	{
		this.headIcon.visible = false;
		this.vipGroup.visible = false;
		this.infoLabel.visible = false;
		this.chipsLabel.visible = false;
		this.chipsAnimLabel.visible = false;
		this.winEffectImg.visible = false;
		this.maskImg.visible = false;
		this.cdImg.visible = false;
		this.foldBackCard.visible = false;
		this.cdComponent.visible = false;
		this.cardFace1.visible = false;
		this.cardFace2.visible = false;
		this.sitDown.visible = false;
		this.showHaveCardImg(false);
		this.chipsShowComponent.visible = false;
	}
	/**
	 * 显示有牌状态
	 */
	public showHaveCardImg(flag: boolean)
	{
		if (flag) //显示的状态
		{
			this.showHaveCardImg(false);
			if (this.pitIndex <= GamblingPanelSetting.centerNum) //控制左右
			{
				if (this.flopIndex == 1) //有一张显示1张
				{
					this.leftCard1.visible = true;
				}
				else if (this.flopIndex == 2)
				{
					this.leftCard1.visible = this.leftCard2.visible = true;
				}
			}
			else
			{
				if (this.flopIndex == 1)
				{
					this.rightCard1.visible = true;
				}
				else if (this.flopIndex == 2)
				{
					this.rightCard1.visible = this.rightCard2.visible = true;
				}
			}
		}
		else
		{
			this.leftCard1.visible = this.leftCard2.visible = flag;
			this.rightCard1.visible = this.rightCard2.visible = flag;
		}
	}
	/**
	 * 显示基本的元素
	 */
	public showBase()
	{
		this.bgImg.visible = true;
		this.headIcon.visible = true;
		this.infoLabel.visible = true;
		this.chipsLabel.visible = true;
	}
	/**
	 * 赢取筹码动画
	 */
	public runWinChipsAnim()
	{
		this.chipsLabel.visible = true;
		this._winChipsAnim.run();
	}
	/**
 	* 获取状态
 	*/
	private getState(): BaseGamblingHeadState
	{
		let state: BaseGamblingHeadState;

		if (!this.bindData)
		{
			return this._emptyState;
		}
		switch (this.bindData.state)
		{
			case PlayerState.WaitNext: //等待下一局
				state = this._waitNextState;
				break;
			case PlayerState.Fold: //弃牌
				state = this._foldState;
				break;
			case PlayerState.Check:
			case PlayerState.Raise:
			case PlayerState.Call:
			case PlayerState.AllIn:
			case PlayerState.Blind: //已说话
				state = this._actionedState;
				break;
			case PlayerState.WaitAction: //等待说话
				state = this._waitActionState;
				break;
			case PlayerState.Action: //说话中
				state = this._onActionState;
				break;
			default: //都没有则为等待下一局状态
				state = this._waitNextState;
				break;
		}
		return state;
	}
	public showChipsComponent(reNum?: number)
	{
		if (reNum > 0 && reNum != this.chipsShowComponent.bindData)
		{
			this.chipsShowComponent.init(reNum);
		}
		if (this.chipsShowComponent.bindData > 0)
		{
			this.chipsShowComponent.visible = true;
		}
		else
		{
			this.chipsShowComponent.visible = false;
		}
	}
}