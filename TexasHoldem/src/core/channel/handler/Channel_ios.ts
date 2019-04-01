class Channel_ios extends ChannelBase
{
	public Initialize()
	{
		egret.ExternalInterface.call(ExtFuncName.Initialize, '');
	}
	public Login(loginType: string, isAutoLogin: boolean)
	{
		egret.ExternalInterface.call(ExtFuncName.Login, loginType);
	}
	public Logout()
	{
		egret.ExternalInterface.call(ExtFuncName.Logout, '');
	}
	public PaySend(serverId: number, orderId: string, price: number, shopName: string)
	{
		let data: any = { "serverId": serverId, "orderId": orderId, "price": price, "name": shopName };
		egret.ExternalInterface.call(ExtFuncName.Pay, JSON.stringify(data));
	}
	public SetExtData(data: string): void
	{
		egret.ExternalInterface.call(ExtFuncName.SetExtData, data);
	}
	public SetChannelData(account:string, token:string):void
	{
		egret.ExternalInterface.call(ExtFuncName.SetChannelData, JSON.stringify({account:account, token:token}));
	}
	public share(data: string)
	{
		egret.ExternalInterface.call(ExtFuncName.Share, data);
	}
	public requestMicrophone(): void
	{
		egret.ExternalInterface.call(ExtFuncName.RequestMicrophone, '');
	}
	public recordAudio(code: string): void
	{
		egret.ExternalInterface.call(ExtFuncName.RecordAudio, code);
	}
	public hotUpdate(message: string): void
	{
		egret.ExternalInterface.call(ExtFuncName.HotUpdate, message);
	}
	public setRecordData(guid: string, data: string)
	{
		let json: any = { "guid": guid, "data": data};
		egret.ExternalInterface.call(ExtFuncName.SetRecordData, JSON.stringify(json));
	}
	public checkAudioCachePath()
	{
		egret.ExternalInterface.call(ExtFuncName.CheckAudioCachePath, StringConstant.empty);
	}
	public hasRecordData(guid: string)
	{
		egret.ExternalInterface.call(ExtFuncName.HasRecordData, guid);
	}
	public playRecord(guid: string)
	{
		egret.ExternalInterface.call(ExtFuncName.PlayRecord, guid);
	}
	public loginValidateFail()
	{
		egret.ExternalInterface.call(ExtFuncName.LoginValidateFail, "");
	}
}
