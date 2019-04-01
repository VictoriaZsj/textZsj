var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 时间管理
 */
var TimeManager = (function () {
    function TimeManager() {
    }
    TimeManager.initialize = function (data) {
        if (data) {
            TimeManager._timeZone = 0;
            if (data["timezone"]) {
                TimeManager._timeZone = data["timezone"] * 1000;
            }
            TimeManager._loginTimestamp = 0;
            if (data["timestamp"]) {
                TimeManager._loginTimestamp = data["timestamp"];
                TimeManager.SetServerTimestamp(data);
            }
        }
        SocketManager.AddCommandListener(Command.System_Push_ResetTime0_2015, TimeManager.onResetTime, this);
    };
    TimeManager.onResetTime = function (result) {
        TimeManager.resetTime0Event.dispatch();
    };
    TimeManager.SetServerTimestamp = function (data) {
        TimeManager._serverTimestamp = 0;
        if (data["timestamp"]) {
            TimeManager._serverTimestamp = data["timestamp"] * 1000;
        }
        TimeManager._serverSyncDateTime = new Date();
    };
    /**
     *  获取当次登录后的在线时长(秒)
     */
    TimeManager.GetCurrentOnlineLength = function () {
        return TimeManager.GetServerUtcTimestamp() - TimeManager._loginTimestamp;
    };
    /// <summary>
    /// 获取服务器时区差值(秒)
    /// </summary>
    /// <returns></returns>
    TimeManager.GetServerTimeZone = function () {
        return TimeManager._timeZone;
    };
    /**
     *  获取当前服务器UTC时间总毫秒秒数（UTC1970年到现在）
     */
    TimeManager.GetServerUtcMilliTimestamp = function () {
        if (TimeManager._serverTimestamp == 0) {
            return 0;
        }
        return TimeManager._serverTimestamp + (Date.now() - Date.parse(TimeManager._serverSyncDateTime.toUTCString()));
    };
    /**
     *  获取当前服务器UTC时间总秒数（UTC1970年到现在）
     */
    TimeManager.GetServerUtcTimestamp = function () {
        return TimeManager.GetServerUtcMilliTimestamp() / 1000;
    };
    /// <summary>
    /// 获取服务器当前本地时间
    /// </summary>
    /// <param name="offsetHours">偏移小时</param>
    /// <returns></returns>
    TimeManager.GetServerLocalDateTime = function (offsetHours) {
        if (offsetHours === void 0) { offsetHours = 0; }
        var date;
        var ms;
        if (offsetHours != 0) {
            ms = TimeManager.GetServerUtcMilliTimestamp() + offsetHours * 3600 * 1000;
            date = new Date(ms);
            return date;
        }
        ms = TimeManager.GetServerUtcMilliTimestamp();
        date = new Date();
        date.setTime(ms);
        return date;
    };
    /// <summary>
    /// 获取当日五点刷新时间点
    /// </summary>
    /// <returns></returns>
    TimeManager.GetFiveRefreshLocalTime = function () {
        var date = TimeManager.GetServerLocalDateTime();
        return new Date(date.getFullYear(), date.getMonth(), date.getDay(), 5);
    };
    TimeManager._serverTimestamp = 0; //utc时间，当前服务器时间
    TimeManager._loginTimestamp = 0; //utc时间，登录的服务器时间
    /**
     * 零点重置事件
     */
    TimeManager.resetTime0Event = new DelegateDispatcher();
    /**
     * 1970UTC
     */
    TimeManager.Utc1970 = new Date(1970, 0, 1, 0, 0, 0, 0);
    return TimeManager;
}());
__reflect(TimeManager.prototype, "TimeManager");
//# sourceMappingURL=TimeManager.js.map