var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 函数调用工具
 */
var FuncUtil = (function () {
    function FuncUtil() {
    }
    /**
     * 调用函数
     */
    FuncUtil.invoke = function (func, thisObject, params) {
        if (func) {
            if (thisObject) {
                if (params === undefined) {
                    func.call(thisObject);
                }
                else {
                    func.call(thisObject, params);
                }
            }
            else {
                if (params === undefined) {
                    func();
                }
                else {
                    func(params);
                }
            }
        }
    };
    return FuncUtil;
}());
__reflect(FuncUtil.prototype, "FuncUtil");
//# sourceMappingURL=FuncUtil.js.map