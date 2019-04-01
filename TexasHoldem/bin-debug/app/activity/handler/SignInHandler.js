var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 签到管理
 */
var SignInHandler = (function () {
    function SignInHandler() {
        this.signInList = new Array();
        this.isTodaySignIn = false;
    }
    SignInHandler.prototype.initialize = function (lastTime, signInDayNum) {
        this.lastTime = lastTime;
        this.signInDayNum = signInDayNum;
        var compareResult = this.compareDate();
        if (compareResult) {
            ActivityManager.signInHandler.isTodaySignIn = true;
        }
        var def;
        for (var i = 0; i < SignInDefined.GetInstance().dataList.length; i++) {
            def = new SignInInfo();
            def.id = SignInDefined.GetInstance().dataList[i].id;
            this.signInList.push(def);
        }
        ;
    };
    SignInHandler.prototype.onEnable = function () {
        ArrayUtil.Clear(this.signInList);
    };
    SignInHandler.prototype.resetSignIn = function () {
        this.isTodaySignIn = false;
    };
    /**
     * 日期比较
    */
    SignInHandler.prototype.compareDate = function () {
        var today = new Date();
        var todayDate = DateTimeUtil.formatTimestamp(today.getTime(), DateTimeUtil.Format_Standard_Date);
        var lastTimeDate = DateTimeUtil.formatTimestamp(ActivityManager.signInHandler.lastTime, DateTimeUtil.Format_Standard_Date);
        var Date1 = new Date(todayDate);
        var Date2 = new Date(lastTimeDate);
        if (Date1.getTime() == Date2.getTime()) {
            return true;
        }
        else {
            return false;
        }
    };
    return SignInHandler;
}());
__reflect(SignInHandler.prototype, "SignInHandler");
var SignInInfo = (function () {
    function SignInInfo() {
        this._id = 0;
    }
    Object.defineProperty(SignInInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = SignInDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignInInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            this._definition = value;
        },
        enumerable: true,
        configurable: true
    });
    return SignInInfo;
}());
__reflect(SignInInfo.prototype, "SignInInfo");
var SignInDay;
(function (SignInDay) {
    /**
     * 签到3天
    */
    SignInDay[SignInDay["signInThree"] = 2] = "signInThree";
    /**
     * 签到5天
    */
    SignInDay[SignInDay["signInFive"] = 4] = "signInFive";
    /**
     * 签到7天
    */
    SignInDay[SignInDay["signInSeven"] = 6] = "signInSeven";
})(SignInDay || (SignInDay = {}));
//# sourceMappingURL=SignInHandler.js.map