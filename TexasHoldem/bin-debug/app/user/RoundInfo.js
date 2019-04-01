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
 * 战绩信息拆分
 */
var RoundSplitInfo = (function (_super) {
    __extends(RoundSplitInfo, _super);
    function RoundSplitInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundSplitInfo.prototype.reset = function () {
    };
    return RoundSplitInfo;
}(BaseServerValueInfo));
__reflect(RoundSplitInfo.prototype, "RoundSplitInfo");
/**
 * 战绩信息
 */
var RoundInfo = (function (_super) {
    __extends(RoundInfo, _super);
    function RoundInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundInfo.prototype.reset = function () {
    };
    return RoundInfo;
}(BaseServerValueInfo));
__reflect(RoundInfo.prototype, "RoundInfo");
/**
 * 房间结束
 */
var RoomOverType;
(function (RoomOverType) {
    /**
     * 正常结算
     */
    RoomOverType[RoomOverType["Usual"] = 1] = "Usual";
    /**
     * 房间解散
     */
    RoomOverType[RoomOverType["Disband"] = 2] = "Disband";
})(RoomOverType || (RoomOverType = {}));
/**
 * 一局详细信息
 */
var RoundDetialsInfo = (function (_super) {
    __extends(RoundDetialsInfo, _super);
    function RoundDetialsInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RoundDetialsInfo;
}(RoundInfo));
__reflect(RoundDetialsInfo.prototype, "RoundDetialsInfo");
//# sourceMappingURL=RoundInfo.js.map