/**
 * 客户端活动开启状态
 */
var ActivityOpenState;
(function (ActivityOpenState) {
    /**
     * 空
     */
    ActivityOpenState[ActivityOpenState["None"] = 0] = "None";
    /**
     * 未开启
     */
    ActivityOpenState[ActivityOpenState["NotOpen"] = 1] = "NotOpen";
    /**
     * 已开启
     */
    ActivityOpenState[ActivityOpenState["Opened"] = 2] = "Opened";
    /**
     * 已结束
     */
    ActivityOpenState[ActivityOpenState["Finish"] = 3] = "Finish";
})(ActivityOpenState || (ActivityOpenState = {}));
//# sourceMappingURL=ActivityOpenState.js.map