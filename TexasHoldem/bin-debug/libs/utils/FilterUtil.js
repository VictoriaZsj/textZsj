var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*滤镜工具*/
var FilterUtil = (function () {
    function FilterUtil() {
    }
    Object.defineProperty(FilterUtil, "grayArray", {
        get: function () {
            return FilterUtil._grayArray;
        },
        enumerable: true,
        configurable: true
    });
    FilterUtil.defaultArray = function () {
        return FilterUtil._defaultArray;
    };
    /*灰度*/
    FilterUtil.setGray = function (target) {
        target.filters = FilterUtil._grayArray;
    };
    /*默认*/
    FilterUtil.setDefault = function (target) {
        target.filters = FilterUtil._defaultArray;
    };
    FilterUtil._grayMatrix = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    FilterUtil._grayFilter = new egret.ColorMatrixFilter(FilterUtil._grayMatrix);
    FilterUtil._grayArray = [FilterUtil._grayFilter];
    FilterUtil._defaultMatrix = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];
    FilterUtil._defaultColorFilter = new egret.ColorMatrixFilter(FilterUtil._defaultMatrix);
    FilterUtil._defaultArray = [FilterUtil._defaultColorFilter];
    return FilterUtil;
}());
__reflect(FilterUtil.prototype, "FilterUtil");
//# sourceMappingURL=FilterUtil.js.map