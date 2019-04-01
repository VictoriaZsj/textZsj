var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 颜色工具
 */
var ColorUtil = (function () {
    function ColorUtil() {
    }
    /**
     * 绿色
     */
    ColorUtil.Green = 0x9AFF00;
    /**
     * 红色
     */
    ColorUtil.Red = 0xFF0000;
    /**
     * 金色
     */
    ColorUtil.Golden = 0xFECF13;
    /**
     * 白色
     */
    ColorUtil.White = 0xFFFFFF;
    return ColorUtil;
}());
__reflect(ColorUtil.prototype, "ColorUtil");
//# sourceMappingURL=ColorUtil.js.map