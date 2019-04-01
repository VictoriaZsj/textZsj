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
 * 充值选项的定义
 * */
var ItemDefined = (function (_super) {
    __extends(ItemDefined, _super);
    function ItemDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemDefined.GetInstance = function () {
        if (!ItemDefined._instance) {
            ItemDefined._instance = new ItemDefined();
        }
        if (DefinedManager.IsParsed(ItemDefined.itemConfig) == false) {
            ItemDefined._instance.initialize();
        }
        return ItemDefined._instance;
    };
    ItemDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ItemDefined.itemConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    /**
     * 获取道具定义
     */
    ItemDefined.prototype.getItemDefinition = function (id) {
        for (var _i = 0, _a = ItemDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.id == id) {
                return def;
            }
        }
        return null;
    };
    ItemDefined.itemConfig = "item";
    return ItemDefined;
}(BaseDefined));
__reflect(ItemDefined.prototype, "ItemDefined");
/**
 * 道具的定义
 * */
var ItemDefinition = (function () {
    function ItemDefinition() {
    }
    return ItemDefinition;
}());
__reflect(ItemDefinition.prototype, "ItemDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ItemDefined.js.map