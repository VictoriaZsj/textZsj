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
 * 用户信息
 */
var UserInfo = (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserInfo.prototype.reset = function () {
        this._diamondNum = 0;
        this._goldNum = 0;
        this._saveGoldNum = 0;
        this.timestamp = 0;
        this.timezone = 0;
        this.roleId = 0;
        this.name = StringConstant.empty;
        this.head = ImageSource.Default_Head;
        this.sex = 0;
        this.level = 0;
        this.exp = 0;
        this.ip = StringConstant.empty;
        this.sign = StringConstant.empty;
        this.age = 0;
        //概况
        this.createdTime = TimeManager.Utc1970.getTime() / 1000;
        this.maxGold = 0;
        this.maxGoldOnetimes = 0;
        this.friendNum = 0;
        this.gameTimes = 0;
        this.winTimes = 0;
        this.maxHandList = undefined;
        this.maxHandName = StringConstant.empty;
        this.championTimes = 0;
        //收货信息
        this.addressName = StringConstant.empty;
        this.phoneNum = StringConstant.empty;
        this.qqNum = StringConstant.empty;
        this.eMail = StringConstant.empty;
        this.address = StringConstant.empty;
        //Vip信息
        this.vipType = 0;
        this.vipLevel = 0;
        this.vipExp = 0;
        this.vipSpeed = 0;
        this.vipTime = 0;
        this.yearVipTime = 0;
        //成就和任务信息
        this.allAchieveList = null;
    };
    Object.defineProperty(UserInfo.prototype, "diamond", {
        get: function () {
            return this._diamondNum;
        },
        set: function (value) {
            this._diamondNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "gold", {
        get: function () {
            return this._goldNum;
        },
        set: function (value) {
            this._goldNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "safeGold", {
        get: function () {
            return this._saveGoldNum;
        },
        set: function (value) {
            this._saveGoldNum = value;
        },
        enumerable: true,
        configurable: true
    });
    return UserInfo;
}(BaseServerValueInfo));
__reflect(UserInfo.prototype, "UserInfo");
//# sourceMappingURL=UserInfo.js.map