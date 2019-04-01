var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChannelBase = (function () {
    function ChannelBase() {
    }
    /// <summary>
    /// 初始化
    /// </summary>
    ChannelBase.prototype.Initialize = function () {
    };
    ChannelBase.prototype.Login = function (loginType, isAutoLogin) {
    };
    ChannelBase.prototype.PaySend = function (payId, orderId, price, shopName) {
    };
    ChannelBase.prototype.Logout = function () {
    };
    /**
     * 检查支付订单
     */
    ChannelBase.prototype.CheckPayOrder = function () {
    };
    /**
     * 登录验证失败
     */
    ChannelBase.prototype.loginValidateFail = function () {
    };
    /**
     * 退出
     */
    ChannelBase.prototype.Exit = function () {
    };
    /**
     * 分享
     */
    ChannelBase.prototype.share = function (data) {
    };
    /**
     * 设置sdk扩展数据
     */
    ChannelBase.prototype.SetExtData = function (data) {
    };
    ChannelBase.prototype.SetChannelData = function (account, token) {
    };
    ChannelBase.prototype.requestMicrophone = function () {
    };
    ChannelBase.prototype.recordAudio = function (code) {
    };
    ChannelBase.prototype.hotUpdate = function (message) {
    };
    ChannelBase.prototype.playComplete = function (guid) {
    };
    ChannelBase.prototype.setRecordData = function (guid, data) {
    };
    ChannelBase.prototype.checkAudioCachePath = function () {
    };
    ChannelBase.prototype.hasRecordData = function (guid) {
    };
    ChannelBase.prototype.playRecord = function (guid) {
    };
    //------------------------------------------------------------------
    // sdk回调执行方法
    //------------------------------------------------------------------
    /**
     * 支付成功
     */
    ChannelBase.prototype.sdkPaySucceed = function (data) {
    };
    /**
     * 支付失败
     */
    ChannelBase.prototype.sdkPayFailed = function () {
    };
    return ChannelBase;
}());
__reflect(ChannelBase.prototype, "ChannelBase");
//# sourceMappingURL=ChannelBase.js.map