/**
 * 邮件定义
 */
class MailDefined extends BaseDefined<MailDefintion>
{
    private static readonly mailConfig: string = "mail";
    private static _instance: MailDefined;
    public static GetInstance(): MailDefined
    {
        if (!MailDefined._instance)
        {
            MailDefined._instance = new MailDefined();
        }
        if (DefinedManager.IsParsed(MailDefined.mailConfig) == false)
        {
            MailDefined._instance.initialize();
        }
        return MailDefined._instance;
    }

    public initialize()
    {
        let obj: Object = DefinedManager.GetData(MailDefined.mailConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<MailDefintion>;
    }
}

class MailDefintion
{
    /**
     * 邮件子类型
     */
    public id: number;
    /**
     * 邮件标题
     */
    public title: string;
    /**
     * 邮件
     */
    public content: string;
}