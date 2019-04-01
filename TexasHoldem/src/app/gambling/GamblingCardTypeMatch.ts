/**
 * 牌型匹配
 */
class GamblingCardTypeMatch
{
	/**
	 * 匹配结果
	 */
	public static resultList: Array<Array<number>>;
	public static cardType: CardType;
	private static _matchList: Array<Function>;
	private static initialize(): void
	{
		GamblingCardTypeMatch.resultList = new Array<Array<number>>();

		GamblingCardTypeMatch._matchList = new Array<Function>();
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchRoyalFlush);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchStraightFlush);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchFourOfAKind);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchFullhouse);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchFlush);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchStraight);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchThreeOfAKind);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchTwoPairs);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchOnePair);
		GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchHighCard);
	}
	public static clear()
	{
		GamblingCardTypeMatch.cardType = CardType.None;
	}
	/**
	 * 匹配牌型
	 */
	public static matchCardType(handCardList: Array<Array<number>>): boolean
	{
		if (!GamblingCardTypeMatch._matchList)
		{
			GamblingCardTypeMatch.initialize();
		}
		GamblingCardTypeMatch.clear();
		if (GamblingManager.roomInfo)
		{
			let allList: Array<Array<number>>;
			if (GamblingManager.roomInfo.cardList && handCardList)
			{
				allList = GamblingManager.roomInfo.cardList.concat(GamblingManager.roomInfo.handCardList);
			}
			else if (handCardList)
			{
				allList = handCardList.concat();
			}
			else if (GamblingManager.roomInfo.cardList)
			{
				allList = GamblingManager.roomInfo.cardList.concat();
			}
			if (allList)
			{
				for (let cardArr of allList)
				{
					cardArr[2] = 0;
				}
				allList.sort(GamblingCardTypeMatch.sortByIndex);
				let func: Function;
				for (let i: number = 0; i < GamblingCardTypeMatch._matchList.length; i++)
				{
					func = GamblingCardTypeMatch._matchList[i];
					if (func == GamblingCardTypeMatch.matchStraight || func == GamblingCardTypeMatch.matchStraightFlush)
					{
						return GamblingCardTypeMatch.containAOper(func, allList);
					}
					else if (func(allList))
					{
						return true;
					}

				}
			}
		}
		return false;
	}
	/**
	 * 包含A，算顺子，同花顺
	 */
	private static containAOper(func: Function, allList: Array<Array<number>>): boolean
	{
		if (func(allList))
		{
			return true;
		}
		else
		{
			let isContainA: boolean = false;
			for (let j: number = 0; j < allList.length; j++)
			{
				if (allList[j][1] == CardDefined.GetInstance().maxCardIndex)
				{
					isContainA = true;
					break;
				}
			}
			if (isContainA)
			{
				for (let j: number = 0; j < allList.length; j++)
				{
					if (allList[j][1] == CardDefined.GetInstance().maxCardIndex) //把A从最大索引，换成最小索引
					{
						allList[j][1] = CardDefined.GetInstance().minCardIndex;
					}
				}
				allList.sort(GamblingCardTypeMatch.sortByIndex);
				let result: boolean = func(allList);
				for (let j: number = 0; j < allList.length; j++) //在把A换回来
				{
					if (allList[j][1] == CardDefined.GetInstance().minCardIndex)
					{
						allList[j][1] = CardDefined.GetInstance().maxCardIndex;
					}
				}
				return result;
			}
		}
		return false;
	}
	/**
	 * 匹配皇家同花顺
	 */
	private static matchRoyalFlush(list: Array<Array<number>>): boolean
	{
		let result: boolean = GamblingCardTypeMatch.matchStraightFlush(list);
		if (result && GamblingCardTypeMatch.resultList[0][1] == CardDefined.GetInstance().maxCardIndex)
		{
			GamblingCardTypeMatch.toFillMaxFlag();
			GamblingCardTypeMatch.cardType = CardType.RoyalFlush;
			return true;
		}
		return false;
	}
	/**
	 * 匹配同花顺
	 */
	private static matchStraightFlush(list: Array<Array<number>>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = GamblingManager.MaxCardNum - len;
			let startInfo: Array<number>;
			let nextInfo: Array<number>;
			let count: number = 0;
			let fitNum: number = 0;
			let tmpList: Array<Array<number>> = new Array<Array<number>>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				count = 0;
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					count++;
					if (startInfo[0] == nextInfo[0] && startInfo[1] - nextInfo[1] == count)
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 4)
					{
						GamblingCardTypeMatch.resultList = tmpList;
						GamblingCardTypeMatch.toFillMaxFlag();
						GamblingCardTypeMatch.cardType = CardType.StraightFlush;
						return true;
					}
				}
			}
			tmpList = null;
		}
		return false;
	}
	/**
	 * 匹配4条
	 */
	private static matchFourOfAKind(list: Array<Array<number>>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = len - 4 + 1;
			let startInfo: Array<number>;
			let nextInfo: Array<number>;
			let fitNum: number = 0;
			let tmpList: Array<Array<number>> = new Array<Array<number>>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (startInfo[1] == nextInfo[1])
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 3)
					{
						GamblingCardTypeMatch.resultList = tmpList;
						GamblingCardTypeMatch.toFillMaxFlag();
						GamblingCardTypeMatch.toFillHighCard(list, tmpList[0][1], len);
						GamblingCardTypeMatch.cardType = CardType.FourOfAKind;
						return true;
					}
				}
			}
			tmpList = null;
		}
		return false;
	}
	/**
	 * 匹配葫芦
	 */
	private static matchFullhouse(list: Array<Array<number>>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = len - 3 + 1;
			let startInfo: Array<number>;
			let nextInfo: Array<number>;
			let fitNum: number = 0;
			let tmpList: Array<Array<number>> = new Array<Array<number>>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (startInfo[1] == nextInfo[1])
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 2)
					{
						let result: boolean = GamblingCardTypeMatch.toFillPair(list, tmpList, len);
						if (result)
						{
							GamblingCardTypeMatch.resultList = tmpList;
							GamblingCardTypeMatch.toFillMaxFlag();
							GamblingCardTypeMatch.cardType = CardType.Fullhouse;
							return true;
						}

					}
				}
			}
			tmpList = null;
		}
		return false;
	}
	/**
	 * 匹配同花
	 */
	private static matchFlush(list: Array<Array<number>>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = GamblingManager.MaxCardNum - len;
			let startInfo: Array<number>;
			let nextInfo: Array<number>;
			let fitNum: number = 0;
			let tmpList: Array<Array<number>> = new Array<Array<number>>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (startInfo[0] == nextInfo[0])
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 4)
					{
						GamblingCardTypeMatch.resultList = tmpList;
						GamblingCardTypeMatch.toFillMaxFlag();
						GamblingCardTypeMatch.cardType = CardType.Flush;
						return true;
					}
				}
			}
			tmpList = null;
		}
		return false;
	}
	/**
	 * 匹配顺子
	 */
	private static matchStraight(list: Array<Array<number>>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = GamblingManager.MaxCardNum - len;
			let startInfo: Array<number>;
			let nextInfo: Array<number>;
			let count: number = 0;
			let fitNum: number = 0;
			let tmpList: Array<Array<number>> = new Array<Array<number>>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				count = 0;
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					count++;
					if (startInfo[1] - nextInfo[1] == count)
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 4)
					{
						GamblingCardTypeMatch.resultList = tmpList;
						GamblingCardTypeMatch.toFillMaxFlag();
						GamblingCardTypeMatch.cardType = CardType.Straight;
						return true;
					}
				}
			}
			tmpList = null;
		}
		return false;
	}
	/**
	 * 匹配3条
	 */
	private static matchThreeOfAKind(list: Array<Array<number>>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = len - 3 + 1;
			let startInfo: Array<number>;
			let nextInfo: Array<number>;
			let fitNum: number = 0;
			let tmpList: Array<Array<number>> = new Array<Array<number>>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (startInfo[1] == nextInfo[1])
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 2)
					{
						GamblingCardTypeMatch.resultList = tmpList;
						GamblingCardTypeMatch.toFillMaxFlag();
						GamblingCardTypeMatch.toFillHighCard(list, tmpList[0][1], len);
						GamblingCardTypeMatch.cardType = CardType.ThreeOfAKind;
						return true;
					}
				}
			}
			tmpList = null;
		}
		return false;
	}
	/**
	 * 匹配两队
	 */
	private static matchTwoPairs(list: Array<Array<number>>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let tmpList: Array<Array<number>> = new Array<Array<number>>();
			let fitNum: number = 0;
			let numList: Array<number> = new Array<number>();
			let cardInfo: Array<number>;
			for (let i: number = 0; i < len; i++)
			{
				cardInfo = list[i];
				GamblingCardTypeMatch.sameCardOper(list, cardInfo[1]);
				if (GamblingCardTypeMatch._sameCardList.length == 2)
				{
					tmpList = tmpList.concat(GamblingCardTypeMatch._sameCardList);
					fitNum++;
					numList.push(cardInfo[1]);
					if (fitNum == 2)
					{
						GamblingCardTypeMatch.resultList = tmpList;
						GamblingCardTypeMatch.toFillMaxFlag();
						GamblingCardTypeMatch.toFillHighCard(list, numList, len);
						GamblingCardTypeMatch.cardType = CardType.TwoPairs;
						return true;
					}
				}
			}
		}
		return false;
	}
	/**
	 * 匹配一对
	 */
	private static matchOnePair(list: Array<Array<number>>): boolean
	{
		let len: number = list.length;
		let tmpList: Array<Array<number>> = new Array<Array<number>>();
		let fitNum: number = 0;
		let cardInfo: Array<number>;
		for (let i: number = 0; i < len; i++)
		{
			cardInfo = list[i];
			GamblingCardTypeMatch.sameCardOper(list, cardInfo[1]);
			if (GamblingCardTypeMatch._sameCardList.length == 2)
			{
				tmpList = tmpList.concat(GamblingCardTypeMatch._sameCardList);
				fitNum++;
				if (fitNum == 1)
				{
					GamblingCardTypeMatch.resultList = tmpList;
					GamblingCardTypeMatch.toFillMaxFlag();
					GamblingCardTypeMatch.toFillHighCard(list, cardInfo[1], len);
					GamblingCardTypeMatch.cardType = CardType.OnePair;
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 匹配高牌
	 */
	private static matchHighCard(list: Array<Array<number>>): boolean
	{
		GamblingCardTypeMatch.toFillHighCard(list, -1, list.length);
		GamblingCardTypeMatch.toFillMaxFlag();
		// if (GamblingCardTypeMatch.resultList.length > 0)
		// {
		// 	GamblingCardTypeMatch.resultList[0].push(1); //最大牌
		// }
		GamblingCardTypeMatch.cardType = CardType.HighCard;
		return true;
	}
	/**
	 * 填充对子
	 */
	private static toFillPair(list: Array<Array<number>>, tmpList: Array<Array<number>>, len: number): boolean
	{
		let info: Array<number>;
		let count: number;
		let tmpInfo: Array<number> = tmpList[0];
		for (let i: number = 0; i < len; i++)
		{
			info = list[i];
			if (info[1] != tmpInfo[1])
			{
				GamblingCardTypeMatch.sameCardOper(list, info[1]);
				if (GamblingCardTypeMatch._sameCardList.length == 2)
				{
					tmpList = tmpList.concat(GamblingCardTypeMatch._sameCardList);
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 填充高牌
	 */
	private static toFillHighCard(list: Array<Array<number>>, excludeIndex: number | Array<number>, len: number)
	{
		let info: Array<number>;
		for (let i: number = 0; i < len; i++)
		{
			info = list[i];
			if (GamblingCardTypeMatch.resultList.length < GamblingManager.MaxBoardNum)
			{
				if (typeof excludeIndex == "number" && info[1] != excludeIndex)
				{
					GamblingCardTypeMatch.resultList.push(info);
				}
				else if (excludeIndex instanceof Array && excludeIndex.indexOf(info[1]) == -1)
				{
					GamblingCardTypeMatch.resultList.push(info);
				}
				if (GamblingCardTypeMatch.resultList.length == GamblingManager.MaxBoardNum)
				{
					break;
				}
			}
		}
	}
	private static _sameCardList: Array<Array<number>>;
	/**
	 * 获取卡牌的数量
	 */
	private static sameCardOper(list: Array<Array<number>>, index: number): void
	{
		if (!GamblingCardTypeMatch._sameCardList)
		{
			GamblingCardTypeMatch._sameCardList = new Array<Array<number>>();
		}
		GamblingCardTypeMatch._sameCardList.length = 0;
		let len: number = list.length;
		let count: number = 0;
		for (let i: number = 0; i < len; i++)
		{
			if (list[i][1] == index)
			{
				GamblingCardTypeMatch._sameCardList.push(list[i]);
			}
		}
	}
	/**
	 * 降序排列牌列表
	 */
	private static sortByIndex(a: Array<number>, b: Array<number>)
	{
		if (a[1] > b[1])
		{
			return -1;
		}
		if (a[1] < b[1])
		{
			return 1;
		}
		return 0;
	}
	public static toFillMaxFlag()
	{
		let len: number = GamblingCardTypeMatch.resultList.length;
		for (let i: number = 0; i < len; i++)
		{
			GamblingCardTypeMatch.resultList[i][2] = 1; //添加最大牌标记
		}
	}
	/**
 	* 获取卡牌描述
 	*/
	public static getCardDes(type: CardType): string
	{
		switch (type)
		{
			case CardType.RoyalFlush:
				return "皇家同花顺";
			case CardType.StraightFlush:
				return "同花顺";
			case CardType.FourOfAKind:
				return "四条";
			case CardType.Fullhouse:
				return "葫芦";
			case CardType.Flush:
				return "同花";
			case CardType.Straight:
				return "顺子";
			case CardType.ThreeOfAKind:
				return "三条";
			case CardType.TwoPairs:
				return "两对";
			case CardType.OnePair:
				return "一对";
			case CardType.HighCard:
				return "高牌";
			default:
				return StringConstant.empty;
		}
	}
}