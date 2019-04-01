/**
 * 房间玩家信息
 */
class PlayerInfo extends BaseServerValueInfo
{
	/**
	 * 角色ID
	 */
	public roleId: number;
	/**
	 * 游戏时身上的筹码数
	 */
	public bankRoll: number;
	/**
	 * 位置
	 */
	public pos: number;
	private _state: PlayerState;
	/**
	 * 0.等待下一局 1.弃牌 2.过牌 3.加注 4.allin 5.跟注 6.盲注
	 */
	public get state(): PlayerState
	{
		if (GamblingManager.roomInfo && this.pos == GamblingManager.roomInfo.pos)
		{
			return PlayerState.Action;
		}
		return this._state;
	}
	public set state(value: PlayerState)
	{
		if (this._state != value)
		{
			this._state = value;
		}
	}
	/**
	 * 状态参数
	 */
	public num: number;
	/**
	 * 玩家信息
	 */
	public userInfo: UserInfo;
	/**
	 * 是否是刚刚坐下
	 */
	public isSitDown: boolean;
	/**
	 * 手牌列表
	 */
	public cardList: Array<Array<number>>;

	public reset()
	{
		this.roleId = 0;
		this.bankRoll = 0;
		this.pos = 0;
		this.state = PlayerState.WaitNext;
		this.isSitDown = false;
	}
	/**
	 * 获取状态描述
	 */
	public static getStateDes(state: PlayerState): string
	{
		switch (state)
		{
			case PlayerState.AllIn:
				return "AllIn";
			case PlayerState.Fold:
				return "弃牌";
			case PlayerState.Check:
				return "过牌";
			case PlayerState.Raise:
				return "加注";
			case PlayerState.Call:
				return "跟注";
			case PlayerState.Action:
				return "思考中";
			case PlayerState.BrightCard:
				return "亮牌";
			default:
				return StringConstant.empty;
		}
	}
}
/**
 * 玩家状态
 */
enum PlayerState
{
	/**
	 * 等待下一局
	 */
	WaitNext = 0,
	/**
	 * 弃牌
	 */
	Fold = 1,
	/**
	 * 过牌
	 */
	Check = 2,
	/**
	 * 加注
	 */
	Raise = 3,
	/**
	 * allin
	 */
	AllIn = 4,
	/**
	 * 跟注
	 */
	Call = 5,
	/**
	 * 盲注
	 */
	Blind = 6,
	/**
	 * 等待说话
	 */
	WaitAction = 7,
	/**
	 * 正在说话
	 */
	Action = 100,
	/**
	 * 亮牌
	 */
	BrightCard = 101,
	/**
	 * 空状态
	 */
	Empty = 104,
}