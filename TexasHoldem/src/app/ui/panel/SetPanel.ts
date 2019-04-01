/**
 * 设置面板
 */
class SetPanel extends BackHomeAnimePanel
{ 	
	public bgSoundTog: eui.ToggleButton;
	public soundEffectTog: eui.ToggleButton;
	public shakeTog:eui.ToggleButton;
	public reLoginBtn: eui.Button;
	public forum:eui.Label;
	public QQ:eui.Label;
	public customerService:eui.Label;

	public constructor()
	{
		super();
		this.skinName = UISkinName.SetPanel;
	}	
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if(!ProjectDefined.GetInstance().gameFeedback)
		{
			this.forum.text=StringConstant.empty;
			this.QQ.text=ProjectDefined.GetInstance().gameFeedback.QQ;
			this.customerService.text=StringConstant.empty;
		}
		if(ProjectDefined.GetInstance().gameFeedback.forum)
		{
			this.forum.text=ProjectDefined.GetInstance().gameFeedback.forum;
		}
		else if(!ProjectDefined.GetInstance().gameFeedback.forum)
		{
 			this.forum.text=StringConstant.empty;
		}
		if(ProjectDefined.GetInstance().gameFeedback.QQ)
		{
			this.QQ.text=ProjectDefined.GetInstance().gameFeedback.QQ;
		}
		else if(!ProjectDefined.GetInstance().gameFeedback.QQ)
		{
 			this.QQ.text=StringConstant.empty;
		}
		if(ProjectDefined.GetInstance().gameFeedback.customerService)
		{
			this.customerService.text=ProjectDefined.GetInstance().gameFeedback.customerService;
		}
		else if(!ProjectDefined.GetInstance().gameFeedback.customerService)
		{
 			this.customerService.text=StringConstant.empty;
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		this.bgSoundTog.selected = SoundManager.bgEnabled;
		this.soundEffectTog.selected = SoundManager.effectEnabled;
		this.shakeTog.selected = GameSetting.shakeEnabled;
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.bgSoundTog.addEventListener(egret.Event.CHANGE, this.closeBgSoundHandler, this);
		this.soundEffectTog.addEventListener(egret.Event.CHANGE, this.closeSoundEffectHandler, this);
		this.reLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reLoginClickHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.bgSoundTog.removeEventListener(egret.Event.CHANGE, this.closeBgSoundHandler, this);
		this.soundEffectTog.removeEventListener(egret.Event.CHANGE, this.closeSoundEffectHandler, this);
		this.reLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reLoginClickHandler, this);
	}
	private closeBgSoundHandler(event: egret.Event){
        SoundManager.playEffect(Sex.Female, MusicAction.buttonClick);
		SoundManager.bgEnabled = this.bgSoundTog.selected;
	}
	private closeSoundEffectHandler(event: egret.Event){
		SoundManager.playEffect(Sex.Female, MusicAction.buttonClick);
		SoundManager.effectEnabled = this.soundEffectTog.selected;
		PrefsManager.setBoolean(PrefsManager.Sound_Effect_Enable, this.soundEffectTog.selected);
	}
	private reLoginClickHandler(event: egret.Event){
		ChannelManager.Logout();
	}
}