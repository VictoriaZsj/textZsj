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
 *快速聊天
*/
var FastChatDefined = (function (_super) {
    __extends(FastChatDefined, _super);
    function FastChatDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FastChatDefined.GetInstance = function () {
        if (!FastChatDefined._instance) {
            FastChatDefined._instance = new FastChatDefined();
        }
        if (DefinedManager.IsParsed(FastChatDefined.fastChatConfig) == false) {
            FastChatDefined._instance.initialize();
        }
        return FastChatDefined._instance;
    };
    FastChatDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(FastChatDefined.fastChatConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    FastChatDefined.fastChatConfig = "fastChat";
    return FastChatDefined;
}(BaseDefined));
__reflect(FastChatDefined.prototype, "FastChatDefined");
/**
* 随机昵称的定义
*/
var FastChatDefinition = (function () {
    function FastChatDefinition() {
    }
    return FastChatDefinition;
}());
__reflect(FastChatDefinition.prototype, "FastChatDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=FastChatDefined.js.map