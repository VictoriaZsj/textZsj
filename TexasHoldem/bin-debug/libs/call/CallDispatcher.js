var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CallDispatcher = (function () {
    function CallDispatcher() {
        this._map = new Dictionary();
    }
    /**
     * 销毁
     */
    CallDispatcher.prototype.dispose = function () {
        this._map = null;
    };
    CallDispatcher.prototype.clear = function () {
        this._map.clear();
    };
    Object.defineProperty(CallDispatcher.prototype, "count", {
        /**
         * 已添加回调侦听的呼叫类型数量
         */
        get: function () {
            return this._map.count;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加呼叫回调侦听(自动过滤重复的方法)
     */
    CallDispatcher.prototype.addListener = function (callId, listener, thisObject) {
        var list = this._map.getValue(callId);
        if (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                if (item.equals2(listener, thisObject)) {
                    return;
                }
            }
        }
        else {
            list = new Array();
            this._map.add(callId, list);
        }
        list.push(new Delegate(listener, thisObject));
    };
    /**
     * 移除呼叫回调
     */
    CallDispatcher.prototype.removeListener = function (callId, listener, thisObject) {
        var list = this._map.getValue(callId);
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].equals2(listener, thisObject)) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * 广播呼叫回调
     */
    CallDispatcher.prototype.dispatch = function (callId, data) {
        var list = this._map.getValue(callId);
        if (list) {
            var count = list.length;
            for (var i = 0; i < list.length; i++) {
                list[i].invoke(data);
                if (list.length < count) {
                    i -= (count - list.length);
                }
            }
        }
    };
    return CallDispatcher;
}());
__reflect(CallDispatcher.prototype, "CallDispatcher");
//# sourceMappingURL=CallDispatcher.js.map