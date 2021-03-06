var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <summary>
/// 和游戏服务器通信的socket连接
/// </summary>
var SocketManager = (function () {
    function SocketManager() {
    }
    /// <summary>
    /// 添加忽略错误码处理
    /// </summary>
    /// <param name="error"></param>
    SocketManager.AddIgnoreError = function (error) {
        if (!SocketManager._ignoreError) {
            SocketManager._ignoreError = new Array();
        }
        if (SocketManager._ignoreError.indexOf(error) == -1) {
            SocketManager._ignoreError.push(error);
        }
    };
    /// <summary>
    /// 移除忽略错误码处理
    /// </summary>
    /// <param name="error"></param>
    SocketManager.RemoveIgnoreError = function (error) {
        ArrayUtil.RemoveItem(error, SocketManager._ignoreError);
    };
    SocketManager.Initialize = function (userId, roleId, serverId, secret, session, c2s, s2c, msgType) {
        if (msgType === void 0) { msgType = egret.WebSocket.TYPE_BINARY; }
        SocketManager._isReconnecting = false;
        if (!SocketManager._socket) {
            SocketManager._socket = new GameSocket();
            SocketManager._socket.addNormalError(SocketManager.ResetRoleInfoErrorCode);
            SocketManager._socket.initialize(userId, roleId, serverId, secret, session, c2s, s2c, msgType);
            SocketManager._socket.AddMessageListener(SocketManager.OnMessage, this);
        }
    };
    Object.defineProperty(SocketManager, "roleId", {
        /// <summary>
        /// 角色id(是在握手包返回的，从这里取)
        /// </summary>
        get: function () {
            return SocketManager._socket.roleId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketManager, "requestSessionMax", {
        /**
     * 获取服务器推送的最大session
     */
        get: function () {
            return SocketManager._socket.requestSessionMax;
        },
        enumerable: true,
        configurable: true
    });
    SocketManager.Dispose = function () {
        if (SocketManager._socket) {
            egret.clearTimeout(SocketManager._delayId);
            SocketManager._socket.RemoveMessageListener(SocketManager.OnMessage, this);
            SocketManager.StopHeartbeat();
            SocketManager.RemoveAllListener();
            SocketManager._socket.dispose();
            SocketManager._socket = null;
        }
    };
    /// <summary>
    /// 关闭连接
    /// </summary>
    /// <param name="enabledSend"></param>
    SocketManager.Close = function (enabledSend, stopHeartbeat) {
        if (enabledSend === void 0) { enabledSend = false; }
        if (stopHeartbeat === void 0) { stopHeartbeat = true; }
        if (SocketManager._socket) {
            egret.clearTimeout(SocketManager._delayId);
            if (stopHeartbeat) {
                SocketManager.StopHeartbeat();
            }
            SocketManager.RemoveAllListener();
            SocketManager._socket.close(enabledSend);
        }
    };
    /// <summary>
    /// 连接服务器
    /// </summary>
    /// <param name="ip"></param>
    /// <param name="port"></param>
    /// <param name="isShowLoading"></param>
    SocketManager.Connect = function (address, port, isShowLoading) {
        if (isShowLoading === void 0) { isShowLoading = true; }
        if (SocketManager._socket == null) {
            throw new Error("socket no initialize");
        }
        if (isShowLoading) {
            UIManager.showPanel(UIModuleName.LoadingPanel);
        }
        SocketManager.AddAllListener();
        SocketManager._socket.Connect(address, port);
    };
    /// <summary>
    /// 重连，必须先Close才可以重连
    /// </summary>
    SocketManager.Reconnect = function () {
        if (SocketManager.VerifyReLogin()) {
            AlertManager.showAlertObj({ confirmLabel: "登录失效", message: "登录验证失效，请重新登录游戏！", OnConfirm: SocketManager.OnClickReconnect });
        }
        else {
            SocketManager._isReconnecting = true;
            SocketManager.Connect(SocketManager._socket.address, SocketManager._socket.port);
        }
    };
    SocketManager.AddAllListener = function () {
        SocketManager._socket.AddResultListener(SocketManager.OnResult, this);
        UIManager.addEventListener(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout, SocketManager.OnLoadingTimeout, this);
    };
    SocketManager.RemoveAllListener = function () {
        UIManager.removeEventListener(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout, SocketManager.OnLoadingTimeout, this);
        SocketManager._socket.RemoveResultListener(SocketManager.OnResult, this);
    };
    SocketManager.OnLoadingTimeout = function () {
        SocketManager.Close();
        AlertManager.showAlertObj({ confirmLabel: "网络超时", message: "网络连接超时，请检查您的网络是否正常并重试！", OnConfirm: SocketManager.OnClickReconnect });
    };
    //------------------------------------------------------------------
    // Send 可重复连续发送
    //------------------------------------------------------------------
    /**
     * 同步发送
     * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
     */
    SocketManager.Send = function (cmdId, args) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(false, false, cmdId, args, true);
    };
    /**
     * 同步发送，断线重连后会重发失败的数据
     * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
     */
    SocketManager.SendDiscRetry = function (cmdId, args) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(false, true, cmdId, args, true);
    };
    /**
     * 同步隐式发送，不显示loading，不影响交互事件
     * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
     */
    SocketManager.ImplSend = function (cmdId, args) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(false, false, cmdId, args, false);
    };
    /**
     * 同步隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
     * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
     */
    SocketManager.ImplSendDiscRetry = function (cmdId, args) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(false, true, cmdId, args, false);
    };
    //------------------------------------------------------------------
    // Send 不可重复连续发送
    //------------------------------------------------------------------
    /**
     * 独占发送
     * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
     */
    SocketManager.SendAsync = function (cmdId, args) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(true, false, cmdId, args, true);
    };
    /**
     * 独占发送，断线重连后会重发失败的数据
     * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
     */
    SocketManager.SendAsyncDiscRetry = function (cmdId, args) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(true, true, cmdId, args, true);
    };
    /**
     * 独占隐式发送，不显示loading，不影响交互事件
     * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
     */
    SocketManager.ImplSendAsync = function (cmdId, args) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(true, false, cmdId, args, false);
    };
    /**
     * 独占隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
     * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
     */
    SocketManager.ImplSendAsyncDiscRetry = function (cmdId, args) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(true, true, cmdId, args, false);
    };
    //------------------------------------------------------------------
    // Send 事件
    //------------------------------------------------------------------
    SocketManager.AddCommandListener = function (cmdId, listener, thisObject) {
        if (SocketManager._socket != null && listener != null && cmdId) {
            SocketManager._socket.AddCommandListener(cmdId, listener, thisObject);
        }
        else {
            console.error("AddCommandListener:socket no initialize");
        }
    };
    SocketManager.RemoveCommandListener = function (cmdId, listener, thisObject) {
        if (SocketManager._socket != null) {
            SocketManager._socket.RemoveCommandListener(cmdId, listener, thisObject);
        }
    };
    SocketManager.AddErrorListener = function (cmdId, listener, thisObject) {
        if (SocketManager._socket != null) {
            SocketManager._socket.AddErrorListener(cmdId, listener, thisObject);
        }
        else {
            console.error("AddCommandListener:socket no initialize");
        }
    };
    SocketManager.RemoveErrorListener = function (cmdId, listener, thisObject) {
        if (SocketManager._socket != null) {
            SocketManager._socket.RemoveErrorListener(cmdId, listener, thisObject);
        }
    };
    //------------------------------------------------------------------
    // Call 可重复连续发送
    //------------------------------------------------------------------
    /**
     * 同步发送
     * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
     * 回调执行后会自动移除
     */
    SocketManager.call = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(false, false, cmdId, args, true, onResult, onError, thisObject);
    };
    /**
     * 同步发送，断线重连后会重发失败的数据
     * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
     * 回调执行后会自动移除
     */
    SocketManager.callDiscRetry = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(false, true, cmdId, args, true, onResult, onError, thisObject);
    };
    /**
     * 同步隐式发送，不显示loading，不影响交互事件
     * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
     * 回调执行后会自动移除
     */
    SocketManager.ImplCall = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(false, false, cmdId, args, false, onResult, onError, thisObject);
    };
    /**
     * 同步隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
     * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
     * 回调执行后会自动移除
     */
    SocketManager.ImplCallDiscRetry = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(false, true, cmdId, args, false, onResult, onError, thisObject);
    };
    /**
     * 移除发送回调
     */
    SocketManager.RemoveCall = function (cmdId, onResult, thisObject) {
        if (SocketManager._socket != null) {
            SocketManager._socket.RemoveCall(cmdId, onResult, thisObject);
        }
    };
    //------------------------------------------------------------------
    // Call 不可重复连续发送
    //------------------------------------------------------------------
    /**
     * 独占发送
     * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
     * 回调执行后会自动移除
     */
    SocketManager.callAsync = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(true, false, cmdId, args, true, onResult, onError, thisObject);
    };
    /**
     * 独占发送，断线重连后会重发失败的数据
     * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
     * 回调执行后会自动移除
     */
    SocketManager.callAsyncDiscRetry = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(true, true, cmdId, args, true, onResult, onError, thisObject);
    };
    /**
     * 独占隐式发送，不显示loading，不影响交互事件
     * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
     * 回调执行后会自动移除
     */
    SocketManager.ImplCallAsync = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(true, false, cmdId, args, false, onResult, onError, thisObject);
    };
    /**
     * 独占隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
     * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
     * 回调执行后会自动移除
     */
    SocketManager.ImplCallAsyncDiscRetry = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        SocketManager.InvokeSend(true, true, cmdId, args, false, onResult, onError, thisObject);
    };
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    SocketManager.InvokeSend = function (isSole, isDiscRetry, cmdId, args, isShowLoading, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        if (SocketManager._socket && SocketManager._socket.enabledSend) {
            if (isShowLoading) {
                UIManager.showPanel(UIModuleName.LoadingPanel);
            }
        }
        else {
            console.log("禁止发送:" + cmdId);
        }
        SocketManager._socket.InvokeSend(isSole, isDiscRetry, cmdId, args, onResult, onError, thisObject);
    };
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    SocketManager.OnResult = function (result) {
        SocketManager._lastTimestamp = TimeManager.GetServerUtcTimestamp();
        if (result.op == SpRpcOp.Response) {
            //客户端请求的返回
            SocketManager._heartbeatTime = egret.getTimer();
            ;
            UIManager.closePanel(UIModuleName.LoadingPanel);
            if (result.error != 0) {
                if (result.error == SocketManager.ResetRoleInfoErrorCode) {
                    //当发送给服务器成功，在服务器返回之前断线，然后重连请求一样的session时候，重新拉数据
                    GameManager.initServerHandler.AfreshGetInfo();
                }
                else {
                    if (!SocketManager._ignoreError || SocketManager._ignoreError.indexOf(result.error) == -1) {
                        if (SocketManager.isEntering) {
                            NetUtil.AlertResultError(result, SocketManager.OnClickEnterError);
                        }
                        else {
                            NetUtil.AlertResultError(result);
                            SocketManager.OnResultError.dispatch(result.error);
                        }
                    }
                }
            }
        }
        else {
            //服务器主动通知返回
            //
            //如果在别的地方登录，就不提示服务器断开连接的错误提示了
            if (result.cmdId == Command.System_Response_Login_2013) {
                UIManager.closePanel(UIModuleName.LoadingPanel);
                SocketManager.Close();
                AlertManager.showAlertObj({ title: "提示", message: "该账号在其它地方登录，确定回到登录界面。", OnConfirm: SocketManager.OnClickReLogin });
            }
        }
    };
    SocketManager.OnMessage = function (msg) {
        NetUtil.Log(msg);
        switch (msg.type) {
            case SocketMessageType.Connect:
                UIManager.closePanel(UIModuleName.LoadingPanel);
                console.log("游戏服务器连接成功");
                SocketManager._autoReconnect = true;
                SocketManager._socket.InvokeDiscRetry();
                if (SocketManager._isReconnecting) {
                    SocketManager._isReconnecting = false;
                    SocketManager._socket.SimpleSend(Command.System_GetNotice_3004, { sessionId: SocketManager._socket.requestSessionMax });
                }
                SocketManager.StartHeartbeat();
                SocketManager.OnConnect.dispatch();
                break;
            case SocketMessageType.Failing://连接断开
                UIManager.closePanel(UIModuleName.LoadingPanel);
                SocketManager.Close();
                NetUtil.AlertFailing(msg.errorCode, SocketManager.OnClickReLogin);
                break;
            case SocketMessageType.NetworkError://网络异常
                UIManager.closePanel(UIModuleName.LoadingPanel);
                if (SocketManager.VerifyReLogin()) {
                    SocketManager.Close();
                    NetUtil.AlertNetworkErrorReLogin(msg.errorCode, SocketManager.OnClickReLogin);
                }
                else {
                    if (SocketManager.isEntering) {
                        SocketManager.Close();
                        NetUtil.AlertConnectError(msg.errorCode, SocketManager.OnClickReconnect);
                    }
                    else {
                        SocketManager.Close();
                        //每次连接成功后，都可以断线自动重连一次
                        if (SocketManager._autoReconnect) {
                            SocketManager._delayId = egret.setTimeout(SocketManager.delayAutoReconnect, this, 2000);
                        }
                        else {
                            if (msg.type == SocketMessageType.NetworkError) {
                                NetUtil.AlertConnectError(msg.errorCode, SocketManager.OnClickReconnect);
                            }
                            else if (msg.type == SocketMessageType.Failing) {
                                NetUtil.AlertConnectError(msg.errorCode, SocketManager.OnClickReconnect, "连接失败", "登录验证失效或服务器主动断开连接！");
                            }
                        }
                    }
                }
                break;
            case SocketMessageType.HandshakeError:
                UIManager.closePanel(UIModuleName.LoadingPanel);
                SocketManager.Close();
                NetUtil.AlertNetworkErrorReLogin(msg.errorCode, SocketManager.OnClickReLogin);
                break;
        }
    };
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    SocketManager.delayAutoReconnect = function () {
        SocketManager._autoReconnect = false;
        SocketManager.Reconnect();
    };
    /// <summary>
    /// 验证是否需要重新登录
    /// </summary>
    /// <returns></returns>
    SocketManager.VerifyReLogin = function () {
        if (TimeManager.GetServerUtcTimestamp() - SocketManager._lastTimestamp < 270) {
            return false;
        }
        if (TimeManager.GetCurrentOnlineLength() < 1500) {
            return false;
        }
        return true;
    };
    SocketManager.OnClickReLogin = function (data) {
        if (SocketManager.isEntering) {
            SocketManager.OnEnterError.dispatch();
        }
        else {
            GameManager.reLogin();
        }
    };
    SocketManager.OnClickReconnect = function (data) {
        if (SocketManager.isEntering) {
            SocketManager.OnEnterError.dispatch();
        }
        else {
            SocketManager.Reconnect();
        }
    };
    SocketManager.OnClickEnterError = function (data) {
        SocketManager.OnEnterError.dispatch();
    };
    //------------------------------------------------------------------
    // 心跳
    //------------------------------------------------------------------
    SocketManager.StartHeartbeat = function () {
        SocketManager._heartbeatTime = egret.getTimer();
        Tick.AddSecondsInvoke(SocketManager.OnTickHeartbeat, this);
    };
    SocketManager.StopHeartbeat = function () {
        Tick.RemoveSecondsInvoke(SocketManager.OnTickHeartbeat, this);
    };
    SocketManager.OnTickHeartbeat = function (delta) {
        if (egret.getTimer() - SocketManager._heartbeatTime >= SocketManager.HeartbeatInterval) {
            SocketManager._heartbeatTime = egret.getTimer();
            SocketManager._socket.SimpleCall(Command.System_Heartbeat_3016, { sessionId: SocketManager._socket.requestSessionMax }, SocketManager.OnHeartbeatServer, null, this);
        }
    };
    SocketManager.OnHeartbeatServer = function (result) {
        TimeManager.SetServerTimestamp(result.data);
    };
    SocketManager.ResetRoleInfoErrorCode = 201; //重新获取角色数据错误码
    SocketManager.HeartbeatInterval = 60000; //心跳包发送间隔时间，60秒
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    /// <summary>
    /// 是否是正在进入游戏中，不需要重连，提示错误后特殊处理
    /// </summary>
    SocketManager.isEntering = false;
    SocketManager._isReconnecting = false; //是否是重连中
    SocketManager._autoReconnect = false; //是自动重连
    SocketManager._delayId = undefined;
    /// <summary>
    /// 服务器返回错误码事件，全局的
    /// </summary>
    SocketManager.OnResultError = new DelegateDispatcher();
    /// <summary>
    /// 进入游戏错误
    /// </summary>
    SocketManager.OnEnterError = new DelegateDispatcher();
    /// <summary>
    /// socket连接成功
    /// </summary>
    SocketManager.OnConnect = new DelegateDispatcher();
    return SocketManager;
}());
__reflect(SocketManager.prototype, "SocketManager");
//# sourceMappingURL=SocketManager.js.map