var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 邮件管理
 */
var MailManager = (function () {
    function MailManager() {
    }
    /**
     * 重置数据
     */
    MailManager.Reset = function () {
        MailManager.unReadCount = 0;
        ArrayUtil.Clear(MailManager.mailList);
        //GetUnReadCount();
        MailManager.isMailListChange = true;
        SocketManager.AddCommandListener(Command.Mail_Push_New_2024, MailManager.OnMailNewNofityFromServer, this);
    };
    MailManager.clearList = function () {
        ArrayUtil.Clear(MailManager.mailList);
    };
    /**
     * 新邮件的通知协议
     */
    MailManager.OnMailNewNofityFromServer = function (result) {
        MailManager.unReadCount++;
        MailManager.isMailListChange = true;
        MailManager.haveNewMailEvent.dispatch();
    };
    MailManager.initialize = function (result) {
        if (result.data["MailList"]) {
            for (var _i = 0, _a = result.data["MailList"]; _i < _a.length; _i++) {
                var def = _a[_i];
                var mail = new MailInfo();
                mail.copyValueFrom(def);
                if (mail.SubType) {
                    var def_1 = MailDefined.GetInstance().getDefinition(mail.SubType);
                    if (def_1) {
                        mail.Title = def_1.title;
                        var content = def_1.content;
                        var paramStr = mail.Content.split('|');
                        for (var i = 0; i < paramStr.length; i++) {
                            content = content.replace("{" + i + "}", paramStr[i]);
                        }
                        mail.Content = content;
                    }
                }
                for (var _b = 0, _c = JSON.parse(mail.attaJson); _b < _c.length; _b++) {
                    var atta = _c[_b];
                    var award = new AwardInfoDefinition();
                    award.id = atta["Id"];
                    award.type = atta["Type"];
                    award.count = atta["Count"];
                    mail.attaList = new Array();
                    mail.attaList.push(award);
                }
                MailManager.mailList.push(mail);
            }
        }
    };
    /**
     * 请求邮件列表
     */
    MailManager.RequestMailList = function (startId, count) {
        SocketManager.call(Command.Mail_GetList_3097, { "StartId": startId, "Count": count }, this.onGetMailList, null, this);
    };
    MailManager.onGetMailList = function (result) {
        MailManager.initialize(result);
        MailManager.isMailListChange = false;
        MailManager.getMailListEvent.dispatch();
    };
    /**
     *  获取列表中最大邮件id
     */
    MailManager.getMaxMailId = function () {
        if (MailManager.mailList) {
            var maxId = 0;
            for (var i = 0; i < MailManager.mailList.length; i++) {
                if (MailManager.mailList[i].Id > maxId) {
                    maxId = MailManager.mailList[i].Id;
                }
            }
            return maxId;
        }
        return undefined;
    };
    /**
     * 根据类型获取列表
     */
    MailManager.getListByType = function (type) {
        if (MailManager.mailList) {
            var list = new Array();
            for (var _i = 0, _a = MailManager.mailList; _i < _a.length; _i++) {
                var mailInfo = _a[_i];
                if (mailInfo.Type == type) {
                    list.push(mailInfo);
                }
            }
            return list;
        }
        return null;
    };
    MailManager.mailList = new Array();
    /**
     * 未读邮件数量
     */
    MailManager.unReadCount = 0;
    /**
     * 拉取邮件事件
     */
    MailManager.getMailListEvent = new DelegateDispatcher();
    /**
     * 领取邮件附件事件
     */
    MailManager.getMailPrizeEvent = new DelegateDispatcher();
    /**
     * 有新邮件的事件
     */
    MailManager.haveNewMailEvent = new DelegateDispatcher();
    return MailManager;
}());
__reflect(MailManager.prototype, "MailManager");
//# sourceMappingURL=MailManager.js.map