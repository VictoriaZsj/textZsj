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
 * web版
 */
var Channel_web = (function (_super) {
    __extends(Channel_web, _super);
    function Channel_web() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Channel_web.prototype.Initialize = function () {
        var data = {};
        data['channelType'] = ChannelType.qin;
        data['appName'] = window.document.title;
        data['deviceId'] = '';
        data['bundleId'] = '';
        data['hasWeixin'] = '0';
        data['hasMicrophone'] = '0';
        ChannelManager.sdkInitComplete(JSON.stringify(data));
    };
    Channel_web.prototype.Login = function (loginType, isAutoLogin) {
        if (loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount) {
            var account = PrefsManager.getValue(PrefsManager.Login_Account);
            var password = PrefsManager.getValue(PrefsManager.Login_Password);
            if (isAutoLogin && account && password) {
                ChannelManager.DispatchAccountLoginSucceed(account, password);
            }
            else {
                if (!UIManager.isShowPanel(UIModuleName.LoginLocalPanel)) {
                    UIManager.showPanel(UIModuleName.LoginLocalPanel);
                }
            }
        }
        else if (loginType == ChannelLoginType.Normal) {
            // if (UIManager.IsShowModule(UIModuleName.TokenPanel) == false)
            // {
            // 	UIManager.ShowModuleToRoot(UIModuleName.TokenPanel);
            // }
        }
        else {
            UIManager.showFloatTips("登录类型错误");
            ChannelManager.sdkLoginFailed();
        }
    };
    Channel_web.prototype.Logout = function () {
        ChannelManager.sdkLogout();
    };
    Channel_web.prototype.PaySend = function (serverId, orderId, rewardNum, shopName) {
        var tempshopName = shopName;
        var callback = function () {
            AwardManager.OnExchanged.removeListener(callback, this);
            ChannelManager.sdkPaySucceed(StringConstant.empty);
            var goSavePanel = function () {
                UIManager.showPanel(UIModuleName.SafeBoxPanel);
            };
            var awardId = parseInt(tempshopName);
            if (PayDefined.GetInstance().getDefinitionbyAwardId(awardId).type == ListType.Vip) {
                if (!UserManager.userInfo.isSafePwd) {
                    AlertManager.showAlert("您开通了VIP，保险箱以为您免费开放，请尽快设定您的保险箱密码!", goSavePanel);
                }
            }
            ShoppingManager.buyOverAction.dispatch(); //协议发送后抛出买完事件
        };
        if (ChannelManager.loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount) {
            AwardManager.OnExchanged.addListener(callback, this);
            var shopNameId = parseInt(shopName);
            AwardManager.Exchange(shopNameId);
        }
        else {
            UIManager.showFloatTips("不能支付");
        }
    };
    Channel_web.prototype.hotUpdate = function () {
        ChannelManager.sdkHotUpdateComplete();
    };
    return Channel_web;
}(ChannelBase));
__reflect(Channel_web.prototype, "Channel_web");
//# sourceMappingURL=Channel_web.js.map