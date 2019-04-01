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
 * 商城金币列表
*/
var GoldListItemRenderer = (function (_super) {
    __extends(GoldListItemRenderer, _super);
    function GoldListItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GoldListItemRenderer;
        return _this;
    }
    GoldListItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    GoldListItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData && this.goldImg != null) {
            var awardDef = AwardDefined.GetInstance().getAwardDefinition(this.bindData.definition.awardId);
            if (awardDef) {
                this.goldImg.source = this.bindData.definition.iconName;
                this.goldNum.text = awardDef.name;
                this.goldCount.text = awardDef.des;
                for (var _i = 0, _a = awardDef.costList; _i < _a.length; _i++) {
                    var def = _a[_i];
                    if (def.type == CostType.RMB) {
                        this.goldBtn.label = def.count.toString();
                    }
                }
            }
        }
    };
    return GoldListItemRenderer;
}(BaseItemRenderer));
__reflect(GoldListItemRenderer.prototype, "GoldListItemRenderer");
//# sourceMappingURL=GoldListItemRenderer.js.map