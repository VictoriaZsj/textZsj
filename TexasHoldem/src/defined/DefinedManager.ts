class DefinedManager
{
	private static _dataMap: Dictionary<string, string> = new Dictionary<string, string>();
	private static _parseSet: Array<string> = new Array<string>();
	/**
	 * 重置
	 */
	public static Reset()
	{
		DefinedManager._parseSet = new Array<string>();//关联数组不能用length=0清空
	}
	/**
	 * 设置配置表数据
	 */
	public static SetConfigData(data: any)
	{
		DefinedManager._parseSet = new Array<string>();
		DefinedManager._dataMap.clear();
		if (data)
		{
			for (let key in data)
			{
				if (DefinedManager._dataMap.containsKey(key) == false)
				{
					DefinedManager._dataMap.add(key, data[key]);
				}
				else
				{
					console.log("Config有重复的:", key);
				}
			}
		}
	}
	/**
	 * 设置配置数据仅在开发模式使用
	 */
	public static setData(key: string, data: any)
	{
		if (DefinedManager._dataMap.containsKey(key) == false)
		{
			DefinedManager._dataMap.add(key, data);
		}
		else
		{
			console.log("Config有重复的:", key);
		}
	}
	/**
	 * 配置表是否已经解析过
	 */
	public static IsParsed(name: string): boolean
	{
		return DefinedManager._parseSet[name] == true;
	}
	/**
	 * 获取配置表数据
	 */
	public static GetData(name: string, suffix: string = ResSuffixName.JSONSuffix): any
	{
		DefinedManager._parseSet[name] = true;
		return DefinedManager._dataMap.getValue(name);
	}
}
