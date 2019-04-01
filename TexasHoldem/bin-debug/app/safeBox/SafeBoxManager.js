var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 保险箱管理
*/
var SafeBoxManager = (function () {
    function SafeBoxManager() {
    }
    /**
     *  请求存取金币
    */
    SafeBoxManager.reqSaveWithdrawGold = function (num, type, pwd) {
        var successCallBack = function (result) {
            if (type == SafeType.Save) {
                UIManager.showFloatTips("存入成功");
            }
            else if (type == SafeType.Withdraw) {
                UIManager.showFloatTips("取出成功");
            }
        };
        var errorCallBack = function (result) {
            if (result.error == 3004) {
                AlertManager.showAlert("您输入的密码错误，请重新输入！");
            }
        };
        SocketManager.call(Command.Req_saveORwithdraw_3014, { num: num, type: type, pwd: pwd }, successCallBack, errorCallBack, this);
    };
    /**
     *  请求创建密码
    */
    SafeBoxManager.reqCreatePwd = function (newPwd) {
        var callback = function (result) {
            SafeBoxManager.pwdSuccessEvent.dispatch(); //协议发送后抛出存取完事件       
        };
        SocketManager.call(Command.Req_safePwd_3017, { "newPwd": newPwd }, callback, null, this);
    };
    /**
     *  请求修改密码
    */
    SafeBoxManager.reqModifyPwd = function (newPwd, oldPwd) {
        var successCallBack = function (result) {
            SafeBoxManager.modifyPwdEvent.dispatch(); //协议发送后抛出存取完事件       
        };
        var errorCallBack = function (result) {
            if (result.error == 3001) {
                AlertManager.showAlert("您的原密码不正确！");
            }
        };
        SocketManager.call(Command.Req_safePwd_3017, { "newPwd": newPwd, "oldPwd": oldPwd }, successCallBack, errorCallBack, this);
    };
    SafeBoxManager.pwdSuccessEvent = new DelegateDispatcher();
    SafeBoxManager.modifyPwdEvent = new DelegateDispatcher();
    return SafeBoxManager;
}());
__reflect(SafeBoxManager.prototype, "SafeBoxManager");
//# sourceMappingURL=SafeBoxManager.js.map