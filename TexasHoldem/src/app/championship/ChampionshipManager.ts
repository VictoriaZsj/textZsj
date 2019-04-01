/**
 * 锦标赛管理
 */
class ChampionshipManager
{
    /**
     * 锦标赛赛事列表
    */
    public static matchList: Array<MatchRoomInfo>;
    /**
     * 锦标赛已报名赛事列表
    */
    public static applicationList: Array<MatchRoomInfo>;
    /**
     * 我的门票列表
    */
    public static myTicketList: Array<ItemInfo>;
    /**
     * 最近赛况列表
    */
    public static outsList: Array<OutsInfo>;
    /**
     * 最近赛况正在展开的列表
    */
    public static spreadItem: eui.ToggleSwitch;
    /**
     * 最近赛况项子列表
    */
    public static childlist: eui.List;
    /**
     * 赛况信息
    */
    public static matchOutsInfo: MatchOutsInfo;
    /**
     * 排名列表
    */
    public static rankList: Array<ChampionshipRankInfo>;
    /**
     * 盲注列表
    */
    public static blindList: Array<ChampionshipBlindDefinition>;
    /**
     * 奖品列表
    */
    public static awardList: Array<ChampionshipAwardInfo>
    /**
     * 进入界面时当前盲注级别
    */
    public static nowBlindRank: number;
    /**
     * 各赛事报名的人数信息列表
    */
    public static joinNumList: Array<MTTJoinNumInfo>;
    /**
    * 进入界面时当前盲注项
   */
    public static nowBlindItem: BlindItemRenderer;

