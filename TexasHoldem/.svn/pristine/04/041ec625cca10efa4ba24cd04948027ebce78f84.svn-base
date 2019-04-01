/**
 * 游戏场管理
 */
class PlayingFieldManager
{
    /**
     * 房间信息列表
    */
    public static roomList: Array<PlayingFieldRoomInfo>;
    /**
     * 进入房间的id；
    */
    public static roomId: string;
    /**
     *最大携带数据列表 
    */
    public static maxCarryList: Array<RoomDefinition>;
    /**
     * 选中最大携带的id
    */
    public static selectedId: number;
    /**
     * 选中的最大携带
    */
    public static selectedCarrayItem: eui.Image;

    /**
	 * 发送房间信息获取请求
	 */
    public static reqRoomListInfo(type: number)
    {
        SocketManager.call(Command.Req_RoomInfo_3002, { "type": type }, PlayingFieldManager.RoomListInfoResponse, null, this);
    }
    public static RoomListInfoResponse(result: SpRpcResult)
    {
        if (result.data)
        {
            let blindInfo: RoomDefinition = new RoomDefinition();
            ArrayUtil.Clear(PlayingFieldManager.roomList);
            for (let def of result.data["roomList"])
            {
                let info: PlayingFieldRoomInfo = new PlayingFieldRoomInfo();
                blindInfo = RoomDefined.GetInstance().getBlindInfoById(def.roomId);
                info.copyValueFrom(def);
                info["smallBlind"] = blindInfo.sBlind;
                info["bigBlind"] = blindInfo.bBlind;
                info["minBuy"] = blindInfo.sBuyin;
                info["maxBuy"] = blindInfo.bBuyin;
                info["tax"] = blindInfo.tax;
                info["maxPlayer"] = blindInfo.seat;
                info["type"] = blindInfo.type;
                if (!PlayingFieldManager.roomList)
                {
                    PlayingFieldManager.roomList = new Array<PlayingFieldRoomInfo>();
                }
                PlayingFieldManager.roomList.push(info);
            }
        }
        PlayingFieldManager.onGetRoomListEvent.dispatch();
    }
    /**
     * 发送创建私人房请求
    */
    public static reqCreatePersonalRoom(roomId: number, pwd: number, ante: number)
    {
        SocketManager.call(Command.Req_CreatePersonalRoom_3610, { roomId: roomId, pwd: pwd, ante: ante }, PlayingFieldManager.CreatePersonalRoomResponse,null,this);
    }
    public static CreatePersonalRoomResponse(result: SpRpcResult)
    {
        if (result.data)
        {
            UIManager.showFloatTips("创建私人房成功");  //todo 测试代码
        }
    }
    /**
	 * 请求房间列表事件
	 */
    public static onGetRoomListEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 直接关闭键盘事件
    */
    public static onCloseKeyboardEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 选中最大携带项事件广播
    */
    public static onSelectedMaxCarryEvent: DelegateDispatcher = new DelegateDispatcher();
}