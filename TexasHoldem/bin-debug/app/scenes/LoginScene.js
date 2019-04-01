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
 * 登录场景逻辑处理
 */
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isLoginingAcount = false;
        _this._lastLoginSuccessDateTime = 0;
        return _this;
    }
    LoginScene.prototype.clear = function () {
        ChannelManager.OnLogout.removeListener(this.OnChannelLogout, this);
        this.RemoveChannelEvents();
        this.RemoveGameLoginEvents();
        this.RemoveLoginBarEvents();
        LoginManager.Dispose();
    };
    LoginScene.prototype.initialize = function () {
        this.resGroupName = ResGroupName.Pub;
        _super.prototype.initialize.call(this);
        UIManager.showPanel(UIModuleName.LoginSceneBgPanel);
        ChannelManager.OnInitComplete.addListener(this.OnChannelInitComplete, this);
        ChannelManager.Initialize();
    };
    LoginScene.prototype.OnChannelInitComplete = function () {
        ChannelManager.OnInitComplete.removeListener(this.OnChannelInitComplete, this);
        VersionManager.Initialize();
        this.InitNetworkVersion();
    };
    LoginScene.prototype.InitNetworkVersion = function () {
        if (LoginScene.SkipVersion && true) {
            this.onEnterLogin();
        }
        else {
            ChannelManager.OnHotUpdateComplete.addListener(this.onEnterLogin, this);
            VersionManager.loadServerVersion();
        }
    };
    LoginScene.prototype.onEnterLogin = function () {
        ChannelManager.OnHotUpdateComplete.removeListener(this.onEnterLogin, this);
        this._versionDateTime = Date.now();
        console.log("渠道初始化完毕，开启静默加载");
        RES.loadGroup(ResGroupName.Hall, 2);
        RES.loadGroup(ResGroupName.Gambling, 1);
        if (true && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            //todo 显示网络选择
            //UIManager.addEventListener(UIModuleName.NetworkPanel, UIModuleEvent.COMPLETE, this.OnNetworkSelect, this);
            //UIManager.showPanel(UIModuleName.NetworkPanel);
            this.EnterLoginStart(GameManager.reenterType == SystemReenterType.Normal);
        }
        else {
            this.EnterLoginStart(GameManager.reenterType == SystemReenterType.Normal);
        }
    };
    LoginScene.prototype.OnNetworkSelect = function () {
        UIManager.removeEventListener(UIModuleName.NetworkPanel, UIModuleEvent.COMPLETE, this.OnNetworkSelect, this);
        this.EnterLoginStart(GameManager.reenterType == SystemReenterType.Normal);
    };
    LoginScene.prototype.EnterLoginStart = function (isAutoLogin) {
        this._channelLoginList = ChannelLoginType.GetChannelLoginList(true, VersionManager.isSafe, ChannelManager.operatePlatform, ChannelManager.channelType);
        if (this._channelLoginList.length > 1) {
            var channelLoginType = PrefsManager.getValue(PrefsManager.Login_LoginType);
            if (isAutoLogin && channelLoginType) {
                this.ChannelLoginStart(channelLoginType, isAutoLogin);
            }
            else {
                this.ShowEnterLoginPanel();
            }
        }
        else {
            this.ChannelLoginStart(this._channelLoginList[0], isAutoLogin);
        }
    };
    LoginScene.prototype.ChannelLoginStart = function (loginType, isAutoLogin) {
        ChannelManager.OnLogout.addListener(this.OnChannelLogout, this);
        //
        ChannelManager.loginType = loginType;
        LoginManager.SetAddress(loginType);
        if (loginType == ChannelLoginType.Guest || loginType == ChannelLoginType.IntranetGuest) {
            //游客登录
            this.GameGuestLogin();
        }
        else {
            //渠道登录
            this.AddChannelEvents();
            ChannelManager.Login(loginType, isAutoLogin);
        }
    };
    LoginScene.prototype.ShowEnterLoginPanel = function () {
        UIManager.addEventListener(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, this.OnEnterLoginSelect, this);
        UIManager.showPanel(UIModuleName.LoginPanel, this._channelLoginList);
    };
    LoginScene.prototype.HideEnterLoginPanel = function () {
        UIManager.removeEventListener(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, this.OnEnterLoginSelect, this);
        UIManager.closePanel(UIModuleName.LoginPanel);
    };
    LoginScene.prototype.OnEnterLoginSelect = function (data) {
        this.HideEnterLoginPanel();
        this.ChannelLoginStart(data, false);
    };
    LoginScene.prototype.GameGuestLogin = function () {
        this.AddGameLoginEvents();
        LoginManager.GuestLogin(ChannelType.guest); //游客渠道标识是固定的
    };
    LoginScene.prototype.AddGameLoginEvents = function () {
        this.RemoveGameLoginEvents();
        LoginManager.OnComplete.addListener(this.OnGameLoginComplete, this);
        LoginManager.OnError.addListener(this.OnGameLoginError, this);
    };
    LoginScene.prototype.RemoveGameLoginEvents = function () {
        LoginManager.OnComplete.removeListener(this.OnGameLoginComplete, this);
        LoginManager.OnError.removeListener(this.OnGameLoginError, this);
    };
    LoginScene.prototype.AddChannelEvents = function () {
        this.RemoveChannelEvents();
        ChannelManager.OnAccountLoginSucceed.addListener(this.OnAccountLoginSucceed, this);
        ChannelManager.OnTokenLoginSucceed.addListener(this.OnTokenLoginSucceed, this);
        ChannelManager.OnTokenDebug.addListener(this.OnTokenDebug, this);
        ChannelManager.OnLoginFailed.addListener(this.OnChannelLoginFailure, this);
        ChannelManager.OnBackToApplication.addListener(this.OnBackToApplication, this);
        this._isLoginingAcount = true;
    };
    LoginScene.prototype.RemoveChannelEvents = function () {
        ChannelManager.OnAccountLoginSucceed.removeListener(this.OnAccountLoginSucceed, this);
        ChannelManager.OnTokenLoginSucceed.removeListener(this.OnTokenLoginSucceed, this);
        ChannelManager.OnTokenDebug.removeListener(this.OnTokenDebug, this);
        ChannelManager.OnLoginFailed.removeListener(this.OnChannelLoginFailure, this);
        ChannelManager.OnBackToApplication.removeListener(this.OnBackToApplication, this);
        this._isLoginingAcount = false;
        this.ClearBackApplicationTimer();
    };
    LoginScene.prototype.OnTokenDebug = function (tokenAccount) {
        this.RemoveChannelEvents();
        this.GameTokenDebug(tokenAccount);
    };
    LoginScene.prototype.GameTokenDebug = function (tokenAccount) {
        this.AddGameLoginEvents();
        LoginManager.TokenDebug(ChannelManager.GetLoginChannel(), tokenAccount);
    };
    LoginScene.prototype.OnChannelLoginFailure = function () {
        this.RemoveChannelEvents();
        PrefsManager.setValue(PrefsManager.Login_LoginType, ChannelLoginType.Normal);
        this.ShowEnterLoginPanel();
    };
    LoginScene.prototype.OnBackToApplication = function () {
        this.ClearBackApplicationTimer();
        this._backToApplicationTimer = egret.setTimeout(this.CallBackToLoginLaterCoroutine, this, 5000);
        ;
    };
    LoginScene.prototype.ClearBackApplicationTimer = function () {
        clearTimeout(this._backToApplicationTimer);
    };
    LoginScene.prototype.CallBackToLoginLaterCoroutine = function () {
        clearTimeout(this._backToApplicationTimer);
        if (this._isLoginingAcount) {
            UIManager.showFloatTips("登录失败");
            this.OnChannelLoginFailure();
        }
    };
    LoginScene.prototype.OnAccountLoginSucceed = function (args) {
        this.RemoveChannelEvents();
        if (args[2]) {
            this.GameAccountRegister(args[0], args[1]);
        }
        else {
            this.GameAccountLogin(args[0], args[1]);
        }
    };
    LoginScene.prototype.OnTokenLoginSucceed = function (token) {
        this.RemoveChannelEvents();
        this.GameTokenLogin(token);
    };
    LoginScene.prototype.OnChannelLogout = function () {
        this.RemoveChannelEvents();
        ChannelManager.OnLogout.removeListener(this.OnChannelLogout, this);
        PrefsManager.setValue(PrefsManager.Login_LoginType, ChannelLoginType.Normal);
        this.EnterLoginStart(false);
    };
    LoginScene.prototype.GameAccountRegister = function (account, password) {
        this.AddGameLoginEvents();
        LoginManager.AccountRegister(ChannelManager.channelType, account, password);
    };
    LoginScene.prototype.GameAccountLogin = function (account, password) {
        this.AddGameLoginEvents();
        LoginManager.AccountLogin(ChannelManager.channelType, account, password);
    };
    LoginScene.prototype.GameTokenLogin = function (token) {
        this.AddGameLoginEvents();
        LoginManager.TokenLogin(ChannelManager.GetLoginChannel(), token);
    };
    LoginScene.prototype.OnGameLoginComplete = function () {
        this._lastLoginSuccessDateTime = Date.now();
        this.RemoveGameLoginEvents();
        //
        UIManager.closePanel(UIModuleName.LoginPanel);
        UIManager.closePanel(UIModuleName.RegisterPanel);
        //游戏登录成功设置保存登录类型
        PrefsManager.setValue(PrefsManager.Login_LoginType, ChannelManager.loginType);
        // AlertManager.showSingleAlert("显示登陆条!");
        //显示登录条
        this.ShowLoginBar();
    };
    LoginScene.prototype.OnGameLoginError = function () {
        this.RemoveGameLoginEvents();
        this.ShowEnterLoginPanel();
    };
    LoginScene.prototype.ShowLoginBar = function () {
        this.AddLoginBarEvents();
        UIManager.showPanel(UIModuleName.LoginBar, LoginManager.loginInfo);
    };
    LoginScene.prototype.AddLoginBarEvents = function () {
        this.RemoveLoginBarEvents();
        GameManager.stage.addEventListener(egret.Event.ACTIVATE, this.OnLoginGamePause, this); //显示LoginBar的时候，才能侦听游戏暂停恢复
        UIManager.addEventListener(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this.OnLoginBarComplete, this);
        UIManager.addEventListener(UIModuleName.LoginBar, UIModuleEvent.CHANGE, this.OnLoginBarChanged, this);
    };
    LoginScene.prototype.RemoveLoginBarEvents = function () {
        GameManager.stage.removeEventListener(egret.Event.ACTIVATE, this.OnLoginGamePause, this); //显示LoginBar的时候，才能侦听游戏暂停恢复
        UIManager.removeEventListener(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this.OnLoginBarComplete, this);
        UIManager.removeEventListener(UIModuleName.LoginBar, UIModuleEvent.CHANGE, this.OnLoginBarChanged, this);
    };
    LoginScene.prototype.OnLoginBarComplete = function (data) {
        this.RemoveLoginBarEvents();
        GameManager.reenterType = SystemReenterType.Normal; //登录成功要要重置这个
        var offsetTime = Date.now() - this._versionDateTime;
        if (offsetTime >= 1000 * 120) {
            //超时重新检查更新
            AlertManager.showAlert("登录验证已失效，请重新登录游戏！", this.OnLoginBarBack.bind(this), null, null, null, null, "重新登录");
        }
        else {
            //进入游戏
            this.InitServer(data);
        }
    };
    LoginScene.prototype.OnLoginBarBack = function (event) {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveLoginBarEvents();
        this.InitNetworkVersion();
    };
    LoginScene.prototype.OnLoginBarChanged = function () {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveLoginBarEvents();
        ChannelManager.Logout();
    };
    LoginScene.prototype.OnLoginGamePause = function (event) {
        if (this._lastLoginSuccessDateTime == 0 || (Date.now() - this._lastLoginSuccessDateTime) > 30 * 1000) {
            this.OnLoginBarBack(null);
        }
    };
    LoginScene.prototype.InitServer = function (serverInfo) {
        this.RemoveInitEvents();
        GameManager.OnInitComplete.addListener(this.OnInitComplete, this);
        GameManager.OnInitError.addListener(this.OnInitError, this);
        GameManager.InitServer(LoginManager.loginInfo, serverInfo);
    };
    LoginScene.prototype.RemoveInitEvents = function () {
        GameManager.OnInitComplete.removeListener(this.OnInitComplete, this);
        GameManager.OnInitError.removeListener(this.OnInitError, this);
    };
    LoginScene.prototype.OnInitComplete = function () {
        this.RemoveInitEvents();
        this.EnterGame();
    };
    LoginScene.prototype.OnInitError = function () {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveInitEvents();
        this.InitNetworkVersion();
    };
    /// <summary>
    /// 正式切场景进入游戏
    /// </summary>
    LoginScene.prototype.EnterGame = function () {
        ChannelManager.SetExtData(); //选择服务器后设置下sdk扩展数据
        ChatManager.initialzie(); //todo
        if (GamblingManager.roomInfo) {
            SceneManager.switcScene(SceneType.Game);
        }
        else {
            SceneManager.switcScene(SceneType.Hall);
        }
    };
    /**
     * 是否跳过版本检查，只有debug生效
     */
    LoginScene.SkipVersion = true;
    return LoginScene;
}(BaseScene));
__reflect(LoginScene.prototype, "LoginScene");
//# sourceMappingURL=LoginScene.js.map