var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏场管理
 */
var PlayingFieldManager = (function () {
    function PlayingFieldManager() {
    }
    /**
     * 发送房间信息获取请求
     */
    PlayingFieldManager.reqRoomListInfo = function (type) {
        SocketManager.call(Command.Req_RoomInfo_3002, { "type": type }, PlayingFieldManager.RoomListInfoResponse, null, this);
    };
    PlayingFieldManager.RoomListInfoResponse = function (result) {
        if (result.data) {
            var blindInfo = new RoomDefinition();
            ArrayUtil.Clear(PlayingFieldManager.roomList);
            for (var _i = 0, _a = result.data["roomList"]; _i < _a.length; _i++) {
                var def = _a[_i];
                var info = new PlayingFieldRoomInfo();
                blindInfo = RoomDefined.GetInstance().getBlindInfoById(def.roomId);
                info.copyValueFrom(def);
                info["smallBlind"] = blindInfo.sBlind;
                info["bigBlind"] = blindInfo.bBlind;
                info["minBuy"] = blindInfo.sBuyin;
                info["maxBuy"] = blindInfo.bBuyin;
                info["tax"] = blindInfo.tax;
                info["maxPlayer"] = blindInfo.seat;
                info["type"] = blindInfo.type;
                if (!PlayingFieldManager.roomList) {
                    PlayingFieldManager.roomList = new Array();
                }
                PlayingFieldManager.roomList.push(info);
            }
        }
        PlayingFieldManager.onGetRoomListEvent.dispatch();
    };
    /**
     * 发送创建私人房请求
    */
    PlayingFieldManager.reqCreatePersonalRoom = function (roomId, pwd, ante) {
        SocketManager.call(Command.Req_CreatePersonalRoom_3610, { roomId: roomId, pwd: pwd, ante: ante }, PlayingFieldManager.CreatePersonalRoomResponse, null, this);
    };
    PlayingFieldManager.CreatePersonalRoomResponse = function (result) {
        if (result.data) {
            UIManager.showFloatTips("创建私人房成功"); //todo 测试代码
        }
    };
    /**
     * 请求房间列表事件
     */
    PlayingFieldManager.onGetRoomListEvent = new DelegateDispatcher();
    /**
     * 直接关闭键盘事件
    */
    PlayingFieldManager.onCloseKeyboardEvent = new DelegateDispatcher();
    /**
     * 选中最大携带项事件广播
    */
    PlayingFieldManager.onSelectedMaxCarryEvent = new DelegateDispatcher();
    return PlayingFieldManager;
}());
__reflect(PlayingFieldManager.prototype, "PlayingFieldManager");
//# sourceMappingURL=PlayingFieldManager.js.map