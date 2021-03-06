/**
 * 邀请好友面板
 */
class InviteFriendPanel extends BackHomeAnimePanel
{
	public inviteFriendGroup: eui.Group;
	public inviteFriend_scroller: eui.Scroller;
	public inviteFriendList: eui.List;
	public _dp: eui.ArrayCollection;
	public inviteBtn: eui.Button;
	public checkAll: eui.CheckBox;
	public infoList: Array<InviteInfo>;

	public constructor()
	{
		super();
		this.skinName = UISkinName.InviteFriendPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		UIUtil.listRenderer(this.inviteFriendList, this.inviteFriend_scroller, InviteFriendListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.checkAll.selected=false;
		if (FriendManager.friendList)
		{
			this.infoList = new Array<InviteInfo>();
			for (let i: number = 0; i < FriendManager.friendList.length; i++)
			{
				let iInfo: InviteInfo = new InviteInfo();
				iInfo.friendInfo = FriendManager.friendList[i];
				this.infoList.push(iInfo);
			}
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		this.setFriendListInfo();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.checkAll.addEventListener(egret.Event.CHANGE, this.checkAllHandler, this)
		this.inviteFriendList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.checkBtnHandler, this);
		this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInviteHandler, this)
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.checkAll.removeEventListener(egret.Event.CHANGE, this.checkAllHandler, this)
		this.inviteFriendList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.checkBtnHandler, this);
		this.inviteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInviteHandler, this)
		this.infoList = null;
	}
	protected setFriendListInfo()
	{
		if (this.infoList)
		{
			this._dp = new eui.ArrayCollection(this.infoList);
			this.inviteFriendList.dataProvider = this._dp;
		}
	}
	public checkAllHandler()
	{
		if (this.infoList)
		{
			for (let i: number = 0; i < this.infoList.length; i++)
			{
				this.infoList[i].state = this.checkAll.selected;
				let item:InviteFriendListItemRenderer = this.getItem(this.infoList[i].friendInfo);
				if(item)
				{
					item.setChecked(this.checkAll.selected);
				}
			}
		}
	}
	private getItem(friendInfo: FriendInfo): InviteFriendListItemRenderer
	{
		for (let i = 0; i < this.inviteFriendList.numChildren; i++)
		{
			let inviteFriendListItem: InviteFriendListItemRenderer = this.inviteFriendList.getChildAt(i) as InviteFriendListItemRenderer;
			if (inviteFriendListItem.bindData.friendInfo == friendInfo)
			{
				return inviteFriendListItem;
			}
		}
		return null;
	}
	public checkBtnHandler(event: eui.ItemTapEvent)
	{
		let itemIndex = event.itemIndex;
		let inviteFriendListItem: InviteFriendListItemRenderer = this.inviteFriendList.getChildAt(itemIndex) as InviteFriendListItemRenderer;
		let state:boolean = !inviteFriendListItem.isCheckedBtn.selected;
		inviteFriendListItem.bindData.state = state;
		inviteFriendListItem.setChecked(state);
		if(!state)
		{
			this.checkAll.selected=state;
		}		
	}
	public sendInviteHandler()
	{
		let friendIdArray: Array<number> = new Array<number>();
		if (this.infoList)
		{
			for (let i = 0; i < this.infoList.length; i++)
			{
				if (this.infoList[i].state)
				{
					friendIdArray.push(FriendManager.friendList[i].roleId);
				}
			}
			if (friendIdArray.length > 0)
			{
				this.onCloseBtnClickHandler(null);
				AlertManager.showAlert("好友邀请已发送");				
				UIManager.showPanel(UIModuleName.FriendMsgPanel,FriendMsgType.InviteMsg);
				// let callback:Function = function()
				// {
				// 	AlertManager.showSingleAlert("好友邀请已发送");
				// 	UIManager.showPanel(UIModuleName.FriendMsgPanel,FriendMsgType.inviteMsg);					
				// }
				// SocketManager.Send(Command.Req_SendGameInvite_3608, { "Id": roomId, "roleId": friendIdArray},callback); 
			}
		}
	}
}

class InviteInfo
{
	public friendInfo: FriendInfo;
	public state: boolean;
}