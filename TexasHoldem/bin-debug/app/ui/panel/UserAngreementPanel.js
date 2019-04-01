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
 * 用户协议面板
 */
var UserAngreementPanel = (function (_super) {
    __extends(UserAngreementPanel, _super);
    function UserAngreementPanel() {
        var _this = _super.call(this) || this;
        _this.isMaskClickClose = true;
        _this.skinName = UISkinName.UserAngreementPanel;
        return _this;
    }
    UserAngreementPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isCloseButtonTween = false;
        this._txtScroller = new eui.Scroller();
        this._txtScroller.width = 442;
        this._txtScroller.height = 446;
        this._txtScroller.viewport = this.txtGroup;
        this._txtScroller.x = 54;
        this._txtScroller.y = 82;
        this.tweenGroup.addChild(this._txtScroller);
    };
    UserAngreementPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    UserAngreementPanel.prototype.onTweenOver = function () {
        _super.prototype.onTweenOver.call(this);
        var def = TextDefined.GetInstance().getDefinition(TextId.UserAngreement);
        if (def) {
            if (!this.infoTxt.text) {
                this.infoTxt.visible = false;
                this.infoTxt.text = def.text;
                this.infoTxt.visible = true;
            }
        }
    };
    UserAngreementPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._txtScroller.stopAnimation();
        this.agreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeBtnClickHandler, this);
    };
    UserAngreementPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.agreeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeBtnClickHandler, this);
    };
    UserAngreementPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        //需要在scroller添加到舞台上面之后再访问verticalScrollBar
        UIUtil.hideScrollerBar(this._txtScroller);
        this._txtScroller.viewport.scrollV = 0;
        UIUtil.hideScrollerBar(this._txtScroller, true);
    };
    UserAngreementPanel.prototype.agreeBtnClickHandler = function (event) {
        GameSetting.IsAgreeUserAgreement = true;
        UIManager.dispatchEvent(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE);
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    return UserAngreementPanel;
}(BasePanel));
__reflect(UserAngreementPanel.prototype, "UserAngreementPanel");
//# sourceMappingURL=UserAngreementPanel.js.map