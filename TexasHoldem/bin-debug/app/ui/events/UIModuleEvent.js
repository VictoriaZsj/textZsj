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
 * ui模块事件
 */
var UIModuleEvent = (function (_super) {
    __extends(UIModuleEvent, _super);
    function UIModuleEvent(type, pName) {
        var _this = _super.call(this, type) || this;
        /**
         * 面板名
         */
        _this.panelName = StringConstant.empty;
        _this.panelName = pName;
        return _this;
    }
    /**
     * socket连接超时事件
     */
    UIModuleEvent.OnTimeout = "OnTimeout";
    return UIModuleEvent;
}(egret.Event));
__reflect(UIModuleEvent.prototype, "UIModuleEvent");
//# sourceMappingURL=UIModuleEvent.js.map