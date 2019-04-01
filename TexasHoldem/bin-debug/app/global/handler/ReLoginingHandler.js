var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReLoginingHandler = (function () {
    function ReLoginingHandler() {
    }
    ReLoginingHandler.prototype.invoke = function () {
        SocketManager.Dispose();
        UserManager.reLogin();
        ShoppingManager.clearList();
    };
    return ReLoginingHandler;
}());
__reflect(ReLoginingHandler.prototype, "ReLoginingHandler");
//# sourceMappingURL=ReLoginingHandler.js.map