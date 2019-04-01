/// <summary>
/// 和游戏服务器通信的socket连接
/// </summary>
class SocketManager
{
	private static ResetRoleInfoErrorCode: number = 201;//重新获取角色数据错误码
	private static HeartbeatInterval: number = 60000;//心跳包发送间隔时间，60秒
	private static _ignoreError: Array<number>;
	/// <summary>
	/// 添加忽略错误码处理
	/// </summary>
	/// <param name="error"></param>
	public static AddIgnoreError(error: number)
	{
		if (!SocketManager._ignoreError)
		{
			SocketManager._ignoreError = new Array<number>();
		}
		if (SocketManager._ignoreError.indexOf(error) == -1)
		{
			SocketManager._ignoreError.push(error);
		}
	}
	/// <summary>
	/// 移除忽略错误码处理
	/// </summary>
	/// <param name="error"></param>
	public static RemoveIgnoreError(error: number)
	{
		ArrayUtil.RemoveItem(error, SocketManager._ignoreError)
	}

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	/// <summary>
	/// 是否是正在进入游戏中，不需要重连，提示错误后特殊处理
	/// </summary>
	public static isEntering: boolean = false;
	//
	private static _socket: GameSocket;
	private static _lastTimestamp: number;//服务器最后回包时间
	private static _heartbeatTime: number;//心跳时间
	private static _isReconnecting: boolean = false;//是否是重连中
	private static _autoReconnect: boolean = false;//是自动重连
	private static _delayId: number = undefined;

	public static Initialize(userId: number, roleId: number, serverId: number, secret: string, session: number, c2s: ArrayBuffer, s2c: ArrayBuffer, msgType: string = egret.WebSocket.TYPE_BINARY)
	{
		SocketManager._isReconnecting = false;
		if (!SocketManager._socket)
		{
			SocketManager._socket = new GameSocket();
			SocketManager._socket.addNormalError(SocketManager.ResetRoleInfoErrorCode);
			SocketManager._socket.initialize(userId, roleId, serverId, secret, session, c2s, s2c, msgType);
			SocketManager._socket.AddMessageListener(SocketManager.OnMessage, this);
		}
	}
	/// <summary>
	/// 角色id(是在握手包返回的，从这里取)
	/// </summary>
	public static get roleId(): number
	{
		return SocketManager._socket.roleId;
	}
	/**
 * 获取服务器推送的最大session
 */
	public static get requestSessionMax(): number
	{
		return SocketManager._socket.requestSessionMax;
	}
	public static Dispose()
	{
		if (SocketManager._socket)
		{
			egret.clearTimeout(SocketManager._delayId);
			SocketManager._socket.RemoveMessageListener(SocketManager.OnMessage, this);
			SocketManager.StopHeartbeat();
			SocketManager.RemoveAllListener();
			SocketManager._socket.dispose();
			SocketManager._socket = null;
		}
	}
	/// <summary>
	/// 关闭连接
	/// </summary>
	/// <param name="enabledSend"></param>
	public static Close(enabledSend: boolean = false, stopHeartbeat: boolean = true)
	{
		if (SocketManager._socket)
		{
			egret.clearTimeout(SocketManager._delayId);
			if (stopHeartbeat)
			{
				SocketManager.StopHeartbeat();
			}
			SocketManager.RemoveAllListener();
			SocketManager._socket.close(enabledSend);
		}
	}

	/// <summary>
	/// 连接服务器
	/// </summary>
	/// <param name="ip"></param>
	/// <param name="port"></param>
	/// <param name="isShowLoading"></param>
	public static Connect(address: string, port: number, isShowLoading: boolean = true)
	{
		if (SocketManager._socket == null)
		{
			throw new Error("socket no initialize");
		}
		if (isShowLoading)
		{
			UIManager.showPanel(UIModuleName.LoadingPanel);
		}
		SocketManager.AddAllListener();
		SocketManager._socket.Connect(address, port);
	}
	/// <summary>
	/// 重连，必须先Close才可以重连
	/// </summary>
	public static Reconnect()
	{
		if (SocketManager.VerifyReLogin())
		{
			AlertManager.showAlertObj({ confirmLabel: "登录失效", message: "登录验证失效，请重新登录游戏！", OnConfirm: SocketManager.OnClickReconnect });
		}
		else
		{
			SocketManager._isReconnecting = true;
			SocketManager.Connect(SocketManager._socket.address, SocketManager._socket.port);
		}
	}
	private static AddAllListener()
	{
		SocketManager._socket.AddResultListener(SocketManager.OnResult, this);
		UIManager.addEventListener(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout, SocketManager.OnLoadingTimeout, this);
	}
	private static RemoveAllListener()
	{
		UIManager.removeEventListener(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout, SocketManager.OnLoadingTimeout, this);
		SocketManager._socket.RemoveResultListener(SocketManager.OnResult, this);
	}
	private static OnLoadingTimeout()
	{
		SocketManager.Close();
		AlertManager.showAlertObj({ confirmLabel: "网络超时", message: "网络连接超时，请检查您的网络是否正常并重试！", OnConfirm: SocketManager.OnClickReconnect });
	}

