var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 排行榜管理
 */
var RankManager = (function () {
    function RankManager() {
    }
    /**
    * 重置数据
    */
    RankManager.reset = function () {
        ArrayUtil.Clear(RankManager.currentRankList);
    };
    /**
     * 计算排行榜的type类型
     */
    RankManager.getListType = function (rankType, listType) {
        if (rankType == RankType.Vip) {
            return ReqRankType.Vip;
        }
        else {
            return rankType * 2 + listType + 1;
        }
    };
    /**
     * 拉取排行榜列表
     */
    RankManager.reqRankList = function (type, isGetMyRank) {
        if (isGetMyRank === void 0) { isGetMyRank = 1; }
        var callback = function (result) {
            RankManager.currentRankList = new Array();
            if (result.data["rankList"]) {
                for (var _i = 0, _a = result.data["rankList"]; _i < _a.length; _i++) {
                    var def = _a[_i];
                    var rank = new RankInfo();
                    rank.reset();
                    rank.copyValueFrom(def);
                    RankManager.currentRankList.push(rank);
                }
            }
            RankManager.getRankListEvent.dispatch(type);
        };
        SocketManager.call(Command.Req_RankList_3110, { "type": type }, callback, null, this);
    };
    /**
     * 获取排名描述
     */
    RankManager.getRankDes = function (rank, suffix) {
        var result = StringConstant.empty;
        switch (rank) {
            case 1:
                result += "冠";
                break;
            case 2:
                result += "亚";
                break;
            case 3:
                result += "季";
                break;
            default:
                return rank.toString();
        }
        if (suffix) {
            result += "军";
        }
        return result;
    };
    /**
     * 本次排行榜列表
     */
    RankManager.currentRankList = new Array();
    /**
     * 拉取排行榜事件
     */
    RankManager.getRankListEvent = new DelegateDispatcher();
    return RankManager;
}());
__reflect(RankManager.prototype, "RankManager");
//# sourceMappingURL=RankManager.js.map