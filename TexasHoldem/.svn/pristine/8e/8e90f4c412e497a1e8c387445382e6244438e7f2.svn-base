/**
 * 会员管理
 */
class VipManager
{
    /**
    * vip时间变更事件
    */
    public static vipUpgradeEvent: DelegateDispatcher = new DelegateDispatcher();

    /**
     * 计算vip等级
     */
    public static getVipLevel(vipExp: number): number
    {
        let vipLevelArray: Array<number> = ProjectDefined.GetInstance().getValue(ProjectDefined.vipLevel);
        for (let i = 0; i < vipLevelArray.length; i++)
        {
            if (vipExp >= vipLevelArray[i])
            {
                continue;
            }
            return i;
        }
    }
    /**
     * 计算vip类型
     */
    public static getVipType(vipTime: number, yearVipTime: number): VipType
    {
        let serverTimeNow: number = TimeManager.GetServerUtcTimestamp();
        if (yearVipTime && yearVipTime > serverTimeNow)
        {
            return VipType.YearVip;
        }
        else if (vipTime && vipTime > serverTimeNow)
        {
            return VipType.Vip;
        }
        else
        {
            return VipType.NoVip;
        }
    }

    public static initialize()
    {
        SocketManager.AddCommandListener(Command.Vip_GetVipTime_2001, this.onGetVipTime, this);
        this.refreshVipInfo();
    }

    private static onGetVipTime(result: SpRpcResult)
    {
        if (result.data["vipTime"])
        {
            UserManager.userInfo.vipTime = result.data["vipTime"];
        }
        if (result.data["yearVipTime"])
        {
            UserManager.userInfo.yearVipTime = result.data["yearVipTime"];
        }
        UserManager.userInfo.vipLevel = VipManager.getVipLevel(UserManager.userInfo.vipExp);
        UserManager.userInfo.vipType = VipManager.getVipType(UserManager.userInfo.vipTime, UserManager.userInfo.yearVipTime);
        UserManager.userInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.userInfo.vipType).speed;
        VipManager.vipUpgradeEvent.dispatch();
    }

    private static refreshVipInfo()
    {
        UserManager.userInfo.vipType = VipManager.getVipType(UserManager.userInfo.vipTime, UserManager.userInfo.yearVipTime);
        UserManager.userInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.userInfo.vipType).speed;
    }

    public static isVip(info?: UserInfo): boolean
    {
        let tempInfo: UserInfo;
        if (info)
        {
            tempInfo = info;
        }
        else
        {
            tempInfo = UserManager.userInfo;
        }
        if (tempInfo.vipType == null || tempInfo.vipType == VipType.NoVip)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    /**
     * 获取vip到期时间
     */
    public static GetVipTime(): number
    {
        let serverTimeNow: number = TimeManager.GetServerUtcTimestamp();
        switch (UserManager.userInfo.vipType)
        {
            case VipType.NoVip:
                return 0;
            case VipType.YearVip:
                if (UserManager.userInfo.vipTime > serverTimeNow)
                {
                    return UserManager.userInfo.vipTime;
                }
                else
                {
                    return UserManager.userInfo.yearVipTime;
                }
            case VipType.Vip:
                return UserManager.userInfo.vipTime;
        }
    }
}