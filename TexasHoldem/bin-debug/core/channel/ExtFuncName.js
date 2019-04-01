var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExtFuncName = (function () {
    function ExtFuncName() {
    }
    //------------------------------------------------------------------
    // 原生->egret
    //------------------------------------------------------------------
    ExtFuncName.OnApplicationFocus = "OnApplicationFocus";
    ExtFuncName.OnInitComplete = "OnInitComplete";
    ExtFuncName.OnLoginSucceed = "OnLoginSucceed";
    ExtFuncName.OnLoginFailed = "OnLoginFailed";
    ExtFuncName.OnPaySucceed = "OnPaySucceed";
    ExtFuncName.OnPayFailed = "OnPayFailed";
    ExtFuncName.OnShareSucceed = "OnShareSucceed";
    ExtFuncName.OnShareFailed = "OnShareFailed";
    ExtFuncName.OnLogout = "OnLogout";
    ExtFuncName.OnRecordComplete = "OnRecordComplete";
    /**
     * 应用返回，只有ios有
     */
    ExtFuncName.OnBackToApplication = "OnBackToApplication";
    /**
     * 热更新处理完毕
     */
    ExtFuncName.OnHotUpdate = "OnHotUpdate";
    /**
     * 是否有本地记录的录音数据
     */
    ExtFuncName.OnHasRecordData = "OnHasRecordData";
    //------------------------------------------------------------------
    // egret->原生
    //------------------------------------------------------------------
    ExtFuncName.Initialize = "Initialize";
    ExtFuncName.Login = "Login";
    ExtFuncName.Pay = "Pay";
    ExtFuncName.Logout = "Logout";
    ExtFuncName.SetExtData = "SetExtData";
    ExtFuncName.SetChannelData = "SetChannelData";
    ExtFuncName.Share = "Share";
    ExtFuncName.RequestMicrophone = "RequestMicrophone";
    /**
     * 请求录音
     */
    ExtFuncName.RecordAudio = "RecordAudio";
    ExtFuncName.SwitchToGame = "SwitchToGame";
    /**
     * 执行热更新
     */
    ExtFuncName.HotUpdate = "HotUpdate";
    /**
     * 设置录音数据
     */
    ExtFuncName.SetRecordData = "SetRecordData";
    /**
     * 停止播放正在播放的录音
     */
    ExtFuncName.StopRecord = "StopRecord";
    /**
     * 检查录音路径是否存在
     */
    ExtFuncName.CheckAudioCachePath = "CheckAudioCachePath";
    /**
     * 本地是否存在录音数据
     */
    ExtFuncName.HasRecordData = "HasRecordData";
    /**
     * 播放录音
     */
    ExtFuncName.PlayRecord = "PlayRecord";
    /**
     * 验证token失败，清除存储的openid和token
     */
    ExtFuncName.LoginValidateFail = "LoginValidateFail";
    return ExtFuncName;
}());
__reflect(ExtFuncName.prototype, "ExtFuncName");
//# sourceMappingURL=ExtFuncName.js.map