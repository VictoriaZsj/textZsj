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
 * 模板面板
 */
var AAModelPanel = (function (_super) {
    __extends(AAModelPanel, _super);
    function AAModelPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "";
        return _this;
    }
    AAModelPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    AAModelPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    AAModelPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    AAModelPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    AAModelPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return AAModelPanel;
}(BasePanel));
__reflect(AAModelPanel.prototype, "AAModelPanel");
//# sourceMappingURL=AAModelPanel.js.map