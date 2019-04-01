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
 * 赢牌组件
 */
var WinCardComponent = (function (_super) {
    __extends(WinCardComponent, _super);
    function WinCardComponent() {
        var _this = _super.call(this) || this;
        _this.skinName = UIComponentSkinName.WinCardComponent;
        return _this;
    }
    WinCardComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    WinCardComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    WinCardComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    WinCardComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    WinCardComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
    };
    WinCardComponent.prototype.winPlay = function () {
        AnimationFactory.getWinCardAnim(this.mcGroup);
        AnimationFactory.getSeatAnim(this.seat_mcGroup);
    };
    return WinCardComponent;
}(BaseComponent));
__reflect(WinCardComponent.prototype, "WinCardComponent");
//# sourceMappingURL=WinCardComponent.js.map