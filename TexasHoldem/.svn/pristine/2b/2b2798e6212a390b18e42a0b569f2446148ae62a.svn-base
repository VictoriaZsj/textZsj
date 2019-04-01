/**
 * 好友成就进度信息
 */
class FriendProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    }

    private onProcessUpdate()
    {
        if (UserManager.userInfo.friendNum > this.process)
        {
            super.init(UserManager.userInfo.friendNum);
        }
    }

    public destroy()
    {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        super.destroy();
    }
}