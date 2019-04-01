var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌的排序
 */
var SortUtil = (function () {
    function SortUtil() {
    }
    SortUtil.sortCardById = function (card1, card2) {
        if (card1.id > card2.id) {
            return 1;
        }
        if (card1.id < card2.id) {
            return -1;
        }
        return 0;
    };
    SortUtil.sortY = function (a, b) {
        if (a.y > b.y) {
            return 1;
        }
        if (a.y < b.y) {
            return -1;
        }
        return 0;
    };
    SortUtil.downSort = function (a, b) {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    };
    /**
     * 按照盲注升序排序(买入适用)
    */
    SortUtil.blindUpSort = function (a, b) {
        if (a.smallBlind > b.smallBlind) {
            return 1;
        }
        if (a.smallBlind < b.smallBlind) {
            return -1;
        }
        if (a.smallBlind == b.smallBlind) {
            if (a.player > b.player) {
                return 1;
            }
            if (a.player < b.player) {
                return -1;
            }
            if (a.player == b.player) {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
                return 0;
            }
        }
    };
    /**
     * 按照盲注降序排序(买入适用)
    */
    SortUtil.blindDownSort = function (a, b) {
        if (a.smallBlind > b.smallBlind) {
            return -1;
        }
        if (a.smallBlind < b.smallBlind) {
            return 1;
        }
        if (a.smallBlind == b.smallBlind) {
            if (a.player > b.player) {
                return -1;
            }
            if (a.player < b.player) {
                return 1;
            }
            if (a.player == b.player) {
                if (a.id > b.id) {
                    return -1;
                }
                if (a.id < b.id) {
                    return 1;
                }
                return 0;
            }
        }
    };
    /**
     * 按照房间id升序排序
    */
    SortUtil.roomIdUpSort = function (a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    };
    /**
     * 按照房间id降序排序
    */
    SortUtil.roomIdDownSort = function (a, b) {
        if (a.id > b.id) {
            return -1;
        }
        if (a.id < b.id) {
            return 1;
        }
        return 0;
    };
    /**
     * 按照在玩人数升序排序
    */
    SortUtil.roomPlayNumUpSort = function (a, b) {
        if (a.player > b.player) {
            return 1;
        }
        if (a.player < b.player) {
            return -1;
        }
        if (a.player == b.player) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        }
    };
    /**
     * 按照在玩人数降序排序
    */
    SortUtil.roomPlayNumDownSort = function (a, b) {
        if (a.player > b.player) {
            return -1;
        }
        if (a.player < b.player) {
            return 1;
        }
        if (a.player == b.player) {
            if (a.id > b.id) {
                return -1;
            }
            if (a.id < b.id) {
                return 1;
            }
            return 0;
        }
        return 0;
    };
    return SortUtil;
}());
__reflect(SortUtil.prototype, "SortUtil");
//# sourceMappingURL=SortUtil.js.map