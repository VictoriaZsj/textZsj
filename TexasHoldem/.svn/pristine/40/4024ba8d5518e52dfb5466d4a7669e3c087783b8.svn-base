/**
 * 牌的定义
 * */
class CardDefined extends BaseDefined<CardDefinition>
{
	private static readonly cardConfig: string = "card";
	private static _instance: CardDefined;
	public static GetInstance(): CardDefined
	{
		if (!CardDefined._instance)
		{
			CardDefined._instance = new CardDefined();
		}
		if (DefinedManager.IsParsed(CardDefined.cardConfig) == false)
		{
			CardDefined._instance.initialize();
		}
		return CardDefined._instance;
	}
	/**
	 * 最大牌索引
	 */
	public maxCardIndex: number;
	/**
	 * 卡牌最小A
	 */
	public readonly minCardIndex:number = 1;

	public initialize()
	{
		let obj: Object = DefinedManager.GetData(CardDefined.cardConfig);
		this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<CardDefinition>;
		if (this.dataList)
		{
			let def: CardDefinition;
			CardDefined.GetInstance().maxCardIndex = 0;
			for (let i: number = 0; i < this.dataList.length; i++)
			{
				def = this.dataList[i];
				if (def.index > CardDefined.GetInstance().maxCardIndex)
				{
					CardDefined.GetInstance().maxCardIndex = def.index;
				}
			}
		}
	}
}
/**
 * 牌的定义
 * */
class CardDefinition implements IBaseDefintion
{
	/**
	 * 牌ID
	 */
	public id: number;
	/**
	 * 牌型
	 */
	public type: CardType;
	/**
	 * 牌索引
	 */
	public index: number;
}
