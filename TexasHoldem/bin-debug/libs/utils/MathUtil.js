var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    // Obtient une valeur comprise dans un interval
    MathUtil.clamp = function (value, min, max) {
        if (value < min) {
            return min;
        }
        else if (value > max) {
            return max;
        }
        return value;
    };
    ;
    // Obtient une interpolation linéaire entre 2 valeurs
    MathUtil.lerp = function (value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    };
    /**
     * 获取一个随机值含头尾
     */
    MathUtil.getRandom = function (start, end) {
        return Math.round(Math.random() * (end - start)) + start;
    };
    /**
     * 将大于一万的数转换为数字加“万”或“亿”
    */
    MathUtil.formatNum = function (num) {
        var str;
        if (num < 10000) {
            str = num.toString();
            return str;
        }
        if (num >= 10000 && num < 100000000) {
            if (num % 10000 < 100) {
                str = (num / 10000) + "万";
            }
            else if (num % 1000 < 100) {
                str = MathUtil.fixedFloor(num / 10000, 1) + "万";
            }
            else {
                str = MathUtil.fixedFloor(num / 10000, 2) + "万";
            }
            return str;
        }
        if (num >= 100000000) {
            if (num % 100000000 < 1000000) {
                str = (num / 100000000) + "亿";
            }
            else if (num % 10000000 < 1000000) {
                str = MathUtil.fixedFloor(num / 100000000, 1) + "亿";
            }
            else {
                str = MathUtil.fixedFloor(num / 100000000, 2) + "亿";
            }
            return str;
        }
    };
    /**
    *
    */
    MathUtil.fixedFloor = function (num, fractionDigits) {
        if (!fractionDigits) {
            fractionDigits = 0;
        }
        var str = num.toString();
        if (str.indexOf(".") + fractionDigits + 1 > str.length) {
            return str;
        }
        else {
            return str.substring(0, str.indexOf(".") + fractionDigits + 1);
        }
    };
    /**
     * 弧度转角度计量值
     */
    MathUtil.Radian2Angle = 180 / Math.PI;
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=MathUtil.js.map