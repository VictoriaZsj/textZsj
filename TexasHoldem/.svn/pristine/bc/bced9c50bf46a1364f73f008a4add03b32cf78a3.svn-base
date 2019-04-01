/**
 * 音乐音效配置表
 */
class MusicDefined extends BaseDefined<MusicDefinition>
{
	private static readonly musicConfig: string = "music";
	private static _instance: MusicDefined;
	public static GetInstance(): MusicDefined
	{
		if (MusicDefined._instance == null)
		{
			MusicDefined._instance = new MusicDefined();
		}
		if (DefinedManager.IsParsed(MusicDefined.musicConfig) == false)
		{
			MusicDefined._instance.initialize();
		}
		return MusicDefined._instance;
	}

	public initialize()
	{
		let obj: Object = DefinedManager.GetData(MusicDefined.musicConfig);
		this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<MusicDefinition>;
		if (this.dataList)
		{
			for (let def of this.dataList)
			{
				if (def.boy)
				{
					def.boy = def.boy.toString().split(SeparatorType.semicolon);
				}
				if (def.girl)
				{
					def.girl = def.girl.toString().split(SeparatorType.semicolon);
				}
			}
		}
	}
	/**
	 * 根据性别、行为、牌、获取一个音效，随机
	 */
	public getSexMusicDefinition(sex: number, action: string, pai?: number): string
	{
		let def: MusicDefinition = this.getMusicDefinition(action, pai);
		if (def)
		{
			let index: number = 0;
			if (sex == Sex.Female && def.girl)
			{
				index = MathUtil.getRandom(0, def.girl.length - 1);
				return def.girl[index];
			}
			else if (sex == Sex.Male && def.boy)
			{
				index = MathUtil.getRandom(0, def.boy.length - 1);
				return def.boy[index];
			}
			else
			{
				if (def.boy)
				{
					index = MathUtil.getRandom(0, def.boy.length - 1);
					return def.boy[index];
				}
			}
		}
		return StringConstant.empty;
	}
	/**
	 * 获取音效定义 
	 */
	public getMusicDefinition(action: string, pai?: number): MusicDefinition
	{
		if (!this.dataList)
		{
			return null;
		}
		let len: number = this.dataList.length;
		let def: MusicDefinition;
		if (action == "any")//MusicAction.pai
		{
			if (pai != undefined)
			{
				for (let i: number = 0; i < len; i++)
				{
					def = this.dataList[i];
					if (def.pai == pai)
					{
						return def;
					}
				}
			}
		}
		else
		{
			for (let i: number = 0; i < len; i++)
			{
				def = this.dataList[i];
				if (def.action == action)
				{
					return def;
				}
			}
		}
	}
}
/**
 * 错误码定义
 */
class MusicDefinition implements IBaseDefintion
{
	/*id*/
	public id: number;
	/**
	 * 行为
	 */
	public action: string;
	/**
	 * 牌id
	 */
	public pai: number;
	/**
	 * 男声
	 */
	public boy: Array<string>;
	/**
	 * 女声
	 */
	public girl: Array<string>;
}