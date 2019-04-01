/**
 *屏蔽词
*/
class ForbiddenDefined extends BaseDefined<ForbiddenDefinition>
{
    public static readonly forbiddenConfig: string = "forbidden";
    private static _instance: ForbiddenDefined;
    public static GetInstance(): ForbiddenDefined
    {
        if (!ForbiddenDefined._instance)
        {
            ForbiddenDefined._instance = new ForbiddenDefined();
        }
        if (DefinedManager.IsParsed(ForbiddenDefined.forbiddenConfig) == false)
        {
            ForbiddenDefined._instance.initialize();
        }
        return ForbiddenDefined._instance;
    }
    public initialize()
    {
        let obj: Object = DefinedManager.GetData(ForbiddenDefined.forbiddenConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<ForbiddenDefinition>;
    }
}
/**
* 屏蔽词的定义
*/
class ForbiddenDefinition implements IBaseDefintion
{
    public id: number;
    public des: string;
}