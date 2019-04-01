/**
 * 用户头像信息
 */
class UserInfoComponent extends BaseComponent<PlayerInfo>
{
	public commonIcon: CommonIcon;
	public sexImg: eui.Image;
	public nameLabel: eui.Label;
	public idLabel: eui.Label;
	public constructor()
	{
		super();
		this.skinName = UIComponentSkinName.UserInfoComponent;
	}

	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}
	public init(data: PlayerInfo)
	{
		super.init(data);
	}
	
	protected rendererStart(event: egret.Event)
	{
		if (this.bindData.userInfo.name)
		{
			this.nameLabel.text = this.bindData.userInfo.name;
		}
		else
		{
			this.nameLabel.text = this.bindData.roleId.toString();
		}
		this.commonIcon.init(this.bindData);
		this.idLabel.text = this.bindData.roleId.toString();
		this.sexImg.source = UIUtil.getSexImgSource(this.bindData.userInfo.sex);
	}
}