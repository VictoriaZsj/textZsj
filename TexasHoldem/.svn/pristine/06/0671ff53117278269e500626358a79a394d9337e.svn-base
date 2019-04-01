/**
 * 金币成就进度信息
 */
class GoldProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(UserManager.userInfo.maxGold);
        UserManager.propertyChangeEvent.addListener(this.onProcessUpdate, this);
    }

    private onProcessUpdate()
    {
        if (UserManager.userInfo.gold > this.process)
        {
            super.init(UserManager.userInfo.gold);
        }
    }

    public destroy()
    {
        UserManager.propertyChangeEvent.removeListener(this.onProcessUpdate, this);
        super.destroy();
    }
}