	//------------------------------------------------------------------
	// Send 可重复连续发送
	//------------------------------------------------------------------

	/**
	 * 同步发送
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 */
	public static Send(cmdId: string, args: any = null)
	{
		SocketManager.InvokeSend(false, false, cmdId, args, true);
	}
	/**
	 * 同步发送，断线重连后会重发失败的数据
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 */
	public static SendDiscRetry(cmdId: string, args: any = null)
	{
		SocketManager.InvokeSend(false, true, cmdId, args, true);
	}
	/**
	 * 同步隐式发送，不显示loading，不影响交互事件
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 */
	public static ImplSend(cmdId: string, args: any = null)
	{
		SocketManager.InvokeSend(false, false, cmdId, args, false);
	}
	/**
	 * 同步隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 */
	public static ImplSendDiscRetry(cmdId: string, args: any = null)
	{
		SocketManager.InvokeSend(false, true, cmdId, args, false);
	}

	//------------------------------------------------------------------
	// Send 不可重复连续发送
	//------------------------------------------------------------------

	/**
	 * 独占发送
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 */
	public static SendAsync(cmdId: string, args: any = null)
	{
		SocketManager.InvokeSend(true, false, cmdId, args, true);
	}
	/**
	 * 独占发送，断线重连后会重发失败的数据
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 */
	public static SendAsyncDiscRetry(cmdId: string, args: any = null)
	{
		SocketManager.InvokeSend(true, true, cmdId, args, true);
	}
	/**
	 * 独占隐式发送，不显示loading，不影响交互事件
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 */
	public static ImplSendAsync(cmdId: string, args: any = null)
	{
		SocketManager.InvokeSend(true, false, cmdId, args, false);
	}
	/**
	 * 独占隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 */
	public static ImplSendAsyncDiscRetry(cmdId: string, args: any = null)
	{
		SocketManager.InvokeSend(true, true, cmdId, args, false);
	}

	//------------------------------------------------------------------
	// Send 事件
	//------------------------------------------------------------------

	public static AddCommandListener(cmdId: string, listener: Function, thisObject: any)
	{
		if (SocketManager._socket != null && listener != null && cmdId)
		{
			SocketManager._socket.AddCommandListener(cmdId, listener, thisObject);
		}
		else
		{
			console.error("AddCommandListener:socket no initialize");
		}
	}
	public static RemoveCommandListener(cmdId: string, listener: Function, thisObject: any)
	{
		if (SocketManager._socket != null)
		{
			SocketManager._socket.RemoveCommandListener(cmdId, listener, thisObject);
		}
	}
	public static AddErrorListener(cmdId: string, listener: Function, thisObject: any)
	{
		if (SocketManager._socket != null)
		{
			SocketManager._socket.AddErrorListener(cmdId, listener, thisObject);
		}
		else
		{
			console.error("AddCommandListener:socket no initialize");
		}
	}
	public static RemoveErrorListener(cmdId: string, listener: Function, thisObject: any)
	{
		if (SocketManager._socket != null)
		{
			SocketManager._socket.RemoveErrorListener(cmdId, listener, thisObject);
		}
	}

	//------------------------------------------------------------------
	// Call 可重复连续发送
	//------------------------------------------------------------------

