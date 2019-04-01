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
 * 牌面显示组件
 */
var CardFaceComponent = (function (_super) {
    __extends(CardFaceComponent, _super);
    function CardFaceComponent() {
        var _this = _super.call(this) || this;
        _this.skinName = UIComponentSkinName.CardFaceComponent;
        return _this;
    }
    CardFaceComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    CardFaceComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    CardFaceComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        this.rendererStart(null);
    };
    CardFaceComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
        this.backFace.visible = true;
        this.cardGroup.visible = false;
        this.showMask(false);
        this.showMaxFlag(false);
        if (this.bindData) {
            var numRes = StringConstant.empty;
            var bigRes = StringConstant.empty;
            if (this.bindData[0] > 2) {
                numRes = ResPrefixName.card + ResPrefixName.FlushBlack + this.bindData[1] + ResSuffixName.PNGSuffix;
            }
            else {
                numRes = ResPrefixName.card + ResPrefixName.FlushRed + this.bindData[1] + ResSuffixName.PNGSuffix;
            }
            this.numImg.source = numRes;
            this.flushSmallImg.source = ResPrefixName.Flush + this.bindData[0] + ResSuffixName.PNGSuffix;
            //大于10，小于A
            if (this.bindData[1] > GamblingManager.FlushSplitIndex && this.bindData[1] < CardDefined.GetInstance().maxCardIndex) {
                bigRes = ResPrefixName.card + this.bindData[0] + "_" + this.bindData[1] + ResSuffixName.PNGSuffix;
            }
            else {
                bigRes = ResPrefixName.Flush + this.bindData[0] + ResSuffixName.PNGSuffix;
            }
            this.flushBigImg.source = bigRes;
        }
        else {
            this.numImg.source = "";
            this.flushBigImg.source = "";
            this.flushSmallImg.source = "";
        }
        if (!this.initMatrix) {
            this.initMatrix = this.matrix.clone();
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }
    };
    CardFaceComponent.prototype.disappear = function () {
        this.visible = false;
    };
    CardFaceComponent.prototype.showMask = function (flag) {
        this.maskImg.visible = flag;
    };
    CardFaceComponent.prototype.showMaxFlag = function (flag) {
        this.maxFlagImg.visible = flag;
    };
    CardFaceComponent.prototype.initElementsShow = function () {
        this.backFace.visible = true;
        this.cardGroup.visible = false;
        this.frontFaceImg.visible = false;
    };
    CardFaceComponent.prototype.initElementsShow2 = function () {
        this.backFace.visible = false;
        this.frontFaceImg.visible = false;
        this.cardGroup.visible = true;
    };
    return CardFaceComponent;
}(BaseComponent));
__reflect(CardFaceComponent.prototype, "CardFaceComponent");
//# sourceMappingURL=CardFaceComponent.js.map