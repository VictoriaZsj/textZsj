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
 * 商城钻石列表
*/
var DiamondListItemRenderer = (function (_super) {
    __extends(DiamondListItemRenderer, _super);
    function DiamondListItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.DiamondListItemRenderer;
        return _this;
    }
    DiamondListItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    DiamondListItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData && this.diamondImg != null) {
            var awardDef = AwardDefined.GetInstance().getAwardDefinition(this.bindData.definition.awardId);
            if (awardDef) {
                this.diamondImg.source = this.bindData.definition.iconName;
                this.diamondNum.text = awardDef.name;
                for (var _i = 0, _a = awardDef.costList; _i < _a.length; _i++) {
                    var def = _a[_i];
                    if (def.type == CostType.RMB) {
                        this.diamondBtn.label = def.count.toString();
                        break;
                    }
                }
            }
        }
    };
    return DiamondListItemRenderer;
}(BaseItemRenderer));
__reflect(DiamondListItemRenderer.prototype, "DiamondListItemRenderer");
//# sourceMappingURL=DiamondListItemRenderer.js.map