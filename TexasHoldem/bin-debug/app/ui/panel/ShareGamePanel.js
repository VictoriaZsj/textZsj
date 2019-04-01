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
 * 分享面板
 */
var ShareGamePanel = (function (_super) {
    __extends(ShareGamePanel, _super);
    function ShareGamePanel() {
        var _this = _super.call(this) || this;
        _this._isMaskClickClose = true;
        _this.skinName = UISkinName.ShareGamePanel;
        return _this;
    }
    ShareGamePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    ShareGamePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    ShareGamePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    ShareGamePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    ShareGamePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    ShareGamePanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        switch (event.target) {
            case this.weixinShareBtn:
                UIManager.showFloatTips("微信");
                break;
            case this.friendCircleShareBtn:
                UIManager.showFloatTips("朋友圈");
                break;
        }
    };
    return ShareGamePanel;
}(BasePanel));
__reflect(ShareGamePanel.prototype, "ShareGamePanel");
//# sourceMappingURL=ShareGamePanel.js.map