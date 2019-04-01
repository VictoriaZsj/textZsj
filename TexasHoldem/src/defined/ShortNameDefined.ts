/**
 * 转换字段名
 * */
class ShortNameDefined extends BaseDefined<any>
{
	private static readonly shortConfig: string = "shortName";
	private static _instance: ShortNameDefined;
	public static GetInstance(): ShortNameDefined
	{
		if (ShortNameDefined._instance == null)
		{
			ShortNameDefined._instance = new ShortNameDefined();
		}
		if (DefinedManager.IsParsed(ShortNameDefined.shortConfig) == false)
		{
			ShortNameDefined._instance.initialize();
		}
		return ShortNameDefined._instance;
	}
	private shortNameKv: Object;
	public initialize()
	{
		this.shortNameKv = DefinedManager.GetData(ShortNameDefined.shortConfig);
	}
	public convertEnter(targetObj: Object)
	{
		if (targetObj != null)
		{
			let list: Array<Object> = targetObj as Array<Object>;
			if (list.length)
			{
				for (let i: number = 0; i < list.length; i++)
				{
					this.convertEnter(list[i]);
				}
				return targetObj;
			}
			else
			{
				return this.convert(targetObj);
			}
		}
		return null;
	}
	/*转换字段名定义*/
	private convert(targetObj: any)
	{
		if (targetObj)
		{
			// if (typeof targetObj == "Array<Object>")
			// {
			// 	console.log("此转换仅支持对象转换");
			// 	return null;
			// }
			for (let key in targetObj)
			{
				let convertedKey: string = this.getConvertKey(key);
				if (convertedKey)
				{
					targetObj[convertedKey] = targetObj[key];
					delete targetObj[key];
				}
			}
			return targetObj;
		}
		return null;
	}
	private getConvertKey(key: string): string
	{
		if (this.shortNameKv)
		{
			for (let shortKey in this.shortNameKv)
			{
				if (key == shortKey)
				{
					return this.shortNameKv[key];
				}
			}
		}
		return "";
	}
}

