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
 * 登录场景背景界面
 */
var LoginSceneBgPanel = (function (_super) {
    __extends(LoginSceneBgPanel, _super);
    function LoginSceneBgPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.LoginSceneBgPanel;
        return _this;
    }
    LoginSceneBgPanel.prototype.onRender = function (event) {
        egret.ExternalInterface.call(ExtFuncName.SwitchToGame, "message load res complete");
        _super.prototype.onRender.call(this, event);
    };
    return LoginSceneBgPanel;
}(BasePanel));
__reflect(LoginSceneBgPanel.prototype, "LoginSceneBgPanel");
//# sourceMappingURL=LoginSceneBgPanel.js.map