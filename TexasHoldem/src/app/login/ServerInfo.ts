
/// <summary>
/// 服务器信息
/// </summary>
class ServerInfo extends BaseServerValueInfo
{
	private _id: number;
	public get id()
	{
		return this._id;
	}
	public set id(value:number)
	{
		this._id = value;
	}
	// private ServerDefinition _definition;
	// public ServerDefinition definition
	// {

	// 		return _definition;
	// }
	/// <summary>
	/// 当前服务器人数
	/// </summary>
	private _count: number;
	/// <summary>
	/// 是否是拥挤
	/// </summary>
	public get isCrowded(): boolean
	{
		return this._count > ProjectDefined.GetInstance().getValue(ProjectDefined.serverCrowded);
	}
	public set count(value:number)
	{
		this._count = value;
	}
	private _isMaintain: boolean;
	/// <summary>
	/// 是否在维护
	/// </summary>
	public get isMaintain(): boolean
	{
		return this._isMaintain;
	}
	/// <summary>
	/// 当前服务器角色id，没有为0
	/// </summary>
	public roleId: number = 0;

	public reset()
	{

	}

	public static CreateFromProto(data: any, refarea: number): ServerInfo
	{
		let info: ServerInfo = new ServerInfo(data);
		let v: number = data["status"];
		if (v == 1)
		{
			info._isMaintain = true;
		}
		else
		{
			info._isMaintain = false;
		}
		// info._definition = ServerDefined.GetInstance().GetServerDefinition(info.id);
		// if (info._definition == null)
		// {
		// 	area++;
		// 	info._definition = new ServerDefinition();
		// 	info._definition.id = info.id;
		// 	info._definition.name = info.id.ToString();
		// 	info._definition.area = area;
		// 	info._definition.state = ServerState.Normal;
		// }
		return info;
	}
}
