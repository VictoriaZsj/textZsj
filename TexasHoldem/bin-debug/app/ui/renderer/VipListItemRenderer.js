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
 * 商城vip列表
*/
var VipListItemRenderer = (function (_super) {
    __extends(VipListItemRenderer, _super);
    function VipListItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.VipListItemRenderer;
        return _this;
    }
    VipListItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    VipListItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData && this.vipImg != null) {
            var awardDef = AwardDefined.GetInstance().getAwardDefinition(this.bindData.definition.awardId);
            this.vipImg.source = this.bindData.definition.iconName;
            this.monthVip.text = awardDef.name;
            for (var _i = 0, _a = awardDef.costList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.type == CostType.Diamond) {
                    this.vipCountBtn.label = def.count.toString() + "钻石";
                }
            }
        }
    };
    return VipListItemRenderer;
}(BaseItemRenderer));
__reflect(VipListItemRenderer.prototype, "VipListItemRenderer");
//# sourceMappingURL=VipListItemRenderer.js.map