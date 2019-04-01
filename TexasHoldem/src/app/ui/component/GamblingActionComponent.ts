/**
 * 操作组件
 */
class GamblingActionComponent extends BaseComponent<PlayerState>
{
	public brightCardBtn: eui.Button;

	public preActionGroup: eui.Group;
	public passOrDropBtn: eui.Button;
	public callAnyBtn: eui.Button;

	public raiseGroup: eui.Button;
	public oneOfThreeBtn: eui.Button;
	public oneOfTwoBtn: eui.Button;
	public twoOfThreeBtn: eui.Button;
	public oneBtn: eui.Button;

	public actionGroup: eui.Group;
	public raiseBtn: eui.Button;
	public foldBtn: eui.Button;
	public callBtn: eui.Button;
	public constructor()
	{
		super();
		this.skinName = UIComponentSkinName.GamblingActionComponent;
	}
	public hideAll()
	{
		this.brightCardBtn.visible = false;
		this.preActionGroup.visible = false;
		this.raiseGroup.visible = false;
		this.actionGroup.visible = false;
	}
}