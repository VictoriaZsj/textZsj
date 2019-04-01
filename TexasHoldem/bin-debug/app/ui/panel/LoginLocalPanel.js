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
/**
 * 内网登录面板
 */
var LoginLocalPanel = (function (_super) {
    __extends(LoginLocalPanel, _super);
    function LoginLocalPanel() {
        var _this = _super.call(this) || this;
        _this.isTween = true;
        _this.skinName = UISkinName.LoginLocalPanel;
        return _this;
    }
    LoginLocalPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.accountLabel.type = egret.TextFieldType.INPUT;
        this.pwdLabel.type = egret.TextFieldType.INPUT;
        this.pwdLabel.inputType = egret.TextFieldInputType.PASSWORD;
        this.accountLabel.text = PrefsManager.getValue(PrefsManager.Login_Account);
        this.pwdLabel.text = PrefsManager.getValue(PrefsManager.Login_Password);
    };
    LoginLocalPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    LoginLocalPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.registerHandler, this);
    };
    LoginLocalPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginHandler, this);
        this.registerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.registerHandler, this);
    };
    /**
     * 点击登录按钮进行登录
     * DispatchAccountLoginSucceed（）第三个参数来区分是进行注册还是进行登录操作
    */
    LoginLocalPanel.prototype.loginHandler = function (event) {
        var account = this.accountLabel.text.trim();
        var pwd = this.pwdLabel.text.trim();
        SoundManager.playButtonEffect(event.target);
        if (!account || !pwd) {
            AlertManager.showAlert("您的账号或密码为空，请重新输入！");
            return;
        }
        this.onCloseBtnClickHandler(event);
        ChannelManager.DispatchAccountLoginSucceed(account, pwd, false);
    };
    /**
     * 点击注册按钮显示注册面板
    */
    LoginLocalPanel.prototype.registerHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        this.onCloseBtnClickHandler(event);
        UIManager.showPanel(UIModuleName.RegisterPanel);
    };
    return LoginLocalPanel;
}(BasePanel));
__reflect(LoginLocalPanel.prototype, "LoginLocalPanel");
//# sourceMappingURL=LoginLocalPanel.js.map