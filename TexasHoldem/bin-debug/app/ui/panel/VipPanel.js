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
 * 会员面板
 */
var VipPanel = (function (_super) {
    __extends(VipPanel, _super);
    function VipPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.VipPanel;
        return _this;
    }
    VipPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isCloseButtonTween = false;
    };
    VipPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var array = new Array(this.myVipGroup, this.vipIntroduceGroup);
        this.tab.init(array);
        this.tab.isTween = false;
    };
    VipPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.userImg.source = UserManager.userInfo.head;
        this.userNameLabel.text = UserManager.userInfo.name;
        this.refreshVipInfo();
    };
    VipPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        VipManager.vipUpgradeEvent.addListener(this.refreshVipInfo, this);
    };
    VipPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        VipManager.vipUpgradeEvent.removeListener(this.refreshVipInfo, this);
    };
    VipPanel.prototype.refreshVipInfo = function () {
        this.vipLevelLabel.text = "VIP" + UserManager.userInfo.vipLevel.toString();
        if (UserManager.userInfo.vipType == VipType.NoVip) {
            this.yearVipImg.visible = false;
        }
        else {
            this.yearVipImg.visible = true;
        }
        this.vipProgressImg.width = 1080;
        this.vipProgressImg.width *= UserManager.userInfo.vipExp / 6000;
        this.vipExpLabel.text = UserManager.userInfo.vipExp.toString() + "点";
        this.currentVipLevel.text = UserManager.userInfo.vipLevel.toString();
        this.vipSpeedLabel.text = UserManager.userInfo.vipSpeed + "点";
    };
    /**
     * 点击面板按钮事件处理
    */
    VipPanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        switch (event.target) {
            case this.buyVipButton:
            case this.buyYearVipLabel:
                UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShoppingGpIndex.Vip });
                break;
        }
    };
    return VipPanel;
}(BasePanel));
__reflect(VipPanel.prototype, "VipPanel");
//# sourceMappingURL=VipPanel.js.map