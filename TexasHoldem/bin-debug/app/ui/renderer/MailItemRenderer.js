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
 * 邮件渲染项
 */
var MailItemRenderer = (function (_super) {
    __extends(MailItemRenderer, _super);
    function MailItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.MailItemRenderer;
        return _this;
    }
    MailItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
        this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.takePrize, this);
    };
    MailItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.refresh();
    };
    MailItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
            this.itemTitleLabel.text = this.bindData.Title;
            this.itemDesLabel.text = this.bindData.Content;
            //this.itemImg.source = this.bindData.item;
            if (this.bindData.IsGot) {
                this.takePrizeBtn.visible = false;
                this.takeDesLabel.visible = true;
            }
            else {
                this.takePrizeBtn.visible = true;
                this.takeDesLabel.visible = false;
            }
        }
    };
    //领取附件
    MailItemRenderer.prototype.takePrize = function () {
        SocketManager.call(Command.Mail_TakePrize_3098, { "MailId": this.bindData.Id }, this.onTakePrize, null, this);
    };
    MailItemRenderer.prototype.onTakePrize = function (result) {
        this.bindData.IsGot = true;
        this.refresh();
        MailManager.getMailPrizeEvent.dispatch();
    };
    MailItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.takePrizeBtn) {
            this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.takePrize, this);
        }
    };
    return MailItemRenderer;
}(BaseItemRenderer));
__reflect(MailItemRenderer.prototype, "MailItemRenderer");
//# sourceMappingURL=MailItemRenderer.js.map