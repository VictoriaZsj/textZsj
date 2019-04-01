var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 锦标赛管理
 */
var ChampionshipManager = (function () {
    function ChampionshipManager() {
    }
    /**
     * 重置数据
    */
    ChampionshipManager.reset = function () {
        ArrayUtil.Clear(ChampionshipManager.applicationList);
    };
    /**
     * 添加推送监听
    */
    ChampionshipManager.addPushListener = function () {
        //todo 1分钟开始横幅提醒推送
        // SocketManager.AddCommandListener(Command.Push_AddFriendSuccess_2036, ChampionshipManager.onMinuteStartPush, this);
        //todo 20秒倒计时弹框提醒推送
        // SocketManager.AddCommandListener(Command.Push_AddFriendSuccess_2036, ChampionshipManager.onSecondStartPush, this);
        //todo 各赛事报名人数数据推送 以及 已取消的赛事但赛事还在延迟报名时间之内的赛事的推送
        // SocketManager.AddCommandListener(Command.Push_AddFriendSuccess_2036, ChampionshipManager.onJoinNumPush, this);
        //todo  比赛取消推送
        // SocketManager.AddCommandListener(Command.Push_AddFriendSuccess_2036, ChampionshipManager.onCancelMTTPush, this);    
    };
    ChampionshipManager.initialize = function (result) {
        ChampionshipManager.reset();
        ChampionshipManager.addPushListener();
        if (result.data) {
            if (!ChampionshipManager.applicationList) {
                ChampionshipManager.applicationList = new Array();
            }
            for (var _i = 0, _a = result.data["applicationList"]; _i < _a.length; _i++) {
                var def = _a[_i];
                var matchinfo = new MatchRoomInfo();
                matchinfo.id = def.id;
                if (ChampionshipManager.joinNumList) {
                    for (var _b = 0, _c = ChampionshipManager.joinNumList; _b < _c.length; _b++) {
                        var joinNumInfo = _c[_b];
                        if (joinNumInfo.id == def.id) {
                            matchinfo.applyNum = joinNumInfo.num;
                            break;
                        }
                    }
                }
                matchinfo.isApply = 1;
                var mttInfo = new ChampionshipDefinition();
                mttInfo = ChampionshipDefined.GetInstance().getDefinition(def.id);
                if (mttInfo) {
                    var startTime = SystemTimeManager.IsInTime(mttInfo.timeId, mttInfo.displayTime * 1000, true).getTime();
                    var realstartTime = ChampionshipManager.isInTime(startTime, mttInfo.displayTime * 1000, mttInfo.intervalTime * 1000, mttInfo.delaySign * 1000, mttInfo.loopTimes);
                    matchinfo.startTime = Math.floor(realstartTime / 1000);
                }
                matchinfo.joinWay = def.joinWay;
                ChampionshipManager.applicationList.push(matchinfo);
            }
        }
    };
    /**
     * 读表获得赛事列表
    */
    ChampionshipManager.getMatchListInfo = function () {
        ArrayUtil.Clear(ChampionshipManager.matchList);
        if (!ChampionshipManager.matchList) {
            ChampionshipManager.matchList = new Array();
        }
        for (var _i = 0, _a = ChampionshipDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            var startTime = SystemTimeManager.IsInTime(def.timeId, def.displayTime * 1000, true).getTime();
            if (startTime != TimeManager.Utc1970.getTime()) {
                if (SystemTimeManager.GetTodayLastTime(def.timeId).getTime() >= TimeManager.GetServerUtcTimestamp() * 1000) {
                    var matchinfo = new MatchRoomInfo();
                    var realstartTime = ChampionshipManager.isInTime(startTime, def.displayTime * 1000, def.intervalTime * 1000, def.delaySign * 1000, def.loopTimes);
                    if (realstartTime != TimeManager.Utc1970.getTime()) {
                        //  判断是否已报名该赛事
                        if (ChampionshipManager.applicationList && ChampionshipManager.applicationList.length > 0) {
                            for (var _b = 0, _c = ChampionshipManager.applicationList; _b < _c.length; _b++) {
                                var application = _c[_b];
                                if (def.id == application.id) {
                                    matchinfo.isApply = 1;
                                    matchinfo.joinWay = application.joinWay;
                                    break;
                                }
                            }
                        }
                        //写入报名人数和是否已取消但还在延迟报名时间内的数据
                        if (ChampionshipManager.joinNumList) {
                            for (var _d = 0, _e = ChampionshipManager.joinNumList; _d < _e.length; _d++) {
                                var joinNumInfo = _e[_d];
                                if (joinNumInfo.id == def.id) {
                                    if (joinNumInfo.isCancel) {
                                        matchinfo.isCancel = joinNumInfo.isCancel;
                                    }
                                    matchinfo.applyNum = joinNumInfo.num;
                                    break;
                                }
                            }
                        }
                        //如果该赛事已取消则跳过本次循环
                        if (matchinfo.isCancel) {
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
    };
    /**
     * return 赛事开始时间的毫秒数
    * 判断赛事是否显示在列表中
   */
    ChampionshipManager.isInTime = function (startTime, displayTime, intervalTime, delaySign, loopTimes) {
        var realstartTime;
        var serverTime = TimeManager.GetServerLocalDateTime();
        if (intervalTime) {
            var count = Math.floor((TimeManager.GetServerUtcTimestamp() * 1000 - startTime) / intervalTime);
            if (count < loopTimes) {
                if (serverTime.getTime() < startTime + intervalTime * count + delaySign) {
                    realstartTime = startTime + intervalTime * count;
                }
                else {
                    realstartTime = startTime + intervalTime * (count + 1);
                }
            }
            else {
                return TimeManager.Utc1970.getTime();
            }
        }
        else {
            realstartTime = startTime;
        }
        return realstartTime;
    };
    /**
     * 发送获取赛事详细信息请求
    */
    ChampionshipManager.reqGetMatchDetailInfo = function (id) {
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, { id: id }, ChampionshipManager.getMatchDetailInfoResponse, null, this);
    };
    ChampionshipManager.getMatchDetailInfoResponse = function (result) {
        if (result.data) {
            //  数据写入待添加
            ChampionshipManager.onGetMatchDetailEvent.dispatch();
        }
    };
    /*发送获取最近赛况信息请求*/
    ChampionshipManager.reqGetRecentActionInfo = function () {
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, null, ChampionshipManager.getGetRecentActionInfoResponse, null, this);
    };
    ChampionshipManager.getGetRecentActionInfoResponse = function (result) {
        if (result.data) {
            ArrayUtil.Clear(ChampionshipManager.outsList);
            if (!ChampionshipManager.outsList) {
                ChampionshipManager.outsList = new Array();
            }
            for (var _i = 0, _a = result.data["outsList"]; _i < _a.length; _i++) {
                var def = _a[_i];
                var championshipPrizeList = ChampionshipManager.getAwardList(def.id);
                if (def.rankList && def.rankList.length > 0) {
                    for (var _b = 0, _c = def.rankList; _b < _c.length; _b++) {
                        var rank = _c[_b];
                        if (championshipPrizeList && championshipPrizeList.length > 0) {
                            for (var _d = 0, championshipPrizeList_1 = championshipPrizeList; _d < championshipPrizeList_1.length; _d++) {
                                var championshipPrize = championshipPrizeList_1[_d];
                                if (rank.rank == championshipPrize.start) {
                                    var str = "获得";
                                    var des = ChampionshipManager.getAwardName(def);
                                    if (des) {
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
    };
    /**
     * 发送立即报名的请求
    */
    ChampionshipManager.reqRequestJoin = function (id, flag) {
        var callback = function (result) {
            var info = new MatchRoomInfo();
            for (var _i = 0, _a = ChampionshipManager.matchList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.id == id) {
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
    };
    /**
     * 发送获取赛况请求
    */
    ChampionshipManager.reqOutsInfo = function (id) {
        var callback = function (result) {
            if (result.data) {
                if (!ChampionshipManager.matchOutsInfo) {
                    ChampionshipManager.matchOutsInfo = new MatchOutsInfo();
                }
                if (result.data["blindId"]) {
                    ChampionshipManager.nowBlindRank = result.data["blindId"];
                    var blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(result.data["blindId"]);
                    if (!blindInfo.preBet) {
                        ChampionshipManager.matchOutsInfo.nowAnte = blindInfo.preBet;
                    }
                    ChampionshipManager.matchOutsInfo.nowSBlind = blindInfo.sBlind;
                    ChampionshipManager.matchOutsInfo.nowBBlind = blindInfo.bBlind;
                    if (ChampionshipManager.blindList && ChampionshipManager.blindList.length > 0 && result.data["blindId"] < ChampionshipManager.blindList.length) {
                        blindInfo = ChampionshipBlindDefined.GetInstance().getDefinition(result.data["blindId"] + 1);
                    }
                    if (!blindInfo.preBet) {
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
    };
    /**
     * 发送获取排名的请求
    */
    ChampionshipManager.reqRankInfo = function (id) {
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, { id: id }, ChampionshipManager.rankInfoResponse, null, this);
    };
    ChampionshipManager.rankInfoResponse = function (result) {
        if (result.data && result.data["rankList"]) {
            ArrayUtil.Clear(ChampionshipManager.rankList);
            if (!ChampionshipManager.rankList) {
                ChampionshipManager.rankList = new Array();
            }
            for (var _i = 0, _a = result.data["rankList"]; _i < _a.length; _i++) {
                var def = _a[_i];
                var info = new ChampionshipRankInfo();
                info.copyValueFrom(def);
                ChampionshipManager.rankList.push(info);
            }
        }
        ChampionshipManager.OnRankInfoEvent.dispatch();
    };
    /**
     * 发送退赛请求
    */
    ChampionshipManager.reqWithdraw = function (id, joinWay) {
        var callback = function (result) {
            if (ChampionshipManager.applicationList && ChampionshipManager.applicationList.length > 0) {
                for (var i = 0; i < ChampionshipManager.applicationList.length; i++) {
                    if (ChampionshipManager.applicationList[i].id == id) {
                        ChampionshipManager.applicationList.splice(i, 1);
                        break;
                    }
                }
            }
            ChampionshipManager.OnWithdrawEvent.dispatch(joinWay);
        };
        //todo 协议待添加
        SocketManager.call(Command.Req_RoomInfo_3002, { id: id }, callback, null, this);
    };
    /**********服务器推送通知的相应操作****************/
    /**
     * 比赛1分钟开始横幅提醒推送对应的操作
    */
    ChampionshipManager.onMinuteStartPush = function (result) {
        if (result.data) {
            UIManager.showPanel(UIModuleName.MinuteRemindPanel, { id: result.data['id'] });
        }
    };
    /**
     * 比赛20秒开始弹窗提醒推送对应的操作
    */
    ChampionshipManager.onSecondStartPush = function (result) {
        if (result.data) {
            UIManager.showPanel(UIModuleName.SecondRemindPanel, { id: result.data['id'] });
        }
    };
    /**
     * 各赛事报名人数数据推送对应的操作
    */
    ChampionshipManager.onJoinNumPush = function (result) {
        if (result.data) {
            //todo 数据形式待定  不知道是不是以数组的形式  全推还是那个改了推那个  
            //赛事列表变更肯定要推一次  要保持此列表中的数据和赛事列表中所代表的赛事一致
            for (var _i = 0, _a = result.data['joinNumList']; _i < _a.length; _i++) {
                var def = _a[_i];
                for (var _b = 0, _c = ChampionshipManager.joinNumList; _b < _c.length; _b++) {
                    var joinNumInfo = _c[_b];
                    if (def.id == joinNumInfo.id) {
                        joinNumInfo.num = def.num;
                    }
                }
            }
            ChampionshipManager.joinNumList = result.data['joinNumList'];
            ChampionshipManager.OnJoinNumPushEvent.dispatch();
        }
    };
    /**
     * 赛事因为人数不满足最小报名人数而取消推送对应的操作
    */
    ChampionshipManager.onCancelMTTPush = function (result) {
        if (result.data) {
            if (ChampionshipManager.joinNumList) {
                for (var i = 0; i < ChampionshipManager.joinNumList.length; i++) {
                    if (ChampionshipManager.joinNumList[i].id == result.data["id"]) {
                        ChampionshipManager.joinNumList[i].isCancel = 1;
                        break;
                    }
                }
            }
            if (ChampionshipManager.applicationList) {
                for (var i = 0; i < ChampionshipManager.applicationList.length; i++) {
                    if (ChampionshipManager.applicationList[i].id == result.data["id"]) {
                        ChampionshipManager.applicationList.splice(i, 1);
                        break;
                    }
                }
            }
            var info = ChampionshipDefined.GetInstance().getDefinition(result.data["id"]);
            if (info) {
                AlertManager.showAlert("您报名的" + info.name + "因为报名人数不足已经取消，您的报名费或者门票已经返还给您！");
            }
        }
    };
    /**
     * 倒计时格式化
    */
    ChampionshipManager.countDownFormat = function (number, isShowH) {
        var h;
        var m;
        var s;
        h = DateTimeUtil.formatCountdown(Math.floor(number / 3600));
        m = DateTimeUtil.formatCountdown(Math.floor(number / 60));
        s = DateTimeUtil.formatCountdown(number % 60);
        if (isShowH) {
            return h + ":" + m + ":" + s;
        }
        else {
            return m + ":" + s;
        }
    };
    /**
     * 根据赛事id获得奖励列表
    */
    ChampionshipManager.getAwardList = function (id) {
        var championship = ChampionshipDefined.GetInstance().getDefinition(id);
        if (championship) {
            var championshipPrizeList = ChampionshipPrizeDefined.GetInstance().getChampionshipPrizeList(championship.prize);
            return championshipPrizeList;
        }
        return null;
    };
    /**
     * 根据奖品信息获得对应名次的奖励名称
    */
    ChampionshipManager.getAwardName = function (championshipPrize) {
        var award = AwardDefined.GetInstance().getDefinition(championshipPrize.awardId);
        if (award && award.rewardList && award.rewardList.length > 0) {
            var str = "";
            for (var i = 0; i < award.rewardList.length; i++) {
                var name_1 = ItemDefined.GetInstance().getDefinition(award.rewardList[i].id).name;
                var count = award.rewardList[i].count;
                if (name_1 && count) {
                    if (count < 2) {
                        str += name_1;
                    }
                    else {
                        str += count + name_1;
                    }
                    if (award.rewardId && i < award.rewardId.length - 1) {
                        str += "、";
                    }
                }
            }
            return str;
        }
    };
    /**
     * 请求赛事列表广播事件
     */
    ChampionshipManager.onGetMatchListEvent = new DelegateDispatcher();
    /**
     * 请求赛事详细信息广播事件
    */
    ChampionshipManager.onGetMatchDetailEvent = new DelegateDispatcher();
    /**
     * 请求最近赛况信息广播事件
    */
    ChampionshipManager.onGetRecentActionInfoEvent = new DelegateDispatcher();
    /**
     * 刷新UI广播事件
    */
    ChampionshipManager.onRefreshUIEvent = new DelegateDispatcher();
    /**
     * 立即报名成功广播事件
    */
    ChampionshipManager.onRequestJoinEvent = new DelegateDispatcher();
    /**
     * 最近赛况列表点击事件广播
    */
    ChampionshipManager.onOutsItemClickEvent = new DelegateDispatcher();
    /**
     * 请求赛况信息广播事件
    */
    ChampionshipManager.OnOutsInfoEvent = new DelegateDispatcher();
    /**
     * 请求排名信息广播事件
    */
    ChampionshipManager.OnRankInfoEvent = new DelegateDispatcher();
    /**
     * 请求退赛广播事件
    */
    ChampionshipManager.OnWithdrawEvent = new DelegateDispatcher();
    /**
     * 各赛事报名人数数据接受成功广播事件
    */
    ChampionshipManager.OnJoinNumPushEvent = new DelegateDispatcher();
    return ChampionshipManager;
}());
__reflect(ChampionshipManager.prototype, "ChampionshipManager");
//# sourceMappingURL=ChampionshipManager.js.map