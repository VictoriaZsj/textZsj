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
 * 四条成就进度信息
 */
var FourOfAKindProcess = (function (_super) {
    __extends(FourOfAKindProcess, _super);
    function FourOfAKindProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FourOfAKindProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    };
    FourOfAKindProcess.prototype.onProcessUpdate = function () {
        //super.init(UserManager.userInfo.gold);
    };
    FourOfAKindProcess.prototype.destroy = function () {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        _super.prototype.destroy.call(this);
    };
    return FourOfAKindProcess;
}(BaseAchieveProcessInfo));
__reflect(FourOfAKindProcess.prototype, "FourOfAKindProcess");
//# sourceMappingURL=FourOfAKindProcess.js.map