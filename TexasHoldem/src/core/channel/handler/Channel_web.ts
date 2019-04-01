/**
 * web版
 */
class Channel_web extends ChannelBase
{
	public Initialize()
	{
		let data: any = {};
		data['channelType'] = ChannelType.qin;
		data['appName'] = window.document.title;
		data['deviceId'] = '';
		data['bundleId'] = '';
		data['hasWeixin'] = '0';
		data['hasMicrophone'] = '0';
		ChannelManager.sdkInitComplete(JSON.stringify(data));
	}
	public Login(loginType: string, isAutoLogin: boolean)
	{
		if (loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount)
		{
			let account: string = PrefsManager.getValue(PrefsManager.Login_Account);
			let password: string = PrefsManager.getValue(PrefsManager.Login_Password);
			if (isAutoLogin && account && password)
			{
				ChannelManager.DispatchAccountLoginSucceed(account, password);
			}
			else
			{
				if (!UIManager.isShowPanel(UIModuleName.LoginLocalPanel))
				{
					UIManager.showPanel(UIModuleName.LoginLocalPanel);
				}
			}
		}
		else if (loginType == ChannelLoginType.Normal)
		{
			// if (UIManager.IsShowModule(UIModuleName.TokenPanel) == false)
			// {
			// 	UIManager.ShowModuleToRoot(UIModuleName.TokenPanel);
			// }
		}
		else
		{
			UIManager.showFloatTips("登录类型错误");
			ChannelManager.sdkLoginFailed();
		}
	}
	public Logout()
	{
		ChannelManager.sdkLogout();
	}
	public PaySend(serverId: number, orderId: string, rewardNum: number, shopName: string)
	{
		let tempshopName:string = shopName
		let callback:Function=function()
		{
			AwardManager.OnExchanged.removeListener(callback, this);		
			ChannelManager.sdkPaySucceed(StringConstant.empty);
			let goSavePanel:Function=function()
			{
				UIManager.showPanel(UIModuleName.SafeBoxPanel);
			}
			let awardId=parseInt(tempshopName)
			if(PayDefined.GetInstance().getDefinitionbyAwardId(awardId).type==ListType.Vip)//如果购买的是VIP
			{
				if(!UserManager.userInfo.isSafePwd)
				{
				AlertManager.showAlert("您开通了VIP，保险箱以为您免费开放，请尽快设定您的保险箱密码!",goSavePanel)
				}
			}
			ShoppingManager.buyOverAction.dispatch();//协议发送后抛出买完事件
		}
		if (ChannelManager.loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount)
		{	
			AwardManager.OnExchanged.addListener(callback,this)
			let shopNameId:number=parseInt(shopName);	
			AwardManager.Exchange(shopNameId);		
		}
		else
		{
			UIManager.showFloatTips("不能支付");
		}
	}
	public hotUpdate(): void
	{
		ChannelManager.sdkHotUpdateComplete();
	}
}
