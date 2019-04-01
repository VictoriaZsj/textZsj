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
 * 好用赠送礼物项面板
*/
var GiftItemRenderer = (function (_super) {
    __extends(GiftItemRenderer, _super);
    function GiftItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GiftItemRenderer;
        return _this;
    }
    GiftItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    GiftItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.headImg.source = ImageSource.TestImg;
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = "赠送给您" + ProjectDefined.giveOnceGoldNum + "好友金币";
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
        }
    };
    GiftItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
    };
    /**
     *领取按钮点击事件
    */
    GiftItemRenderer.prototype.onreceiveBtnClick = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveGift(this.bindData.roleId);
    };
    return GiftItemRenderer;
}(BaseItemRenderer));
__reflect(GiftItemRenderer.prototype, "GiftItemRenderer");
//# sourceMappingURL=GiftItemRenderer.js.map