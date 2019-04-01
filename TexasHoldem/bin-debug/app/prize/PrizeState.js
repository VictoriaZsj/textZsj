/**
 * 奖品状态
*/
var PrizeState;
(function (PrizeState) {
    /**
     * 未领取
    */
    PrizeState[PrizeState["NotReceive"] = 1] = "NotReceive";
    /**
     * 处理中 （等待发货或充值中）
    */
    PrizeState[PrizeState["Underway"] = 2] = "Underway";
    /**
     * 处理完成 （已发货或已充值）
    */
    PrizeState[PrizeState["Complete"] = 3] = "Complete";
})(PrizeState || (PrizeState = {}));
//# sourceMappingURL=PrizeState.js.map