/**
 * 锦标赛赛事信息
*/
class MatchRoomInfo extends BaseServerValueInfo 
{

    private _id: number;
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
        this._definition = ChampionshipDefined.GetInstance().getDefinition(value);
    }
    private _definition: ChampionshipDefinition
    public get definition(): ChampionshipDefinition
    {
        return this._definition;
    }
    public set definition(value: ChampionshipDefinition)
    {
        this._definition = value;
    }

    /**
     * 已报名人数
    */
    public applyNum: number;
    /**
     * 赛事开始时间
    */
    public startTime: number;
    /**
     * 该用户是否已报名该赛事  已报名1 未报名0
    */
    public isApply: number;
    /**
     * 报名方式  1 金币   2 门票
    */
    public joinWay: JoinChampionshipWay;
    /**
     * 是否因为报名人数不足而取消  已取消1  未取消0
    */
    public isCancel: number;

    public reset()
    {

    }
}