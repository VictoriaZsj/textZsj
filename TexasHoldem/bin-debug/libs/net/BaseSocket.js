var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通信基础socket
 */
var BaseSocket = (function () {
    function BaseSocket(useHandshake) {
        if (useHandshake === void 0) { useHandshake = false; }
        /**
         * 是否处理服务器返回的错误码侦听
         */
        this.enabledErrorCode = true;
        //send	
        this._session = 0; //消息id，自增
        /**
         * 发送消息列表
         */
        this._infoList = new Array();
        this._address = StringConstant.empty; //地址
        this._msgType = egret.WebSocket.TYPE_BINARY;
        //event callback
        this._commandDispatcher = new CallDispatcher();
        this._errorDispatcher = new CallDispatcher();
        //
        this._normalErrorSet = new Array(); //有错误码的包也正常解析
        //
        this._enabledSend = false; //close的时候，是否还允许发送
        this._useHandshake = false; //是否使用握手
        this._isHandshaking = false; //是否正在处理握手中
        this._requestSessionMax = 0;
        this._useHandshake = useHandshake;
    }
    Object.defineProperty(BaseSocket.prototype, "enabledSend", {
        get: function () {
            return this._enabledSend;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSocket.prototype, "requestSessionMax", {
        //记录服务器主动通知协议的session的最大值
        get: function () {
            return this._requestSessionMax;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// 添加正常解析的错误码包（命令事件正常执行，而不是执行错误事件）
    /// </summary>
    /// <param name="error"></param>
    BaseSocket.prototype.addNormalError = function (error) {
        this._normalErrorSet.push(error);
    };
    /// <summary>
    /// 移除正常解析的错误码包
    /// </summary>
    /// <param name="error"></param>
    BaseSocket.prototype.removeNormalError = function (error) {
        ArrayUtil.RemoveItem(error, this._normalErrorSet);
    };
    Object.defineProperty(BaseSocket.prototype, "address", {
        get: function () {
            return this._address;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSocket.prototype, "port", {
        get: function () {
            return this._port;
        },
        enumerable: true,
        configurable: true
    });
    BaseSocket.prototype.dispose = function () {
        this._infoList = null;
        this._enabledSend = false;
        this.resetSocket();
        if (this._commandDispatcher != null) {
            this._commandDispatcher.dispose();
            this._commandDispatcher = null;
        }
        if (this._errorDispatcher != null) {
            this._errorDispatcher.dispose();
            this._errorDispatcher = null;
        }
        this._spRpc = null;
    };
    /// <summary>
    /// 关闭连接
    /// </summary>
    /// <param name="enabledSend">socket关闭后，是否允许执行发送方法</param>
    BaseSocket.prototype.close = function (enabledSend) {
        if (enabledSend === void 0) { enabledSend = false; }
        this._enabledSend = enabledSend;
        this.resetSocket();
        this.RemoveNoDiscRetry();
    };
    Object.defineProperty(BaseSocket.prototype, "hasDiscRetry", {
        /// <summary>
        /// 是否有断线重连后需要重发的数据
        /// </summary>
        get: function () {
            if (this._infoList != null && this._infoList.length > 0) {
                for (var i = 0; i < this._infoList.length; i++) {
                    if (this._infoList[i].isDiscRetry) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 重启socket
     */
    BaseSocket.prototype.resetSocket = function () {
        if (this._socket != null) {
            try {
                this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
                this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this); //添加链接打开侦听，连接成功会调用此方法
                this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this); //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
                this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this); //添加异常侦听，出现异常会调用此方法
                this._socket.close();
                this._socket = null;
            }
            catch (Exception) {
                console.log(Exception);
            }
        }
        this._isHandshaking = false;
    };
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    /// <summary>
    /// 连接服务器
    /// </summary>
    /// <param name="ip"></param>
    /// <param name="port"></param>
    /// <param name="address"></param>
    BaseSocket.prototype.Connect = function (address, port) {
        this._address = address;
        this._port = port;
        if (this._socket != null) {
            this.resetSocket();
        }
        this._socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this._socket.type = this._msgType;
        //添加收到数据侦听，收到数据会调用此方法
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //连接服务器
        this._socket.connect(this._address, this._port);
    };
    /**
     * 移除发送回调(只对回调有效，不影响事件侦听)
     */
    BaseSocket.prototype.RemoveCall = function (cmdId, onResult, thisObject) {
        if (this._infoList != null && this._infoList.length > 0 && onResult != null) {
            //会有多个，不能用break
            for (var i = this._infoList.length - 1; i >= 0; i--) {
                var item = this._infoList[i];
                if (item.cmdId == cmdId && item.onResult != null && item.onResult == onResult && item.thisObject == thisObject) {
                    this._infoList.splice(i, 1);
                }
            }
        }
    };
    BaseSocket.prototype.onSocketOpen = function () {
        if (this._socket == null) {
            return;
        }
        if (this._spRpc) {
            this._enabledSend = true;
            this._spRpc.host("package");
            this._attchRet = this._spRpc.attach();
            if (this._useHandshake) {
                this._isHandshaking = true;
                this.Handshake();
            }
            else {
                this._isHandshaking = false;
                this.DispatchMessage(new SocketMessage(SocketMessageType.Connect, "0", "connect succeed"));
            }
        }
    };
    /**
     * 简单正常发送，没有断线重发，不能重复连续发送相同的命令
     */
    BaseSocket.prototype.SimpleSend = function (cmdId, args) {
        if (args === void 0) { args = null; }
        this.InvokeSend(true, false, cmdId, args, undefined, undefined, undefined);
    };
    /**
     * 简单正常发送，没有断线重发，不能重复连续发送相同的命令
     */
    BaseSocket.prototype.SimpleCall = function (cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        this.InvokeSend(true, false, cmdId, args, onResult, onError, thisObject);
    };
    /**
     * 调用发送，如果没有连接继续执行发送，抛出异常,兼容重连
     * <param name="isSole">一样的命令和回调是否独占发送，(如果是，当还没接收到上一个包的时候，再次发包，会忽略掉)</param>
     * <param name="isDiscRetry">断线重发</param>
     */
    BaseSocket.prototype.InvokeSend = function (isSole, isDiscRetry, cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        if (this._enabledSend) {
            var info = this.AddSocketInfo(isSole, isDiscRetry, cmdId, args, onResult, onError, thisObject);
            if (info != null) {
                this.SendObject(info);
            }
        }
        else {
            if (isDiscRetry) {
                this.AddSocketInfo(isSole, isDiscRetry, cmdId, args, onResult, onError, thisObject);
            }
        }
    };
    BaseSocket.prototype.SendObject = function (info) {
        if (this._socket == null || this._spRpc == null || this._attchRet == null) {
            this.DispatchMessage(new SocketMessage(SocketMessageType.NetworkError, "-1", "NotInitialized"));
            return;
        }
        try {
            console.log("Socket.Send -> cmdId:" + info.cmdId + "- >session:" + info.session);
            var arr = this._attchRet(info.cmdId, info.args, info.session).buf;
            var buff = array2arraybuffer(arr);
            var byteArr = new egret.ByteArray(buff);
            this._socket.writeBytes(byteArr);
            this._socket.flush();
        }
        catch (e) {
            this.ParseException(-1, e);
        }
    };
    BaseSocket.prototype.onSocketClose = function () {
        console.log("WebSocket Close");
        this.DispatchMessage(new SocketMessage(SocketMessageType.Failing, "close", "Server Close"));
    };
    BaseSocket.prototype.onSocketError = function () {
        console.log("WebSocket connect error");
        this.DispatchMessage(new SocketMessage(SocketMessageType.NetworkError, "close", "WebSocket connect error"));
    };
    BaseSocket.prototype.onReceiveMessage = function (e) {
        if (!this._socket) {
            return;
        }
        var btyearray = new egret.ByteArray();
        this._socket.readBytes(btyearray);
        btyearray.position = 0;
        var arr = arraybuffer2array(btyearray.buffer);
        this._spRpc.dispatch({ buf: arr, sz: arr.length }, this.handleRequest.bind(this), this.handleResponse.bind(this));
    };
    BaseSocket.prototype.handleRequest = function (name, data, session, error) {
        if (error == undefined) {
            error = 0;
        }
        console.log("server-push---->socket.receive -> cmdId:" + name, "-> session:" + session, "-> error:" + error);
        var spRpcResult = new SpRpcResult();
        spRpcResult.cmdId = name;
        spRpcResult.data = data;
        spRpcResult.error = error;
        spRpcResult.op = SpRpcOp.Request;
        spRpcResult.session = session;
        if (this._requestSessionMax < session) {
            this._requestSessionMax = session;
        }
        if (this._useHandshake && this._isHandshaking) {
            this.ParseHandshake(spRpcResult);
        }
        else {
            this.DispatchResult(spRpcResult);
            if (spRpcResult.error == 0 || this._normalErrorSet.indexOf(spRpcResult.error) != -1) {
                this.DispatchCommand(name, spRpcResult);
            }
            else {
                if (this.enabledErrorCode) {
                    this.DispatchError(name, spRpcResult);
                }
            }
        }
    };
    BaseSocket.prototype.handleResponse = function (name, data, session, error) {
        if (error == undefined) {
            error = 0;
        }
        console.log("client-req-----socket.receive -> cmdId:" + name + "-> session:" + session, "-> error:" + error);
        var info = this.RemoveSocketInfo(session);
        var spRpcResult = new SpRpcResult();
        spRpcResult.cmdId = name;
        spRpcResult.data = data;
        spRpcResult.error = error;
        spRpcResult.op = SpRpcOp.Response;
        spRpcResult.session = session;
        if (this._useHandshake && this._isHandshaking) {
            this.ParseHandshake(spRpcResult);
        }
        else {
            this.DispatchResult(spRpcResult);
            if (spRpcResult.error == 0 || this._normalErrorSet.indexOf(spRpcResult.error) != -1) {
                if (info && info.onResult) {
                    FuncUtil.invoke(info.onResult, info.thisObject, spRpcResult);
                }
                else {
                    this.DispatchCommand(name, spRpcResult);
                }
            }
            else {
                if (this.enabledErrorCode) {
                    if (info && info.onError) {
                        FuncUtil.invoke(info.onError, info.thisObject, spRpcResult);
                    }
                    else {
                        this.DispatchError(name, spRpcResult);
                    }
                }
            }
        }
    };
    /// <summary>
    /// 移除不是断线重发的信息(目前有close的时候使用)
    /// </summary>
    BaseSocket.prototype.RemoveNoDiscRetry = function () {
        if (this._infoList != null && this._infoList.length > 0) {
            for (var i = this._infoList.length - 1; i >= 0; i--) {
                if (this._infoList[i].isDiscRetry == false) {
                    this._infoList.splice(i, 1);
                }
            }
        }
    };
    BaseSocket.prototype.AddSocketInfo = function (isSole, isDiscRetry, cmdId, args, onResult, onError, thisObject) {
        if (args === void 0) { args = null; }
        if (this._infoList != null) {
            if (isSole && this._infoList.length > 0) {
                //过滤独占的发送
                for (var i = 0; i < this._infoList.length; i++) {
                    var item = this._infoList[i];
                    if (item.isSole && item.cmdId == cmdId && item.onResult == onResult && item.thisObject == thisObject) {
                        return null;
                    }
                }
            }
            //
            this._session++;
            var info = new SocketInfo();
            info.session = this._session;
            info.cmdId = cmdId;
            info.isDiscRetry = isDiscRetry;
            info.isSole = isSole;
            info.args = args;
            info.onResult = onResult;
            info.onError = onError;
            info.thisObject = thisObject;
            this._infoList.push(info);
            return info;
        }
        return null;
    };
    BaseSocket.prototype.RemoveSocketInfo = function (session) {
        if (this._infoList != null && this._infoList.length > 0) {
            for (var i = 0; i < this._infoList.length; i++) {
                var info = this._infoList[i];
                if (info.session == session) {
                    this._infoList.splice(i, 1);
                    return info;
                }
            }
        }
        return null;
    };
    BaseSocket.prototype.Handshake = function () {
    };
    BaseSocket.prototype.ParseHandshake = function (result) {
    };
    BaseSocket.prototype.AddMessageListener = function (listener, thisObject) {
        if (this._onSocketMessage == null) {
            this._onSocketMessage = new DelegateDispatcher();
        }
        this._onSocketMessage.addListener(listener, thisObject);
    };
    BaseSocket.prototype.RemoveMessageListener = function (listener, thisObject) {
        if (this._onSocketMessage) {
            this._onSocketMessage.removeListener(listener, thisObject);
        }
    };
    BaseSocket.prototype.DispatchMessage = function (msg) {
        if (this._onSocketMessage) {
            this._onSocketMessage.dispatch(msg);
        }
    };
    BaseSocket.prototype.ParseException = function (errorCode, e) {
        var msg = new SocketMessage(SocketMessageType.NetworkError, errorCode.toString(), e.message + "\n" + e.stack);
        this.DispatchMessage(msg);
    };
    /**
     * 广播服务器返回结果，全局的。只有客户端主动请求才会广播事件
     */
    BaseSocket.prototype.AddResultListener = function (listener, thisObject) {
        if (this._onResult == null) {
            this._onResult = new DelegateDispatcher();
        }
        this._onResult.addListener(listener, thisObject);
    };
    BaseSocket.prototype.RemoveResultListener = function (listener, thisObject) {
        if (this._onResult) {
            this._onResult.removeListener(listener, thisObject);
        }
    };
    BaseSocket.prototype.DispatchResult = function (result) {
        if (this._onResult) {
            this._onResult.dispatch(result);
        }
    };
    //------------------------------------------------------------------
    // Command
    //------------------------------------------------------------------
    /// <summary>
    /// 添加命令侦听
    /// </summary>
    /// <param name="cmdId"></param>
    /// <param name="listener"></param>
    BaseSocket.prototype.AddCommandListener = function (cmdId, listener, thisObject) {
        this._commandDispatcher.addListener(cmdId, listener, thisObject);
    };
    /// <summary>
    /// 移除命令侦听
    /// </summary>
    /// <param name="cmdId"></param>
    /// <param name="listener"></param>
    /// <param name="thisObject"></param>
    BaseSocket.prototype.RemoveCommandListener = function (cmdId, listener, thisObject) {
        this._commandDispatcher.removeListener(cmdId, listener, thisObject);
    };
    /// <summary>
    /// 广播命令侦听
    /// </summary>
    /// <param name="cmdId"></param>
    /// <param name="result"></param>
    BaseSocket.prototype.DispatchCommand = function (cmdId, result) {
        this._commandDispatcher.dispatch(cmdId, result);
    };
    /// <summary>
    /// 添加错误侦听
    /// </summary>
    /// <param name="cmdId"></param>
    /// <param name="listener"></param>
    BaseSocket.prototype.AddErrorListener = function (cmdId, listener, thisObject) {
        this._errorDispatcher.addListener(cmdId, listener, thisObject);
    };
    /// <summary>
    /// 移除错误侦听
    /// </summary>
    /// <param name="cmdId"></param>
    /// <param name="listener"></param>
    /// <param name="thisObject"></param>
    BaseSocket.prototype.RemoveErrorListener = function (cmdId, listener, thisObject) {
        this._errorDispatcher.removeListener(cmdId, listener, thisObject);
    };
    /// <summary>
    /// 广播错误侦听
    /// </summary>
    /// <param name="cmdId"></param>
    /// <param name="result"></param>
    BaseSocket.prototype.DispatchError = function (cmdId, result) {
        this._errorDispatcher.dispatch(cmdId, result);
    };
    BaseSocket.HandshakeName = "handshake";
    return BaseSocket;
}());
__reflect(BaseSocket.prototype, "BaseSocket");
//# sourceMappingURL=BaseSocket.js.map