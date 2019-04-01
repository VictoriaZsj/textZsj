/**
 * 保险箱管理
*/
class SafeBoxManager
{
    public static pwdSuccessEvent: DelegateDispatcher = new DelegateDispatcher();
    public static modifyPwdEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     *  请求存取金币
    */
    public static reqSaveWithdrawGold(num: number, type: number, pwd?: number)
    {
        let successCallBack: Function = function (result: SpRpcResult)
        {
            if (type == SafeType.Save)
            {
                UIManager.showFloatTips("存入成功");
            } else if (type == SafeType.Withdraw)
            {
                UIManager.showFloatTips("取出成功");
            }
        }
        let errorCallBack: Function = function (result: SpRpcResult)
        {
            if (result.error == 3004)
            {
                AlertManager.showAlert("您输入的密码错误，请重新输入！");
            }
        }
        SocketManager.call(Command.Req_saveORwithdraw_3014, { num: num, type: type, pwd: pwd }, successCallBack,errorCallBack,this);
    }
    /**
     *  请求创建密码
    */
    public static reqCreatePwd(newPwd: number)
    {
        let callback: Function = function (result: SpRpcResult)
        {
            SafeBoxManager.pwdSuccessEvent.dispatch();//协议发送后抛出存取完事件       
        }
        SocketManager.call(Command.Req_safePwd_3017, { "newPwd": newPwd },callback,null,this);
    }
    /**
     *  请求修改密码
    */
    public static reqModifyPwd(newPwd: number, oldPwd: number)
    {
        let successCallBack: Function = function (result: SpRpcResult)
        {
            SafeBoxManager.modifyPwdEvent.dispatch();//协议发送后抛出存取完事件       
        }
        let errorCallBack: Function = function (result: SpRpcResult)
        {
            if (result.error == 3001)
            {
                AlertManager.showAlert("您的原密码不正确！");
            }
        }
        SocketManager.call(Command.Req_safePwd_3017, { "newPwd": newPwd, "oldPwd": oldPwd },successCallBack,errorCallBack,this);
    }
}