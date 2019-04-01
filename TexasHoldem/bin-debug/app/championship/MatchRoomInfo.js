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
 * 锦标赛赛事信息
*/
var MatchRoomInfo = (function (_super) {
    __extends(MatchRoomInfo, _super);
    function MatchRoomInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MatchRoomInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = ChampionshipDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchRoomInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            this._definition = value;
        },
        enumerable: true,
        configurable: true
    });
    MatchRoomInfo.prototype.reset = function () {
    };
    return MatchRoomInfo;
}(BaseServerValueInfo));
__reflect(MatchRoomInfo.prototype, "MatchRoomInfo");
//# sourceMappingURL=MatchRoomInfo.js.map