var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 活动管理
 */
var ActivityManager = (function () {
    function ActivityManager() {
    }
    ActivityManager.Initialize = function (result) {
        //todo 
        var lastTime = 222222222222222;
        var signInDayNum = 2;
        ActivityManager.signInHandler.initialize(lastTime, signInDayNum);
        ActivityManager.signInHandler.onEnable();
        TimeManager.resetTime0Event.removeListener(ActivityManager.onTimeReset, this);
        ActivityManager.InitActivityList();
        TimeManager.resetTime0Event.addListener(ActivityManager.onTimeReset, this);
        for (var _i = 0, _a = ActivityManager.list; _i < _a.length; _i++) {
            var info = _a[_i];
            ActivityManager.setStartTime(info);
            ActivityManager.setEndTime(info);
        }
        if (result.data) {
            for (var i = 0; i < result.data.length; i++) {
                ActivityManager.list[i].id = result.data[i]["Id"];
                ActivityManager.list[i].step = result.data[i]["Step"];
                ActivityManager.list[i].severStartTime = result.data[i]["StartTime"];
                ActivityManager.list[i].severEndTime = result.data[i]["EndTime"];
                switch (ActivityManager.list[i].definition.type) {
                    case ActivityType.des:
                        for (var _b = 0, _c = JSON.parse(result.data[i]["gotJson"]); _b < _c.length; _b++) {
                            var id = _c[_b];
                            ActivityManager.list[i].getAwardList.push(id);
                        }
                        break;
                    case ActivityType.signin:
                        var lastTime_1 = JSON.parse(result.data[i]["Json"]).SignTime;
                        var signInDayNum_1 = ActivityManager.list[i].step;
                        ActivityManager.signInHandler.initialize(lastTime_1, signInDayNum_1);
                }
            }
        }
        ActivityManager.checkCompleteHide();
    };
    /**
     * 根据活动类型显示面板
     */
    ActivityManager.showActivityPanelByType = function (activityInfo) {
        switch (activityInfo.definition.type) {
            case ActivityType.img:
                UIManager.showPanel(UIModuleName.SimplePicturePanel, activityInfo);
                break;
            case ActivityType.des:
                UIManager.showPanel(UIModuleName.NormalActivityPanel, activityInfo);
                break;
            default:
                if (activityInfo.definition.panelName) {
                    UIManager.showPanel(activityInfo.definition.panelName, activityInfo);
                }
                break;
        }
    };
    /**
     * 获取活动信息
     */
    ActivityManager.getActivityInfo = function (id) {
        for (var _i = 0, _a = ActivityManager.list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.id == id) {
                return info;
            }
        }
        return null;
    };
    /**
     * 获取活动状态
     */
    ActivityManager.getActivityOpenState = function (info) {
        if (!info || !info.definition) {
            return ActivityOpenState.None;
        }
        var dt = TimeManager.GetServerLocalDateTime();
        if (info.definition.isByServerTime && (info.severStartTime != TimeManager.Utc1970 || info.severEndTime != TimeManager.Utc1970)) {
            if (dt >= info.severStartTime && dt <= info.severEndTime) {
                return ActivityOpenState.Opened;
            }
            return ActivityOpenState.NotOpen;
        }
        if (info.startTime && info.startTime != TimeManager.Utc1970) {
            if (dt < info.startTime) {
                return ActivityOpenState.NotOpen;
            }
        }
        if (info.endTime && info.endTime != TimeManager.Utc1970) {
            if (dt > info.endTime) {
                return ActivityOpenState.Finish;
            }
        }
        return ActivityOpenState.Opened;
    };
    ActivityManager.InitActivityList = function () {
        ArrayUtil.Clear(ActivityManager.list);
        for (var _i = 0, _a = ActivityListDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var info = _a[_i];
            var activityInfo = new ActivityInfo();
            activityInfo.id = info.id;
            ActivityManager.list.push(activityInfo);
        }
    };
    ActivityManager.checkCompleteHide = function () {
        ArrayUtil.Clear(ActivityManager.showList);
        for (var _i = 0, _a = ActivityManager.list; _i < _a.length; _i++) {
            var info = _a[_i];
            var isHide = info.definition.showFinish == false || info.definition.unInShowPanel == true;
            if (ActivityManager.getActivityOpenState(info) != ActivityOpenState.Opened || isHide) {
                continue;
            }
            ActivityManager.showList.push(info);
        }
    };
    /**
     * 设置开始时间
     */
    ActivityManager.setStartTime = function (info) {
        info.severStartTime = DateTimeUtil.stringToDate(info.definition.startTime);
        info.startTime = DateTimeUtil.stringToDate(info.definition.startTime);
        if (ActivityManager.IsOpenServerActivity(info.definition)) {
            if (info.definition.openServerTimeStart > 0) {
                info.severStartTime = new Date((UserManager.userInfo.openServerTime + info.definition.openServerTimeStart) * 1000);
                if (info.severStartTime > info.startTime) {
                    info.startTime = info.severStartTime;
                }
            }
            else {
                info.severStartTime = new Date(UserManager.userInfo.openServerTime * 1000);
            }
        }
        if (ActivityManager.IsCreateRoleActivity(info.definition)) {
            if (info.definition.keepDayStart > 0) {
                info.severStartTime = new Date((UserManager.userInfo.createdTime + info.definition.keepDayStart) * 1000);
                if (info.severStartTime > info.startTime) {
                    info.startTime = info.severStartTime;
                }
            }
            else {
                info.severStartTime = new Date(UserManager.userInfo.createdTime * 1000);
            }
        }
    };
    /**
     * 设置结束时间
     */
    ActivityManager.setEndTime = function (info) {
        info.severEndTime = DateTimeUtil.stringToDate(info.definition.endTime);
        info.endTime = DateTimeUtil.stringToDate(info.definition.endTime);
        if (ActivityManager.IsOpenServerActivity(info.definition)) {
            if (info.definition.openServerTimeEnd > 0) {
                info.severEndTime = new Date((UserManager.userInfo.openServerTime + info.definition.openServerTimeEnd) * 1000);
                if (info.severEndTime < info.endTime || info.endTime == TimeManager.Utc1970) {
                    info.endTime = info.severEndTime;
                }
            }
        }
        if (ActivityManager.IsCreateRoleActivity(info.definition)) {
            if (info.definition.keepDayEnd > 0) {
                info.severEndTime = new Date((UserManager.userInfo.createdTime + info.definition.keepDayEnd) * 1000);
                if (info.severEndTime < info.endTime || info.endTime == TimeManager.Utc1970) {
                    info.endTime = info.severEndTime;
                }
            }
        }
    };
    /**
    * 是否是开服型活动，开服型活动完成统一不消失
    */
    ActivityManager.IsOpenServerActivity = function (def) {
        if (def) {
            return def.openServerTimeStart > 0 || def.openServerTimeEnd > 0;
        }
        return false;
    };
    /**
     * 活动是否是创号型活动
     */
    ActivityManager.IsCreateRoleActivity = function (def) {
        if (def != null) {
            return def.keepDayStart > 0 || def.keepDayEnd > 0;
        }
        return false;
    };
    /**
     * 0点重置
     */
    ActivityManager.onTimeReset = function () {
        SocketManager.call(Command.Activity_GetList_3233, null, ActivityManager.Initialize, null, this);
        ActivityManager.signInHandler.resetSignIn();
    };
    /**
     * 请求领取活动奖励
     */
    ActivityManager.ReqGetActivityAward = function (activityId, subId) {
        var callback = function (sp) {
            PropertyManager.ShowItemList();
            ActivityManager.getAwardResult(activityId, subId);
        };
        PropertyManager.OpenGet();
        SocketManager.call(Command.Activity_GetPrize_3202, { "Id": activityId, "SubId": subId }, callback, null, this);
    };
    ActivityManager.getAwardResult = function (activityId, subId) {
        var def = ActivityListDefined.GetInstance().getDefinition(activityId);
        var info = ActivityManager.getActivityInfo(activityId);
        if (def && info) {
            switch (def.type) {
                case ActivityType.des:
                    ActivityManager.onGetAwardResult(info, subId);
                    break;
            }
        }
    };
    ActivityManager.onGetAwardResult = function (info, subId) {
        if (info.getAwardList.indexOf(subId) == -1) {
            info.getAwardList.push(subId);
        }
    };
    /**
     * 签到处理
    */
    ActivityManager.signInHandler = new SignInHandler();
    /**
     * 活动列表
     */
    ActivityManager.list = new Array();
    /**
     * 显示的活动列表
     */
    ActivityManager.showList = new Array();
    return ActivityManager;
}());
__reflect(ActivityManager.prototype, "ActivityManager");
//# sourceMappingURL=ActivityManager.js.map