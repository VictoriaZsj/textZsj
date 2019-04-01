
class ChannelUtil
{
	private static OrderLength: number = 6;//订单截取长度
	/// <summary>
	/// 订单是否是非法的
	/// </summary>
	/// <param name="orderId"></param>
	/// <returns></returns>
	public static IsOrderIlleg(orderId: string): boolean
	{
		if (!orderId)
		{
			return true;
		}
		let split: Array<string> = orderId.split('-');
		if (split.length != ChannelUtil.OrderLength)
		{
			return true;
		}
		return false;
	}
	/// <summary>
	/// 生成订单
	/// [QY账号ID]-[QY角色ID]-[角色所在服务器ID]-[商品ID(如果没有传0)]-[是否是测试，1是测试，0是正式]-[商品数量，默认1]
	/// </summary>
	/// <returns></returns>
	public static GenerateOrder(awardId: number, isTest: boolean): string
	{
		let t: string = isTest ? "1" : "0";
		let result: string = LoginManager.loginInfo.userid + "-" + UserManager.userInfo.roleId + "-" + UserManager.serverInfo.id + "-" + awardId + "-" + t + "-" + (DateTimeUtil.formatTimestamp(TimeManager.GetServerUtcTimestamp()).substring(4));
		if (result.length > 30)
		{
			result = result.substring(0, 30);//订单号不超过30个字符
		}
		return result;
	}

	/// <summary>
	/// 获取渠道类型+"_"+登录类型的完整标识
	/// </summary>
	/// <param name="channel"></param>
	/// <param name="loginType"></param>
	/// <returns></returns>
	public static GetLoginChannel(channel: string, loginType: string): string
	{
		if (!loginType)
		{
			return channel;
		}
		else
		{
			return StringUtil.format("{0}_{1}", channel, loginType);
		}
	}
}