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
 * 邮箱面板
 */
var MailPanel = (function (_super) {
    __extends(MailPanel, _super);
    function MailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.MailPanel;
        return _this;
    }
    MailPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isCloseButtonTween = false;
    };
    MailPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var array = new Array("系统邮箱", "系统通知", "私人邮箱");
        this.tab.init(array);
        this.tab.isTween = false;
        UIUtil.listRenderer(this.mailList, this.mailScroller, MailItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    MailPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        if (MailManager.isMailListChange) {
            MailManager.clearList();
            MailManager.RequestMailList(0, GameSetting.MaxMailNum);
        }
        MailManager.unReadCount = 0;
        this.mailScroller.viewport.scrollV = 0;
    };
    MailPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.tab.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        MailManager.getMailListEvent.addListener(this.getMailList, this);
    };
    MailPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.tab.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        MailManager.getMailListEvent.removeListener(this.getMailList, this);
    };
    MailPanel.prototype.getMailList = function () {
        this.refreshUI();
    };
    /**
     * 渲染信息
    */
    MailPanel.prototype.refreshUI = function () {
        this.mailList.dataProvider = new eui.ArrayCollection(MailManager.mailList);
    };
    MailPanel.prototype.onBarItemTap = function (e) {
        this.mailList.dataProvider = new eui.ArrayCollection(MailManager.getListByType(e.itemIndex));
    };
    return MailPanel;
}(BasePanel));
__reflect(MailPanel.prototype, "MailPanel");
//# sourceMappingURL=MailPanel.js.map