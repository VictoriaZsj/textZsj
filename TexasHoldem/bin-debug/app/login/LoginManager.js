var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 登录管理
 */
var LoginManager = (function () {
    function LoginManager() {
    }
    Object.defineProperty(LoginManager, "loginMode", {
        /// <summary>
        /// 登录模式
        /// </summary>
        get: function () {
            return LoginManager._loginMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager, "loginInfo", {
        /// <summary>
        /// 登录信息
        /// </summary>
        get: function () {
            return LoginManager._loginInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager, "account", {
        /// <summary>
        /// 游戏帐号名 或 渠道帐号id（对于游戏来说，渠道的帐号id就是游戏帐号名）
        /// </summary>
        get: function () {
            return LoginManager._account;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager, "channelToken", {
        /// <summary>
        /// 渠道返回的token
        /// </summary>
        get: function () {
            return LoginManager._channelToken;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// 设置平台登录地址（关系到登录服务器）(版本检查完成后才能正确设置)
    /// </summary>
    LoginManager.SetAddress = function (loginType) {
        //内网在project.xml里取ip和port
        if (loginType == ChannelLoginType.IntranetAccount) {
            LoginManager._address = ProjectDefined.GetInstance().getValue(ProjectDefined.intranetIp);
            LoginManager._port = ProjectDefined.GetInstance().getValue(ProjectDefined.intranetPort);
        }
        else {
            LoginManager._address = VersionManager.loginAddress;
            LoginManager._port = VersionManager.loginPort;
        }
    };
    /// <summary>
    /// 销毁
    /// </summary>
    LoginManager.Dispose = function () {
        LoginManager.OnComplete.clear();
        if (this._socket != null) {
            LoginManager.RemoveAllListener();
            LoginManager._socket.dispose();
            LoginManager._socket = null;
        }
    };
    /// <summary>
    /// 关闭
    /// </summary>
    LoginManager.Close = function () {
        if (LoginManager._socket != null) {
            LoginManager.RemoveAllListener();
            LoginManager._socket.close();
        }
    };
    LoginManager.RemoveAllListener = function () {
        UIManager.removeEventListener(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout, LoginManager.OnLoadingTimeout, this);
        LoginManager._socket.RemoveMessageListener(LoginManager.OnLoginMessage, this);
        LoginManager._socket.RemoveCommandListener(Command.Login_login, LoginManager.OnLogin, this);
        LoginManager._socket.RemoveCommandListener(Command.Login_exchange, LoginManager.OnExchange, this);
        LoginManager._socket.RemoveCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
        LoginManager._socket.RemoveResultListener(LoginManager.OnResult, this);
    };
    /// <summary>
    /// 游客登录
    /// </summary>
    /// <param name="channel"></param>
    LoginManager.GuestLogin = function (channel) {
        LoginManager._loginMode = LoginMode.Guest;
        LoginManager._isLogin = 1;
        LoginManager._channel = channel;
        LoginManager._account = "游客";
        LoginManager._password = StringConstant.empty;
        LoginManager.Connect(LoginManager._address, LoginManager._port);
    };
    /// <summary>
    /// 游戏账号登录
    /// </summary>
    /// <param name="channel"></param>
    /// <param name="account"></param>
    /// <param name="pwd"></param>
    LoginManager.AccountLogin = function (channel, account, pwd) {
        LoginManager._loginMode = LoginMode.Account;
        LoginManager._isLogin = 1;
        LoginManager._channel = channel;
        LoginManager._account = account;
        LoginManager._password = pwd;
        LoginManager.Connect(LoginManager._address, LoginManager._port);
    };
    /// <summary>
    /// token调试登录,除了_loginMode和TokenLogin不一样，其它都一样
    /// </summary>
    /// <param name="loginChannel"></param>
    /// <param name="tokenAccount"></param>
    LoginManager.TokenDebug = function (loginChannel, tokenAccount) {
        LoginManager._loginMode = LoginMode.TokenDebug;
        LoginManager._isLogin = 1;
        LoginManager._channel = loginChannel;
        LoginManager._tokenCode = tokenAccount;
        LoginManager._tokenLoginCount = 0;
        LoginManager.TokenLoginCoroutine();
    };
    /// <summary>
    /// 平台token登录
    /// </summary>
    /// <param name="loginChannel"></param>
    /// <param name="token"></param>
    LoginManager.TokenLogin = function (loginChannel, token) {
        LoginManager._loginMode = LoginMode.Token;
        LoginManager._isLogin = 1;
        LoginManager._channel = loginChannel;
        LoginManager._tokenCode = token;
        LoginManager._tokenLoginCount = 0;
        clearTimeout(LoginManager._loginTimeId);
        LoginManager._loginTimeId = egret.setTimeout(LoginManager.TokenLoginCoroutine, this, 1000);
    };
    LoginManager.TokenLoginCoroutine = function () {
        LoginManager._tokenLoginCount++;
        clearTimeout(LoginManager._loginTimeId);
        LoginManager.Connect(LoginManager._address, LoginManager._port);
    };
    /// <summary>
    /// 游戏账号注册
    /// </summary>
    /// <param name="account"></param>
    /// <param name="pwd"></param>
    LoginManager.AccountRegister = function (channel, account, pwd) {
        LoginManager._loginMode = LoginMode.Account;
        LoginManager._isLogin = 611;
        LoginManager._channel = channel;
        LoginManager._account = account;
        LoginManager._password = pwd;
        LoginManager.Connect(LoginManager._address, LoginManager._port);
    };
    //------------------------------------------------------------------
    // private
    //------------------------------------------------------------------
    LoginManager.Connect = function (address, port) {
        if (LoginManager._socket == null) {
            LoginManager._socket = new LoginSocket();
            LoginManager._socket.initialize(GameSetting.LoginBin);
        }
        //
        LoginManager.Close();
        UIManager.addEventListener(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout, LoginManager.OnLoadingTimeout, this);
        UIManager.showPanel(UIModuleName.LoadingPanel);
        LoginManager._socket.AddMessageListener(LoginManager.OnLoginMessage, this);
        LoginManager._socket.AddResultListener(LoginManager.OnResult, this);
        LoginManager._socket.Connect(address, port);
    };
    LoginManager.OnLoadingTimeout = function () {
        LoginManager.Close();
        AlertManager.showAlert("网络连接超时！", LoginManager.OnErrorConfirm, null, null, "网络超时");
    };
    LoginManager.OnLogin = function (result) {
        LoginManager._socket.RemoveCommandListener(Command.Login_login, LoginManager.OnLogin, this);
        var serverVersion = result.data["Version"];
        if (VersionManager.VerifyGameServer(serverVersion)) {
            var challenge = result.data["challenge"];
            var serverkey = result.data["serverkey"];
            //
            LoginManager._hexsecret = "266f889930929ff7";
            var hmac = Crypt.HmacSha1(LoginManager._hexsecret, challenge);
            //交换
            LoginManager._socket.AddCommandListener(Command.Login_exchange, LoginManager.OnExchange, this);
            LoginManager._socket.SimpleSend(Command.Login_exchange, { "hmac": hmac });
        }
        else {
            UIManager.closePanel(UIModuleName.LoadingPanel);
            LoginManager.RemoveAllListener();
        }
    };
    LoginManager.OnExchange = function (result) {
        LoginManager._socket.RemoveCommandListener(Command.Login_exchange, LoginManager.OnExchange, this);
        //
        var deviceId = ChannelManager.deviceId;
        var token = StringConstant.empty;
        if (LoginManager._loginMode == LoginMode.Account) {
            token = StringUtil.format("{0}@{1}:{2}", Crypt.lb64encode(LoginManager._account), Crypt.lb64encode(LoginManager._password), LoginManager._isLogin);
        }
        else if (LoginManager._loginMode == LoginMode.Guest) {
            token = deviceId;
        }
        else {
            token = LoginManager._tokenCode;
        }
        token = Crypt.AESEncrypt(token, LoginManager._hexsecret);
        LoginManager._socket.AddCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
        //
        var bundleId = ChannelManager.bundleId;
        LoginManager._socket.SimpleSend(Command.Login_auth, { "token": token, "channel": LoginManager._channel, "device": deviceId, "bid": bundleId });
    };
    LoginManager.OnAuth = function (result) {
        LoginManager._socket.RemoveCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
        LoginManager.Close();
        UIManager.closePanel(UIModuleName.LoadingPanel);
        //
        LoginManager._loginInfo = LoginInfo.CreateFromProto(result.data); //todo 需要处理data异常的问题
        LoginManager._loginInfo.secret = LoginManager._hexsecret;
        if (LoginManager._loginMode == LoginMode.Token) {
            if (LoginManager._loginInfo.channeldata != null) {
                if (LoginManager._loginInfo.channeldata.hasOwnProperty("account")) {
                    LoginManager._account = LoginManager._loginInfo.channeldata["account"]; //_account不能设置默认为空，因为登录时候有赋值
                }
                if (LoginManager._loginInfo.channeldata.hasOwnProperty("token")) {
                    LoginManager._channelToken = LoginManager._loginInfo.channeldata["token"];
                }
                else {
                    LoginManager._channelToken = StringConstant.empty;
                }
                ChannelManager.SetChannelData(LoginManager._account, LoginManager._channelToken); //设置回sdk，因为有些sdk需要用到服务器的sdk数据
            }
        }
        else if (LoginManager._loginMode == LoginMode.Account) {
            if (LoginManager._account) {
                PrefsManager.SetAccountPassword(LoginManager._account, LoginManager._password);
            }
        }
        SocketManager.Dispose(); //登录过，要销毁游戏Socket，保证都是重新开始的
        LoginManager.OnComplete.dispatch();
    };
    LoginManager.OnLoginMessage = function (msg) {
        NetUtil.Log(msg);
        switch (msg.type) {
            case SocketMessageType.Connect:
                console.log("Login服务器连接成功");
                //握手
                var vvv = "0.0.0";
                LoginManager._clientKey = "xuEaV3HSKms=";
                LoginManager._socket.AddCommandListener(Command.Login_login, LoginManager.OnLogin, this);
                LoginManager._socket.SimpleSend(Command.Login_login, { "clientkey": LoginManager._clientKey, "Version": vvv }); //VersionManager.clientVersion
                // LoginManager._clientKey = Crypt.lrandomkey();
                // LoginManager._socket.SendAsync(Command.Login_login, { "clientkey": Crypt.lb64encode(Crypt.ldhexchange(LoginManager._clientKey)), "Version": "0.1.0" });//VersionManager.clientVersion
                break;
            case SocketMessageType.NetworkError:
            case SocketMessageType.Failing:
                UIManager.closePanel(UIModuleName.LoadingPanel);
                LoginManager.Close();
                //
                var alertInfo = new AlertInfo();
                alertInfo.title = "网络异常";
                alertInfo.subTitle = msg.errorCode;
                alertInfo.message = "连接服务器失败";
                alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
                AlertManager.showAlertInfo(alertInfo);
                break;
        }
    };
    /// <summary>
    /// 客户端主动请求的才执行
    /// </summary>
    /// <param name="result"></param>
    LoginManager.OnResult = function (result) {
        if (result.op == SpRpcOp.Response) {
            if (result.error != 0) {
                LoginManager.Close();
                UIManager.closePanel(UIModuleName.LoadingPanel);
                if (result.error == LoginManager.TokenErrorCode && LoginManager._tokenLoginCount < LoginManager.TokenLoginTryTimes) {
                    clearTimeout(LoginManager._loginTimeId);
                    LoginManager._loginTimeId = egret.setTimeout(LoginManager.TokenLoginCoroutine, this, 1000);
                }
                else {
                    //406错误，抛出验证失败的事件
                    if (result.error == LoginManager.TokenErrorCode) {
                        ChannelManager.loginValidateFail();
                        LoginManager.OnValiateFail.dispatch();
                    }
                    var alertInfo = new AlertInfo();
                    alertInfo.title = "提示";
                    alertInfo.subTitle = "protocol:" + result.cmdId + ",code:" + result.error;
                    alertInfo.message = ErrorDefined.GetInstance().getDetails(result.error);
                    alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
                    console.warn(StringUtil.format("{0},描述：{1}", alertInfo.subTitle, alertInfo.message));
                    AlertManager.showAlertInfo(alertInfo);
                }
            }
        }
    };
    LoginManager.OnErrorConfirm = function (obj) {
        LoginManager.OnError.dispatch();
    };
    LoginManager.TokenLoginTryTimes = 3; //token登录错误重试3次
    LoginManager.TokenErrorCode = 406; //token登录错误码
    LoginManager._tokenLoginCount = 0; //token重试次数
    //------------------------------------------------------------------
    // event
    //------------------------------------------------------------------
    /**
     * 登录完成
     */
    LoginManager.OnComplete = new DelegateDispatcher();
    /**
     * 登录错误
     */
    LoginManager.OnError = new DelegateDispatcher();
    /**
     * 406错误，验证token失败
     */
    LoginManager.OnValiateFail = new DelegateDispatcher();
    /**
     * 创建角色成功
    */
    LoginManager.OnCreateRole = new DelegateDispatcher();
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
//# sourceMappingURL=LoginManager.js.map