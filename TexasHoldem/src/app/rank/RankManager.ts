/**
 * 排行榜管理
 */
class RankManager
{
    /**
     * 本次排行榜列表
     */
    public static currentRankList: Array<RankInfo> = new Array<RankInfo>();
    /**
    * 重置数据
    */
    public static reset()
    {
        ArrayUtil.Clear(RankManager.currentRankList);
    }

	/**
	 * 计算排行榜的type类型
	 */
    public static getListType(rankType: number, listType: number): number
    {
        if (rankType == RankType.Vip)
        {
            return ReqRankType.Vip;
        }
        else
        {
            return rankType * 2 + listType + 1;
        }
    }
    /**
     * 拉取排行榜列表
     */
    public static reqRankList(type: number, isGetMyRank: number = 1)
    {
        let callback: Function = function (result: SpRpcResult)
        {
            RankManager.currentRankList = new Array<RankInfo>();
            if (result.data["rankList"])
            {
                for (let def of result.data["rankList"])
                {
                    let rank: RankInfo = new RankInfo();
                    rank.reset();
                    rank.copyValueFrom(def);
                    RankManager.currentRankList.push(rank);
                }
            }
            RankManager.getRankListEvent.dispatch(type);
        }
        SocketManager.call(Command.Req_RankList_3110, { "type": type }, callback, null, this);
    }
    /**
     * 获取排名描述
     */
    public static getRankDes(rank: number, suffix?: boolean): string
    {
        let result: string = StringConstant.empty;
        switch (rank)
        {
            case 1:
                result += "冠";
                break;
            case 2:
                result += "亚";
                break;
            case 3:
                result += "季";
                break;
            default:
                return rank.toString();
        }
        if (suffix)
        {
            result += "军";
        }
        return result;
    }
    /**
     * 拉取排行榜事件
     */
    public static getRankListEvent: DelegateDispatcher = new DelegateDispatcher();
}