	/**
	 * 同步发送
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 * 回调执行后会自动移除
	 */
	public static call(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
	{
		SocketManager.InvokeSend(false, false, cmdId, args, true, onResult, onError, thisObject);
	}
	/**
	 * 同步发送，断线重连后会重发失败的数据
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 * 回调执行后会自动移除
	 */
	public static callDiscRetry(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
	{
		SocketManager.InvokeSend(false, true, cmdId, args, true, onResult, onError, thisObject);
	}
	/**
	 * 同步隐式发送，不显示loading，不影响交互事件
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 * 回调执行后会自动移除
	 */
	public static ImplCall(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
	{
		SocketManager.InvokeSend(false, false, cmdId, args, false, onResult, onError, thisObject);
	}
	/**
	 * 同步隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
	 * 发送多少次，就返回多少次（用于代码执行的、需要多次连续发送的）
	 * 回调执行后会自动移除
	 */
	public static ImplCallDiscRetry(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
	{
		SocketManager.InvokeSend(false, true, cmdId, args, false, onResult, onError, thisObject);
	}

	/**
	 * 移除发送回调
	 */
	public static RemoveCall(cmdId: string, onResult: Function, thisObject: any)
	{
		if (SocketManager._socket != null)
		{
			SocketManager._socket.RemoveCall(cmdId, onResult, thisObject);
		}
	}

	//------------------------------------------------------------------
	// Call 不可重复连续发送
	//------------------------------------------------------------------

	/**
	 * 独占发送
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 * 回调执行后会自动移除
	 */
	public static callAsync(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
	{
		SocketManager.InvokeSend(true, false, cmdId, args, true, onResult, onError, thisObject);
	}
	/**
	 * 独占发送，断线重连后会重发失败的数据
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 * 回调执行后会自动移除
	 */
	public static callAsyncDiscRetry(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
	{
		SocketManager.InvokeSend(true, true, cmdId, args, true, onResult, onError, thisObject);
	}
	/**
	 * 独占隐式发送，不显示loading，不影响交互事件
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 * 回调执行后会自动移除
	 */
	public static ImplCallAsync(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
	{
		SocketManager.InvokeSend(true, false, cmdId, args, false, onResult, onError, thisObject);
	}
	/**
	 * 独占隐式发送，不显示loading，不影响交互事件,断线重连后会重发失败的数据
	 * 在与服务器通信的一个来回内，如果连续多次发送，会过滤掉第一条之后的发送(用于用户操作的、不能连续多次发送的)
	 * 回调执行后会自动移除
	 */
	public static ImplCallAsyncDiscRetry(cmdId: string, args: any = null, onResult: Function, onError: Function, thisObject: any)
	{
		SocketManager.InvokeSend(true, true, cmdId, args, false, onResult, onError, thisObject);
	}

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	private static InvokeSend(isSole: boolean, isDiscRetry: boolean, cmdId: string, args: any = null, isShowLoading: boolean, onResult?: Function, onError?: Function, thisObject?: any)
	{
		if (SocketManager._socket && SocketManager._socket.enabledSend)
		{
			if (isShowLoading)
			{
				UIManager.showPanel(UIModuleName.LoadingPanel);
			}
		}
		else
		{
			console.log("禁止发送:" + cmdId);
		}
		SocketManager._socket.InvokeSend(isSole, isDiscRetry, cmdId, args, onResult, onError, thisObject);
	}

	/// <summary>
	/// 服务器返回错误码事件，全局的
	/// </summary>
	public static OnResultError: DelegateDispatcher = new DelegateDispatcher();
	/// <summary>
	/// 进入游戏错误
	/// </summary>
	public static OnEnterError: DelegateDispatcher = new DelegateDispatcher();
	/// <summary>
	/// socket连接成功
	/// </summary>
	public static OnConnect: DelegateDispatcher = new DelegateDispatcher();

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	private static OnResult(result: SpRpcResult)
	{
		SocketManager._lastTimestamp = TimeManager.GetServerUtcTimestamp();
		if (result.op == SpRpcOp.Response)
		{
			//客户端请求的返回
			SocketManager._heartbeatTime = egret.getTimer();;
			UIManager.closePanel(UIModuleName.LoadingPanel);
			if (result.error != 0)
			{
				if (result.error == SocketManager.ResetRoleInfoErrorCode)
				{
					//当发送给服务器成功，在服务器返回之前断线，然后重连请求一样的session时候，重新拉数据
					GameManager.initServerHandler.AfreshGetInfo();
				}
				else
				{
					if (!SocketManager._ignoreError || SocketManager._ignoreError.indexOf(result.error) == -1)
					{
						if (SocketManager.isEntering)
						{
							NetUtil.AlertResultError(result, SocketManager.OnClickEnterError);
						}
						else
						{
							NetUtil.AlertResultError(result);
							SocketManager.OnResultError.dispatch(result.error);
						}
					}
				}
			}
		}
		else
		{
			//服务器主动通知返回
			//
			//如果在别的地方登录，就不提示服务器断开连接的错误提示了
			if (result.cmdId == Command.System_Response_Login_2013)
			{
				UIManager.closePanel(UIModuleName.LoadingPanel);
				SocketManager.Close();
				AlertManager.showAlertObj({ title: "提示", message: "该账号在其它地方登录，确定回到登录界面。", OnConfirm: SocketManager.OnClickReLogin });
			}
		}
	}
	private static OnMessage(msg: SocketMessage)
	{
		NetUtil.Log(msg);
		switch (msg.type)
		{
			case SocketMessageType.Connect:
				UIManager.closePanel(UIModuleName.LoadingPanel);
				console.log("游戏服务器连接成功");
				SocketManager._autoReconnect = true;
				SocketManager._socket.InvokeDiscRetry();
				if (SocketManager._isReconnecting)
				{
					SocketManager._isReconnecting = false;
					SocketManager._socket.SimpleSend(Command.System_GetNotice_3004, { sessionId: SocketManager._socket.requestSessionMax });
				}
				SocketManager.StartHeartbeat();
				SocketManager.OnConnect.dispatch();
				break;
			case SocketMessageType.Failing: //连接断开
				UIManager.closePanel(UIModuleName.LoadingPanel);
				SocketManager.Close();
				NetUtil.AlertFailing(msg.errorCode, SocketManager.OnClickReLogin);
				break;
			case SocketMessageType.NetworkError: //网络异常
				UIManager.closePanel(UIModuleName.LoadingPanel);
				if (SocketManager.VerifyReLogin())
				{
					SocketManager.Close();
					NetUtil.AlertNetworkErrorReLogin(msg.errorCode, SocketManager.OnClickReLogin);
				}
				else
				{
					if (SocketManager.isEntering)
					{
						SocketManager.Close();
						NetUtil.AlertConnectError(msg.errorCode, SocketManager.OnClickReconnect);
					}
					else
					{
						SocketManager.Close();
						//每次连接成功后，都可以断线自动重连一次
						if (SocketManager._autoReconnect)
						{
							SocketManager._delayId = egret.setTimeout(SocketManager.delayAutoReconnect, this, 2000);
						}
						else
						{
							if (msg.type == SocketMessageType.NetworkError)
							{
								NetUtil.AlertConnectError(msg.errorCode, SocketManager.OnClickReconnect);
							}
							else if (msg.type == SocketMessageType.Failing)
							{
								NetUtil.AlertConnectError(msg.errorCode, SocketManager.OnClickReconnect, "连接失败", "登录验证失效或服务器主动断开连接！");
							}
						}
					}
				}
				break;
			case SocketMessageType.HandshakeError:
				UIManager.closePanel(UIModuleName.LoadingPanel);
				SocketManager.Close();
				NetUtil.AlertNetworkErrorReLogin(msg.errorCode, SocketManager.OnClickReLogin);
				break;
		}
	}

	//------------------------------------------------------------------
	// 
	//------------------------------------------------------------------

	private static delayAutoReconnect()
	{
		SocketManager._autoReconnect = false;
		SocketManager.Reconnect();
	}
	/// <summary>
	/// 验证是否需要重新登录
	/// </summary>
	/// <returns></returns>
	private static VerifyReLogin(): boolean
	{
		if (TimeManager.GetServerUtcTimestamp() - SocketManager._lastTimestamp < 270)//4分30秒
		{
			return false;
		}
		if (TimeManager.GetCurrentOnlineLength() < 1500)//25分钟
		{
			return false;
		}
		return true;
	}
	private static OnClickReLogin(data: any)
	{
		if (SocketManager.isEntering)
		{
			SocketManager.OnEnterError.dispatch();
		}
		else
		{
			GameManager.reLogin();
		}
	}
	private static OnClickReconnect(data: any)
	{
		if (SocketManager.isEntering)
		{
			SocketManager.OnEnterError.dispatch();
		}
		else
		{
			SocketManager.Reconnect();
		}
	}
	private static OnClickEnterError(data: any)
	{
		SocketManager.OnEnterError.dispatch();
	}

	//------------------------------------------------------------------
	// 心跳
	//------------------------------------------------------------------

	private static StartHeartbeat()
	{
		SocketManager._heartbeatTime = egret.getTimer();
		Tick.AddSecondsInvoke(SocketManager.OnTickHeartbeat, this);
	}
	private static StopHeartbeat()
	{
		Tick.RemoveSecondsInvoke(SocketManager.OnTickHeartbeat, this);
	}
	private static OnTickHeartbeat(delta: number)
	{
		if (egret.getTimer() - SocketManager._heartbeatTime >= SocketManager.HeartbeatInterval)
		{
			SocketManager._heartbeatTime = egret.getTimer();
 			SocketManager._socket.SimpleCall(Command.System_Heartbeat_3016, { sessionId: SocketManager._socket.requestSessionMax }, SocketManager.OnHeartbeatServer, null, this);
		}
	}
	private static OnHeartbeatServer(result: SpRpcResult)
	{
		TimeManager.SetServerTimestamp(result.data);
	}
}