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
 * 添加好友项面板
*/
var AddFriendItemRenderer = (function (_super) {
    __extends(AddFriendItemRenderer, _super);
    function AddFriendItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AddFriendItemRenderer;
        return _this;
    }
    AddFriendItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    AddFriendItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.headImg.source = ImageSource.TestImg;
            this.nameLabel.text = this.bindData.name;
            this.idLabel.text = this.bindData.roleId.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            FriendManager.onAddPlayerEvent.addListener(this.addPlayerSuccess, this);
        }
    };
    AddFriendItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        FriendManager.onAddPlayerEvent.removeListener(this.addPlayerSuccess, this);
    };
    /**
     * 发送添加请求成功后接受广播执行的操作
    */
    AddFriendItemRenderer.prototype.addPlayerSuccess = function () {
        AlertManager.showAlertByString("已向对方发送好友申请。");
    };
    /**
     *添加按钮点击事件
    */
    AddFriendItemRenderer.prototype.onAddBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqAddPlayer(this.bindData.roleId);
    };
    AddFriendItemRenderer.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    return AddFriendItemRenderer;
}(BaseItemRenderer));
__reflect(AddFriendItemRenderer.prototype, "AddFriendItemRenderer");
//# sourceMappingURL=AddFriendItemRenderer.js.map