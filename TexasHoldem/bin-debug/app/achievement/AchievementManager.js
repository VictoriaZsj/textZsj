var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就/任务管理
 */
var AchievementManager = (function () {
    function AchievementManager() {
    }
    AchievementManager.initialize = function (result) {
        TimeManager.resetTime0Event.addListener(this.onResetTime, this);
        if (!AchievementManager.allList) {
            AchievementManager.allList = new Array();
            for (var _i = 0, _a = AchieveDefined.GetInstance().dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                var info = new AchievementInfo();
                info.id = def.id;
                info.isComplete = false;
                info.isTake = false;
                AchievementManager.allList.push(info);
            }
        }
        AchievementManager.setAllAchieveList(UserManager.userInfo, result);
    };
    /**
     * 设置某用户的成就信息
     */
    AchievementManager.setAllAchieveList = function (info, result) {
        var list = new Array();
        if (result.data["achieveList"]) {
            for (var _i = 0, _a = result.data["achieveList"]; _i < _a.length; _i++) {
                var info_1 = _a[_i];
                var achieveInfo = new AchievementInfo();
                achieveInfo.id = info_1["id"];
                achieveInfo.isTake = info_1["isTake"];
                achieveInfo.isComplete = true;
                list.push(achieveInfo);
            }
        }
        info.allAchieveList = AchievementManager.getCompleteAchieveInfoDic(list);
    };
    /**
     * 生成包括所有成就信息的列表
     */
    AchievementManager.getCompleteAchieveInfoDic = function (list) {
        if (list == null || list.length == 0) {
            return AchievementManager.allList;
        }
        var result = new Array();
        for (var i = 0; i < AchievementManager.allList.length; i++) {
            var info = AchievementManager.allList[i];
            for (var j = 0; j < AchievementManager.allList.length; j++) {
                if (AchievementManager.allList[j].id == info.id) {
                    info = AchievementManager.allList[j];
                }
            }
            result.push(info);
        }
        return result;
    };
    /**
     * 根据tag获取成就/任务列表(UserManager里的列表)
     */
    AchievementManager.getAchieveListByTag = function (tag) {
        var result = new Array();
        for (var _i = 0, _a = UserManager.userInfo.allAchieveList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition.tag == tag) {
                result.push(info);
            }
        }
        return result;
    };
    /**
     * 接收到推送的回调
     */
    AchievementManager.onGetAchieveInfo = function (result) {
        if (result.data) {
            var info = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, result.data["id"]);
            info.isComplete = true;
            AchievementManager.achieveChangeEvent.dispatch(info);
        }
    };
    /**
     * 通过成就id获取成就信息
     */
    AchievementManager.getAchieveInfoById = function (list, id) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var info = list_1[_i];
            if (info.id == id) {
                return info;
            }
        }
        return null;
    };
    /**
    * 获取显示的任务列表
    */
    AchievementManager.getShowAchieveList = function () {
        var list = AchieveProcessManager.getAchieveProcessListByTag(AchieveTag.Quest);
        var result = new Array();
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var info = list_2[_i];
            result.push(AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.step));
        }
        return result;
    };
    /**
     * 根据类型查找显示的列表
     */
    AchievementManager.getShowAchieveListByType = function (dailyType) {
        var list = AchievementManager.getShowAchieveList();
        var result = new Array();
        for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
            var info = list_3[_i];
            if (info.definition.dailyQuest == dailyType) {
                result.push(info);
            }
        }
        return result;
    };
    /**
     * 发送领取成就奖励的请求
     */
    AchievementManager.reqTakeAchievePrize = function (id) {
        SocketManager.call(Command.Achievement_GetPrize_3088, { "Id": id }, AchievementManager.onTakeAchievePrize, null, this);
    };
    AchievementManager.onTakeAchievePrize = function (result) {
        if (result.data) {
            var info = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, result.data["Id"]);
            if (!info.isTake) {
                info.isTake = true;
            }
            else {
                UIManager.showFloatTips("已领取过奖励");
            }
            AchievementManager.getAchievementPrizeEvent.dispatch();
        }
    };
    /**
     * 重置任务
     */
    AchievementManager.onResetTime = function (result) {
        AchievementManager.resetAchievement(AchieveDailyType.Daily);
        if (TimeManager.GetServerLocalDateTime().getDay() == WeekDay.Monday) {
            AchievementManager.resetAchievement(AchieveDailyType.Weekly);
        }
    };
    /**
     * 重置任务
     */
    AchievementManager.resetAchievement = function (dailyType) {
        for (var _i = 0, _a = AchieveProcessManager.getAchieveProcessListByTag(AchieveTag.Quest); _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.dailyQuest == dailyType) {
                info.resetProcess();
            }
        }
    };
    /**
    * 成就解锁事件
    */
    AchievementManager.achieveChangeEvent = new DelegateDispatcher();
    /**
     * 领取成就奖励事件
     */
    AchievementManager.getAchievementPrizeEvent = new DelegateDispatcher();
    return AchievementManager;
}());
__reflect(AchievementManager.prototype, "AchievementManager");
/**
 * 成就信息
 */
var AchievementInfo = (function () {
    function AchievementInfo() {
    }
    Object.defineProperty(AchievementInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = AchieveDefined.GetInstance().getAchieveDefintion(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AchievementInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            this._definition = value;
        },
        enumerable: true,
        configurable: true
    });
    return AchievementInfo;
}());
__reflect(AchievementInfo.prototype, "AchievementInfo");
var AchieveTag;
(function (AchieveTag) {
    /**
     * 成就
     */
    AchieveTag[AchieveTag["Achievement"] = 0] = "Achievement";
    /**
     * 任务
     */
    AchieveTag[AchieveTag["Quest"] = 1] = "Quest";
})(AchieveTag || (AchieveTag = {}));
var AchieveDailyType;
(function (AchieveDailyType) {
    /**
     * 每日任务
     */
    AchieveDailyType[AchieveDailyType["Daily"] = 1] = "Daily";
    /**
     * 每周任务
     */
    AchieveDailyType[AchieveDailyType["Weekly"] = 2] = "Weekly";
    /**
     * 成长任务
     */
    AchieveDailyType[AchieveDailyType["GrowUp"] = 3] = "GrowUp";
})(AchieveDailyType || (AchieveDailyType = {}));
//# sourceMappingURL=AchievementManager.js.map