var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 手牌逻辑处理
 */
var HandCardHandler = (function () {
    function HandCardHandler() {
    }
    HandCardHandler.prototype.roundStart = function () {
    };
    HandCardHandler.prototype.roundOver = function () {
    };
    HandCardHandler.prototype.loopOver = function () {
    };
    return HandCardHandler;
}());
__reflect(HandCardHandler.prototype, "HandCardHandler", ["IGamblingHandler"]);
//# sourceMappingURL=HandCardHandler.js.map