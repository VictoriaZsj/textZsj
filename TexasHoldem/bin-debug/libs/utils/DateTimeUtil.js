var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 时间处理工具
 */
var DateTimeUtil = (function () {
    function DateTimeUtil() {
    }
    DateTimeUtil.baseDateFormat = function (date, format, tpl) {
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in tpl) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? tpl[k] : ("00" + tpl[k]).substr(("" + tpl[k]).length));
            }
        }
        return format;
    };
    /**
     * 把Date对象格式化为yyyy-MM-dd h:m:s格式的日期时间
     * 参数date不填则为当前日期时间
     */
    DateTimeUtil.formatDate = function (date, format) {
        if (!date) {
            date = new Date();
        }
        if (!format) {
            format = DateTimeUtil.Format_Standard_Full;
        }
        var tpl = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S+': date.getMilliseconds()
        };
        return DateTimeUtil.baseDateFormat(date, format, tpl);
    };
    /**
     * 把时间戳（秒）格式化为yyyy-MM-dd h:m:s格式的日期时间
     * 参数timestamp不填则为当前日期时间
     */
    DateTimeUtil.formatTimestamp = function (timestamp, format) {
        var date = new Date();
        if (timestamp != undefined && timestamp != null) {
            date.setTime(timestamp * 1000);
        }
        return DateTimeUtil.formatDate(date, format);
    };
    ;
    /**
     * 把yyyy-MM-dd h:m:s格式的日期时间转为时间戳(秒)
     * 如果不填则获取当前时间戳(秒)
     */
    DateTimeUtil.toTimestamp = function (unixTime) {
        var date = unixTime ? new Date(unixTime) : new Date();
        return Math.round(date.getTime() / 1000);
    };
    /**
     * 格式化倒计时
     */
    DateTimeUtil.formatCountdown = function (num) {
        if (num >= 10) {
            return num.toString();
        }
        else {
            return "0" + num.toString();
        }
    };
    /**
     * 字符串转日期格式
     */
    DateTimeUtil.stringToDate = function (str) {
        var array = StringUtil.toIntArray(str);
        if (array) {
            return new Date(array[0], array[1], array[2], array[3], array[4], array[5]);
        }
        return null;
    };
    DateTimeUtil.Format_Standard_Full = "yyyy-MM-dd hh:mm:ss";
    DateTimeUtil.Format_Standard_Date = "yyyy-MM-dd";
    DateTimeUtil.Format_Standard_Time = "hh:mm:ss";
    DateTimeUtil.Format_Standard_NoSecond = "yyyy-MM-dd hh:mm";
    DateTimeUtil.Format_China_Full = "yyyy年MM月dd日 hh时mm分ss秒";
    DateTimeUtil.Format_China_Date = "yyyy年MM月dd日";
    DateTimeUtil.Format_China_Time = "hh时mm分ss秒";
    DateTimeUtil.Format_China_NoSecond = "yyyy年MM月dd日 hh时mm分";
    return DateTimeUtil;
}());
__reflect(DateTimeUtil.prototype, "DateTimeUtil");
//# sourceMappingURL=DateTimeUtil.js.map