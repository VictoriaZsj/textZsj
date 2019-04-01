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
 * 邀请消息面板
 */
var InviteMsgPanel = (function (_super) {
    __extends(InviteMsgPanel, _super);
    function InviteMsgPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.InviteMsgPanel;
        _this.isMaskClickClose = true;
        return _this;
    }
    InviteMsgPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    InviteMsgPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        // let info=FriendManager.getFriendInfoById(FriendManager.InviteResult.roleId);
        // if(info){
        // 	this.inviteMsgLable.text="你的好友"+info.name+"现在邀请您一起游戏！";
        // 	this.headImg.source=info.head;
        // }		
    };
    InviteMsgPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    InviteMsgPanel.prototype.onEnable = function (event) {
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBtnHandler, this);
        this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinBtnHandler, this);
        _super.prototype.onEnable.call(this, event);
    };
    InviteMsgPanel.prototype.onDisable = function (event) {
        this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBtnHandler, this);
        this.joinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.joinBtnHandler, this);
        _super.prototype.onDisable.call(this, event);
    };
    /**
     * 不加入房间
    */
    InviteMsgPanel.prototype.cancelBtnHandler = function (event) {
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 立即加入房间
    */
    InviteMsgPanel.prototype.joinBtnHandler = function (event) {
        this.onCloseBtnClickHandler(null);
    };
    return InviteMsgPanel;
}(BasePanel));
__reflect(InviteMsgPanel.prototype, "InviteMsgPanel");
//# sourceMappingURL=InviteMsgPanel.js.map