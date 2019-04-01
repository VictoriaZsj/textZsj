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
 * 房间信息
 */
var RoomInfo = (function (_super) {
    __extends(RoomInfo, _super);
    function RoomInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RoomInfo.prototype, "roomId", {
        /**
         * 房间的配置ID
         */
        get: function () {
            return this._roomId;
        },
        set: function (value) {
            this._roomId = value;
            this._definition = RoomDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "bBlind", {
        /**
         * 大盲
         */
        get: function () {
            if (this._bBlind == undefined || this._bBlind == 0 && this._definition) {
                this._bBlind = this._definition.bBlind;
            }
            return this._bBlind;
        },
        set: function (value) {
            this._bBlind = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "maxAnte", {
        /**
         * 当前圈注最大下注额度
         */
        get: function () {
            if (this._maxAnte == undefined || this._maxAnte == 0) {
                this._maxAnte = this.bBlind;
            }
            return this._maxAnte;
        },
        set: function (value) {
            this._maxAnte = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "minRaiseNum", {
        /**
         * 最小加注额度
         */
        get: function () {
            if (this._minRaiseNum == undefined || this._minRaiseNum <= 0) {
                this._minRaiseNum = this.bBlind * 2;
            }
            if (this._minRaiseNum < this.bBlind) {
                this._minRaiseNum = this.bBlind + this._minRaiseNum;
            }
            return this._minRaiseNum;
        },
        /**
         * 当前最小加注额度
         */
        set: function (value) {
            this._minRaiseNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoomInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    RoomInfo.prototype.reset = function () {
        this.id = 0;
        this.buttonPos = 0;
        this.potChips = undefined;
        this.roomId = 0;
        this.ante = 0;
        this.sBlind = 0;
        this.bBlind = 0;
        this.gamblingType = 0;
        this.pos = 0;
        this.posTime = 0;
        this.startTime;
        this.cardList = undefined;
        this.playerList = undefined;
        this.sidePot = undefined;
        this.isShowCard = undefined;
        this.handCardList = undefined;
        this.bBlindPos = undefined;
        this.sBlindPos = undefined;
        this.isAutoBuy = undefined;
        this._definition = undefined;
        this.roundNum = 0;
        this.maxAnte = 0;
        this.minRaiseNum = 0;
    };
    return RoomInfo;
}(BaseServerValueInfo));
__reflect(RoomInfo.prototype, "RoomInfo");
/**
 * 牌局类型
 */
var GamblingType;
(function (GamblingType) {
    /**
     * 普通房间
     */
    GamblingType[GamblingType["Common"] = 1] = "Common";
    /**
     * 锦标赛房间
     */
    GamblingType[GamblingType["Championship"] = 2] = "Championship";
    /**
     * 私人房间
     */
    GamblingType[GamblingType["Personal"] = 3] = "Personal";
})(GamblingType || (GamblingType = {}));
//# sourceMappingURL=RoomInfo.js.map