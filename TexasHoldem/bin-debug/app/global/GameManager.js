var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏管理
 */
var GameManager = (function () {
    function GameManager() {
    }
    Object.defineProperty(GameManager, "stage", {
        get: function () {
            return GameManager._stage;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    GameManager.initialize = function (stage) {
        GameManager._stage = stage;
    };
    /**
     * 所有数据管理静态类初始化前都要清空
     */
    GameManager.InitServer = function (loginInfo, serverInfo) {
        GameManager._isInitComplete = false;
        GameManager.initServerHandler.Invoke(loginInfo, serverInfo, GameManager.ParseInitComplete, GameManager.DispatchInitError);
    };
    GameManager.ParseInitComplete = function () {
        if (GameManager._isInitComplete == false && GameManager.initServerHandler.isComplete) {
            GameManager._isInitComplete = true;
            GameManager.initAppHandler.Invoke();
            GameManager.DispatchInitComplete();
        }
    };
    GameManager.DispatchInitComplete = function () {
        GameManager.OnInitComplete.dispatch();
    };
    GameManager.DispatchInitError = function () {
        GameManager.OnInitError.dispatch();
    };
    GameManager.reLogin = function (type) {
        if (type === void 0) { type = SystemReenterType.Normal; }
        GameManager.reenterType = type;
        GameManager._reLogining.invoke();
        SceneManager.switcScene(SceneType.Login);
    };
    /**
     * 重进类型
     */
    GameManager.reenterType = SystemReenterType.Normal;
    /**
     * 初始化服务器数据
     */
    GameManager.initServerHandler = new InitServerHandler();
    /**
     * 初始化app
     */
    GameManager.initAppHandler = new InitAppHandler();
    /**
     * 跳转到登录场景前
     */
    GameManager._reLogining = new ReLoginingHandler();
    GameManager._isInitComplete = false;
    /**
     * 初始化完成
     */
    GameManager.OnInitComplete = new DelegateDispatcher();
    /**
     * 初始化错误
     */
    GameManager.OnInitError = new DelegateDispatcher();
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map