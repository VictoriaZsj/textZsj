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
var LoginSocket = (function (_super) {
    __extends(LoginSocket, _super);
    function LoginSocket() {
        return _super.call(this, false) || this;
    }
    LoginSocket.prototype.initialize = function (buff, msgType) {
        if (msgType === void 0) { msgType = egret.WebSocket.TYPE_BINARY; }
        this._msgType = msgType;
        if (buff) {
            var dataView = new DataView(buff);
            var schema = new Array();
            for (var i = 0; i < dataView.byteLength; i++) {
                schema[i] = dataView.getUint8(i);
            }
            if (schema.length > 0) {
                this._spRpc = Sproto.createNew({ buf: schema, sz: schema.length });
            }
            if (!this._spRpc) {
                console.log("创建Sproto对象失败!");
            }
        }
    };
    return LoginSocket;
}(BaseSocket));
__reflect(LoginSocket.prototype, "LoginSocket");
//# sourceMappingURL=LoginSocket.js.map