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
 * 选择登录方式面板
 */
var EnterLoginPanel = (function (_super) {
    __extends(EnterLoginPanel, _super);
    function EnterLoginPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.EnterLoginPanel;
        return _this;
    }
    EnterLoginPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    EnterLoginPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    EnterLoginPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    EnterLoginPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    EnterLoginPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    EnterLoginPanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        switch (event.target) {
            case this.weixinLoginBtn:
                UIManager.showFloatTips("功能还未开放！");
                //UIManager.dispatchEvent(UIModuleName.EnterLoginPanel, UIModuleEvent.COMPLETE,ChannelLoginType.Weixin);
                break;
            case this.guestBtn:
                UIManager.showFloatTips("功能还未开放！");
                //UIManager.dispatchEvent(UIModuleName.EnterLoginPanel, UIModuleEvent.COMPLETE,ChannelLoginType.Guest);
                break;
            case this.intranetAccountBtn:
                UIManager.dispatchEvent(UIModuleName.EnterLoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.IntranetAccount);
                break;
        }
    };
    return EnterLoginPanel;
}(BasePanel));
__reflect(EnterLoginPanel.prototype, "EnterLoginPanel");
//# sourceMappingURL=EnterLoginPanel.js.map