/**
 * 等级成就进度信息
 */
class LevelProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    }

    private onProcessUpdate()
    {
        if (UserManager.userInfo.level > this.process)
        {
            super.init(UserManager.userInfo.level);
        }
    }

    public destroy()
    {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        super.destroy();
    }
}