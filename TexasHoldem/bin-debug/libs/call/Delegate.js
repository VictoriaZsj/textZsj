var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 委托
 */
var Delegate = (function () {
    function Delegate(method, target) {
        this._method = method;
        this._target = target;
    }
    Object.defineProperty(Delegate.prototype, "method", {
        get: function () {
            return this._method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Delegate.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否相等
     */
    Delegate.prototype.equals = function (obj) {
        if (obj != null) {
            if (this._method == obj._method && this._target == obj._target) {
                return true;
            }
        }
        return false;
    };
    /**
     * 是否相等
     */
    Delegate.prototype.equals2 = function (method, target) {
        if (this._method == method && this._target == target) {
            return true;
        }
        return false;
    };
    Delegate.prototype.invoke = function (params) {
        FuncUtil.invoke(this._method, this._target, params);
    };
    return Delegate;
}());
__reflect(Delegate.prototype, "Delegate");
//# sourceMappingURL=Delegate.js.map