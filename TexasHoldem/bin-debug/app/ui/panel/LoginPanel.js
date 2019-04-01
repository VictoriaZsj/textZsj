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
 * 登录界面
 */
var LoginPanel = (function (_super) {
    __extends(LoginPanel, _super);
    function LoginPanel() {
        var _this = _super.call(this) || this;
        _this.setGrayMask(false);
        _this.skinName = UISkinName.LoginPanel;
        return _this;
    }
    LoginPanel.prototype.onAwake = function (event) {
        this.isTween = false;
        _super.prototype.onAwake.call(this, event);
    };
    LoginPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var logintype = ChannelLoginType.GetChannelLoginList(true, VersionManager.isSafe, ChannelManager.operatePlatform, ChannelManager.channelType);
        this.agreeCheckBox.selected = true;
        GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
        for (var _i = 0, logintype_1 = logintype; _i < logintype_1.length; _i++) {
            var val = logintype_1[_i];
            if (val == ChannelLoginType.Guest) {
                this.guestLoginBtn.visible = true;
                this.guestLoginBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.IntranetAccount) {
                this.intranetAccountBtn.visible = true;
                this.intranetAccountBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.Weixin) {
                this.weixinLoginBtn.visible = true;
                this.weixinLoginBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.Account) {
                this.accountBtn.visible = true;
                this.accountBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.IntranetGuest) {
                this.intranetGuestBtn.visible = true;
                this.intranetGuestBtn.includeInLayout = true;
            }
        }
    };
    LoginPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.weixinLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.weixinClickHandler, this);
        this.guestLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guestLoginClickHandler, this);
        this.intranetAccountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetAccountClickHandler, this);
        this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.userBtnClickHandler, this);
        this.accountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.accountBtnClickHandler, this);
        this.intranetGuestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetGuestBtnClickHandler, this);
        this.agreeCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeCheckBoxClickHandler, this);
        UIManager.addEventListener(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE, this.outAngree, this);
    };
    LoginPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.weixinLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.weixinClickHandler, this);
        this.guestLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.guestLoginClickHandler, this);
        this.intranetAccountBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetAccountClickHandler, this);
        this.userBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.userBtnClickHandler, this);
        this.accountBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.accountBtnClickHandler, this);
        this.intranetGuestBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetGuestBtnClickHandler, this);
        this.agreeCheckBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeCheckBoxClickHandler, this);
        UIManager.removeEventListener(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE, this.outAngree, this);
    };
    LoginPanel.prototype.guestLoginClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Guest);
    };
    LoginPanel.prototype.accountBtnClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Account);
    };
    LoginPanel.prototype.intranetGuestBtnClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.IntranetGuest);
    };
    LoginPanel.prototype.intranetAccountClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.IntranetAccount);
    };
    LoginPanel.prototype.weixinClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (GameSetting.IsAgreeUserAgreement) {
            if (ChannelManager.hasWeixin) {
                UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Weixin);
            }
            else {
                UIManager.showFloatTips("请安装微信后重启本游戏！");
            }
        }
        else {
            UIManager.showFloatTips("用户必须同意用户协议才可进行登录！");
        }
    };
    LoginPanel.prototype.userBtnClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.showPanel(UIModuleName.UserAngreementPanel);
    };
    LoginPanel.prototype.agreeCheckBoxClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
    };
    LoginPanel.prototype.outAngree = function () {
        this.agreeCheckBox.selected = true;
        GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
    };
    return LoginPanel;
}(BasePanel));
__reflect(LoginPanel.prototype, "LoginPanel");
//# sourceMappingURL=LoginPanel.js.map