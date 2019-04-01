/**
 * 邀请好友项列表
*/
class InviteFriendListItemRenderer extends BaseItemRenderer<InviteInfo>
{
     public headImg:eui.Image;//头像
     public nameLabel:eui.Label;//用户名；
     public isOnlinetoggleBtn:eui.ToggleButton;//是否在线
     public vipCountBtn:eui.Button;//钻石（元）；
     public isCheckedBtn:eui.CheckBox;

    public constructor(){
        super();
		this.skinName=UIRendererSkinName.InviteFriendItemRenderer;
    }
     protected createChildren()
	{
		this.dataChanged();
	}
	protected dataChanged(): void
	{
		super.dataChanged();

        if(this.bindData&&this.headImg!=null)
        {
            this.isCheckedBtn.selected=this.bindData.state;
            this.headImg.source=ImageSource.TestImg;
            this.nameLabel.text=this.bindData.friendInfo.name;
            if (this.bindData.friendInfo.offlineTime)
            {
                this.isOnlinetoggleBtn.selected = false;
            }
            else
            {
                this.isOnlinetoggleBtn.selected = true;
            }
        }
	}
    public setChecked(flag:boolean)
    {
        if(this.isCheckedBtn)
        {
            this.isCheckedBtn.selected = flag;
        }
    }
}