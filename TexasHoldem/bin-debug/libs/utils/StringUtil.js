var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 字符串工具
 */
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.toBoolean = function (str) {
        if (StringUtil.isNullOrEmpty(str)) {
            return false;
        }
        if (str == '0' || str == 'false') {
            return false;
        }
        return true;
    };
    /**
     * 是否是undefined null ""
     */
    StringUtil.isNullOrEmpty = function (str) {
        if (str === undefined || str === null || str === "") {
            return true;
        }
        return false;
    };
    /**
     * 是否是undefined null(不包括空字符串)
     */
    StringUtil.isNull = function (str) {
        if (str === undefined || str === null) {
            return true;
        }
        return false;
    };
    /**
     * 格式化
     */
    StringUtil.format = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args && str) {
            for (var i = 0; i < args.length; i++) {
                str = str.replace("{" + i.toString() + "}", args[i]);
            }
        }
        return str;
    };
    /**
     * 字符串转换成int数组
     */
    StringUtil.toIntArray = function (content, separator) {
        if (separator === void 0) { separator = ','; }
        var stringList = StringUtil.toStringArray(content, separator);
        if (stringList == null) {
            return null;
        }
        var list = new Array(stringList.length);
        var str;
        for (var i = 0; i < stringList.length; i++) {
            str = stringList[i];
            list[i] = str ? parseInt(str) : 0;
        }
        return list;
    };
    /**
     * 字符串转换成float数组
     */
    StringUtil.toFloatArray = function (content, separator) {
        if (separator === void 0) { separator = ','; }
        var stringList = StringUtil.toStringArray(content, separator);
        if (stringList == null) {
            return null;
        }
        var list = new Array(stringList.length);
        var str;
        for (var i = 0; i < stringList.length; i++) {
            list[i] = str ? parseFloat(str) : 0;
        }
        return list;
    };
    /**
     * 字符串转换成字符数组
     */
    StringUtil.toStringArray = function (content, separator) {
        if (separator === void 0) { separator = ','; }
        if (!content) {
            return null;
        }
        return content.split(separator);
    };
    return StringUtil;
}());
__reflect(StringUtil.prototype, "StringUtil");
//# sourceMappingURL=StringUtil.js.map