/**
 * 错误的定义
 * */
class ErrorDefined extends BaseDefined<ErrorDefinition>
{
	private static readonly errorConfig: string = "error";
	private static _instance: ErrorDefined;
	public static GetInstance(): ErrorDefined
	{
		if (ErrorDefined._instance == null)
		{
			ErrorDefined._instance = new ErrorDefined();
		}
		if (DefinedManager.IsParsed(ErrorDefined.errorConfig) == false)
		{
			ErrorDefined._instance.initialize();
		}
		return ErrorDefined._instance;
	}

	public initialize()
	{
		let obj: Object = DefinedManager.GetData(ErrorDefined.errorConfig);
		this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<ErrorDefinition>;
	}
	public getDetails(id: number):string
	{
		let def: ErrorDefinition = this.getDefinition(id);
		if (def)
		{
			return def.des;
		}
		return StringConstant.empty;
	}
}
/**
 * 错误码定义
 */
class ErrorDefinition implements IBaseDefintion
{
	/*id*/
	public id: number;
	/**
	 * 错误消息
	 */
	public des: string;
}