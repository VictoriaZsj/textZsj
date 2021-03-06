/**
 * 成就renderer
 */
class AchievementItemRenderer extends BaseItemRenderer<AchievementInfo>
{
	public itemImg: eui.Image;
	public textLabel: eui.Label;
	public achieveMask: eui.Image;
	public achieveGroup: eui.Group;

	public constructor()
	{
		super();
		this.skinName = UIRendererSkinName.AchievementItemRenderer;
	}
	protected createChildren()
	{
		this.dataChanged();
	}
	protected dataChanged()
	{
		super.dataChanged();
		if (this.bindData)
		{
			this.itemImg.source = this.bindData.definition.icon;
			this.textLabel.text = MathUtil.formatNum(this.bindData.definition.para1);
			this.refreshiUI();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
	}

	private refreshiUI()
	{
		let userInfo: UserInfo;
		if (UserManager.otherUserInfo == null || UserManager.otherUserInfo.roleId == UserManager.userInfo.roleId)
		{
			userInfo = UserManager.userInfo;
		}
		else
		{
			userInfo = UserManager.otherUserInfo;
		}
		this.achieveGroup.visible = true;
		if (this.bindData.isComplete)
		{
			this.achieveMask.visible = false;
		}
		else if (this.bindData.definition.preId == 0)
		{
			this.achieveMask.visible = true;
		}
		else if (AchievementManager.getAchieveInfoById(userInfo.allAchieveList, this.bindData.definition.preId).isComplete)
		{
			this.achieveMask.visible = true;
		}
		else
		{
			this.achieveGroup.visible = false;
		}
	}

	private info: AchievementInfo;
	public init(info: AchievementInfo)
	{
		this.info = info;
		this.itemImg.source = info.definition.icon;
		this.textLabel.text = MathUtil.formatNum(info.definition.para1);
		this.achieveGroup.visible = true;
		this.achieveMask.visible = false;
	}
	private onClick(event: egret.TouchEvent)
	{
		UIManager.showPanel(UIModuleName.AchievementItemPanel, this.bindData);
	}
	public onDisable(event: egret.Event)
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

}