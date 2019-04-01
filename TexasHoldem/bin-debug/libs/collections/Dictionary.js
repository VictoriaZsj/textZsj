var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 字典数据结构类
 */
var Dictionary = (function () {
    function Dictionary() {
        this.keys = [];
        this.values = [];
    }
    Object.defineProperty(Dictionary.prototype, "count", {
        get: function () {
            return this.keys.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加
     */
    Dictionary.prototype.add = function (key, value) {
        var index = this.keys.indexOf(key, 0);
        if (index >= 0) {
            this.values[index] = value;
        }
        else {
            this.keys.push(key);
            this.values.push(value);
        }
    };
    /**
     * 移除
     */
    Dictionary.prototype.remove = function (key) {
        var index = this.keys.indexOf(key, 0);
        if (index >= 0) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
    };
    /**
     * 根据值获取KEY
     */
    Dictionary.prototype.getKey = function (value) {
        var index = this.values.indexOf(value);
        if (index >= 0) {
            return this.keys[index];
        }
        return null;
    };
    /**
     *开启"[]"访问的情况下，缓存与字典数据为同一份，引用数据会同时修改，
     *非引用数据不能被修改，只能访问
     */
    Dictionary.prototype.getValue = function (key) {
        var index = this.keys.indexOf(key, 0);
        if (index != -1) {
            return this.values[index];
        }
        return null;
    };
    Dictionary.prototype.containsKey = function (key) {
        for (var i = 0, length_1 = this.keys.length; i < length_1; ++i) {
            if (this.keys[i] === key) {
                return true;
            }
        }
        return false;
    };
    Dictionary.prototype.containsValue = function (value) {
        for (var i = 0, length_2 = this.values.length; i < length_2; ++i) {
            if (this.values[i] === value) {
                return true;
            }
        }
        return false;
    };
    Dictionary.prototype.getKeys = function () {
        return this.keys;
    };
    Dictionary.prototype.getValues = function () {
        return this.values;
    };
    Dictionary.prototype.clear = function () {
        this.keys.length = 0;
        this.values.length = 0;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
//# sourceMappingURL=Dictionary.js.map