var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 牌局管理器
 */
var GamblingManager = (function () {
    function GamblingManager() {
    }
    Object.defineProperty(GamblingManager, "isInRoom", {
        /**
         * 是否在房间中
         */
        get: function () {
            return this.roomInfo != null && this.roomInfo != undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "isInSeat", {
        /**
         * 是否在座位上
         */
        get: function () {
            if (this.roomInfo && this.roomInfo.playerList) {
                for (var i = 0; i < this.roomInfo.playerList.length; i++) {
                    if (this.roomInfo.playerList[i].roleId == UserManager.userInfo.roleId) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "totalPotChips", {
        /**
         * 获取当前房间的总底池
         */
        get: function () {
            if (GamblingManager.roomInfo && GamblingManager.roomInfo.potChips) {
                var tmpChips = 0;
                for (var _i = 0, _a = GamblingManager.roomInfo.potChips; _i < _a.length; _i++) {
                    var chips = _a[_i];
                    tmpChips += chips;
                }
                if (GamblingManager.roomInfo.playerList) {
                    for (var _b = 0, _c = GamblingManager.roomInfo.playerList; _b < _c.length; _b++) {
                        var pInfo = _c[_b];
                        if (pInfo.num > 0) {
                            tmpChips += pInfo.num;
                        }
                    }
                }
                return tmpChips;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 请求进入房间
     */
    GamblingManager.reqEnterRoom = function (id, password) {
        if (id === void 0) { id = 0; }
        if (password != undefined && id > 0) {
            SocketManager.call(Command.Req_EnterRoomInfo_3600, { id: id, password: password }, GamblingManager.initialize, null, this);
        }
        else if (id > 0) {
            SocketManager.call(Command.Req_EnterRoomInfo_3600, { id: id }, GamblingManager.initialize, null, this);
        }
        else {
            SocketManager.call(Command.Req_EnterRoomInfo_3600, null, GamblingManager.initialize, null, this);
        }
    };
    GamblingManager.initialize = function (result) {
        if (result.data && result.data["id"]) {
            GamblingManager.roomInfo = new RoomInfo(result.data);
            if (GamblingManager.roomInfo.playerList && GamblingManager.roomInfo.playerList.length > 0) {
                for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                    var pInfo = _a[_i];
                    GamblingManager.reqGetPlayerUserInfo(pInfo);
                }
            }
            else {
                GamblingManager.getPlayerUserInfoOver();
            }
        }
        else {
            GamblingManager.getPlayerUserInfoOver();
        }
        SocketManager.AddCommandListener(Command.Push_NextRoundStart_2107, GamblingManager.pushNextRoundStart, this);
        SocketManager.AddCommandListener(Command.Push_BlindChange_2100, GamblingManager.pushBlindChange, this);
        SocketManager.AddCommandListener(Command.Push_PotChipsChange_2101, GamblingManager.pushPotChipsChange, this);
        SocketManager.AddCommandListener(Command.Push_OneLoopOver_2102, GamblingManager.pushOneLoopOver, this);
        SocketManager.AddCommandListener(Command.Push_SitOrStand_2103, GamblingManager.pushSitOrStand, this);
        SocketManager.AddCommandListener(Command.Push_PlayerStateChange_2104, GamblingManager.pushStateChange, this);
        SocketManager.AddCommandListener(Command.Push_ActionPosChange_2105, GamblingManager.pushActionPosChange, this);
        SocketManager.AddCommandListener(Command.Push_OneRoundOver_2106, GamblingManager.pushOneRoundOver, this);
        SocketManager.AddCommandListener(Command.Push_HandCard_2108, GamblingManager.pushHandCard, this);
        SocketManager.AddCommandListener(Command.Push_BrightCard_2109, GamblingManager.pushBrightCard, this);
        SocketManager.AddCommandListener(Command.Push_ChipsChange_2110, GamblingManager.pushChipsChange, this);
        SocketManager.AddCommandListener(Command.Push_PlayerListStateChange_2113, GamblingManager.pushPlayerListStateChange, this);
    };
    /**
     * 推送下一局开始
     */
    GamblingManager.pushNextRoundStart = function (result) {
        if (result.data && GamblingManager.roomInfo) {
            GamblingManager.roomInfo.copyValueFrom(result.data);
            if (GamblingManager.roomInfo.roundNum == undefined) {
                GamblingManager.roomInfo.roundNum = 0;
            }
            GamblingManager.roomInfo.roundNum++;
            GamblingManager.NextRoundStartEvent.dispatch();
        }
    };
    /**
     * 推送盲注前注变化
     */
    GamblingManager.pushBlindChange = function (result) {
        if (result.data && GamblingManager.roomInfo) {
            GamblingManager.roomInfo.copyValueFrom(result.data);
            GamblingManager.BlindChangeEvent.dispatch();
        }
    };
    GamblingManager.pushPotChipsChange = function (result) {
        if (result.data && GamblingManager.roomInfo) {
            GamblingManager.roomInfo.copyValueFrom(result.data);
            GamblingManager.PotChipsChangeEvent.dispatch();
        }
    };
    /**
     * 推送公共牌
     */
    GamblingManager.pushOneLoopOver = function (result) {
        if (result.data && GamblingManager.roomInfo) {
            GamblingManager.roomInfo.minRaiseNum = GamblingManager.roomInfo.bBlind; //一轮押注圈结束 下注金额最低最1*大盲
            GamblingManager.roomInfo.copyValueFrom(result.data);
            GamblingManager.OneLoopOverEvent.dispatch();
        }
    };
    /**
     * 推送玩家坐下或站起
     */
    GamblingManager.pushSitOrStand = function (result) {
        if (result.data) {
            var state_1 = result.data["state"];
            if (state_1 == BuyInGameState.Sit) {
                var playerInfo_1 = new PlayerInfo();
                playerInfo_1.copyValueFrom(result.data);
                var callBack_1 = function () {
                    GamblingManager.OnGetRoomInfoEvent.removeListener(callBack_1, this); //有玩家坐下，则需先要拉取玩家详细信息，拉取完毕之后在抛送坐下事件
                    GamblingManager.SitOrStandEvent.dispatch({ pInfo: playerInfo_1, state: state_1 });
                };
                GamblingManager.OnGetRoomInfoEvent.addListener(callBack_1, this);
                GamblingManager.reqGetPlayerUserInfo(playerInfo_1);
            }
            else if (state_1 == BuyInGameState.Stand) {
                var roleId = result.data["roleId"];
                var playerInfo = GamblingManager.getPlayerInfo(roleId);
                GamblingManager.removePlayer(roleId);
                if (playerInfo) {
                    if (playerInfo.roleId == UserManager.userInfo.roleId) {
                        GamblingManager._self = null;
                    }
                    GamblingManager.SitOrStandEvent.dispatch({ pInfo: playerInfo, state: state_1 });
                }
            }
        }
    };
    /**
     * 推送玩家状态变更
     */
    GamblingManager.pushStateChange = function (result) {
        if (result.data) {
            var roleId = result.data["roleId"];
            var state = result.data["state"];
            var num = result.data["num"];
            var pInfo = GamblingManager.getPlayerInfo(roleId);
            if (state == PlayerState.Check || state == PlayerState.AllIn ||
                state == PlayerState.Raise && GamblingManager.roomInfo && num > 0) {
                GamblingManager.roomInfo.maxAnte = num;
            }
            if (pInfo) {
                pInfo.state = state;
                pInfo.num = num;
                if (GamblingManager.roomInfo && pInfo.state == PlayerState.Raise || pInfo.state == PlayerState.AllIn) {
                    var lastMaxNum = GamblingManager.findMaxPlayerNum(pInfo.roleId);
                    var tmpNum = pInfo.num - lastMaxNum;
                    if (lastMaxNum == 0) {
                        GamblingManager.roomInfo.minRaiseNum = GamblingManager.roomInfo.bBlind * 2;
                    }
                    else if (tmpNum > 0) {
                        if (tmpNum < GamblingManager.roomInfo.bBlind) {
                            GamblingManager.roomInfo.minRaiseNum += lastMaxNum + GamblingManager.roomInfo.bBlind;
                        }
                        else {
                            GamblingManager.roomInfo.minRaiseNum += lastMaxNum + tmpNum; //最小加注额度
                        }
                    }
                }
                GamblingManager.PlayerStateChangeEvent.dispatch({ roleId: roleId, state: state, num: num });
            }
        }
    };
    /**
     * 查找状态参数最大的数量
     */
    GamblingManager.findMaxPlayerNum = function (excludeRoleId) {
        var num = 0;
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.playerList) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var pInfo = _a[_i];
                if (pInfo.roleId != excludeRoleId && pInfo.num > num) {
                    num = pInfo.num;
                }
            }
        }
        return num;
    };
    /**
     * 推送说话位置变更
     */
    GamblingManager.pushActionPosChange = function (result) {
        if (result.data && GamblingManager.roomInfo) {
            GamblingManager.roomInfo.copyValueFrom(result.data);
            GamblingManager.ActionPosChangeEvent.dispatch();
        }
    };
    /**
     * 推送一局结束
     */
    GamblingManager.pushOneRoundOver = function (result) {
        if (result.data) {
            GamblingManager.roundOverInfo.copyValueFrom(result.data);
            GamblingManager.RoundOverEvent.dispatch();
        }
    };
    /**
     * 推送玩家手牌
     */
    GamblingManager.pushHandCard = function (result) {
        if (result.data && GamblingManager.self) {
            GamblingManager.self.copyValueFrom(result.data);
            GamblingManager.HandCardComeEvent.dispatch();
        }
    };
    /**
     * 推送亮牌 已废弃
     */
    GamblingManager.pushBrightCard = function (result) {
        if (result.data) {
            var roleId = result.data["roleId"];
            var pInfo = GamblingManager.getPlayerInfo(roleId);
            if (pInfo) {
                pInfo.copyValueFrom(result.data);
                GamblingManager.BrightCardShowEvent.dispatch();
            }
        }
    };
    /**
     * 推送筹码变更
     */
    GamblingManager.pushChipsChange = function (result) {
        if (result.data) {
            var roleId = result.data["roleId"];
            var br = result.data["bankRoll"];
            var pInfo = GamblingManager.getPlayerInfo(roleId);
            if (pInfo) {
                pInfo.bankRoll = br;
                GamblingManager.ChipsChangeEvent.dispatch(pInfo);
            }
        }
    };
    /**
     * 推送玩家列表状态变更
     */
    GamblingManager.pushPlayerListStateChange = function (result) {
        if (result.data) {
            var list = result.data["roleId"];
            var state = result.data["state"];
            if (list && state != undefined) {
                var pInfo = void 0;
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var roleId = list_1[_i];
                    pInfo = GamblingManager.getPlayerInfo(roleId);
                    if (pInfo) {
                        pInfo.state = state;
                    }
                }
                GamblingManager.PlayerListStateChangeEvent.dispatch();
            }
        }
    };
    //--------------------------------------------------------------------
    /**
     * 请求下一局开始(准备)
     */
    GamblingManager.reqNextRoundStart = function () {
        SocketManager.call(Command.Req_NextRound_3601, null, GamblingManager.onNextRoundStart, null, this);
    };
    GamblingManager.onNextRoundStart = function (result) {
        if (GamblingManager.roomInfo) {
            GamblingManager.ReadyStateChangeEvent.dispatch();
        }
    };
    /**
     * 请求说话
     */
    GamblingManager.reqAction = function (state, num) {
        if (num === void 0) { num = 0; }
        var callBack = function (result) {
            if (GamblingManager.self) {
                GamblingManager.ActionOverEvent.dispatch();
            }
        };
        if (num != 0) {
            SocketManager.call(Command.Req_Action_3602, { state: state, num: num }, callBack, null, this);
        }
        else {
            SocketManager.call(Command.Req_Action_3602, { state: state }, callBack, null, this);
        }
    };
    /**
     * 请求超时操作
     */
    GamblingManager.reqTimeOut = function () {
        if (GamblingManager.isCanCheck) {
            GamblingManager.reqAction(PlayerState.Check);
        }
        else {
            GamblingManager.reqAction(PlayerState.Fold);
        }
    };
    /**
     * 请求离开房间(返回大厅)
     */
    GamblingManager.reqLeveaveRoom = function () {
        var callBack = function (result) {
            GamblingManager.LeaveRoomEvent.dispatch();
        };
        SocketManager.call(Command.Req_LeaveRoom_3603, null, callBack, null, this);
    };
    /**
     * 请求买入游戏
     */
    GamblingManager.reqBuyInGame = function (num, isAutoBuy, pos) {
        var callBack = function (result) {
            if (GamblingManager.roomInfo) {
                GamblingManager.roomInfo.isAutoBuy = isAutoBuy;
            }
            if (result.data) {
                var sitPos = result.data["pos"];
                GamblingManager.BuyInGameEvent.dispatch(sitPos);
            }
        };
        SocketManager.call(Command.Req_BuyInGame_3604, { num: num, isAutoBuy: isAutoBuy, pos: pos }, callBack, null, this);
    };
    /**
     * 请求站起
     */
    GamblingManager.reqStandUp = function () {
        var callBack = function (result) {
            GamblingManager.StandUpEvent.dispatch();
        };
        SocketManager.call(Command.Req_StandUp_3605, null, callBack, null, this);
    };
    /**
     * 请求亮牌
     */
    GamblingManager.reqBrightCard = function () {
        var callBack = function (result) {
            if (GamblingManager.roomInfo) {
                GamblingManager.roomInfo.isShowCard = !GamblingManager.roomInfo.isShowCard;
            }
            GamblingManager.BrightCardFlagEvent.dispatch();
        };
        SocketManager.call(Command.Req_BrightCard_3606, null, callBack, null, this);
    };
    /**
     * 请求增加金币
     */
    GamblingManager.reqAddCoin = function (num) {
        if (num > 0) {
            var callBack = function (result) {
                GamblingManager.AddCoinEvent.dispatch();
            };
            SocketManager.call(Command.Req_AddCoin_3607, { num: num }, callBack, null, this);
        }
        else {
            console.log("增加金币数量异常！");
        }
    };
    //--------------------------组全用户信息用-----------------------------
    /**
     * 拉取玩家信息完毕 可以进入房间 or 进入大厅
     */
    GamblingManager.getPlayerUserInfoOver = function () {
        GamblingManager.OnGetRoomInfoEvent.dispatch();
    };
    /**
    * 拉取玩家的用户信息
    */
    GamblingManager.reqGetPlayerUserInfo = function (playerInfo) {
        if (!playerInfo) {
            return;
        }
        if (!GamblingManager._getUserInfoQueue) {
            GamblingManager._getUserInfoQueue = new Array();
        }
        for (var _i = 0, _a = GamblingManager._getUserInfoQueue; _i < _a.length; _i++) {
            var info = _a[_i];
            if (playerInfo.roleId == info.roleId) {
                return; //已存在
            }
        }
        GamblingManager._getUserInfoQueue.push(playerInfo);
        GamblingManager.startGetUserInfo(GamblingManager._getUserInfoQueue[0]);
    };
    GamblingManager.startGetUserInfo = function (target) {
        if (!GamblingManager._isOnGetUserInfo) {
            GamblingManager._isOnGetUserInfo = true;
            var callBack = function (result) {
                GamblingManager._isOnGetUserInfo = false;
                GamblingManager._getUserInfoQueue[0].userInfo = new UserInfo(result.data);
                GamblingManager._getUserInfoQueue.shift();
                if (result.data) {
                    GamblingManager.getNext();
                }
            };
            var errorCallBack = function (result) {
                GamblingManager._isOnGetUserInfo = false;
                GamblingManager._getUserInfoQueue.shift();
                GamblingManager.getNext();
            };
            UserManager.sendGetUserInfo(target.roleId, callBack, errorCallBack);
        }
    };
    GamblingManager.getNext = function () {
        if (GamblingManager._getUserInfoQueue.length > 0) {
            GamblingManager.startGetUserInfo(GamblingManager._getUserInfoQueue[0]);
        }
        else {
            GamblingManager.getPlayerUserInfoOver();
        }
    };
    Object.defineProperty(GamblingManager, "self", {
        //--------------------------------------------------------------------
        //-----------------------------数据状态处理与更新----------------------
        get: function () {
            if (!GamblingManager._self) {
                GamblingManager._self = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
            }
            return GamblingManager._self;
        },
        enumerable: true,
        configurable: true
    });
    GamblingManager.addPlayer = function (playerInfo) {
        if (GamblingManager.roomInfo) {
            if (GamblingManager.roomInfo.playerList) {
                if (playerInfo && GamblingManager.isContainPlayer(playerInfo.roleId) == false) {
                    GamblingManager.roomInfo.playerList.push(playerInfo);
                }
            }
            else {
                GamblingManager.roomInfo.playerList = new Array();
                if (playerInfo) {
                    GamblingManager.roomInfo.playerList.push(playerInfo);
                }
            }
        }
    };
    /**
     * 移除玩家
     */
    GamblingManager.removePlayer = function (roleId) {
        var player = GamblingManager.getPlayerInfo(roleId);
        ArrayUtil.RemoveItem(player, GamblingManager.roomInfo.playerList);
    };
    /**
     * 获取玩家信息
     */
    GamblingManager.getPlayerInfo = function (roleId) {
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.playerList) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.roleId == roleId) {
                    return player;
                }
            }
        }
        return null;
    };
    /**
     * 获取玩家状态
     */
    GamblingManager.getPlayerState = function (roleId) {
        var pInfo = GamblingManager.getPlayerInfo(roleId);
        if (pInfo) {
            return pInfo.state;
        }
        else {
            return PlayerState.Empty;
        }
    };
    /**
     * 获取玩家信息根据位置
     */
    GamblingManager.getPlayerInfoByPos = function (pos) {
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.playerList) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var player = _a[_i];
                if (player.pos == pos) {
                    return player;
                }
            }
        }
        return null;
    };
    /**
    * 玩家是否已存在
    */
    GamblingManager.isContainPlayer = function (roleId) {
        return GamblingManager.getPlayerInfo(roleId) != null;
    };
    /**
     * 是否是小盲位
     */
    GamblingManager.isSBlindPos = function (pos) {
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.sBlindPos == pos) {
            return true;
        }
        return false;
    };
    /**
     * 是否是大盲位
     */
    GamblingManager.isBBlindPos = function (pos) {
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.bBlindPos == pos) {
            return true;
        }
        return false;
    };
    Object.defineProperty(GamblingManager, "maxSeats", {
        /**
         * 获取最大座位
         */
        get: function () {
            if (GamblingManager.roomInfo && GamblingManager.roomInfo.definition) {
                return GamblingManager.roomInfo.definition.seat;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否还在牌桌上
     */
    GamblingManager.isOnDesk = function (roleId) {
        var pInfo = GamblingManager.getPlayerInfo(roleId);
        if (pInfo) {
            switch (pInfo.state) {
                case PlayerState.Action:
                case PlayerState.Check:
                case PlayerState.Call:
                case PlayerState.Raise:
                case PlayerState.Blind:
                    return true;
            }
        }
        return false;
    };
    Object.defineProperty(GamblingManager, "maxRaiseChips", {
        /**
         * 获取可以加注的最大值
         */
        get: function () {
            if (GamblingManager.roomInfo && GamblingManager.roomInfo.playerList && GamblingManager.self) {
                var maxBankRoll = 0;
                for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                    var pInfo = _a[_i];
                    if (pInfo.roleId != UserManager.userInfo.roleId && pInfo.bankRoll > maxBankRoll) {
                        maxBankRoll = pInfo.bankRoll;
                    }
                }
                if (maxBankRoll > GamblingManager.roomInfo.minRaiseNum) {
                    var offset = maxBankRoll - GamblingManager.roomInfo.minRaiseNum;
                    var bbNum = Math.ceil(offset / GamblingManager.roomInfo.bBlind);
                    var additional = bbNum * GamblingManager.roomInfo.bBlind;
                    additional += GamblingManager.roomInfo.minRaiseNum;
                    return Math.min(additional, GamblingManager.self.bankRoll);
                }
                return GamblingManager.roomInfo.minRaiseNum;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "callNum", {
        /**
        * 获取需要跟注的数量
        */
        get: function () {
            if (GamblingManager.self && GamblingManager.roomInfo && GamblingManager.self.state == PlayerState.Action) {
                return GamblingManager.roomInfo.maxAnte - GamblingManager.self.num;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "isCanCheck", {
        /**
         * 是否可以过牌
         */
        get: function () {
            if (GamblingManager.self && GamblingManager.roomInfo) {
                if (GamblingManager.self.state == PlayerState.Action && GamblingManager.self.num == GamblingManager.roomInfo.maxAnte) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingManager, "isCanRaise", {
        /**
         * 是否可以加注
         */
        get: function () {
            if (GamblingManager.self && GamblingManager.roomInfo && GamblingManager.self.state == PlayerState.Action) {
                if (GamblingManager.self.bankRoll > GamblingManager.roomInfo.maxAnte) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否需要allin 加注最小值
     */
    GamblingManager.isNeedAllIn = function () {
        if (GamblingManager.self && GamblingManager.roomInfo && GamblingManager.self.state == PlayerState.Action) {
            if (GamblingManager.self.bankRoll <= GamblingManager.roomInfo.maxAnte) {
                return true;
            }
        }
        return false;
    };
    /**
    * 最大牌数
    */
    GamblingManager.MaxCardNum = 7;
    /**
     * 公共牌最大数量
     */
    GamblingManager.MaxBoardNum = 5;
    /**
     * 大于10的显示图片
     */
    GamblingManager.FlushSplitIndex = 10;
    /**
     * 是否过或弃
     */
    GamblingManager.isPassOrFold = false;
    /**
     * 是否跟任何
     */
    GamblingManager.isCallAny = false;
    GamblingManager._isOnGetUserInfo = false;
    //-----------------------------------event事件--------------------------------
    /**
     * 拉取房间信息
     */
    GamblingManager.OnGetRoomInfoEvent = new DelegateDispatcher();
    /**
     * 下一局开始事件
     */
    GamblingManager.NextRoundStartEvent = new DelegateDispatcher();
    /**
     * 买入游戏事件
     */
    GamblingManager.BuyInGameEvent = new DelegateDispatcher();
    /**
     * 坐下或站起
     */
    GamblingManager.SitOrStandEvent = new DelegateDispatcher();
    /**
     * 玩家状态变更
     */
    GamblingManager.PlayerStateChangeEvent = new DelegateDispatcher();
    /**
     * 手牌推送
     */
    GamblingManager.HandCardComeEvent = new DelegateDispatcher();
    /**
     * 推送亮牌
     */
    GamblingManager.BrightCardShowEvent = new DelegateDispatcher();
    /**
     * 筹码变更
     */
    GamblingManager.ChipsChangeEvent = new DelegateDispatcher();
    /**
     * 底池变更
     */
    GamblingManager.PotChipsChangeEvent = new DelegateDispatcher();
    /**
     * 公共牌变化
     */
    GamblingManager.OneLoopOverEvent = new DelegateDispatcher();
    /**
     * 推送说话位置变更
     */
    GamblingManager.ActionPosChangeEvent = new DelegateDispatcher();
    /**
     * 准备状态变更
     */
    GamblingManager.ReadyStateChangeEvent = new DelegateDispatcher();
    /**
     * 说话完毕
     */
    GamblingManager.ActionOverEvent = new DelegateDispatcher();
    /**
     * 离开房间事件
     */
    GamblingManager.LeaveRoomEvent = new DelegateDispatcher();
    /**
     * 站起
     */
    GamblingManager.StandUpEvent = new DelegateDispatcher();
    /**
     * 请求亮牌
     */
    GamblingManager.BrightCardFlagEvent = new DelegateDispatcher();
    /**
     * 增加金币
     */
    GamblingManager.AddCoinEvent = new DelegateDispatcher();
    /**
     * 玩家列表状态变更
     */
    GamblingManager.PlayerListStateChangeEvent = new DelegateDispatcher();
    /**
     * 一局结束
     */
    GamblingManager.RoundOverEvent = new DelegateDispatcher();
    /**
     * 盲注前注变更
     */
    GamblingManager.BlindChangeEvent = new DelegateDispatcher();
    return GamblingManager;
}());
__reflect(GamblingManager.prototype, "GamblingManager");
/**
 * 结算信息
 */
var RoundOverInfo = (function (_super) {
    __extends(RoundOverInfo, _super);
    function RoundOverInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundOverInfo.prototype.reset = function () {
        this.potList = undefined;
        this.roleHandCardList = undefined;
    };
    return RoundOverInfo;
}(BaseServerValueInfo));
__reflect(RoundOverInfo.prototype, "RoundOverInfo");
/**
 * 手牌信息
 */
var HandCardInfo = (function (_super) {
    __extends(HandCardInfo, _super);
    function HandCardInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HandCardInfo.prototype.reset = function () {
        this.roleId = 0;
        this.cardList = undefined;
    };
    return HandCardInfo;
}(BaseServerValueInfo));
__reflect(HandCardInfo.prototype, "HandCardInfo");
/**
 * 底池奖励信息
 */
var PotAwardInfo = (function (_super) {
    __extends(PotAwardInfo, _super);
    function PotAwardInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PotAwardInfo.prototype.reset = function () {
        this.roleId = undefined;
        this.type = 0;
        this.num = 0;
    };
    return PotAwardInfo;
}(BaseServerValueInfo));
__reflect(PotAwardInfo.prototype, "PotAwardInfo");
/**
 * 买入游戏状态
 */
var BuyInGameState;
(function (BuyInGameState) {
    /**
     * 坐下
     */
    BuyInGameState[BuyInGameState["Sit"] = 1] = "Sit";
    /**
     * 站起
     */
    BuyInGameState[BuyInGameState["Stand"] = 2] = "Stand";
})(BuyInGameState || (BuyInGameState = {}));
//# sourceMappingURL=GamblingManager.js.map