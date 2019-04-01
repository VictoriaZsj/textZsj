var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 本地存储管理
 */
var PrefsManager = (function () {
    function PrefsManager() {
    }
    PrefsManager.SetAccountPassword = function (account, pwd) {
        PrefsManager.setValue(PrefsManager.Login_Account, account);
        PrefsManager.setValue(PrefsManager.Login_Password, pwd);
    };
    PrefsManager.setValue = function (key, value, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        if (isPrivate) {
            egret.localStorage.setItem(PrefsManager.getUserId() + key, value);
        }
        else {
            egret.localStorage.setItem(key, value);
        }
    };
    PrefsManager.getValue = function (key, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        if (isPrivate) {
            return egret.localStorage.getItem(PrefsManager.getUserId() + key);
        }
        else {
            return egret.localStorage.getItem(key);
        }
    };
    PrefsManager.setBoolean = function (key, value, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        PrefsManager.setValue(key, value.toString(), isPrivate);
    };
    PrefsManager.getBoolean = function (key, defaultValue, isPrivate) {
        if (defaultValue === void 0) { defaultValue = false; }
        if (isPrivate === void 0) { isPrivate = false; }
        var value = PrefsManager.getValue(key, isPrivate);
        if (StringUtil.isNullOrEmpty(value)) {
            return defaultValue;
        }
        return StringUtil.toBoolean(value);
    };
    PrefsManager.setNumber = function (key, value, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        PrefsManager.setValue(key, value.toString(), isPrivate);
    };
    PrefsManager.getNumber = function (key, defaultValue, isPrivate) {
        if (defaultValue === void 0) { defaultValue = 0; }
        if (isPrivate === void 0) { isPrivate = false; }
        var value = PrefsManager.getValue(key, isPrivate);
        if (StringUtil.isNullOrEmpty(value)) {
            return defaultValue;
        }
        return parseFloat(value);
    };
    PrefsManager.getUserId = function () {
        if (LoginManager.loginInfo) {
            return LoginManager.loginInfo.userid.toString();
        }
        return StringConstant.empty;
    };
    PrefsManager.Login_Account = "login_account";
    PrefsManager.Login_Password = "login_password";
    PrefsManager.Login_Token = "login_token";
    PrefsManager.Login_LoginType = "login_loginType";
    PrefsManager.Sound_Bg_Volume = "sound_bg_volume";
    PrefsManager.Sound_Bg_Enable = "sound_bg_enable";
    PrefsManager.Sound_Effect_Volume = "sound_effect_volume";
    PrefsManager.Sound_Effect_Enable = "sound_effect_enable";
    PrefsManager.Shake_Enable = "shake_enable";
    return PrefsManager;
}());
__reflect(PrefsManager.prototype, "PrefsManager");
//# sourceMappingURL=PrefsManager.js.map