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
 * 中级场对局成就进度信息
 */
var MiddlePatternProcess = (function (_super) {
    __extends(MiddlePatternProcess, _super);
    function MiddlePatternProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiddlePatternProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    };
    MiddlePatternProcess.prototype.onProcessUpdate = function () {
        //super.init(UserManager.userInfo.gold);
    };
    MiddlePatternProcess.prototype.destroy = function () {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        _super.prototype.destroy.call(this);
    };
    return MiddlePatternProcess;
}(BaseAchieveProcessInfo));
__reflect(MiddlePatternProcess.prototype, "MiddlePatternProcess");
//# sourceMappingURL=MiddlePatternProcess.js.map