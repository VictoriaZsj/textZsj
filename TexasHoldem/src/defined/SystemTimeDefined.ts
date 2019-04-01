/**
 * 活动时间定义
*/
class SystemTimeDefined extends BaseDefined<SystemTimeDefinition>
{
    private static readonly systemTimeConfig: string = "systemTime";
    private static _instance: SystemTimeDefined;
    public static GetInstance(): SystemTimeDefined
    {
        if (!SystemTimeDefined._instance)
        {
            SystemTimeDefined._instance = new SystemTimeDefined();
        }
        if (DefinedManager.IsParsed(SystemTimeDefined.systemTimeConfig) == false)
        {
            SystemTimeDefined._instance.initialize();
        }
        return SystemTimeDefined._instance;
    }
    public list: Dictionary<number, SystemTimeDefinition> = new Dictionary<number, SystemTimeDefinition>();
    public initialize()
    {
        let obj: Object = DefinedManager.GetData(SystemTimeDefined.systemTimeConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<SystemTimeDefinition>;
        if (this.dataList && this.dataList.length > 0)
        {
            for (let def of this.dataList)
            {
                let info: SystemTimeDefinition = new SystemTimeDefinition();
                info.id = def.id;
                info.span = new Array<SystemTimeSpanDefinition>();
                let spanList = def.span;
                for (let sdef of spanList)
                {
                    let spanDef: SystemTimeSpanDefinition = new SystemTimeSpanDefinition();
                    spanDef.id = sdef.id;
                    spanDef.type = sdef.type;
                    spanDef.start = sdef.start;
                    if (sdef.end)
                    {
                        spanDef.end = sdef.end;
                    } else
                    {
                        if (sdef.start[6])
                        {
                            spanDef.end = new Array<number>(9999, 1, 1, 23, 59, 59, sdef.start[6]);
                        } else
                        {
                            spanDef.end = new Array<number>(9999, 1, 1, 23, 59, 59);
                        }
                    }
                    info.span.push(spanDef);
                }
                this.list.add(info.id, info);
            }
        }
    }
    public GetSystemTimeDefinition(id: number): SystemTimeDefinition
    {

        let keys: Array<number> = this.list.getKeys();
        for (let key of keys)
        {
            if (this.list.getValue(key).id == id)
            {
                return this.list.getValue(key);
            }
        }
        return null;
    }
}
/**
 * 活动时间定义
*/
class SystemTimeDefinition implements IBaseDefintion
{
    /**
     * id
     */
    public id: number;
    /**
     * 时间子元素
    */
    public span: Array<SystemTimeSpanDefinition>;
}
/**
 * 活动时间子元素的定义
 * */
class SystemTimeSpanDefinition implements IBaseDefintion
{
    /**
     * id
     */
    public id: number;
	/**
	 * 类型
	 */
    public type: number;
    /**
     * 开始时间
     */
    public start: Array<number>;
    /**
     * 结束时间
     */
    public end: Array<number>;
}