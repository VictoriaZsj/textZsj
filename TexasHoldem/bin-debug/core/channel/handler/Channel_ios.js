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
var Channel_ios = (function (_super) {
    __extends(Channel_ios, _super);
    function Channel_ios() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Channel_ios.prototype.Initialize = function () {
        egret.ExternalInterface.call(ExtFuncName.Initialize, '');
    };
    Channel_ios.prototype.Login = function (loginType, isAutoLogin) {
        egret.ExternalInterface.call(ExtFuncName.Login, loginType);
    };
    Channel_ios.prototype.Logout = function () {
        egret.ExternalInterface.call(ExtFuncName.Logout, '');
    };
    Channel_ios.prototype.PaySend = function (serverId, orderId, price, shopName) {
        var data = { "serverId": serverId, "orderId": orderId, "price": price, "name": shopName };
        egret.ExternalInterface.call(ExtFuncName.Pay, JSON.stringify(data));
    };
    Channel_ios.prototype.SetExtData = function (data) {
        egret.ExternalInterface.call(ExtFuncName.SetExtData, data);
    };
    Channel_ios.prototype.SetChannelData = function (account, token) {
        egret.ExternalInterface.call(ExtFuncName.SetChannelData, JSON.stringify({ account: account, token: token }));
    };
    Channel_ios.prototype.share = function (data) {
        egret.ExternalInterface.call(ExtFuncName.Share, data);
    };
    Channel_ios.prototype.requestMicrophone = function () {
        egret.ExternalInterface.call(ExtFuncName.RequestMicrophone, '');
    };
    Channel_ios.prototype.recordAudio = function (code) {
        egret.ExternalInterface.call(ExtFuncName.RecordAudio, code);
    };
    Channel_ios.prototype.hotUpdate = function (message) {
        egret.ExternalInterface.call(ExtFuncName.HotUpdate, message);
    };
    Channel_ios.prototype.setRecordData = function (guid, data) {
        var json = { "guid": guid, "data": data };
        egret.ExternalInterface.call(ExtFuncName.SetRecordData, JSON.stringify(json));
    };
    Channel_ios.prototype.checkAudioCachePath = function () {
        egret.ExternalInterface.call(ExtFuncName.CheckAudioCachePath, StringConstant.empty);
    };
    Channel_ios.prototype.hasRecordData = function (guid) {
        egret.ExternalInterface.call(ExtFuncName.HasRecordData, guid);
    };
    Channel_ios.prototype.playRecord = function (guid) {
        egret.ExternalInterface.call(ExtFuncName.PlayRecord, guid);
    };
    Channel_ios.prototype.loginValidateFail = function () {
        egret.ExternalInterface.call(ExtFuncName.LoginValidateFail, "");
    };
    return Channel_ios;
}(ChannelBase));
__reflect(Channel_ios.prototype, "Channel_ios");
//# sourceMappingURL=Channel_ios.js.map