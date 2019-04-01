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
 * 等级成就进度信息
 */
var LevelProcess = (function (_super) {
    __extends(LevelProcess, _super);
    function LevelProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    };
    LevelProcess.prototype.onProcessUpdate = function () {
        if (UserManager.userInfo.level > this.process) {
            _super.prototype.init.call(this, UserManager.userInfo.level);
        }
    };
    LevelProcess.prototype.destroy = function () {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        _super.prototype.destroy.call(this);
    };
    return LevelProcess;
}(BaseAchieveProcessInfo));
__reflect(LevelProcess.prototype, "LevelProcess");
//# sourceMappingURL=LevelProcess.js.map