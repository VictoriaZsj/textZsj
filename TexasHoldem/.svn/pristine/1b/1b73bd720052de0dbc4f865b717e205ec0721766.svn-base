/**
 * 登录场景背景界面
 */
class LoginSceneBgPanel extends BasePanel
{
	public constructor()
	{
		super();
		this.skinName = UISkinName.LoginSceneBgPanel;
	}
	protected onRender(event: egret.Event)
	{
		egret.ExternalInterface.call(ExtFuncName.SwitchToGame, "message load res complete");
		super.onRender(event);
	}
}