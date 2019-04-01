/**
 * 用户信息
 */
class UserInfo extends BaseServerValueInfo
{

	public reset()
	{
		this._diamondNum = 0;
		this._goldNum = 0;
		this._saveGoldNum = 0;
		this.timestamp = 0;
		this.timezone = 0;
		this.roleId = 0;
		this.name = StringConstant.empty;
		this.head = ImageSource.Default_Head;
		this.sex = 0;
		this.level = 0;
		this.exp = 0;
		this.ip = StringConstant.empty;
		this.sign = StringConstant.empty;
		this.age = 0;
		//概况
		this.createdTime = TimeManager.Utc1970.getTime() / 1000;
		this.maxGold = 0;
		this.maxGoldOnetimes = 0;
		this.friendNum = 0;
		this.gameTimes = 0;
		this.winTimes = 0;
		this.maxHandList = undefined;
		this.maxHandName = StringConstant.empty;
		this.championTimes = 0;
		//收货信息
		this.addressName = StringConstant.empty;
		this.phoneNum = StringConstant.empty;
		this.qqNum = StringConstant.empty;
		this.eMail = StringConstant.empty;
		this.address = StringConstant.empty;
		//Vip信息
		this.vipType = 0;
		this.vipLevel = 0;
		this.vipExp = 0;
		this.vipSpeed = 0;
		this.vipTime = 0;
		this.yearVipTime = 0;
		//成就和任务信息
		this.allAchieveList = null;
	}
	/**
	 * 钻石数量
	 */
	private _diamondNum: number;
	public set diamond(value: number)
	{
		this._diamondNum = value;
	}
	public get diamond(): number
	{
		return this._diamondNum;
	}
	/**
	 * 金币数量
	 */
	private _goldNum: number;//todo 
	public set gold(value: number)
	{
		this._goldNum = value;
	}
	public get gold(): number
	{
		return this._goldNum;
	}
	/**
	 * 保险箱金币数量
	 */
	private _saveGoldNum: number;
	public set safeGold(value: number)
	{
		this._saveGoldNum = value;
	}
	public get safeGold(): number
	{
		return this._saveGoldNum;
	}
	/**
	 *保险箱是否设置过密码 
	*/
	public isSafePwd: boolean;
	/**
	 * 服务器时间戳
	 */
	public timestamp: number;
	/**
	 * 时区
	 */
	public timezone: number;
	/**
	 * 角色ID
	 */
	public roleId: number;
	/**
	 * 昵称
	 */
	public name: string;
	/**
	 * 头像
	 */
	public head: string;
	/**
	 * 性别
	 */
	public sex: Sex;
	/**
	 * 等级
	 */
	public level: number;
	/**
	 * 总经验值
	 */
	public exp: number;
	/**
	 * ip
	 */
	public ip: string;
	/**
	 * 个性签名
	 */
	public sign: string;
	/**
	 * 年龄
	 */
	public age: number;

	//用户概况

	/**
	 * 加入游戏时间
	 */
	public createdTime: number;
	/**
	 * 最高拥有金币
	 */
	public maxGold: number;
	/**
	 * 一把最高赢取金币
	 */
	public maxGoldOnetimes: number;
	/**
	 * 朋友数量
	 */
	public friendNum: number;
	/**
	 * 游戏局数
	 */
	public gameTimes: number;
	/**
	 * 胜利次数
	 */
	public winTimes: number;
	/**
	 * 最大手牌
	 */
	public maxHandList: Array<number>;
	public maxHandName: string;
	/**
	 * 夺冠次数
	 */
	public championTimes: number;

	//收货信息
	/**
	 * 收货姓名
	 */
	public addressName: string;
	/**
	 * 收货手机
	 */
	public phoneNum: string;
	/**
	 * 收货qq
	 */
	public qqNum: string;
	/**
	 * 收货邮箱
	 */
	public eMail: string;
	/**
	 * 收货地址
	 */
	public address: string;

	//Vip信息
	/**
	 * 会员类型
	 */
	public vipType: VipType;
	/**
	 * 会员等级
	 */
	public vipLevel: number;
	/**
	 * 会员成长值
	 */
	public vipExp: number;
	/**
	 * 成长速度
	 */
	public vipSpeed: number;
	/**
	 * 普通vip到期时间戳
	 */
	public vipTime: number;
	/**
	 * 年度vip到期时间戳
	 */
	public yearVipTime: number;

	//成就和任务信息
	public allAchieveList: Array<AchievementInfo>;
	/**
	 * 开服时间
	 */
	public openServerTime: number;

}
