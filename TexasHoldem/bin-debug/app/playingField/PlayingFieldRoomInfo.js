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
 * 赛事场房间信息
*/
var PlayingFieldRoomInfo = (function (_super) {
    __extends(PlayingFieldRoomInfo, _super);
    function PlayingFieldRoomInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayingFieldRoomInfo.prototype.reset = function () {
    };
    return PlayingFieldRoomInfo;
}(BaseServerValueInfo));
__reflect(PlayingFieldRoomInfo.prototype, "PlayingFieldRoomInfo");
//# sourceMappingURL=PlayingFieldRoomInfo.js.map