/**
 * 商城选项的定义
 * */
class PayDefined extends BaseDefined<ShoppingDefinition>
{
	private static readonly ShoppingConfig: string = "payList";
	private static _instance: PayDefined;

	public static GetInstance(): PayDefined
	{
		if (!PayDefined._instance)
		{
			PayDefined._instance = new PayDefined();
		}
		if (DefinedManager.IsParsed(PayDefined.ShoppingConfig) == false)
		{
			PayDefined._instance.initialize();
		}
		return PayDefined._instance;
	}
	public initialize()
	{
		let obj: Object = DefinedManager.GetData(PayDefined.ShoppingConfig);
		this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<ShoppingDefinition>;
	}

	public getDefinitionbyAwardId(awardId: number): ShoppingDefinition
	{
		for (let def of this.dataList)
		{
			if (def.awardId == awardId)
			{
				return def;
			}
		}
		return null;
	}
}


/**
 * 商城选项的定义
 * */
class ShoppingDefinition implements IBaseDefintion
{
	public id: number;
	public type: number;
	public ignoreInPanel: number;
	public iconName: string;
	public isWhiteView: number;
	public awardId: number;
}