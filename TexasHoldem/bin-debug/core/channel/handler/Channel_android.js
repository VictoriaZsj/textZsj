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
var Channel_android = (function (_super) {
    __extends(Channel_android, _super);
    function Channel_android() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Channel_android.prototype.Initialize = function () {
        egret.ExternalInterface.call(ExtFuncName.Initialize, '');
    };
    Channel_android.prototype.Login = function (loginType, isAutoLogin) {
        egret.ExternalInterface.call(ExtFuncName.Login, loginType);
    };
    Channel_android.prototype.Logout = function () {
        egret.ExternalInterface.call(ExtFuncName.Logout, '');
    };
    Channel_android.prototype.PaySend = function (serverId, orderId, price, shopName) {
        var data = { "serverId": serverId, "orderId": orderId, "price": price, "name": shopName };
        egret.ExternalInterface.call(ExtFuncName.Pay, JSON.stringify(data));
    };
    Channel_android.prototype.SetExtData = function (data) {
        egret.ExternalInterface.call(ExtFuncName.SetExtData, data);
    };
    Channel_android.prototype.SetChannelData = function (account, token) {
        egret.ExternalInterface.call(ExtFuncName.SetChannelData, JSON.stringify({ account: account, token: token }));
    };
    Channel_android.prototype.share = function (data) {
        egret.ExternalInterface.call(ExtFuncName.Share, data);
    };
    Channel_android.prototype.requestMicrophone = function () {
        egret.ExternalInterface.call(ExtFuncName.RequestMicrophone, '');
    };
    Channel_android.prototype.recordAudio = function (code) {
        egret.ExternalInterface.call(ExtFuncName.RecordAudio, code);
    };
    Channel_android.prototype.hotUpdate = function (message) {
        egret.ExternalInterface.call(ExtFuncName.HotUpdate, message);
    };
    Channel_android.prototype.setRecordData = function (guid, data) {
        var json = { "guid": guid, "data": data };
        egret.ExternalInterface.call(ExtFuncName.SetRecordData, JSON.stringify(json));
    };
    Channel_android.prototype.checkAudioCachePath = function () {
        egret.ExternalInterface.call(ExtFuncName.CheckAudioCachePath, StringConstant.empty);
    };
    Channel_android.prototype.hasRecordData = function (guid) {
        egret.ExternalInterface.call(ExtFuncName.HasRecordData, guid);
    };
    Channel_android.prototype.playRecord = function (guid) {
        egret.ExternalInterface.call(ExtFuncName.PlayRecord, guid);
    };
    Channel_android.prototype.loginValidateFail = function () {
        egret.ExternalInterface.call(ExtFuncName.LoginValidateFail, "");
    };
    return Channel_android;
}(ChannelBase));
__reflect(Channel_android.prototype, "Channel_android");
//# sourceMappingURL=Channel_android.js.map