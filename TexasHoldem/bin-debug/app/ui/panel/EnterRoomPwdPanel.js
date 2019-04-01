var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 进入私人房输入密码面板
*/
var EnterRoomPwdPanel = (function (_super) {
    __extends(EnterRoomPwdPanel, _super);
    function EnterRoomPwdPanel(flag) {
        var _this = _super.call(this) || this;
        for (var i = 1; i <= 6; i++) {
            _this["label" + i.toString()] = new NumComponent();
        }
        if (!flag) {
            _this.skinName = UISkinName.EnterRoomPwdPanel;
        }
        return _this;
    }
    EnterRoomPwdPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isCloseButtonTween = false;
        this._labelList = new Array();
        for (var i = 1; i <= 6; i++) {
            this._labelList.push(this["label" + i.toString()]);
            this.labelGroup.addChild(this["label" + i.toString()]);
        }
        this.setGrayMask(false);
        this.callback = this.enterPwd;
        this.openPanelName = UIModuleName.EnterRoomPwdPanel;
    };
    EnterRoomPwdPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        //重置
        this.resetLabel();
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.callback, target: this, isbgNotCanClick: true });
        UIManager.showPanel(this.openPanelName);
    };
    EnterRoomPwdPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    EnterRoomPwdPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    /**
     * 关闭面板
    */
    EnterRoomPwdPanel.prototype.onCloseBtnClickHandler = function (event) {
        _super.prototype.onCloseBtnClickHandler.call(this, event);
        UIManager.closePanel(this.openPanelName);
        PlayingFieldManager.onCloseKeyboardEvent.dispatch();
        this.resetLabel();
    };
    /**
     * 重置密码框内容
    */
    EnterRoomPwdPanel.prototype.resetLabel = function () {
        for (var _i = 0, _a = this._labelList; _i < _a.length; _i++) {
            var childLabel = _a[_i];
            childLabel.refresh();
        }
    };
    /**
     * 输入密码
    */
    EnterRoomPwdPanel.prototype.enterPwd = function (type, num) {
        if (num) {
            var label = this.getUnWriteLabel();
            if (label) {
                label.refresh(parseInt(num));
            }
        }
        if (type == 1) {
            var str = this.getRoomPwd();
            if (str.length > 5) {
                var roompwd = parseInt(str);
                if (roompwd <= 0 || roompwd.toString().length < 6) {
                    UIManager.showFloatTips("房间密码不对！");
                    return;
                }
                GamblingManager.reqEnterRoom(roompwd);
                // RoomManager.reqJoinRoom(roompwd, SocketManager.requestSessionMax);
                // UIManager.showFloatTips("发送加入房间请求" + PlayingFieldManager.roomId);
            }
        }
        else if (type == 2) {
            var delLabel = this.getWirteLabel();
            if (delLabel) {
                delLabel.refresh();
            }
        }
        else if (type == 3) {
            this.resetLabel();
        }
    };
    EnterRoomPwdPanel.prototype.getUnWriteLabel = function () {
        var label;
        for (var i = 0; i < this._labelList.length; i++) {
            label = this._labelList[i];
            if (label.label1 && !label.label1.text) {
                return label;
            }
        }
        return null;
    };
    EnterRoomPwdPanel.prototype.getWirteLabel = function () {
        var label;
        for (var i = this._labelList.length - 1; i >= 0; i--) {
            label = this._labelList[i];
            if (label.label1 && label.label1.text) {
                return label;
            }
        }
        return null;
    };
    /**
     * 获得密码
    */
    EnterRoomPwdPanel.prototype.getRoomPwd = function () {
        var str = StringConstant.empty;
        for (var i = 0; i < this._labelList.length; i++) {
            str += this._labelList[i].label1.text;
        }
        return str;
    };
    return EnterRoomPwdPanel;
}(BasePanel));
__reflect(EnterRoomPwdPanel.prototype, "EnterRoomPwdPanel");
//# sourceMappingURL=EnterRoomPwdPanel.js.map