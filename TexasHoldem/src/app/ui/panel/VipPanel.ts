/**
 * 会员面板
 */
class VipPanel extends BasePanel
{
	//标签组
	public myVipGroup: eui.Group;
	public vipIntroduceGroup: eui.Group;

	public tab: TabComponent;

	//我的Vip
	public userImg: eui.Image;//头像
	public userNameLabel: eui.Label;//用户名
	public vipLevelLabel: eui.Label;//用户vip等级
	public yearVipImg: eui.Image;//年度会员标识
	public buyVipButton: eui.Button;//续费会员 
	public vipProgressImg: eui.ProgressBar;//会员成长进度条
	public vipExpLabel: eui.Label;//会员成长值
	public currentVipLevel: eui.Label;//会员等级
	public vipSpeedLabel: eui.Label;//会员成长速度
	public buyYearVipLabel: eui.Label;//购买年会员
	public constructor()
	{
		super();
		this.skinName = UISkinName.VipPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.isCloseButtonTween = false;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		let array = new Array<eui.Group>(this.myVipGroup, this.vipIntroduceGroup);
		this.tab.init(array);
		this.tab.isTween = false;
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		this.userImg.source = UserManager.userInfo.head;
		this.userNameLabel.text = UserManager.userInfo.name;
		this.refreshVipInfo();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		VipManager.vipUpgradeEvent.addListener(this.refreshVipInfo, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		VipManager.vipUpgradeEvent.removeListener(this.refreshVipInfo, this);
	}

	private refreshVipInfo()
	{
		this.vipLevelLabel.text = "VIP" + UserManager.userInfo.vipLevel.toString();
		if (UserManager.userInfo.vipType == VipType.NoVip)
		{
			this.yearVipImg.visible = false;
		}
		else
		{
			this.yearVipImg.visible = true;
		}
		this.vipProgressImg.width = 1080;
		this.vipProgressImg.width *= UserManager.userInfo.vipExp / 6000;
		this.vipExpLabel.text = UserManager.userInfo.vipExp.toString() + "点";
		this.currentVipLevel.text = UserManager.userInfo.vipLevel.toString();
		this.vipSpeedLabel.text = UserManager.userInfo.vipSpeed + "点";

	}

	/**
	 * 点击面板按钮事件处理
	*/
	private clickHandler(event: egret.TouchEvent)
	{
		SoundManager.playButtonEffect(event.target);
		switch (event.target)
		{
			case this.buyVipButton:
			case this.buyYearVipLabel:
				UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShoppingGpIndex.Vip });
				break;
		}
	}
}