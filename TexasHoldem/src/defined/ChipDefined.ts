/**
 * 筹码的定义
 * */
class ChipsDefined extends BaseDefined<ChipsDefinition>
{
	private static readonly chipsConfig: string = "chips";
	private static _instance: ChipsDefined;

	public static GetInstance(): ChipsDefined
	{
		if (!ChipsDefined._instance)
		{
			ChipsDefined._instance = new ChipsDefined();
		}
		if (DefinedManager.IsParsed(ChipsDefined.chipsConfig) == false)
		{
			ChipsDefined._instance.initialize();
		}
		return ChipsDefined._instance;
	}

	public initialize()
	{
		let obj: Object = DefinedManager.GetData(ChipsDefined.chipsConfig);
		this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<ChipsDefinition>;
	}

    /**
	 * 获取筹码定义
	 */
	public getChipsDefinition(id: number): ChipsDefinition
	{
		for (let def of ChipsDefined.GetInstance().dataList)
		{
			if (def.id == id)
			{
				return def;
			}
		}
		return null;
	}
}

/**
 * 筹码选项的定义
 * */
class ChipsDefinition implements IBaseDefintion
{
	public id: number;
	public phase: number;
	public img: string;
}