    /**
     * 重置数据
    */
    public static reset()
    {
        ArrayUtil.Clear(ChampionshipManager.applicationList);
    }
    /**
     * 添加推送监听
    */
    public static addPushListener()
    {
        //todo 1分钟开始横幅提醒推送
        // SocketManager.AddCommandListener(Command.Push_AddFriendSuccess_2036, ChampionshipManager.onMinuteStartPush, this);
        //todo 20秒倒计时弹框提醒推送
        // SocketManager.AddCommandListener(Command.Push_AddFriendSuccess_2036, ChampionshipManager.onSecondStartPush, this);
        //todo 各赛事报名人数数据推送 以及 已取消的赛事但赛事还在延迟报名时间之内的赛事的推送
        // SocketManager.AddCommandListener(Command.Push_AddFriendSuccess_2036, ChampionshipManager.onJoinNumPush, this);
        //todo  比赛取消推送
        // SocketManager.AddCommandListener(Command.Push_AddFriendSuccess_2036, ChampionshipManager.onCancelMTTPush, this);    
    }
    public static initialize(result: SpRpcResult)
    {
        ChampionshipManager.reset();
        ChampionshipManager.addPushListener();
        if (result.data)
        {
            if (!ChampionshipManager.applicationList)
            {
                ChampionshipManager.applicationList = new Array<MatchRoomInfo>();
            }
            for (let def of result.data["applicationList"])
            {
                let matchinfo: MatchRoomInfo = new MatchRoomInfo();
                matchinfo.id = def.id;
                if (ChampionshipManager.joinNumList)
                {
                    for (let joinNumInfo of ChampionshipManager.joinNumList)
                    {
                        if (joinNumInfo.id == def.id)
                        {
                            matchinfo.applyNum = joinNumInfo.num;
                            break;
                        }
                    }
                }
                matchinfo.isApply = 1;
                let mttInfo: ChampionshipDefinition = new ChampionshipDefinition();
                mttInfo = ChampionshipDefined.GetInstance().getDefinition(def.id);
                if (mttInfo)
                {
                    let startTime: number = (<Date>SystemTimeManager.IsInTime(mttInfo.timeId, mttInfo.displayTime * 1000, true)).getTime();
                    let realstartTime: number = ChampionshipManager.isInTime(startTime, mttInfo.displayTime * 1000, mttInfo.intervalTime * 1000, mttInfo.delaySign * 1000, mttInfo.loopTimes);
                    matchinfo.startTime = Math.floor(realstartTime / 1000);
                }
                matchinfo.joinWay = def.joinWay;
                ChampionshipManager.applicationList.push(matchinfo);
            }
        }
    }
    /**
     * 读表获得赛事列表
    */
    public static getMatchListInfo()
    {
        ArrayUtil.Clear(ChampionshipManager.matchList);
        if (!ChampionshipManager.matchList)
        {
            ChampionshipManager.matchList = new Array<MatchRoomInfo>();
        }
        for (let def of ChampionshipDefined.GetInstance().dataList)
        {
            let startTime: number = (<Date>SystemTimeManager.IsInTime(def.timeId, def.displayTime * 1000, true)).getTime();
            if (startTime != (<Date>TimeManager.Utc1970).getTime())
            {
                if ((<Date>SystemTimeManager.GetTodayLastTime(def.timeId)).getTime() >= TimeManager.GetServerUtcTimestamp() * 1000)
                {
                    let matchinfo: MatchRoomInfo = new MatchRoomInfo();
                    let realstartTime: number = ChampionshipManager.isInTime(startTime, def.displayTime * 1000, def.intervalTime * 1000, def.delaySign * 1000, def.loopTimes);
                    if (realstartTime != (<Date>TimeManager.Utc1970).getTime())
                    {
                        //  判断是否已报名该赛事
                        if (ChampionshipManager.applicationList && ChampionshipManager.applicationList.length > 0)
                        {
                            for (let application of ChampionshipManager.applicationList)
                            {
                                if (def.id == application.id)
                                {
                                    matchinfo.isApply = 1;
                                    matchinfo.joinWay = application.joinWay;
                                    break;
                                }
                            }
                        }
                        //写入报名人数和是否已取消但还在延迟报名时间内的数据
                        if (ChampionshipManager.joinNumList)
                        {
                            for (let joinNumInfo of ChampionshipManager.joinNumList)
                            {
                                if (joinNumInfo.id == def.id)
                                {
                                    if (joinNumInfo.isCancel)
                                    {
                                        matchinfo.isCancel = joinNumInfo.isCancel;
                                    }
                                    matchinfo.applyNum = joinNumInfo.num;
                                    break;
                                }
                            }
                        }
                        //如果该赛事已取消则跳过本次循环
                        if (matchinfo.isCancel)
                        {
                            continue;
                        }
                        matchinfo.definition = def;
                        matchinfo.id = def.id;
                        matchinfo.startTime = Math.floor(realstartTime / 1000);
                        ChampionshipManager.matchList.push(matchinfo);
                    }
                }
            }
        }
        ChampionshipManager.onGetMatchListEvent.dispatch();
    }
    /**
     * return 赛事开始时间的毫秒数
    * 判断赛事是否显示在列表中
   */
    public static isInTime(startTime: number, displayTime: number, intervalTime: number, delaySign: number, loopTimes: number): number
    {
        let realstartTime: number;
        let serverTime: Date = TimeManager.GetServerLocalDateTime();
        if (intervalTime)
        {
            let count: number = Math.floor((TimeManager.GetServerUtcTimestamp() * 1000 - startTime) / intervalTime);
            if (count < loopTimes)
            {
                if (serverTime.getTime() < startTime + intervalTime * count + delaySign)
                {
                    realstartTime = startTime + intervalTime * count;
                } else
                {
                    realstartTime = startTime + intervalTime * (count + 1);
                }
            } else
            {
                return TimeManager.Utc1970.getTime();
            }
        } else
        {
            realstartTime = startTime;
        }
        return realstartTime;
    }
    /**
     * 发送获取赛事详细信息请求
    */
    public static reqGetMatchDetailInfo(id: number)
    {
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, { id: id }, ChampionshipManager.getMatchDetailInfoResponse, null, this);
    }
    public static getMatchDetailInfoResponse(result: SpRpcResult)
    {
        if (result.data)
        {
            //  数据写入待添加
            ChampionshipManager.onGetMatchDetailEvent.dispatch();
        }
    }
    /*发送获取最近赛况信息请求*/
    public static reqGetRecentActionInfo()
    {
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, null, ChampionshipManager.getGetRecentActionInfoResponse, null, this);
    }
    public static getGetRecentActionInfoResponse(result: SpRpcResult)
    {
        if (result.data)
        {
            ArrayUtil.Clear(ChampionshipManager.outsList);
            if (!ChampionshipManager.outsList)
            {
                ChampionshipManager.outsList = new Array<OutsInfo>();
            }
            for (let def of result.data["outsList"])
            {
                let championshipPrizeList: Array<ChampionshipPrizeDefinition> = ChampionshipManager.getAwardList(def.id);
                if (def.rankList && def.rankList.length > 0)
                {
                    for (let rank of def.rankList)
                    {
                        if (championshipPrizeList && championshipPrizeList.length > 0)
                        {
                            for (let championshipPrize of championshipPrizeList)
                            {
                                if (rank.rank == championshipPrize.start)
                                {
                                    let str: string = "获得";
                                    let des = ChampionshipManager.getAwardName(def);
                                    if (des)
                                    {
                                        str += des;
                                        rank.award = str;
                                    }
                                }
                            }
                        }
                    }
                }
                ChampionshipManager.outsList.push(def);
            }
            ChampionshipManager.onGetRecentActionInfoEvent.dispatch();
        }
    }
    /**
     * 发送立即报名的请求
    */
    public static reqRequestJoin(id: number, flag: JoinChampionshipWay)
    {
        let callback: Function = function (result: SpRpcResult)
        {
            let info: MatchRoomInfo = new MatchRoomInfo();
            for (let def of ChampionshipManager.matchList)
            {
                if (def.id == id)
                {
                    def.isApply = 1;
                    def.applyNum++;
                    def.joinWay = flag;
                    info = def;
                    ChampionshipManager.applicationList.push(info);
                    break;
                }
            }
            UIManager.showPanel(UIModuleName.JoinChampionshipSuccessPanel, { name: info.definition.name, time: info.startTime, applyNum: info.applyNum, bNum: info.definition.bNum, chip: info.definition.initialChips });
            ChampionshipManager.onRequestJoinEvent.dispatch(flag);
        };
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, { id: id, joinWay: flag }, callback, null, this);
    }
    /**
     * 发送获取赛况请求
    */
    public static reqOutsInfo(id: number)
    {
        let callback: Function = function (result: SpRpcResult)
        {
            if (result.data)
            {
                if (!ChampionshipManager.matchOutsInfo)
                {
                    ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
                }
                if (result.data["blindId"])  //如果赛事尚未开始  盲注id应该返回 1
                {
                    ChampionshipManager.nowBlindRank = result.data["blindId"];
                    let blindInfo: ChampionshipBlindDefinition = ChampionshipBlindDefined.GetInstance().getDefinition(result.data["blindId"]);
                    if (!blindInfo.preBet)
                    {
                        ChampionshipManager.matchOutsInfo.nowAnte = blindInfo.preBet;
                    }
                    ChampionshipManager.matchOutsInfo.nowSBlind = blindInfo.sBlind;
                    ChampionshipManager.matchOutsInfo.nowBBlind = blindInfo.bBlind;
                    if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0 && result.data["blindId"] < ChampionshipManager.blindList.length)
                    {
                        blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(result.data["blindId"] + 1);

                    }
                    if (!blindInfo.preBet)
                    {
                        ChampionshipManager.matchOutsInfo.nextAnte = blindInfo.preBet;
                    }
                    ChampionshipManager.matchOutsInfo.nextSBlind = blindInfo.sBlind;
                    ChampionshipManager.matchOutsInfo.nextBBlind = blindInfo.bBlind;
                }
                ChampionshipManager.matchOutsInfo.rank = result.data["rank"];
                ChampionshipManager.matchOutsInfo.addBlindTime = result.data["addBlindTime"];
                ChampionshipManager.OnOutsInfoEvent.dispatch();
            }
        };
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, { id: id }, callback, null, this);
    }
    /**
     * 发送获取排名的请求
    */
    public static reqRankInfo(id: number)
    {
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, { id: id }, ChampionshipManager.rankInfoResponse, null, this);
    }
    public static rankInfoResponse(result: SpRpcResult)
    {
        if (result.data && result.data["rankList"])
        {
            ArrayUtil.Clear(ChampionshipManager.rankList);
            if (!ChampionshipManager.rankList)
            {
                ChampionshipManager.rankList = new Array<ChampionshipRankInfo>();
            }
            for (let def of result.data["rankList"])
            {
                let info: ChampionshipRankInfo = new ChampionshipRankInfo();
                info.copyValueFrom(def);
                ChampionshipManager.rankList.push(info);
            }
        }
        ChampionshipManager.OnRankInfoEvent.dispatch();
    }
    /**
     * 发送退赛请求
    */
    public static reqWithdraw(id: number, joinWay: JoinChampionshipWay)
    {
        let callback: Function = function (result: SpRpcResult)
        {
            if (ChampionshipManager.applicationList && ChampionshipManager.applicationList.length > 0)
            {
                for (let i: number = 0; i < ChampionshipManager.applicationList.length; i++)
                {
                    if (ChampionshipManager.applicationList[i].id == id)
                    {
                        ChampionshipManager.applicationList.splice(i, 1);
                        break;
                    }
                }
            }
            ChampionshipManager.OnWithdrawEvent.dispatch(joinWay);
        };
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, { id: id }, callback, null, this);
    }
    /**********服务器推送通知的相应操作****************/
    /**
     * 比赛1分钟开始横幅提醒推送对应的操作
    */
    public static onMinuteStartPush(result: SpRpcResult)
    {
        if (result.data)
        {
            UIManager.showPanel(UIModuleName.MinuteRemindPanel, { id: result.data['id'] });
        }
    }
    /**
     * 比赛20秒开始弹窗提醒推送对应的操作
    */
    public static onSecondStartPush(result: SpRpcResult)
    {
        if (result.data)
        {
            UIManager.showPanel(UIModuleName.SecondRemindPanel, { id: result.data['id'] });
        }
    }
    /**
     * 各赛事报名人数数据推送对应的操作
    */
    public static onJoinNumPush(result: SpRpcResult)
    {
        if (result.data)
        {
            //todo 数据形式待定  不知道是不是以数组的形式  全推还是那个改了推那个  
            //赛事列表变更肯定要推一次  要保持此列表中的数据和赛事列表中所代表的赛事一致
            for (let def of result.data['joinNumList'])  
            {
                for (let joinNumInfo of ChampionshipManager.joinNumList)
                {
                    if (def.id == joinNumInfo.id)
                    {
                        joinNumInfo.num = def.num;
                    }
                }
            }
            ChampionshipManager.joinNumList = result.data['joinNumList'];
            ChampionshipManager.OnJoinNumPushEvent.dispatch();
        }
    }
    /**
     * 赛事因为人数不满足最小报名人数而取消推送对应的操作
    */
    public static onCancelMTTPush(result: SpRpcResult)
    {
        if (result.data)
        {
            if (ChampionshipManager.joinNumList)
            {
                for (let i: number = 0; i < ChampionshipManager.joinNumList.length; i++)
                {
                    if (ChampionshipManager.joinNumList[i].id == result.data["id"])
                    {
                        ChampionshipManager.joinNumList[i].isCancel = 1;
                        break;
                    }
                }
            }
            if (ChampionshipManager.applicationList)
            {
                for (let i: number = 0; i < ChampionshipManager.applicationList.length; i++)
                {
                    if (ChampionshipManager.applicationList[i].id == result.data["id"])
                    {
                        ChampionshipManager.applicationList.splice(i, 1);
                        break;
                    }
                }
            }
            let info: ChampionshipDefinition = ChampionshipDefined.GetInstance().getDefinition(result.data["id"]);
            if (info)
            {
                AlertManager.showAlert("您报名的" + info.name + "因为报名人数不足已经取消，您的报名费或者门票已经返还给您！");
            }
        }
    }

    /**
     * 倒计时格式化
    */
    public static countDownFormat(number: number, isShowH: boolean)
    {
        let h: string;
        let m: string;
        let s: string;
        h = DateTimeUtil.formatCountdown(Math.floor(number / 3600));
        m = DateTimeUtil.formatCountdown(Math.floor(number / 60));
        s = DateTimeUtil.formatCountdown(number % 60);
        if (isShowH)
        {
            return h + ":" + m + ":" + s;
        } else
        {
            return m + ":" + s;
        }
    }
    /**
     * 根据赛事id获得奖励列表
    */
    public static getAwardList(id: number): Array<ChampionshipPrizeDefinition>
    {
        let championship: ChampionshipDefinition = ChampionshipDefined.GetInstance().getDefinition(id);
        if (championship)
        {
            let championshipPrizeList: Array<ChampionshipPrizeDefinition> = ChampionshipPrizeDefined.GetInstance().getChampionshipPrizeList(championship.prize);
            return championshipPrizeList;
        }
        return null;
    }
    /**
     * 根据奖品信息获得对应名次的奖励名称
    */
    public static getAwardName(championshipPrize: ChampionshipPrizeDefinition): string
    {
        let award: AwardDefinition = AwardDefined.GetInstance().getDefinition(championshipPrize.awardId);
        if (award && award.rewardList && award.rewardList.length > 0)
        {
            let str: string = "";
            for (let i: number = 0; i < award.rewardList.length; i++)
            {
                let name: string = ItemDefined.GetInstance().getDefinition(award.rewardList[i].id).name;
                let count: number = award.rewardList[i].count;
                if (name && count)
                {
                    if (count < 2)
                    {
                        str += name;
                    } else
                    {
                        str += count + name;
                    }
                    if (award.rewardId && i < award.rewardId.length - 1)
                    {
                        str += "、";
                    }
                }
            }
            return str;
        }
    }

    /**
	 * 请求赛事列表广播事件
	 */
    public static onGetMatchListEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 请求赛事详细信息广播事件
    */
    public static onGetMatchDetailEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 请求最近赛况信息广播事件
    */
    public static onGetRecentActionInfoEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 刷新UI广播事件
    */
    public static onRefreshUIEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 立即报名成功广播事件
    */
    public static onRequestJoinEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 最近赛况列表点击事件广播
    */
    public static onOutsItemClickEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 请求赛况信息广播事件
    */
    public static OnOutsInfoEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 请求排名信息广播事件
    */
    public static OnRankInfoEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 请求退赛广播事件
    */
    public static OnWithdrawEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 各赛事报名人数数据接受成功广播事件
    */
    public static OnJoinNumPushEvent: DelegateDispatcher = new DelegateDispatcher();
}