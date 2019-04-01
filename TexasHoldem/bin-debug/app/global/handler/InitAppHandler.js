var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 进入游戏前初始化应用，登录之后
 */
var InitAppHandler = (function () {
    function InitAppHandler() {
        this._isAppComplete = false;
    }
    Object.defineProperty(InitAppHandler.prototype, "isAppComplete", {
        get: function () {
            return this._isAppComplete;
        },
        enumerable: true,
        configurable: true
    });
    InitAppHandler.prototype.Invoke = function () {
        if (this._isAppComplete == false) {
            //第一次登录初始化一次
            this._isAppComplete = true;
            //
        }
        else {
            //非第一次登录执行
            //重登录,做了数据缓存的都清除
        }
        //每次登录都执行
        ShoppingManager.initialize();
        VipManager.initialize();
        MailManager.Reset();
    };
    return InitAppHandler;
}());
__reflect(InitAppHandler.prototype, "InitAppHandler");
//# sourceMappingURL=InitAppHandler.js.map