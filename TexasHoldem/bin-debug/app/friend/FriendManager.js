var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 好友管理
*/
var FriendManager = (function () {
    function FriendManager() {
    }
    /**
     * 重置数据
    */
    FriendManager.reset = function () {
        FriendManager.isGiftLisFirstOpen = true;
        FriendManager.isRequestLisFirstOpen = true;
        ArrayUtil.Clear(FriendManager.friendList);
        ArrayUtil.Clear(FriendManager.requestFriendList);
        ArrayUtil.Clear(FriendManager.giftList);
        ArrayUtil.Clear(FriendManager.searchList);
    };
    FriendManager.addRecListener = function () {
        SocketManager.AddCommandListener(Command.Friend_Push_AddSuccess_2036, FriendManager.onAddFriendSuccessRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_BeDel_2035, FriendManager.onDelFriendSuccessRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_OnlineState_2064, FriendManager.onOnlineStateChangeRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_GiveGold_2037, FriendManager.onGiveGoldRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_RequestFriend_2038, FriendManager.onRequestFriendRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_Invite_2111, FriendManager.inviteMsgCallback, this);
    };
    /**
     * 初始化好友列表信息
     */
    FriendManager.Initialize = function (result) {
        FriendManager.reset();
        FriendManager.addRecListener();
        FriendManager.friendList = new Array();
        if (result.data["friendList"]) {
            FriendManager.friendList = result.data["friendList"];
        }
    };
    /**
     * 发送赠送好友金币请求
    */
    FriendManager.reqGiveFriendGold = function (id) {
        SocketManager.call(Command.Friend_GiveGold_3151, { roleId: id }, FriendManager.GiveFriendGoldResponse, null, this);
    };
    FriendManager.GiveFriendGoldResponse = function (result) {
        FriendManager.onGiveFriendGoldEvent.dispatch();
    };
    /**
     * 发送领取好友赠送的金币请求
    */
    FriendManager.reqReceiveGift = function (id) {
        var callback = function (result) {
            if (id == 0) {
                FriendManager.getGoldNum = ProjectDefined.giveOnceGoldNum * FriendManager.giftList.length;
                FriendManager.giftList = [];
            }
            else {
                for (var i = 0; i < FriendManager.giftList.length; i++) {
                    if (id == FriendManager.giftList[i].roleId) {
                        FriendManager.giftList.splice(i, 1);
                        FriendManager.getGoldNum = ProjectDefined.giveOnceGoldNum;
                        break;
                    }
                }
            }
            FriendManager.onReceiveGiftEvent.dispatch();
        };
        SocketManager.call(Command.Friend_ReceiveGift_3150, { roleId: id }, callback, null, this);
    };
    /**
    * 发送获取好友请求列表的请求
   */
    FriendManager.reqFriendRequest = function () {
        SocketManager.call(Command.Friend_RequestList_3157, null, FriendManager.FriendRequestResponse, null, this);
    };
    FriendManager.FriendRequestResponse = function (result) {
        if (result.data.Array) {
            if (!FriendManager.requestFriendList) {
                FriendManager.requestFriendList = new Array();
            }
            FriendManager.requestFriendList = result.data.Array;
        }
        FriendManager.onFriendRequestEvent.dispatch();
    };
    /**
     * 发送接受或拒绝好友请求的请求
    */
    FriendManager.reqReceiveFriendRequest = function (id, isReceive) {
        var callback = function (result) {
            if (isReceive) {
                AlertManager.showAlertByString("您已成功添加此好友。");
            }
            else {
                AlertManager.showAlertByString("您已拒绝此条好友申请。");
            }
            for (var i = 0; i < FriendManager.requestFriendList.length; i++) {
                if (FriendManager.requestFriendList[i].roleId == id) {
                    FriendManager.requestFriendList.splice(i, 1);
                    break;
                }
            }
            FriendManager.onReceiveFriendRequestEvent.dispatch();
        };
        var IsAccept = (isReceive == 1) ? true : false;
        SocketManager.call(Command.Friend_Receive_3154, { roleId: id, IsAccept: IsAccept }, callback, null, this);
    };
    /**
     * 发送查询好友的请求
    */
    FriendManager.reqSearchPlayer = function (text) {
        SocketManager.call(Command.Friend_SearchPlayer_3153, { Val: text }, FriendManager.SearchPlayerResponse, null, this);
    };
    FriendManager.SearchPlayerResponse = function (result) {
        if (result.data.Array) {
            if (!FriendManager.searchList) {
                FriendManager.searchList = new Array();
            }
            FriendManager.searchList = result.data.Array;
            FriendManager.onSearchPlayerEvent.dispatch();
        }
        else {
            AlertManager.showAlert("此用户名或者ID不存在");
        }
    };
    /**
     * 发送添加好友的请求
    */
    FriendManager.reqAddPlayer = function (id) {
        SocketManager.call(Command.Friend_AddPlayer_3152, { roleId: id }, FriendManager.AddPlayerResponse, null, this);
    };
    FriendManager.AddPlayerResponse = function (result) {
        FriendManager.onAddPlayerEvent.dispatch();
    };
    /**
     * 发送删除好友的请求
    */
    FriendManager.reqRemovePlayer = function (id) {
        var callback = function (result) {
            for (var i = 0; i < FriendManager.friendList.length; i++) {
                if (id == FriendManager.friendList[i].roleId) {
                    FriendManager.friendList.splice(i, 1);
                    break;
                }
            }
            UIManager.closePanel(UIModuleName.UserInfoPanel);
            FriendManager.onRemovePlayerEvent.dispatch();
        };
        SocketManager.call(Command.Friend_DelPlayer_3155, { roleId: id }, callback, null, this);
    };
    /**
     * 拉取用户信息返回
     */
    FriendManager.getUserInfoResult = function (result, flag) {
        if (flag == FriendUIType.FriendList) {
            if (!FriendManager.newFriendInfo) {
                FriendManager.newFriendInfo = new FriendInfo();
            }
            FriendManager.newFriendInfo.copyValueFrom(result.data);
            FriendManager.friendList.push(FriendManager.newFriendInfo);
            FriendManager.refreshUIFlag = FriendUIType.FriendList;
            FriendManager.onRefreshInfoEvent.dispatch();
        }
        else if (flag == FriendUIType.GiftList) {
            if (!FriendManager.newGiveGoldFriendIndo) {
                FriendManager.newGiveGoldFriendIndo = new BaseFriendInfo();
            }
            FriendManager.newGiveGoldFriendIndo.copyValueFromThis(result.data);
            FriendManager.giftList.push(FriendManager.newGiveGoldFriendIndo);
            FriendManager.refreshUIFlag = FriendUIType.GiftList;
            FriendManager.onRefreshInfoEvent.dispatch();
        }
    };
    /**********服务器推送通知的相应操作****************/
    /**
     * 对方同意好友添加请求的推送对应的操作
    */
    FriendManager.onAddFriendSuccessRec = function (result) {
        if (result.data['roleId']) {
            UserManager.reqGetOtherUserInfo(result.data['roleId'], FriendUIType.FriendList);
        }
    };
    /**
     * 被好友删除的推送对应的操作
    */
    FriendManager.onDelFriendSuccessRec = function (result) {
        if (result.data) {
            for (var i = 0; i < FriendManager.friendList.length; i++) {
                if (result.data["roleId"] == FriendManager.friendList[i].roleId) {
                    FriendManager.friendList.splice(i, 1);
                    FriendManager.refreshUIFlag = FriendUIType.FriendList;
                    FriendManager.onRefreshInfoEvent.dispatch();
                    break;
                }
            }
        }
    };
    /**
     * 好友在线状态改变推送对应的操作
    */
    FriendManager.onOnlineStateChangeRec = function (result) {
        if (result.data) {
            for (var i = 0; i < FriendManager.friendList.length; i++) {
                if (result.data["roleId"] == FriendManager.friendList[i].roleId) {
                    FriendManager.friendList[i].offlineTime = result.data["offlineTime"];
                    FriendManager.refreshUIFlag = FriendUIType.FriendList;
                    FriendManager.onRefreshInfoEvent.dispatch();
                    break;
                }
            }
        }
    };
    /**
     * 好友赠送金币推送对应的操作
    */
    FriendManager.onGiveGoldRec = function (result) {
        if (result.data["roleId"]) {
            UserManager.reqGetOtherUserInfo(result.data['roleId'], FriendUIType.GiftList);
        }
    };
    /**
     * 好友申请推送对应的操作
    */
    FriendManager.onRequestFriendRec = function (result) {
        if (result.data) {
            var info = new BaseFriendInfo();
            info.copyValueFrom(result.data);
            if (!FriendManager.requestFriendList) {
                FriendManager.requestFriendList = new Array();
            }
            for (var i = 0; i < FriendManager.requestFriendList.length; i++) {
                if (info["roleId"] == FriendManager.requestFriendList[i].roleId) {
                    return;
                }
            }
            FriendManager.requestFriendList.push(info);
            FriendManager.refreshUIFlag = FriendUIType.RequestList;
            FriendManager.onRefreshInfoEvent.dispatch();
        }
    };
    /**
     * 判断是不是好友
    */
    FriendManager.isFriend = function (id) {
        if (FriendManager.friendList && FriendManager.friendList.length > 0) {
            for (var _i = 0, _a = FriendManager.friendList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.roleId == id) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 查找好友
     */
    FriendManager.getFriendInfoById = function (id) {
        for (var _i = 0, _a = FriendManager.friendList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.roleId == id) {
                return info;
            }
        }
        return null;
    };
    /**
     * 打开好友邀请信息
    */
    FriendManager.inviteMsgCallback = function (result) {
        UIManager.showPanel(UIModuleName.FriendMsgPanel, FriendMsgType.RequireMsg);
        if (result.data) {
            FriendManager.InviteResult = result.data;
        }
    };
    /**
     *列表是否是第一次打开
    */
    FriendManager.isGiftLisFirstOpen = true;
    FriendManager.isRequestLisFirstOpen = true;
    /**
     * 赠送好友金币成功广播
    */
    FriendManager.onGiveFriendGoldEvent = new DelegateDispatcher();
    /**
     * 领取好友赠送的礼物成功广播
    */
    FriendManager.onReceiveGiftEvent = new DelegateDispatcher();
    /**
     * 获取好友请求列表成功广播
    */
    FriendManager.onFriendRequestEvent = new DelegateDispatcher();
    /**
     * 接受或拒绝好友请求成功广播
    */
    FriendManager.onReceiveFriendRequestEvent = new DelegateDispatcher();
    /**
     * 查询好友请求成功广播
    */
    FriendManager.onSearchPlayerEvent = new DelegateDispatcher();
    /**
     * 添加好友请求成功广播
    */
    FriendManager.onAddPlayerEvent = new DelegateDispatcher();
    /**
     * 删除好友请求成功广播
    */
    FriendManager.onRemovePlayerEvent = new DelegateDispatcher();
    /**
     * 刷新UI的推送
    */
    FriendManager.onRefreshInfoEvent = new DelegateDispatcher();
    return FriendManager;
}());
__reflect(FriendManager.prototype, "FriendManager");
//# sourceMappingURL=FriendManager.js.map