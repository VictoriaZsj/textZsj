/**
 * 好友消息面板
 */
class FriendMsgPanel extends BasePanel
{
	public inviteMsgGp:eui.Group;
	public requireMsgGp:eui.Group;
	public inviteMsg_bg:eui.Image;
	public requireMsg_bg:eui.Image;

	public constructor()
	{
		super();
		this.setGrayMask(false);
		this.skinName = UISkinName.FriendMsgPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}
	public init(appendData: any)
	{		
		super.init(appendData);		
		if(appendData==FriendMsgType.InviteMsg)
		{
			this.inviteMsgGp.visible=true;
			this.requireMsgGp.visible=false;			
		}
		else if(appendData==FriendMsgType.RequireMsg)
		{
			this.requireMsgGp.visible=true;	
			this.inviteMsgGp.visible=false;
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkMsg, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkMsg, this);
	}
	protected checkMsg(event: egret.TouchEvent)
	{
		switch (event.target)
		{
			case this.inviteMsg_bg:
			UIManager.showPanel(UIModuleName.InviteMsgPanel);
			case this.requireMsg_bg:
			UIManager.showPanel(UIModuleName.InviteMsgPanel);
		}
				this.onCloseBtnClickHandler(null);

		
		
	}
}

enum FriendMsgType
{
	/**
	 * 请求加好友信息
	*/
    RequireMsg=1,
	/**
	 * 邀请好友信息
	*/
	InviteMsg=2

}
 