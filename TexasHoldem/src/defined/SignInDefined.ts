/**
 * 签到选项的定义
 * */
class SignInDefined extends BaseDefined<SignInDefinition>
{
	private static readonly SignInConfig: string = "activity_signin";
	private static _instance: SignInDefined;

	public static GetInstance(): SignInDefined
	{
		if (!SignInDefined._instance)
		{
			SignInDefined._instance = new SignInDefined();
		}
		if (DefinedManager.IsParsed(SignInDefined.SignInConfig) == false)
		{
			SignInDefined._instance.initialize();
		}
		return SignInDefined._instance;
	}
	public initialize()
	{
		let obj: Object = DefinedManager.GetData(SignInDefined.SignInConfig);
		this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<SignInDefinition>;		
	}
    
	public getDefinitionbyAwardId(awardId: number): SignInDefinition
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
 * 签到选项的定义
 * */
class SignInDefinition implements IBaseDefintion
{
	/**
	 * 签到选项主id
	*/
	public id: number;
	/**
	 * 活动配表id
	*/
	public activityId: number;
	/**
	 * 签到天数
	*/
	public day: number;
	/**
	 * 奖励配表id
	*/
	public awardId: number;
	/**
	 * 服务端确定奖励的子id
	*/
	public subId:number;
	/**
	 * 连续签到奖励
	*/
	public pilePrize:number;
}