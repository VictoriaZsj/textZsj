var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 渠道管理/原生扩展管理
 */
var ChannelManager = (function () {
    function ChannelManager() {
    }
    //------------------------------------------------------------------
    // sdk回调执行方法
    //------------------------------------------------------------------
    ChannelManager.sdkInitComplete = function (json) {
        ChannelManager._isInitComplete = true;
        var data = JSON.parse(json);
        ChannelManager._channelType = data['channelType'];
        ChannelManager._appName = data['appName'];
        ChannelManager._deviceId = data['deviceId'];
        ChannelManager._bundleId = data['bundleId'];
        ChannelManager._clientVersion = data['clientVersion'];
        ChannelManager._hasWeixin = StringUtil.toBoolean(data['hasWeixin']);
        ChannelManager._hasMicrophone = StringUtil.toBoolean(data['hasMicrophone']);
        if (StringUtil.isNullOrEmpty(ChannelManager._channelType)) {
            ChannelManager._channelType = ChannelManager._operatePlatform;
        }
        ChannelManager.OnInitComplete.dispatch();
    };
    ChannelManager.sdkLoginSucceed = function (token) {
        ChannelManager.OnTokenLoginSucceed.dispatch(token);
    };
    ChannelManager.sdkLoginFailed = function () {
        ChannelManager.OnLoginFailed.dispatch();
    };
    ChannelManager.sdkPaySucceed = function (data) {
        // UIManager.HideModule(UIModuleName.PayMaskPanel);
        ChannelManager._channel.sdkPaySucceed(data);
    };
    ChannelManager.sdkPayFailed = function () {
        // UIManager.HideModule(UIModuleName.PayMaskPanel);
        ChannelManager._channel.sdkPayFailed();
    };
    ChannelManager.sdkShareSucceed = function () {
        ChannelManager.OnShareSucceed.dispatch();
    };
    ChannelManager.sdkShareFailed = function () {
        ChannelManager.OnShareFailed.dispatch();
    };
    ChannelManager.sdkLogout = function () {
        GameManager.reLogin(SystemReenterType.Logout);
        ChannelManager.OnLogout.dispatch();
    };
    ChannelManager.sdkRecordComplete = function (data) {
        RecordAudioManager.RecordComplete(data);
    };
    ChannelManager.sdkBackToApplication = function () {
        ChannelManager.OnBackToApplication.dispatch();
    };
    /**
     * 热更新检测完毕
     */
    ChannelManager.sdkHotUpdateComplete = function () {
        ChannelManager.OnHotUpdateComplete.dispatch();
    };
    /**
     * 调回是否有记录的数据
     */
    ChannelManager.sdkHasRecordData = function (message) {
        ChatManager.checkComplete(message);
    };
    Object.defineProperty(ChannelManager, "operatePlatform", {
        /**
         * 运营平台
         */
        get: function () {
            return ChannelManager._operatePlatform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "channelType", {
        /**
         * 渠道类型
         */
        get: function () {
            if (ChannelManager._customChannelType) {
                return ChannelManager._customChannelType;
            }
            return ChannelManager._channelType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "loginType", {
        /**
         * 渠道登录类型
         */
        get: function () {
            if (ChannelManager._customLoginType) {
                return ChannelManager._customLoginType;
            }
            return ChannelManager._loginType;
        },
        set: function (value) {
            ChannelManager._loginType = value;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// 自定义设置的登录渠道类型(编辑器和winodow版有效)
    /// </summary>
    /// <param name="type"></param>
    ChannelManager.SetCustomLoginChannel = function (channelType, loginType) {
        ChannelManager._customChannelType = channelType;
        ChannelManager._customLoginType = loginType;
    };
    /// <summary>
    /// 获取渠道类型+登录类型
    /// </summary>
    /// <returns></returns>
    ChannelManager.GetLoginChannel = function () {
        return ChannelUtil.GetLoginChannel(ChannelManager.channelType, ChannelManager.loginType);
    };
    Object.defineProperty(ChannelManager, "appName", {
        /**
         * 应用名
         */
        get: function () {
            return ChannelManager._appName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "deviceId", {
        /**
         * 设备id
         */
        get: function () {
            return ChannelManager._deviceId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "bundleId", {
        /**
         * 包id
         */
        get: function () {
            return ChannelManager._bundleId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "hasWeixin", {
        /**
         * 是否安装有微信
         */
        get: function () {
            return ChannelManager._hasWeixin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "hasMicrophone", {
        /**
         * 是否有麦克风或麦克风权限
         */
        get: function () {
            return ChannelManager._hasMicrophone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChannelManager, "clientVersion", {
        /**
         * 本地最新客户端版本
         */
        get: function () {
            return ChannelManager._clientVersion;
        },
        enumerable: true,
        configurable: true
    });
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    /**
     * 初始化
     */
    ChannelManager.Initialize = function () {
        if (ChannelManager._isInitComplete) {
            ChannelManager.OnInitComplete.dispatch();
            return;
        }
        ChannelManager._operatePlatform = OperatePlatform.current;
        if (egret.Capabilities.os == 'iOS') {
            ChannelManager._channel = new Channel_ios();
        }
        else if (egret.Capabilities.os == 'Android') {
            ChannelManager._channel = new Channel_android();
        }
        else {
            ChannelManager._channel = new Channel_web();
        }
        //
        egret.ExternalInterface.addCallback(ExtFuncName.OnApplicationFocus, function (focusStatus) {
            var isfocusStatus = StringUtil.toBoolean(focusStatus);
            if (isfocusStatus) {
                // UIManager.HideModule(UIModuleName.PayMaskPanel);
            }
            ChannelManager.OnApplicationFocus.dispatch(isfocusStatus);
        });
        egret.ExternalInterface.addCallback(ExtFuncName.OnInitComplete, ChannelManager.sdkInitComplete);
        egret.ExternalInterface.addCallback(ExtFuncName.OnLoginSucceed, ChannelManager.sdkLoginSucceed);
        egret.ExternalInterface.addCallback(ExtFuncName.OnLoginFailed, ChannelManager.sdkLoginFailed);
        egret.ExternalInterface.addCallback(ExtFuncName.OnPaySucceed, ChannelManager.sdkPaySucceed);
        egret.ExternalInterface.addCallback(ExtFuncName.OnPayFailed, ChannelManager.sdkPayFailed);
        egret.ExternalInterface.addCallback(ExtFuncName.OnShareSucceed, ChannelManager.sdkShareSucceed);
        egret.ExternalInterface.addCallback(ExtFuncName.OnShareFailed, ChannelManager.sdkShareFailed);
        egret.ExternalInterface.addCallback(ExtFuncName.OnLogout, ChannelManager.sdkLogout);
        egret.ExternalInterface.addCallback(ExtFuncName.OnBackToApplication, ChannelManager.sdkBackToApplication);
        egret.ExternalInterface.addCallback(ExtFuncName.OnHotUpdate, ChannelManager.sdkHotUpdateComplete);
        //录音
        egret.ExternalInterface.addCallback(ExtFuncName.OnRecordComplete, ChannelManager.sdkRecordComplete);
        egret.ExternalInterface.addCallback(ExtFuncName.OnHasRecordData, ChannelManager.sdkHasRecordData);
        //
        ChannelManager._channel.Initialize();
    };
    /// 登录
    /// </summary>
    /// <param name="loginType"></param>
    /// <param name="isAutoLogin">是否自动登录</param>
    ChannelManager.Login = function (loginType, isAutoLogin) {
        if (isAutoLogin === void 0) { isAutoLogin = false; }
        ChannelManager._channel.Login(loginType, isAutoLogin);
    };
    /**
     * 登出
     */
    ChannelManager.Logout = function () {
        ChannelManager._channel.Logout();
    };
    /// <summary>
    /// 支付发送
    /// </summary>
    /// <param name="awardId"></param>
    ChannelManager.PaySend = function (id) {
        var payDef = PayDefined.GetInstance().getDefinition(id);
        var shopName = StringConstant.empty;
        if (payDef) {
            var awardDef = AwardDefined.GetInstance().getAwardDefinition(payDef.awardId);
            if (awardDef && awardDef.rewardNum.length > 0) {
                var rewardNum = awardDef.rewardNum[0];
                if (rewardNum > 0) {
                    shopName = payDef.awardId.toString();
                    var orderId = ChannelUtil.GenerateOrder(payDef.awardId, VersionManager.isClientTest); //订单id			
                    ChannelManager._channel.PaySend(UserManager.serverInfo.id, orderId, rewardNum, shopName);
                }
                else {
                    console.log("支付异常");
                }
            }
        }
    };
    /// <summary>
    /// android退出游戏要处理退出sdk
    /// </summary>
    ChannelManager.Exit = function () {
        ChannelManager._channel.Exit();
    };
    /// <summary>
    /// 设置sdk扩展数据
    /// </summary>
    ChannelManager.SetExtData = function () {
        var data = {};
        data["channelToken"] = LoginManager.channelToken;
        data["userId"] = LoginManager.loginInfo.userid;
        data["loginChannel"] = ChannelManager.GetLoginChannel();
        ChannelManager._channel.SetExtData(JSON.stringify(data));
    };
    ChannelManager.SetChannelData = function (account, token) {
        ChannelManager._channel.SetChannelData(account, token);
    };
    /**
     * 检查支付订单（苹果丢单处理,第一次进主场景时候检查）
     */
    ChannelManager.CheckPayOrder = function () {
        ChannelManager._channel.CheckPayOrder();
    };
    /**
     * 验证token失败，清除存储的openid和token
     */
    ChannelManager.loginValidateFail = function () {
        ChannelManager._channel.loginValidateFail();
    };
    /**
     * 微信分享
     */
    ChannelManager.share = function (message) {
        /*
        VersionManager.updateHandler.GetUpdateChannelURL(function(url:string){
            let data:any = {};
            data['message'] = message;
            data['url'] = url;
            ChannelManager._channel.share(JSON.stringify(data));
        });
        */
    };
    /**
     * 请求一次麦克风权限(ios、android有弹窗确认)
     */
    ChannelManager.requestMicrophone = function () {
        ChannelManager._channel.requestMicrophone();
    };
    /**
     * 录音
     */
    ChannelManager.recordAudio = function (code) {
        RecordAudioManager.RecordVoice(code);
        ChannelManager._channel.recordAudio(code.toString());
    };
    /**
     * 检测热更新
     */
    ChannelManager.hotUpdate = function (message) {
        ChannelManager._channel.hotUpdate(message);
    };
    /**
     * 设置录音数据
     */
    ChannelManager.setRecordData = function (guid, data) {
        ChannelManager._channel.setRecordData(guid, data);
    };
    /**
     * 检查缓存路径 如果不存在则创建
     */
    ChannelManager.checkAudioCachePath = function () {
        ChannelManager._channel.checkAudioCachePath();
    };
    /**
     * 本地是否已经存在录音文件
     */
    ChannelManager.hasRecordData = function (guid) {
        ChannelManager._channel.hasRecordData(guid);
    };
    /**
     * 播放录音
     */
    ChannelManager.playRecord = function (guid) {
        ChannelManager._channel.playRecord(guid);
    };
    ChannelManager.DispatchAccountLoginSucceed = function (account, password, isRegister) {
        if (isRegister === void 0) { isRegister = false; }
        ChannelManager.OnAccountLoginSucceed.dispatch([account, password, isRegister]);
    };
    ChannelManager._channelType = StringConstant.empty;
    ChannelManager._customChannelType = null;
    ChannelManager._customLoginType = null;
    ChannelManager._isInitComplete = false; //渠道初始化是否完成
    //------------------------------------------------------------------
    // Event
    //------------------------------------------------------------------
    /**
     * 应用 获取/失去 焦点
     */
    ChannelManager.OnApplicationFocus = new DelegateDispatcher();
    /**
     * token调试登录成功
     */
    ChannelManager.OnTokenDebug = new DelegateDispatcher();
    /**
     * 账号登录成功
     */
    ChannelManager.OnAccountLoginSucceed = new DelegateDispatcher(); //Action< string, string, bool >
    /**
     * 初始化完成
     */
    ChannelManager.OnInitComplete = new DelegateDispatcher();
    /**
     * 检测热更新完毕
     */
    ChannelManager.OnHotUpdateComplete = new DelegateDispatcher();
    /**
     * token登录成功
     */
    ChannelManager.OnTokenLoginSucceed = new DelegateDispatcher();
    /**
     * 登录错误
     */
    ChannelManager.OnLoginFailed = new DelegateDispatcher();
    /**
     * 游戏登出
     */
    ChannelManager.OnLogout = new DelegateDispatcher();
    /**
     * 从其他程序返回当前程序的事件
     */
    ChannelManager.OnBackToApplication = new DelegateDispatcher();
    ChannelManager.OnShareSucceed = new DelegateDispatcher();
    ChannelManager.OnShareFailed = new DelegateDispatcher();
    return ChannelManager;
}());
__reflect(ChannelManager.prototype, "ChannelManager");
//# sourceMappingURL=ChannelManager.js.map