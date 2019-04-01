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
 * 好友请求项面板
*/
var FriendRequestItemRenderer = (function (_super) {
    __extends(FriendRequestItemRenderer, _super);
    function FriendRequestItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.FriendRequestItemRenderer;
        return _this;
    }
    FriendRequestItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    FriendRequestItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.headImg.source = ImageSource.TestImg;
            this.nameLabel.text = this.bindData.name;
            this.idLabel.text = this.bindData.roleId.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
            this.refuseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onrefuseBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        }
    };
    FriendRequestItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
        this.refuseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onrefuseBtnClick, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
    };
    /**
     *接受按钮点击事件
    */
    FriendRequestItemRenderer.prototype.onreceiveBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveFriendRequest(this.bindData.roleId, IsReceive.Receive);
    };
    /**
     * 拒绝按钮点击事件
    */
    FriendRequestItemRenderer.prototype.onrefuseBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveFriendRequest(this.bindData.roleId, IsReceive.NotREceive);
    };
    FriendRequestItemRenderer.prototype.cancelBubble = function (event) {
        switch (event.target) {
            case this.receiveBtn:
                event.stopImmediatePropagation();
                break;
            case this.refuseBtn:
                event.stopImmediatePropagation();
                break;
        }
    };
    return FriendRequestItemRenderer;
}(BaseItemRenderer));
__reflect(FriendRequestItemRenderer.prototype, "FriendRequestItemRenderer");
//# sourceMappingURL=FriendRequestItemRenderer.js.map