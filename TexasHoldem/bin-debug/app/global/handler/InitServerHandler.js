var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 初始化模块服务器消息逻辑（主要与服务器通信）
 */
var InitServerHandler = (function () {
    function InitServerHandler() {
        this._isComplete = false;
        //------------------------------------------------------------------
        // 有顺序的，必须加载才能进游戏的
        //------------------------------------------------------------------
        this._isGeting = false;
    }
    Object.defineProperty(InitServerHandler.prototype, "isComplete", {
        get: function () {
            return this._isComplete;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// 进游戏前初始化调用
    /// </summary>
    /// <param name="loginInfo"></param>
    /// <param name="serverInfo"></param>
    /// <param name="complete"></param>
    /// <param name="error"></param>
    InitServerHandler.prototype.Invoke = function (loginInfo, serverInfo, complete, error) {
        this._isComplete = false;
        this._complete = complete;
        this._error = error;
        UserManager.serverInfo = serverInfo;
        SocketManager.Close();
        SocketManager.Initialize(loginInfo.userid, serverInfo.roleId, serverInfo.id, loginInfo.secret, loginInfo.session, GameSetting.Gamec2sBin, GameSetting.Games2cBin);
        this.RemoveEvents();
        SocketManager.OnConnect.addListener(this.OnSocketConnect, this);
        SocketManager.OnEnterError.addListener(this.OnEnterError, this);
        SocketManager.isEntering = true;
        SocketManager.Connect(loginInfo.ip, loginInfo.port, true); //loginInfo.gameDomin
    };
    /// <summary>
    /// 当发送给服务器成功，在服务器返回之前断线，然后重连请求一样的session时候，重新拉数据
    /// </summary>
    InitServerHandler.prototype.AfreshGetInfo = function () {
        if (this._isGeting == false) {
            this._isGeting = true;
            SocketManager.call(Command.Role_GetInfo_3000, null, this.OnRoleInfo, null, this);
        }
    };
    InitServerHandler.prototype.RemoveEvents = function () {
        SocketManager.OnConnect.removeListener(this.OnSocketConnect, this);
        SocketManager.OnEnterError.removeListener(this.OnEnterError, this);
    };
    InitServerHandler.prototype.OnSocketConnect = function () {
        SocketManager.call(Command.Role_GetInfo_3000, null, this.OnRoleInfo, null, this);
    };
    InitServerHandler.prototype.OnEnterError = function () {
        this.DispatchError();
    };
    InitServerHandler.prototype.OnRoleInfo = function (result) {
        if (LoginManager.loginInfo.hasAlreadyCreateRole == false) {
            LoginManager.loginInfo.hasAlreadyCreateRole = true;
        }
        if (UserManager.serverInfo.roleId == 0) {
            //创建角色后，从socket里获取角色id
            UserManager.serverInfo.roleId = SocketManager.roleId;
            //创建角色统计
            // ChannelManager.SetCreateRole(SocketManager.roleId, _serverInfo.id, _serverInfo.definition.name);
        }
        //
        // LoggerManager.emailLogger.SetRoleId(SocketManager.roleId, _serverInfo.id);
        // TimeManager.Initialize(table);
        UserManager.initialize(SocketManager.roleId, result.data); //一定要用socket返回的roleId
        TimeManager.initialize(result.data);
        this.reqAwardInfo();
        // UserManager.initialize(SocketManager.roleId, _serverInfo.definition, table);//一定要用socket返回的roleId
        // this.DispatchComplete();
        ActivityManager.Initialize(result);
    };
    /**
     * 拉取兑换信息
     */
    InitServerHandler.prototype.reqAwardInfo = function () {
        SocketManager.call(Command.Award_GetInfo_3112, null, this.onReqAwardInfo, null, this);
    };
    InitServerHandler.prototype.onReqAwardInfo = function (result) {
        AwardManager.Initialize(result);
        this.reqItemList();
    };
    /**
     * 拉取物品列表
     */
    InitServerHandler.prototype.reqItemList = function () {
        SocketManager.call(Command.Req_ItemList_3020, null, this.onGetItemList, null, this);
    };
    InitServerHandler.prototype.onGetItemList = function (result) {
        ItemManager.initialize(result);
        this.reqFriendListInfo();
    };
    /**
    * 发送好友列表信息获取请求
    */
    InitServerHandler.prototype.reqFriendListInfo = function () {
        SocketManager.call(Command.Friend_GetList_3156, null, this.FriendListInfoResponse, null, this);
    };
    InitServerHandler.prototype.FriendListInfoResponse = function (result) {
        FriendManager.Initialize(result);
        //拉取房间信息需要最后拉取
        this.reqAchievementList();
    };
    /**
     * 拉取成就
     */
    InitServerHandler.prototype.reqAchievementList = function () {
        SocketManager.call(Command.Achievement_GetList_3090, { "roleId": UserManager.userInfo.roleId }, this.OnAchievementListInfo, null, this);
    };
    InitServerHandler.prototype.OnAchievementListInfo = function (result) {
        AchievementManager.initialize(result);
        AchieveProcessManager.Initialize(result);
        GamblingManager.OnGetRoomInfoEvent.addListener(this.requestNotice, this); //拉取房间信息 需要最后拉取
        GamblingManager.reqEnterRoom();
        // this.reqGetActivityList();
        this.requestNotice();
    };
    /**
     * 拉取活动列表
     */
    InitServerHandler.prototype.reqGetActivityList = function () {
        SocketManager.call(Command.Activity_GetList_3233, null, this.onGetreqGetActivityList, null, this);
    };
    InitServerHandler.prototype.onGetreqGetActivityList = function (result) {
        ActivityManager.Initialize(result);
        this.reqJoinNumList();
    };
    /**
     * 拉取锦标赛赛事报名人数信息列表
    */
    InitServerHandler.prototype.reqJoinNumList = function () {
        //todo 协议待添加
        SocketManager.call(Command.Friend_GetList_3156, null, this.MTTJoinNumListResponse, null, this);
    };
    InitServerHandler.prototype.MTTJoinNumListResponse = function (result) {
        if (result.data) {
            if (!ChampionshipManager.joinNumList) {
                ChampionshipManager.joinNumList = new Array();
            }
            ChampionshipManager.joinNumList = result.data['joinNumList'];
        }
        this.reqChampionshipJoinedList();
    };
    /**
     * 拉取锦标赛已报名赛事列表
    */
    InitServerHandler.prototype.reqChampionshipJoinedList = function () {
        //todo 协议待添加
        SocketManager.call(Command.Friend_GetList_3156, null, this.championshipJoinedListResponse, null, this);
    };
    InitServerHandler.prototype.championshipJoinedListResponse = function (result) {
        ChampionshipManager.initialize(result);
        this.reqGetRoomInfo();
    };
    InitServerHandler.prototype.reqGetRoomInfo = function () {
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoResult, this);
        //GamblingManager.reqGetRoomInfo();
    };
    InitServerHandler.prototype.onGetRoomInfoResult = function () {
        //请求服务器通知，需要所有拉取协议完毕了之后，请求服务器推送
        this.requestNotice();
    };
    /// <summary>
    /// 请求服务器推送 在所有拉取协议之后调用
    /// </summary>
    InitServerHandler.prototype.requestNotice = function () {
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.requestNotice, this); //拉取房间信息 需要最后拉取
        //发送3004开启推送通知
        SocketManager.call(Command.System_GetNotice_3004, { sessionId: SocketManager.requestSessionMax }, this.onGetNotice, null, this);
    };
    InitServerHandler.prototype.onGetNotice = function () {
        SocketManager.isEntering = false; //进游戏结束,开启重连，提示正常处理
        this.DispatchComplete();
    };
    InitServerHandler.prototype.DispatchComplete = function () {
        this.RemoveEvents();
        this._isGeting = false;
        this._isComplete = true;
        if (this._complete != null) {
            this._complete();
            this._complete = null;
        }
    };
    InitServerHandler.prototype.DispatchError = function () {
        this.RemoveEvents();
        this._isGeting = false;
        if (this._error != null) {
            this._error();
            this._error = null;
        }
    };
    return InitServerHandler;
}());
__reflect(InitServerHandler.prototype, "InitServerHandler");
//# sourceMappingURL=InitServerHandler.js.map