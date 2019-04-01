var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 聊天管理
 */
var ChatManager = (function () {
    function ChatManager() {
    }
    ChatManager.initialzie = function () {
        if (!ChatManager.messageList) {
            ChatManager.messageList = new Array();
        }
        ArrayUtil.Clear(ChatManager.messageList);
        SocketManager.AddCommandListener(Command.Chat_PushMessage_2014, ChatManager.pushChatMessage, this);
    };
    ChatManager.pushChatMessage = function (result) {
        if (result.data) {
            var chatInfo = PoolUtil.GetObject(ChatInfo);
            chatInfo.roleId = result.data["roleId"];
            chatInfo.message = result.data["message"];
            chatInfo.type = result.data["type"];
            chatInfo.name = result.data["name"];
            if (chatInfo.type == ChatMessageType.Maquee) {
                ChatManager.messageList.push(chatInfo);
                // ChatManager.messageOper();
            }
            else {
                ChatManager.CheckAndPlay(chatInfo);
            }
            ChatManager.dispatchChatEvent();
        }
    };
    /**
     * 发送语音消息
     */
    ChatManager.SendAudioRecordMessage = function (type, time, guid, sign, path) {
        ChatManager.SendChatMessage(ChatSpecialStrings.AudioRecordMessage + time + StringConstant.Comma + guid + StringConstant.Comma + sign + StringConstant.Comma + path, type);
    };
    /**
     * 发送聊天消息
     */
    ChatManager.SendChatMessage = function (message, type) {
        var callback = function (result) {
            ChatManager.OnChatSendMessageFromServer(result, message, type);
        };
        SocketManager.call(Command.Chat_SendMessage_3019, { "message": message, "type": type }, callback, null, this);
    };
    ChatManager.OnChatSendMessageFromServer = function (result, message, type) {
        var info = ChatManager.CreateChatInfoByMyInfo(type, message);
        ChatManager.DispatchMessageSend(info);
    };
    /**
     * 检测播放列表
     */
    ChatManager.CheckAndPlay = function (info) {
        if (!ChatManager._checkList) {
            ChatManager._checkList = new Array();
        }
        if (ChatManager._checkList.indexOf(info) == -1) {
            ChatManager._checkList.push(info);
        }
        var guid = info.param[1];
        ChannelManager.hasRecordData(guid); //调到原生
    };
    /**
     * 原生检测完毕调回来
     */
    ChatManager.checkComplete = function (message) {
        var data = JSON.parse(message);
        if (data) {
            var guid = data["guid"];
            var result = StringUtil.toBoolean(data["has"]);
            var chatInfo = ChatManager.getRecordChatInfo(guid);
            if (chatInfo) {
                if (result) {
                    if (RecordAudioManager.playingGuid != guid) {
                        ChannelManager.playRecord(guid);
                        RecordAudioManager.PlayPauseAndResume(guid, parseInt(chatInfo.param[0]));
                    }
                }
                else {
                    RecordAudioManager.DownloadAmrData(chatInfo.param[3], guid, parseInt(chatInfo.param[0]));
                }
            }
        }
    };
    ChatManager.getRecordChatInfo = function (guid) {
        for (var _i = 0, _a = ChatManager._checkList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.param[1] == guid) {
                return info;
            }
        }
        return null;
    };
    /**
     * 声音播放完毕删除记录
     */
    ChatManager.removeRecordChatInfo = function (guid) {
        for (var _i = 0, _a = ChatManager._checkList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.param[1] == guid) {
                ArrayUtil.RemoveItem(info, ChatManager._checkList);
                break;
            }
        }
    };
    ChatManager.CreateChatInfoByMyInfo = function (type, message) {
        var info = new ChatInfo();
        info.roleId = UserManager.userInfo.roleId;
        info.type = type;
        info.message = message;
        info.name = UserManager.userInfo.name;
        return info;
    };
    ChatManager.messageOper = function () {
        if (!ChatManager.isOnMessage) {
            if (ChatManager.messageList.length > 0) {
                var chatInfo = ChatManager.messageList.shift();
                if (chatInfo.type == ChatMessageType.Maquee) {
                    UIManager.showPanel(UIModuleName.MarqueePanel, chatInfo.message);
                }
                else if (chatInfo.type == ChatMessageType.InRoom) {
                    ChatManager.CheckAndPlay(chatInfo);
                }
                PoolUtil.PutObject(chatInfo);
            }
        }
    };
    ChatManager.nextMessage = function () {
        ChatManager.isOnMessage = false;
        ChatManager.messageOper();
    };
    /**
     * 发送聊天请求
    */
    ChatManager.reqSendChatMsg = function (message, type) {
        /*let callback: Function = function (result: SpRpcResult)
        {
            SocketManager.RemoveCommandListener(Command.Req_Send_ChatMessage_3019, callback);
            if (type == ChatMessageType.Maquee)
            {
                let info: ChatInfo = ChatManager.CreateChatInfoByMyInfo(type, message);
                ChatManager.onSendChatMsgEvent.dispatch(info);

            } else
            {
                let info;
                info.message = message;
                info.type = ChatMessageType.InRoom;
                ChatManager.onSendChatMsgEvent.dispatch(info);
            }
        };
        SocketManager.AddCommandListener(Command.Req_Send_ChatMessage_3019, callback);
        SocketManager.Send(Command.Req_Send_ChatMessage_3019, { "message": message, "type": type });*/
        //todo 测试代码
        if (type == ChatMessageType.Maquee) {
            var info = ChatManager.CreateChatInfoByMyInfo(type, message);
            ChatManager.onSendChatMsgEvent.dispatch(info);
        }
        else {
            var info = new Object();
            info["message"] = message;
            info["type"] = ChatMessageType.InRoom;
            ChatManager.onSendChatMsgEvent.dispatch(info);
        }
        //
    };
    ChatManager.dispatchChatEvent = function () {
        ChatManager.pushChatMessageEa.dispatch();
    };
    ChatManager.DispatchMessageSend = function (info) {
        if (ChatManager.OnMessageSend != null) {
            ChatManager.OnMessageSend.dispatch(info);
        }
    };
    //-------------------------------------------------------
    // 聊天消息推送
    //-------------------------------------------------------
    ChatManager.pushChatMessageEa = new DelegateDispatcher();
    /**
     * 发送聊天消息成功后广播
    */
    ChatManager.onSendChatMsgEvent = new DelegateDispatcher();
    ChatManager.OnMessageSend = new DelegateDispatcher();
    return ChatManager;
}());
__reflect(ChatManager.prototype, "ChatManager");
/**
 * 聊天信息
 */
