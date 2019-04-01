/**
 * 游戏场景
 */
class GameScene extends BaseScene
{
	public constructor()
	{
		super();
	}
	public clear()
	{
		UIManager.closePanel(UIModuleName.GamblingPanel);
	}
	public initialize()
	{
		this.resGroupName = ResGroupName.Gambling;
		super.initialize();
		UIManager.closePanel(UIModuleName.LoginSceneBgPanel);
	}
	protected onResourceLoadComplete()
	{
		super.onResourceLoadComplete();
		UIManager.showPanel(UIModuleName.GamblingPanel);
	}
}
