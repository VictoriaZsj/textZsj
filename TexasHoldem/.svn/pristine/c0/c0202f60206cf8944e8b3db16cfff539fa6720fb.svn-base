/**
 * 签到面板
 */
class SignInPanel extends BasePanel
{
    public signInList:eui.List;
    public signIn_dp:eui.ArrayCollection;
    public signIn_scroller:eui.Scroller;
	public threeDay:eui.Label;
	public fiveDay:eui.Label;
	public sevenDay:eui.Label;
	public signInBtn:eui.Button;
	public signImg1:eui.Image;
	public signImg2:eui.Image;
	public signImg3:eui.Image;
	public signImg4:eui.Image;
	public signImg5:eui.Image;
	public signImg6:eui.Image;
	public signImg7:eui.Image;
	public imgArray:Array<eui.Image>;

	public constructor()
	{
		super();
		this.skinName = UISkinName.SignInPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);

        if(!this.signIn_dp)
        {
            this.signIn_dp=new eui.ArrayCollection();
        }
		this.imgArray=new Array<eui.Image>();
		this.signImg1.visible=false;
		this.signImg2.visible=false;
		this.signImg3.visible=false;
		this.signImg4.visible=false;
		this.signImg5.visible=false;
		this.signImg6.visible=false;
		this.signImg7.visible=false;
		
		this.imgArray.push(this.signImg1);
		this.imgArray.push(this.signImg2);
		this.imgArray.push(this.signImg3);
		this.imgArray.push(this.signImg4);
		this.imgArray.push(this.signImg5);
		this.imgArray.push(this.signImg6);
		this.imgArray.push(this.signImg7);
        UIUtil.listRenderer(this.signInList, this.signIn_scroller, SignInGoldItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
	}

	public init(appendData: any)
	{
		super.init(appendData);	
		if(ActivityManager.signInHandler.isTodaySignIn)
		{
			this.signInBtn.touchEnabled=false;
			FilterUtil.setGray(this.signInBtn);
		}
		else if(!ActivityManager.signInHandler.isTodaySignIn)
		{
			this.signInBtn.touchEnabled=true;
			FilterUtil.setDefault(this.signInBtn);
		}
		this.refreshUI();
	}
	protected onRender(event: egret.Event)
	{ 
		super.onRender(event);
		this.signIn_dp=new eui.ArrayCollection(ActivityManager.signInHandler.signInList);
		this.signInList.dataProvider=this.signIn_dp;
		this.defLabel(SignInDay.signInThree);
		this.defLabel(SignInDay.signInFive);
        this.defLabel(SignInDay.signInSeven);	
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.signInBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this)
        UIUtil.hideScrollerBar(this.signIn_scroller);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.signInBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this)
	}	
	/**
	 * 点击签到
	*/
	public onClickHandler()
	{
		let callBack:Function=function(this)
		{		
			ActivityManager.signInHandler.isTodaySignIn
			this.signInBtn.touchEnabled=false;
  			ActivityManager.signInHandler.signInDayNum=ActivityManager.signInHandler.signInDayNum+1;		
			ActivityManager.signInHandler.lastTime=this.today.getTime();  
			this.refreshUI();	
		}
		let index=ActivityManager.signInHandler.signInDayNum-1;
		let signInGoldItemRenderer=this.signInList.getChildAt(index) as SignInGoldItemRenderer;
		let id=signInGoldItemRenderer.bindData.definition.id;
		let subId=signInGoldItemRenderer.bindData.definition.subId;
		PropertyManager.OpenGet();
		SocketManager.AddCommandListener(Command.Activity_GetPrize_3202, callBack, this);
		SocketManager.Send(Command.Activity_GetPrize_3202, { "Id": id,"subId":subId});
	}
	/**
	 * 相应奖励描述
	*/
	public defLabel(dayNum:SignInDay)
	{
		let awardDef=AwardDefined.GetInstance().getAwardDefinition(ActivityManager.signInHandler.signInList[dayNum].definition.pilePrize);
		for(let def of awardDef.rewardList)
		{
			if(dayNum==SignInDay.signInThree)
			{
				this.threeDay.text="金币x"+def.count.toString();
			}
			if(dayNum==SignInDay.signInFive)
			{
				this.fiveDay.text="金币x"+def.count.toString();
			}
			if(dayNum=SignInDay.signInSeven)
			{
				this.sevenDay.text="钻石x"+def.count.toString();

			}
		}	
	}
	/**
	 * 刷新签到天数UI
	*/
	protected refreshUI()
    {

        for(let i=0;i<ActivityManager.signInHandler.signInDayNum-1;i++)
		{
			let signInGoldItemRenderer=this.signInList.getChildAt(i) as SignInGoldItemRenderer;
			signInGoldItemRenderer.signInCheck.visible=true;			
			this.imgArray[i].visible=true;
		}
    }
}