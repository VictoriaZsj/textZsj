class ChannelBase
{
	/// <summary>
	/// 初始化
	/// </summary>
	public Initialize()
	{

	}
	public Login(loginType: string, isAutoLogin: boolean)
	{

	}
	public PaySend(payId: number, orderId: string, price: number, shopName: string)
	{

	}
	public Logout()
	{

	}
	/**
	 * 检查支付订单
	 */
	public CheckPayOrder()
	{

	}
	/**
	 * 登录验证失败
	 */
	public loginValidateFail()
	{

	}
	/**
	 * 退出
	 */
	public Exit()
	{

	}
	/**
	 * 分享
	 */
	public share(data: string)
	{

	}
	/**
	 * 设置sdk扩展数据
	 */
	public SetExtData(data: string): void
	{

	}
	public SetChannelData(account:string, token:string):void
	{

	}
	public requestMicrophone(): void
	{

	}
	public recordAudio(code: string): void
	{

	}
	public hotUpdate(message: string): void
	{

	}
	public playComplete(guid: string)
	{
	}
	public setRecordData(guid: string, data: string)
	{

	}
	public checkAudioCachePath()
	{

	}
	public hasRecordData(guid: string)
	{

	}
	public playRecord(guid: string)
	{

	}
	//------------------------------------------------------------------
	// sdk回调执行方法
	//------------------------------------------------------------------

	/**
	 * 支付成功
	 */
	public sdkPaySucceed(data: string)
	{

	}
	/**
	 * 支付失败
	 */
	public sdkPayFailed()
	{

	}
}