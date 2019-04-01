/**
 * 初级场对局成就进度信息
 */
class PrimaryPatternProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    }

    private onProcessUpdate()
    {
        //super.init(UserManager.userInfo.gold);
    }

    public destroy()
    {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        super.destroy();
    }
}