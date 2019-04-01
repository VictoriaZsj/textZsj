var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 会员管理
 */
var VipManager = (function () {
    function VipManager() {
    }
    /**
     * 计算vip等级
     */
    VipManager.getVipLevel = function (vipExp) {
        var vipLevelArray = ProjectDefined.GetInstance().getValue(ProjectDefined.vipLevel);
        for (var i = 0; i < vipLevelArray.length; i++) {
            if (vipExp >= vipLevelArray[i]) {
                continue;
            }
            return i;
        }
    };
    /**
     * 计算vip类型
     */
    VipManager.getVipType = function (vipTime, yearVipTime) {
        var serverTimeNow = TimeManager.GetServerUtcTimestamp();
        if (yearVipTime && yearVipTime > serverTimeNow) {
            return VipType.YearVip;
        }
        else if (vipTime && vipTime > serverTimeNow) {
            return VipType.Vip;
        }
        else {
            return VipType.NoVip;
        }
    };
    VipManager.initialize = function () {
        SocketManager.AddCommandListener(Command.Vip_GetVipTime_2001, this.onGetVipTime, this);
        this.refreshVipInfo();
    };
    VipManager.onGetVipTime = function (result) {
        if (result.data["vipTime"]) {
            UserManager.userInfo.vipTime = result.data["vipTime"];
        }
        if (result.data["yearVipTime"]) {
            UserManager.userInfo.yearVipTime = result.data["yearVipTime"];
        }
        UserManager.userInfo.vipLevel = VipManager.getVipLevel(UserManager.userInfo.vipExp);
        UserManager.userInfo.vipType = VipManager.getVipType(UserManager.userInfo.vipTime, UserManager.userInfo.yearVipTime);
        UserManager.userInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.userInfo.vipType).speed;
        VipManager.vipUpgradeEvent.dispatch();
    };
    VipManager.refreshVipInfo = function () {
        UserManager.userInfo.vipType = VipManager.getVipType(UserManager.userInfo.vipTime, UserManager.userInfo.yearVipTime);
        UserManager.userInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.userInfo.vipType).speed;
    };
    VipManager.isVip = function (info) {
        var tempInfo;
        if (info) {
            tempInfo = info;
        }
        else {
            tempInfo = UserManager.userInfo;
        }
        if (tempInfo.vipType == null || tempInfo.vipType == VipType.NoVip) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * 获取vip到期时间
     */
    VipManager.GetVipTime = function () {
        var serverTimeNow = TimeManager.GetServerUtcTimestamp();
        switch (UserManager.userInfo.vipType) {
            case VipType.NoVip:
                return 0;
            case VipType.YearVip:
                if (UserManager.userInfo.vipTime > serverTimeNow) {
                    return UserManager.userInfo.vipTime;
                }
                else {
                    return UserManager.userInfo.yearVipTime;
                }
            case VipType.Vip:
                return UserManager.userInfo.vipTime;
        }
    };
    /**
    * vip时间变更事件
    */
    VipManager.vipUpgradeEvent = new DelegateDispatcher();
    return VipManager;
}());
__reflect(VipManager.prototype, "VipManager");
//# sourceMappingURL=VipManager.js.map