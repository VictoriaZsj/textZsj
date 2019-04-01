/**
 * 发牌支持
 */
class GamblingPanelFlopCardSupport extends BaseGamblingPanelSupport
{
	private _flopRound: number;
	/**
	 * 发牌动画
	 */
	private _animation1: FlopCardAnimation;
	private _animation2: FlopCardAnimation;
	private _startPos: number;
	private _nowPos: number;
	private _runIndex: number;

	public initialize()
	{
		super.initialize();
		this.target.flopCardImg1.visible = false;
		this.target.flopCardImg2.visible = false;
		if (!this._animation1)
		{
			this._animation1 = <FlopCardAnimation>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
			this._animation1.setTarget(this.target.flopCardImg1);
			this._animation2 = <FlopCardAnimation>AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
			this._animation2.setTarget(this.target.flopCardImg2);
			this.target.flopCardImg1.scaleX = this.target.flopCardImg1.scaleY = 0.1;
		}
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.HandCardComeEvent.addListener(this.handCardComeHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.HandCardComeEvent.removeListener(this.handCardComeHandler, this);
	}
	private handCardComeHandler()
	{
		this.target.flopCardImg1.visible = false;
		this.target.flopCardImg2.visible = false;
		this._flopRound = 0;
		this._startPos = 0;
		this._nowPos = 0;
		this._runIndex = 0;

		for (let pitInfo of this.target.pitList)
		{
			pitInfo.headComponent.flopIndex = 0; //发牌计数清零
		}

		this.runNext();
	}
	private runNext()
	{
		if (GamblingManager.roomInfo)
		{
			let headComponent: GamblingHeadComponent;
			let animation: FlopCardAnimation;
			if (this._startPos == 0)
			{
				this._startPos = GamblingManager.roomInfo.sBlindPos;
				headComponent = this.target.getHeadComponent(this._startPos);
				this._nowPos = this._startPos;
				this._runIndex++;
				if (headComponent)
				{
					animation = this.getAnimation();
					animation.run(new egret.Point(headComponent.horizontalCenter, headComponent.verticalCenter), this.runOver, this, headComponent);
				}
			}
			else
			{
				let pInfo: PlayerInfo = this.target.getNextPlayerInfo(this._nowPos);

				if (pInfo.pos == this._startPos) //发了一圈牌
				{
					this._flopRound++;
				}
				if (this._flopRound <= 2) //每人最多两张牌
				{
					this._nowPos = pInfo.pos;
					this._runIndex++;

					headComponent = this.target.getHeadComponent(this._nowPos);
					if (headComponent)
					{
						animation = this.getAnimation();
						animation.run(new egret.Point(headComponent.horizontalCenter, headComponent.verticalCenter), this.runOver, this, headComponent);
					}
				}
				else
				{
					//发牌完毕
					this.target.flopCardImg1.visible = false;
					this.target.flopCardImg2.visible = false;
				}
			}
		}
	}
	private runOver(params: GamblingHeadComponent)
	{
		params.flopIndex++;
		//是自己
		if (params.bindData && params.bindData.roleId == UserManager.userInfo.roleId)
		{
			params.showHaveCardImg(false);
			params.cardAnimationSpt.runSelfCard();
		}
		this.runNext();
	}

	/**
	 * 获取动画
	 */
	private getAnimation(): FlopCardAnimation
	{
		if (this._runIndex % 2 == 1)
		{
			this.target.flopCardImg1.visible = true;
			return this._animation1;
		}
		else
		{
			this.target.flopCardImg2.visible = true;
			return this._animation2;
		}
	}
}