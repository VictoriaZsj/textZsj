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
 * 好友消息面板
 */
var FriendMsgPanel = (function (_super) {
    __extends(FriendMsgPanel, _super);
    function FriendMsgPanel() {
        var _this = _super.call(this) || this;
        _this.setGrayMask(false);
        _this.skinName = UISkinName.FriendMsgPanel;
        return _this;
    }
    FriendMsgPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    FriendMsgPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData == FriendMsgType.InviteMsg) {
            this.inviteMsgGp.visible = true;
            this.requireMsgGp.visible = false;
        }
        else if (appendData == FriendMsgType.RequireMsg) {
            this.requireMsgGp.visible = true;
            this.inviteMsgGp.visible = false;
        }
    };
    FriendMsgPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    FriendMsgPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkMsg, this);
    };
    FriendMsgPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkMsg, this);
    };
    FriendMsgPanel.prototype.checkMsg = function (event) {
        switch (event.target) {
            case this.inviteMsg_bg:
                UIManager.showPanel(UIModuleName.InviteMsgPanel);
            case this.requireMsg_bg:
                UIManager.showPanel(UIModuleName.InviteMsgPanel);
        }
        this.onCloseBtnClickHandler(null);
    };
    return FriendMsgPanel;
}(BasePanel));
__reflect(FriendMsgPanel.prototype, "FriendMsgPanel");
var FriendMsgType;
(function (FriendMsgType) {
    /**
     * 请求加好友信息
    */
    FriendMsgType[FriendMsgType["RequireMsg"] = 1] = "RequireMsg";
    /**
     * 邀请好友信息
    */
    FriendMsgType[FriendMsgType["InviteMsg"] = 2] = "InviteMsg";
})(FriendMsgType || (FriendMsgType = {}));
//# sourceMappingURL=FriendMsgPanel.js.map