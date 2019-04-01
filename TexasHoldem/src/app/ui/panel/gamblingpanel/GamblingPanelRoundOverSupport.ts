/**
 * 牌局结算支持
 */
class GamblingPanelRoundOverSupport extends BaseGamblingPanelSupport
{
	private _runIndex: number = 0;
	public initialize()
	{
		super.initialize();
	}
	public onEnable()
	{
		this.onEnable();
		GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
	}
	public onDisable()
	{
		this.onDisable();
		GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
	}
	private roundOverHandler()
	{
		if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.potList)
		{
			this._runIndex = 0;
			this.runNext();
		}
	}
	private runNext()
	{
		let potAwardInfo: PotAwardInfo;
		let headComponent: GamblingHeadComponent;
		let pInfo: PlayerInfo;
		let pointList: Array<egret.Point> = new Array<egret.Point>();
		potAwardInfo = GamblingManager.roundOverInfo.potList[this._runIndex];

		for (let roleId of potAwardInfo.roleId)
		{
			if (GamblingManager.roomInfo && GamblingManager.roomInfo.cardList && GamblingManager.roomInfo.cardList.length >= GamblingManager.MaxBoardNum)
			{
				this.showCardMaskImg(roleId, headComponent); //公共牌有最后一张尝试显示牌型
			}
			pInfo = GamblingManager.getPlayerInfo(roleId);
			if (pInfo)
			{
				headComponent = this.target.getHeadComponent(pInfo.pos);
				if (headComponent)
				{
					pointList.push(new egret.Point(headComponent.x, headComponent.y));
				}
			}
		}
		let dp: eui.ArrayCollection = this.target.potChipsList.dataProvider as eui.ArrayCollection;
		if (dp && dp.source && pointList.length > 0)
		{
			let len: number = dp.source.length;
			//todo
			let render: ChipsShowRenderer = this.target.potChipsList.getElementAt(this._runIndex) as ChipsShowRenderer;
			render.chips.winChipsTween(pointList, this.runOver, this);
		}
	}
	private runOver()
	{
		this._runIndex++;
		if (this._runIndex < GamblingManager.roundOverInfo.potList.length)
		{
			this.runNext();
		}
		else
		{
			this.target.potChipsList.visible = false;
			GamblingManager.reqNextRoundStart(); //请求3601
		}
	}
	/**
	 * 显示灰暗
	 */
	private showCardMaskImg(roleId: number, headComponent: GamblingHeadComponent)
	{
		let matchResult: boolean;
		for (let cardInfo of GamblingManager.roundOverInfo.roleHandCardList)
		{
			if (cardInfo.roleId == roleId)
			{
				matchResult = GamblingCardTypeMatch.matchCardType(cardInfo.cardList);
				headComponent.infoLabel.text = GamblingCardTypeMatch.getCardDes(GamblingCardTypeMatch.cardType);
				break;
			}
		}
		if (!matchResult)
		{
			return;
		}
		let len: number = this.target.cardList.length;
		let card: CardFaceComponent;

		headComponent.cardFace1.showMask(true);
		headComponent.cardFace2.showMask(true);
		for (let i: number = 0; i < len; i++)
		{
			card = this.target.cardList[i];
			if (card.visible)
			{
				card.showMask(true);
			}
		}

		for (let resultInfo of GamblingCardTypeMatch.resultList)
		{
			for (let i: number = 0; i < len; i++)
			{
				card = this.target.cardList[i];
				if (card.visible && card.bindData)
				{
					if (resultInfo[2] == 1 && resultInfo[0] == card.bindData[0] && resultInfo[1] == card.bindData[1])
					{
						card.showMask(false);
						break;
					}
				}
			}
			if (resultInfo[2] == 1 && headComponent.cardFace1.bindData &&
				resultInfo[0] == headComponent.cardFace1.bindData[0] && resultInfo[1] == headComponent.cardFace1.bindData[1])
			{
				headComponent.cardFace1.showMask(false);
			}
			if (resultInfo[2] == 1 && headComponent.cardFace2.bindData &&
				resultInfo[0] == headComponent.cardFace2.bindData[0] && resultInfo[1] == headComponent.cardFace2.bindData[1])
			{
				headComponent.cardFace2.showMask(false);
			}
		}
	}
}