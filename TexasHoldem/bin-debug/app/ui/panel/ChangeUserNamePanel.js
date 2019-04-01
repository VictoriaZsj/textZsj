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
 * 修改昵称面板
 */
var ChangeUserNamePanel = (function (_super) {
    __extends(ChangeUserNamePanel, _super);
    function ChangeUserNamePanel() {
        var _this = _super.call(this) || this;
        _this.isCloseButtonTween = false;
        _this.skinName = UISkinName.ChangeUserNamePanel;
        return _this;
    }
    ChangeUserNamePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.nameTextLabel.text = UserManager.userInfo.name;
    };
    ChangeUserNamePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    ChangeUserNamePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    /**
     * 点击面板按钮事件处理
    */
    ChangeUserNamePanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        switch (event.target) {
            case this.randomBtn:
                this.nameTextLabel.text = UserUtil.randomNickName(UserManager.userInfo.sex);
                break;
            case this.changeNameBtn:
                if (UserUtil.isLegalNickName(this.nameTextLabel.text)) {
                    UserManager.editUserName(this.nameTextLabel.text);
                }
                break;
        }
    };
    return ChangeUserNamePanel;
}(BasePanel));
__reflect(ChangeUserNamePanel.prototype, "ChangeUserNamePanel");
//# sourceMappingURL=ChangeUserNamePanel.js.map