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
 * 金币成就进度信息
 */
var GoldProcess = (function (_super) {
    __extends(GoldProcess, _super);
    function GoldProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoldProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        UserManager.propertyChangeEvent.addListener(this.onProcessUpdate, this);
    };
    GoldProcess.prototype.onProcessUpdate = function () {
        if (UserManager.userInfo.gold > this.process) {
            _super.prototype.init.call(this, UserManager.userInfo.gold);
        }
    };
    GoldProcess.prototype.destroy = function () {
        UserManager.propertyChangeEvent.removeListener(this.onProcessUpdate, this);
        _super.prototype.destroy.call(this);
    };
    return GoldProcess;
}(BaseAchieveProcessInfo));
__reflect(GoldProcess.prototype, "GoldProcess");
//# sourceMappingURL=GoldProcess.js.map