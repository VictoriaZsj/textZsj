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
 * 签到金币列表
*/
var SignInGoldItemRenderer = (function (_super) {
    __extends(SignInGoldItemRenderer, _super);
    function SignInGoldItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.SignInGoldItemRenderer;
        return _this;
    }
    SignInGoldItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    SignInGoldItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.signInCheck.visible = false;
        if (this.bindData) {
            var awardDef = AwardDefined.GetInstance().getAwardDefinition(this.bindData.definition.awardId);
            if (awardDef) {
                var str = StringConstant.empty;
                for (var _i = 0, _a = awardDef.rewardList; _i < _a.length; _i++) {
                    var def = _a[_i];
                    str += def.definition.name + def.count.toString();
                }
                this.signInGoldLabel.text = str;
            }
            this.signInDayLabel.text = "第" + this.bindData.definition.day.toString() + "天";
        }
    };
    return SignInGoldItemRenderer;
}(BaseItemRenderer));
__reflect(SignInGoldItemRenderer.prototype, "SignInGoldItemRenderer");
//# sourceMappingURL=SignInGoldItemRenderer.js.map