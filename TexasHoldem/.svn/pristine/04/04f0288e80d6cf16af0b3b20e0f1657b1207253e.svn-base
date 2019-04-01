/**
 * 登录场景逻辑处理
 */
class LoginScene extends BaseScene
{
    /**
     * 是否跳过版本检查，只有debug生效
     */
    private static readonly SkipVersion: boolean = true;
    //
    private _versionDateTime: number;
    private _channelLoginList: Array<string>;
    private _isLoginingAcount: boolean = false;
    private _lastLoginSuccessDateTime: number = 0;

    public clear()
    {
        ChannelManager.OnLogout.removeListener(this.OnChannelLogout, this);
        this.RemoveChannelEvents();
        this.RemoveGameLoginEvents();
        this.RemoveLoginBarEvents();
        LoginManager.Dispose();
    }
    public initialize()
    {
        this.resGroupName = ResGroupName.Pub;
        super.initialize();
        UIManager.showPanel(UIModuleName.LoginSceneBgPanel);
        ChannelManager.OnInitComplete.addListener(this.OnChannelInitComplete, this);
        ChannelManager.Initialize();
    }
    private OnChannelInitComplete()
    {
        ChannelManager.OnInitComplete.removeListener(this.OnChannelInitComplete, this);
        VersionManager.Initialize();
        this.InitNetworkVersion();
    }
    private InitNetworkVersion(): void
    {
        if (LoginScene.SkipVersion && DEBUG)
        {
            this.onEnterLogin();
        }
        else
        {
            ChannelManager.OnHotUpdateComplete.addListener(this.onEnterLogin, this);
            VersionManager.loadServerVersion();
        }
    }
    private onEnterLogin()
    {
        ChannelManager.OnHotUpdateComplete.removeListener(this.onEnterLogin, this);
        this._versionDateTime = Date.now();
        console.log("渠道初始化完毕，开启静默加载");
        RES.loadGroup(ResGroupName.Hall, 2);
        RES.loadGroup(ResGroupName.Gambling, 1);
        if (DEBUG && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE)
        {
            //todo 显示网络选择
            //UIManager.addEventListener(UIModuleName.NetworkPanel, UIModuleEvent.COMPLETE, this.OnNetworkSelect, this);
            //UIManager.showPanel(UIModuleName.NetworkPanel);
            this.EnterLoginStart(GameManager.reenterType == SystemReenterType.Normal);
        }
        else
        {
            this.EnterLoginStart(GameManager.reenterType == SystemReenterType.Normal);
        }
    }
    private OnNetworkSelect()
    {
        UIManager.removeEventListener(UIModuleName.NetworkPanel, UIModuleEvent.COMPLETE, this.OnNetworkSelect, this);
        this.EnterLoginStart(GameManager.reenterType == SystemReenterType.Normal);
    }
    private EnterLoginStart(isAutoLogin: boolean)
    {
        this._channelLoginList = ChannelLoginType.GetChannelLoginList(DEBUG, VersionManager.isSafe, ChannelManager.operatePlatform, ChannelManager.channelType);
        if (this._channelLoginList.length > 1)
        {
            let channelLoginType: string = PrefsManager.getValue(PrefsManager.Login_LoginType);
            if (isAutoLogin && channelLoginType)
            {
                this.ChannelLoginStart(channelLoginType, isAutoLogin);
            }
            else
            {
                this.ShowEnterLoginPanel();
            }
        }
        else
        {
            this.ChannelLoginStart(this._channelLoginList[0], isAutoLogin);
        }
    }
    private ChannelLoginStart(loginType: string, isAutoLogin: boolean)
    {
        ChannelManager.OnLogout.addListener(this.OnChannelLogout, this);
        //
        ChannelManager.loginType = loginType;
        LoginManager.SetAddress(loginType);
        if (loginType == ChannelLoginType.Guest || loginType == ChannelLoginType.IntranetGuest)
        {
            //游客登录
            this.GameGuestLogin();
        }
        else
        {
            //渠道登录
            this.AddChannelEvents();
            ChannelManager.Login(loginType, isAutoLogin);
        }
    }
    private ShowEnterLoginPanel()
    {
        UIManager.addEventListener(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, this.OnEnterLoginSelect, this);
        UIManager.showPanel(UIModuleName.LoginPanel, this._channelLoginList);
    }
    private HideEnterLoginPanel()
    {
        UIManager.removeEventListener(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, this.OnEnterLoginSelect, this);
        UIManager.closePanel(UIModuleName.LoginPanel);
    }
    private OnEnterLoginSelect(data: string)
    {
        this.HideEnterLoginPanel();
        this.ChannelLoginStart(data, false);
    }
    private GameGuestLogin()
    {
        this.AddGameLoginEvents();
        LoginManager.GuestLogin(ChannelType.guest);//游客渠道标识是固定的
    }
    private AddGameLoginEvents()
    {
        this.RemoveGameLoginEvents();
        LoginManager.OnComplete.addListener(this.OnGameLoginComplete, this);
        LoginManager.OnError.addListener(this.OnGameLoginError, this);
    }
    private RemoveGameLoginEvents()
    {
        LoginManager.OnComplete.removeListener(this.OnGameLoginComplete, this);
        LoginManager.OnError.removeListener(this.OnGameLoginError, this);
    }
    private AddChannelEvents()
    {
        this.RemoveChannelEvents();
        ChannelManager.OnAccountLoginSucceed.addListener(this.OnAccountLoginSucceed, this);
        ChannelManager.OnTokenLoginSucceed.addListener(this.OnTokenLoginSucceed, this);
        ChannelManager.OnTokenDebug.addListener(this.OnTokenDebug, this);
        ChannelManager.OnLoginFailed.addListener(this.OnChannelLoginFailure, this);
        ChannelManager.OnBackToApplication.addListener(this.OnBackToApplication, this);
        this._isLoginingAcount = true;
    }
    private RemoveChannelEvents()
    {
        ChannelManager.OnAccountLoginSucceed.removeListener(this.OnAccountLoginSucceed, this);
        ChannelManager.OnTokenLoginSucceed.removeListener(this.OnTokenLoginSucceed, this);
        ChannelManager.OnTokenDebug.removeListener(this.OnTokenDebug, this);
        ChannelManager.OnLoginFailed.removeListener(this.OnChannelLoginFailure, this);
        ChannelManager.OnBackToApplication.removeListener(this.OnBackToApplication, this);
        this._isLoginingAcount = false;
        this.ClearBackApplicationTimer();
    }
    private OnTokenDebug(tokenAccount: string)
    {
        this.RemoveChannelEvents();
        this.GameTokenDebug(tokenAccount);
    }
    private GameTokenDebug(tokenAccount: string)
    {
        this.AddGameLoginEvents();
        LoginManager.TokenDebug(ChannelManager.GetLoginChannel(), tokenAccount);
    }
    private OnChannelLoginFailure()
    {
        this.RemoveChannelEvents();
        PrefsManager.setValue(PrefsManager.Login_LoginType, ChannelLoginType.Normal);
        this.ShowEnterLoginPanel();
    }
    private _backToApplicationTimer: number;
    private OnBackToApplication()
    {
        this.ClearBackApplicationTimer();
        this._backToApplicationTimer = egret.setTimeout(this.CallBackToLoginLaterCoroutine, this, 5000);;
    }
    private ClearBackApplicationTimer()
    {
        clearTimeout(this._backToApplicationTimer);
    }
    private CallBackToLoginLaterCoroutine()
    {
        clearTimeout(this._backToApplicationTimer);
        if (this._isLoginingAcount)
        {
            UIManager.showFloatTips("登录失败");
            this.OnChannelLoginFailure();
        }
    }
    private OnAccountLoginSucceed(args: Array<any>)
    {
        this.RemoveChannelEvents();
        if (args[2])
        {
            this.GameAccountRegister(args[0], args[1]);
        }
        else
        {
            this.GameAccountLogin(args[0], args[1]);
        }
    }
    private OnTokenLoginSucceed(token: string)
    {
        this.RemoveChannelEvents();
        this.GameTokenLogin(token);
    }
    private OnChannelLogout()
    {
        this.RemoveChannelEvents();
        ChannelManager.OnLogout.removeListener(this.OnChannelLogout, this);
        PrefsManager.setValue(PrefsManager.Login_LoginType, ChannelLoginType.Normal);
        this.EnterLoginStart(false);
    }
    private GameAccountRegister(account: string, password: string)
    {
        this.AddGameLoginEvents();
        LoginManager.AccountRegister(ChannelManager.channelType, account, password);
    }
    private GameAccountLogin(account: string, password: string)
    {
        this.AddGameLoginEvents();
        LoginManager.AccountLogin(ChannelManager.channelType, account, password);
    }
    private GameTokenLogin(token: string)
    {
        this.AddGameLoginEvents();
        LoginManager.TokenLogin(ChannelManager.GetLoginChannel(), token);
    }
    private OnGameLoginComplete()
    {
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
    }
    private OnGameLoginError()
    {
        this.RemoveGameLoginEvents();
        this.ShowEnterLoginPanel();
    }
    private ShowLoginBar()
    {
        this.AddLoginBarEvents();
        UIManager.showPanel(UIModuleName.LoginBar, LoginManager.loginInfo);
    }
    private AddLoginBarEvents()
    {
        this.RemoveLoginBarEvents();
        GameManager.stage.addEventListener(egret.Event.ACTIVATE, this.OnLoginGamePause, this); //显示LoginBar的时候，才能侦听游戏暂停恢复
        UIManager.addEventListener(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this.OnLoginBarComplete, this);
        UIManager.addEventListener(UIModuleName.LoginBar, UIModuleEvent.CHANGE, this.OnLoginBarChanged, this);
    }
    private RemoveLoginBarEvents()
    {
        GameManager.stage.removeEventListener(egret.Event.ACTIVATE, this.OnLoginGamePause, this); //显示LoginBar的时候，才能侦听游戏暂停恢复
        UIManager.removeEventListener(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this.OnLoginBarComplete, this);
        UIManager.removeEventListener(UIModuleName.LoginBar, UIModuleEvent.CHANGE, this.OnLoginBarChanged, this);
    }
    private OnLoginBarComplete(data: ServerInfo)
    {
        this.RemoveLoginBarEvents();
        GameManager.reenterType = SystemReenterType.Normal;//登录成功要要重置这个
        let offsetTime: number = Date.now() - this._versionDateTime;
        if (offsetTime >= 1000 * 120)
        {
            //超时重新检查更新
            AlertManager.showAlert("登录验证已失效，请重新登录游戏！", this.OnLoginBarBack.bind(this), null, null, null, null, "重新登录");
        }
        else
        {
            //进入游戏
            this.InitServer(data);
        }
    }
    private OnLoginBarBack(event: UIModuleEvent)
    {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveLoginBarEvents();
        this.InitNetworkVersion();
    }
    private OnLoginBarChanged()
    {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveLoginBarEvents();
        ChannelManager.Logout();
    }
    private OnLoginGamePause(event: egret.Event): void
    {
        if (this._lastLoginSuccessDateTime == 0 || (Date.now() - this._lastLoginSuccessDateTime) > 30 * 1000)
        {
            this.OnLoginBarBack(null);
        }
    }
    private InitServer(serverInfo: ServerInfo)
    {
        this.RemoveInitEvents();
        GameManager.OnInitComplete.addListener(this.OnInitComplete, this);
        GameManager.OnInitError.addListener(this.OnInitError, this);
        GameManager.InitServer(LoginManager.loginInfo, serverInfo);
    }
    private RemoveInitEvents()
    {
        GameManager.OnInitComplete.removeListener(this.OnInitComplete, this);
        GameManager.OnInitError.removeListener(this.OnInitError, this);
    }
    private OnInitComplete()
    {
        this.RemoveInitEvents();
        this.EnterGame();
    }
    private OnInitError()
    {
        UIManager.closePanel(UIModuleName.LoginBar);
        this.RemoveInitEvents();
        this.InitNetworkVersion();
    }
    /// <summary>
    /// 正式切场景进入游戏
    /// </summary>
    private EnterGame()
    {
        ChannelManager.SetExtData();//选择服务器后设置下sdk扩展数据
        ChatManager.initialzie();//todo
        if (GamblingManager.roomInfo)
        {
            SceneManager.switcScene(SceneType.Game);
        }
        else
        {
            SceneManager.switcScene(SceneType.Hall);
        }
    }
}