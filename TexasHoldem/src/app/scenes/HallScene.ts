/**
 * 游戏大厅
 */
class HallScene extends BaseScene
{
	public clear()
	{
		UIManager.closePanel(UIModuleName.GameHallPanel);
	}
	public initialize()
	{
		this.resGroupName = ResGroupName.Hall;
		super.initialize();
		UIManager.closePanel(UIModuleName.LoginSceneBgPanel);
	}
	protected onResourceLoadComplete()
	{
		super.onResourceLoadComplete();
		UIManager.showPanel(UIModuleName.GameHallPanel);
	}
}