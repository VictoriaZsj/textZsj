/**
 * 游戏规则面板
 */
class GameRulePanel extends BackHomeAnimePanel
{
    public gameRullTab:TabComponent;
    public RuleIntroGroup:eui.Group;
    public cardTypeGroup:eui.Group;
    public funcKeyIntroGroup:eui.Group;
	public constructor()
	{
		super();
		this.skinName = UISkinName.GameRulePanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
         //创建标签页
        let array:Array<eui.Group>=new Array<eui.Group>();
        array.push(this.RuleIntroGroup);
        array.push(this.cardTypeGroup);
        array.push(this.funcKeyIntroGroup);
        this.gameRullTab.init(array);
	}
	public init(appendData: any)
	{
		super.init(appendData);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
	}
}