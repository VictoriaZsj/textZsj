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
 * 牌的定义
 * */
var CardDefined = (function (_super) {
    __extends(CardDefined, _super);
    function CardDefined() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 卡牌最小A
         */
        _this.minCardIndex = 1;
        return _this;
    }
    CardDefined.GetInstance = function () {
        if (!CardDefined._instance) {
            CardDefined._instance = new CardDefined();
        }
        if (DefinedManager.IsParsed(CardDefined.cardConfig) == false) {
            CardDefined._instance.initialize();
        }
        return CardDefined._instance;
    };
    CardDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(CardDefined.cardConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
        if (this.dataList) {
            var def = void 0;
            CardDefined.GetInstance().maxCardIndex = 0;
            for (var i = 0; i < this.dataList.length; i++) {
                def = this.dataList[i];
                if (def.index > CardDefined.GetInstance().maxCardIndex) {
                    CardDefined.GetInstance().maxCardIndex = def.index;
                }
            }
        }
    };
    CardDefined.cardConfig = "card";
    return CardDefined;
}(BaseDefined));
__reflect(CardDefined.prototype, "CardDefined");
/**
 * 牌的定义
 * */
var CardDefinition = (function () {
    function CardDefinition() {
    }
    return CardDefinition;
}());
__reflect(CardDefinition.prototype, "CardDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=CardDefined.js.map