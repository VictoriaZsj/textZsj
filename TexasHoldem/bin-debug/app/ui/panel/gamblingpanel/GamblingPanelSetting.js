var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌局面板设置
 */
var GamblingPanelSetting = (function () {
    function GamblingPanelSetting() {
    }
    /**
     * 向后获取指定差值个目标索引
     */
    GamblingPanelSetting.getNextIndex = function (sourceIndex, offset) {
        if (offset === void 0) { offset = 1; }
        sourceIndex += offset;
        if (sourceIndex > GamblingManager.maxSeats) {
            sourceIndex -= GamblingManager.maxSeats;
        }
        if (sourceIndex > GamblingManager.maxSeats) {
            sourceIndex = GamblingManager.maxSeats;
        }
        return sourceIndex;
    };
    /**
     * 向前获取指定差值个目标索引
     */
    GamblingPanelSetting.getPreIndex = function (sourceIndex, offset) {
        if (offset === void 0) { offset = 1; }
        sourceIndex -= offset;
        if (sourceIndex <= 0) {
            sourceIndex += GamblingManager.maxSeats;
        }
        if (sourceIndex < GamblingPanelSetting.MinPitIndex) {
            sourceIndex = GamblingPanelSetting.MinPitIndex;
        }
        return sourceIndex;
    };
    /**
     * 获取两个索引的差值
     */
    GamblingPanelSetting.getOffset = function (sourceIndex, targetIndex) {
        var offset = targetIndex - sourceIndex;
        if (offset < 0) {
            return offset + GamblingManager.maxSeats;
        }
        return offset;
    };
    Object.defineProperty(GamblingPanelSetting, "centerNum", {
        /**
         * 获取座位中间值
         */
        get: function () {
            if (GamblingManager.roomInfo && GamblingManager.roomInfo.definition) {
                return Math.floor(GamblingManager.roomInfo.definition.seat / 2) + 1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 最小坑位索引
     */
    GamblingPanelSetting.MinPitIndex = 1;
    /**
     * 荷官位置
     */
    GamblingPanelSetting.DILAPoint = new egret.Point(342, 473);
    /**
    * 按钮位置列表 位置从0-9
    */
    GamblingPanelSetting.buttonPosList = [
        new egret.Point(0, 0),
        new egret.Point(258, 964),
        new egret.Point(110, 832),
        new egret.Point(110, 476),
        new egret.Point(110, 274),
        new egret.Point(325, 252),
        new egret.Point(402, 250),
        new egret.Point(575, 274),
        new egret.Point(575, 476),
        new egret.Point(575, 832)
    ];
    /**
     * 头像位置列表 hcenter vcenter
     */
    GamblingPanelSetting.headPosList = [
        new egret.Point(0, 0),
        new egret.Point(-7, 413),
        new egret.Point(-311, 184),
        new egret.Point(-311, -164),
        new egret.Point(-311, -366),
        new egret.Point(-90, -478),
        new egret.Point(133, -478),
        new egret.Point(308, -366),
        new egret.Point(308, -164),
        new egret.Point(308, 184)
    ];
    /**
     * 公共牌列表
     */
    GamblingPanelSetting.boardPosList = [
        new egret.Point(-181, -15),
        new egret.Point(-90, -15),
        new egret.Point(1, -15),
        new egret.Point(92, -15),
        new egret.Point(182, -15),
    ];
    return GamblingPanelSetting;
}());
__reflect(GamblingPanelSetting.prototype, "GamblingPanelSetting");
//# sourceMappingURL=GamblingPanelSetting.js.map