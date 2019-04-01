/**
 * 锦标赛盲注定义
*/
class ChampionshipBlindDefined extends BaseDefined<ChampionshipBlindDefinition>
{
    private static readonly championshipBlindConfig: string = "championshipBlind";
    private static _instance: ChampionshipBlindDefined;
    public static GetInstance(): ChampionshipBlindDefined
    {
        if (!ChampionshipBlindDefined._instance)
        {
            ChampionshipBlindDefined._instance = new ChampionshipBlindDefined();
        }
        if (DefinedManager.IsParsed(ChampionshipBlindDefined.championshipBlindConfig) == false)
        {
            ChampionshipBlindDefined._instance.initialize();
        }
        return ChampionshipBlindDefined._instance;
    }
    public initialize()
    {
        let obj: Object = DefinedManager.GetData(ChampionshipBlindDefined.championshipBlindConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj) as Array<ChampionshipBlindDefinition>;
    }
}
/**
 * 锦标赛盲注定义
 * */
class ChampionshipBlindDefinition implements IBaseDefintion
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
     * 小盲注
    */
    public sBlind: number;
    /**
     * 大盲注
    */
    public bBlind: number;
    /**
     * 前注
    */
    public preBet: number;
    /**
     * 重购
    */
    public rebuy: number;
    /**
     * 增购
    */
    public addon: number;
    /**
     * 涨盲时间
    */
    public upTime: number;
}