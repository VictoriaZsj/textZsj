/**
 * 成就/任务进度管理
 */
class AchieveProcessManager
{
    private static _list: Array<BaseAchieveProcessInfo>;

    public static Initialize(result: SpRpcResult)
    {
        AchieveProcessManager.ClearList();
        AchieveProcessManager.initList();
        if (result.data["groupList"])
        {
            for (let info of result.data["groupList"])
            {
                for (let process of AchieveProcessManager._list)
                {
                    if (process.group == info["group"])
                    {
                        process.init(info["process"])
                    }
                    else
                    {
                        process.init(0);
                    }
                }
            }
        }
    }

    /**
     * 根据组查找进度信息
     */
    public static getAchieveProcessInfoByGroup(group: AchieveGroup): BaseAchieveProcessInfo
    {
        for (let info of AchieveProcessManager._list)
        {
            if (info.group == group)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 根据任务大类查找进度列表
     */
    public static getAchieveProcessListByTag(tag: AchieveTag): Array<BaseAchieveProcessInfo>
    {
        let list: Array<BaseAchieveProcessInfo> = new Array<BaseAchieveProcessInfo>();
        for (let info of AchieveProcessManager._list)
        {
            if (info.tag == tag)
            {
                list.push(info);
            }
        }
        return list;
    }

    /**
     * 根据组生成进度类
     */
    private static GetProcess(group: AchieveGroup): BaseAchieveProcessInfo
    {
        let process: BaseAchieveProcessInfo;
        switch (group)
        {
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
    }

    private static initList()
    {
        if (!AchieveProcessManager._list)
        {
            AchieveProcessManager._list = new Array<BaseAchieveProcessInfo>();
        }
        for (let group of AchieveDefined.GetInstance().getAchieveGroup())
        {
            AchieveProcessManager._list.push(AchieveProcessManager.GetProcess(group));
        }
    }
    /**
     * 重登陆的时候清除list里的信息和事件
     */
    private static ClearList()
    {
        if (AchieveProcessManager._list != null)
        {
            for (let i: number = 0; i < AchieveProcessManager._list.length; i++)
            {
                AchieveProcessManager._list[i].destroy();
            }
            ArrayUtil.Clear(AchieveProcessManager._list);
        }
    }

    /**
     * 根据类型创建监听
     */
    public static addProcessListener(type: number, callback: Function, thisObj: any)
    {
        switch (type)
        {
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
    }

    /**
    * 根据类型移除监听
    */
    public static removeProcessListener(type: number, callback: Function, thisObj: any)
    {
        switch (type)
        {
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
    }
}

/**
 * 成就/任务进度信息基类
 */
class BaseAchieveProcessInfo
{
    public constructor(group: number)
    {
        this.group = group;
        this.process = 0;
        this.achieveList = new Array<AchievementInfo>();
        for (let info of UserManager.userInfo.allAchieveList)
        {
            if (info.definition.group == this.group)
            {
                this.achieveList.push(info);
                let curInfo: AchievementInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.id);
                let preInfo: AchievementInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.definition.preId);
                if ((!preInfo || preInfo.isComplete) && !curInfo.isComplete)
                {
                    this.step = curInfo.id;
                }
            }
        }
        if (this.achieveList.length > 0)
        {
            this.type = this.achieveList[0].definition.type;
            this.tag = this.achieveList[0].definition.tag;
            this.dailyQuest = this.achieveList[0].definition.dailyQuest;
        }
    }
    /**
     * 任务组
     */
    public group: number;
    /**
     * 任务列表
     */
    public achieveList: Array<AchievementInfo>;
    /**
     * 进度
     */
    public process: number;
    /**
     * 步骤数（现已完成到哪一个任务）
     */
    public step: number;
    /**
     * 监听类型
     */
    public type: number;
    /**
     * 任务大类
     */
    public tag: number;
    /**
     * 重置类型
     */
    public dailyQuest: number;

    public init(process: number)
    {
        this.process = process;
        for (let info of this.achieveList)
        {
            if (info.definition.para1 <= process)
            {
                info.isComplete = true;
            }
            else
            {
                this.step = info.id;
                return;
            }
        }
    }

    /**
     * 获得当前步骤的任务信息
     */
    public getCurrentAchieveInfo(): AchievementInfo
    {
        for (let info of this.achieveList)
        {
            if (info.id == this.step)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 重置任务进度
     */
    public resetProcess()
    {
        this.process = 0;
        for (let info of this.achieveList)
        {
            info.isComplete = false;
            info.isTake = false;
        }
        if (this.achieveList.length > 0)
        {
            this.step = this.achieveList[0].id;
        }
    }

    public destroy()
    {
    }
}