var ChatInfo = (function () {
    function ChatInfo() {
    }
    Object.defineProperty(ChatInfo.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            this._message = value;
            this.ParseMessageParams();
        },
        enumerable: true,
        configurable: true
    });
    ChatInfo.prototype.reset = function () {
        this.roleId = undefined;
        this.message = undefined;
        this.type = undefined;
    };
    /**
     * 解析聊天参数
     */
    ChatInfo.prototype.ParseMessageParams = function () {
        if (this.message && this.message.indexOf(ChatSpecialStrings.AudioRecordMessage) == 0) {
            var content = this.message.substring(ChatSpecialStrings.AudioRecordMessage.length);
            var splits = content.split(StringConstant.Comma);
            if (splits.length == 4) {
                this.param = splits;
            }
        }
    };
    return ChatInfo;
}());
__reflect(ChatInfo.prototype, "ChatInfo", ["IPoolObject", "Object"]);
/**
 * 聊天消息类型
 */
var ChatMessageType;
(function (ChatMessageType) {
    /**
     * 房间聊天
     */
    ChatMessageType[ChatMessageType["InRoom"] = 1] = "InRoom";
    /**
     * 跑马灯
     */
    ChatMessageType[ChatMessageType["Maquee"] = 2] = "Maquee";
})(ChatMessageType || (ChatMessageType = {}));
var ChatChannelInfo = (function () {
    function ChatChannelInfo() {
    }
    return ChatChannelInfo;
}());
__reflect(ChatChannelInfo.prototype, "ChatChannelInfo");
/**
 * 聊天特殊字符
 */
var ChatSpecialStrings = (function () {
    function ChatSpecialStrings() {
    }
    /**
     * 录音消息
     */
    ChatSpecialStrings.AudioRecordMessage = "#AudioRecordMessage#";
    /**
     * 分享战斗视频
     */
    ChatSpecialStrings.ShareVcr = "#ShareVcr#";
    /**
     * 打开某个面板
     */
    ChatSpecialStrings.OpenModule = "#OpenModule#";
    return ChatSpecialStrings;
}());
__reflect(ChatSpecialStrings.prototype, "ChatSpecialStrings");
/**
 * 表情
*/
var Face = (function () {
    function Face() {
    }
    return Face;
}());
__reflect(Face.prototype, "Face");
//# sourceMappingURL=ChatManager.js.map