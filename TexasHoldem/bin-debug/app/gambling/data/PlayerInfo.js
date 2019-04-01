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
 * 房间玩家信息
 */
var PlayerInfo = (function (_super) {
    __extends(PlayerInfo, _super);
    function PlayerInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PlayerInfo.prototype, "state", {
        /**
         * 0.等待下一局 1.弃牌 2.过牌 3.加注 4.allin 5.跟注 6.盲注
         */
        get: function () {
            if (GamblingManager.roomInfo && this.pos == GamblingManager.roomInfo.pos) {
                return PlayerState.Action;
            }
            return this._state;
        },
        set: function (value) {
            if (this._state != value) {
                this._state = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    PlayerInfo.prototype.reset = function () {
        this.roleId = 0;
        this.bankRoll = 0;
        this.pos = 0;
        this.state = PlayerState.WaitNext;
        this.isSitDown = false;
    };
    /**
     * 获取状态描述
     */
    PlayerInfo.getStateDes = function (state) {
        switch (state) {
            case PlayerState.AllIn:
                return "AllIn";
            case PlayerState.Fold:
                return "弃牌";
            case PlayerState.Check:
                return "过牌";
            case PlayerState.Raise:
                return "加注";
            case PlayerState.Call:
                return "跟注";
            case PlayerState.Action:
                return "思考中";
            case PlayerState.BrightCard:
                return "亮牌";
            default:
                return StringConstant.empty;
        }
    };
    return PlayerInfo;
}(BaseServerValueInfo));
__reflect(PlayerInfo.prototype, "PlayerInfo");
/**
 * 玩家状态
 */
var PlayerState;
(function (PlayerState) {
    /**
     * 等待下一局
     */
    PlayerState[PlayerState["WaitNext"] = 0] = "WaitNext";
    /**
     * 弃牌
     */
    PlayerState[PlayerState["Fold"] = 1] = "Fold";
    /**
     * 过牌
     */
    PlayerState[PlayerState["Check"] = 2] = "Check";
    /**
     * 加注
     */
    PlayerState[PlayerState["Raise"] = 3] = "Raise";
    /**
     * allin
     */
    PlayerState[PlayerState["AllIn"] = 4] = "AllIn";
    /**
     * 跟注
     */
    PlayerState[PlayerState["Call"] = 5] = "Call";
    /**
     * 盲注
     */
    PlayerState[PlayerState["Blind"] = 6] = "Blind";
    /**
     * 等待说话
     */
    PlayerState[PlayerState["WaitAction"] = 7] = "WaitAction";
    /**
     * 正在说话
     */
    PlayerState[PlayerState["Action"] = 100] = "Action";
    /**
     * 亮牌
     */
    PlayerState[PlayerState["BrightCard"] = 101] = "BrightCard";
    /**
     * 空状态
     */
    PlayerState[PlayerState["Empty"] = 104] = "Empty";
})(PlayerState || (PlayerState = {}));
//# sourceMappingURL=PlayerInfo.js.map