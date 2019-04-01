/**
 * 三条成就进度信息
 */
class ThreeOfAKindProcess extends BaseAchieveProcessInfo 
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