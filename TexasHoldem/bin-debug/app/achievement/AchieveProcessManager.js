var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就/任务进度管理
 */
var AchieveProcessManager = (function () {
    function AchieveProcessManager() {
    }
    AchieveProcessManager.Initialize = function (result) {
        AchieveProcessManager.ClearList();
        AchieveProcessManager.initList();
        if (result.data["groupList"]) {
            for (var _i = 0, _a = result.data["groupList"]; _i < _a.length; _i++) {
                var info = _a[_i];
                for (var _b = 0, _c = AchieveProcessManager._list; _b < _c.length; _b++) {
                    var process = _c[_b];
                    if (process.group == info["group"]) {
                        process.init(info["process"]);
                    }
                    else {
                        process.init(0);
                    }
                }
            }
        }
    };
    /**
     * 根据组查找进度信息
     */
    AchieveProcessManager.getAchieveProcessInfoByGroup = function (group) {
        for (var _i = 0, _a = AchieveProcessManager._list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.group == group) {
                return info;
            }
        }
        return null;
    };
    /**
     * 根据任务大类查找进度列表
     */
    AchieveProcessManager.getAchieveProcessListByTag = function (tag) {
        var list = new Array();
        for (var _i = 0, _a = AchieveProcessManager._list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.tag == tag) {
                list.push(info);
            }
        }
        return list;
    };
    /**
     * 根据组生成进度类
     */
    AchieveProcessManager.GetProcess = function (group) {
        var process;
        switch (group) {
            case AchieveGroup.GoldGroup:
                process = new GoldProcess(group);
                break;
            case AchieveGroup.FriendGroup:
                process = new FriendProcess(group);
                break;
            case AchieveGroup.LevelGroup:
                process = new LevelProcess(group);
                break;
            case AchieveGroup.OnePairGroup:
                process = new OnePairProcess(group);
                break;
            case AchieveGroup.TwoPairsGroup:
                process = new TwoPairsProcess(group);
                break;
            case AchieveGroup.ThreeOfAKindGroup:
                process = new ThreeOfAKindProcess(group);
                break;
            case AchieveGroup.StraightGroup:
                process = new StraightProcess(group);
                break;
            case AchieveGroup.FlushGroup:
                process = new FlushProcess(group);
                break;
            case AchieveGroup.FullhouseGroup:
                process = new FullhouseProcess(group);
                break;
            case AchieveGroup.FourOfAKindGroup:
                process = new FourOfAKindProcess(group);
                break;
            case AchieveGroup.StraightFlushGroup:
                process = new StraightFlushProcess(group);
                break;
            case AchieveGroup.RoyalFlushGroup:
                process = new RoyalFlushProcess(group);
                break;
            case AchieveGroup.PrimaryPatternGroup:
                process = new PrimaryPatternProcess(group);
                break;
            case AchieveGroup.MiddlePatternGroup:
                process = new MiddlePatternProcess(group);
                break;
            case AchieveGroup.HighPatternGroup:
                process = new HighPatternProcess(group);
                break;
            case AchieveGroup.WinGroup:
                process = new WinProcess(group);
                break;
            case AchieveGroup.LevelUpGroup:
                process = new LevelUpProcess(group);
                break;
        }
        return process;
    };
    AchieveProcessManager.initList = function () {
        if (!AchieveProcessManager._list) {
            AchieveProcessManager._list = new Array();
        }
        for (var _i = 0, _a = AchieveDefined.GetInstance().getAchieveGroup(); _i < _a.length; _i++) {
            var group = _a[_i];
            AchieveProcessManager._list.push(AchieveProcessManager.GetProcess(group));
        }
    };
    /**
     * 重登陆的时候清除list里的信息和事件
     */
    AchieveProcessManager.ClearList = function () {
        if (AchieveProcessManager._list != null) {
            for (var i = 0; i < AchieveProcessManager._list.length; i++) {
                AchieveProcessManager._list[i].destroy();
            }
            ArrayUtil.Clear(AchieveProcessManager._list);
        }
    };
    /**
     * 根据类型创建监听
     */
    AchieveProcessManager.addProcessListener = function (type, callback, thisObj) {
        switch (type) {
            case AchieveType.Gold:
                UserManager.propertyChangeEvent.addListener(callback, thisObj);
                break;
            case AchieveType.Friend:
                FriendManager.onRefreshInfoEvent.addListener(callback, thisObj);
                break;
            case AchieveType.Level:
                UserManager.levelUpgrade.addListener(callback, thisObj);
            case AchieveType.CardType:
            case AchieveType.PrimaryPattern:
            case AchieveType.MiddlePattern:
            case AchieveType.HighPattern:
            case AchieveType.Win:
        }
    };
    /**
    * 根据类型移除监听
    */
    AchieveProcessManager.removeProcessListener = function (type, callback, thisObj) {
        switch (type) {
            case AchieveType.Gold:
                UserManager.propertyChangeEvent.removeListener(callback, thisObj);
                break;
            case AchieveType.Friend:
                FriendManager.onRefreshInfoEvent.removeListener(callback, thisObj);
                break;
            case AchieveType.Level:
                UserManager.levelUpgrade.removeListener(callback, thisObj);
            case AchieveType.CardType:
            case AchieveType.PrimaryPattern:
            case AchieveType.MiddlePattern:
            case AchieveType.HighPattern:
            case AchieveType.Win:
        }
    };
    return AchieveProcessManager;
}());
__reflect(AchieveProcessManager.prototype, "AchieveProcessManager");
/**
 * 成就/任务进度信息基类
 */
var BaseAchieveProcessInfo = (function () {
    function BaseAchieveProcessInfo(group) {
        this.group = group;
        this.process = 0;
        this.achieveList = new Array();
        for (var _i = 0, _a = UserManager.userInfo.allAchieveList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition.group == this.group) {
                this.achieveList.push(info);
                var curInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.id);
                var preInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.definition.preId);
                if ((!preInfo || preInfo.isComplete) && !curInfo.isComplete) {
                    this.step = curInfo.id;
                }
            }
        }
        if (this.achieveList.length > 0) {
            this.type = this.achieveList[0].definition.type;
            this.tag = this.achieveList[0].definition.tag;
            this.dailyQuest = this.achieveList[0].definition.dailyQuest;
        }
    }
    BaseAchieveProcessInfo.prototype.init = function (process) {
        this.process = process;
    };
    /**
     * 获得当前步骤的任务信息
     */
    BaseAchieveProcessInfo.prototype.getCurrentAchieveInfo = function () {
        for (var _i = 0, _a = this.achieveList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.id == this.step) {
                return info;
            }
        }
        return null;
    };
    /**
     * 重置任务进度
     */
    BaseAchieveProcessInfo.prototype.resetProcess = function () {
        this.process = 0;
        for (var _i = 0, _a = this.achieveList; _i < _a.length; _i++) {
            var info = _a[_i];
            info.isComplete = false;
            info.isTake = false;
        }
        if (this.achieveList.length > 0) {
            this.step = this.achieveList[0].id;
        }
    };
    BaseAchieveProcessInfo.prototype.destroy = function () {
    };
    return BaseAchieveProcessInfo;
}());
__reflect(BaseAchieveProcessInfo.prototype, "BaseAchieveProcessInfo");
//# sourceMappingURL=AchieveProcessManager.js.map