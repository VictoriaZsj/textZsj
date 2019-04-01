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
var PersonalRoomItemRenderer = (function (_super) {
    __extends(PersonalRoomItemRenderer, _super);
    function PersonalRoomItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.PersonalRoomItemRenderer;
        return _this;
    }
    PersonalRoomItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    PersonalRoomItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.flagImg.visible = false;
            if (this.bindData.id == PlayingFieldManager.selectedId) {
                this.flagImg.visible = true;
                PlayingFieldManager.selectedCarrayItem = this.flagImg;
            }
            this.bBuyLabel.text = MathUtil.formatNum(this.bindData.bBuyin);
            this.sBuyLabel.text = MathUtil.formatNum(this.bindData.sBuyin);
            this.blindLabel.text = MathUtil.formatNum(this.bindData.sBlind) + "/" + MathUtil.formatNum(this.bindData.bBlind);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setSelectedId, this);
        }
    };
    PersonalRoomItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setSelectedId, this);
    };
    /**
     * 选中设置
    */
    PersonalRoomItemRenderer.prototype.setSelectedId = function () {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        PlayingFieldManager.selectedId = this.bindData.id;
        if (PlayingFieldManager.selectedCarrayItem) {
            if (PlayingFieldManager.selectedCarrayItem != this.flagImg) {
                PlayingFieldManager.selectedCarrayItem.visible = false;
                this.flagImg.visible = true;
                PlayingFieldManager.selectedCarrayItem = this.flagImg;
            }
        }
        else {
            this.flagImg.visible = true;
            PlayingFieldManager.selectedCarrayItem = this.flagImg;
        }
        PlayingFieldManager.onSelectedMaxCarryEvent.dispatch(PlayingFieldManager.selectedId);
    };
    return PersonalRoomItemRenderer;
}(BaseItemRenderer));
__reflect(PersonalRoomItemRenderer.prototype, "PersonalRoomItemRenderer");
//# sourceMappingURL=PersonalRoomItemRenderer.js.map