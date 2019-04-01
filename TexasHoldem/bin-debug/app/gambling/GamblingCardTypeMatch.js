var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌型匹配
 */
var GamblingCardTypeMatch = (function () {
    function GamblingCardTypeMatch() {
    }
    GamblingCardTypeMatch.initialize = function () {
        GamblingCardTypeMatch.resultList = new Array();
        GamblingCardTypeMatch._matchList = new Array();
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchRoyalFlush);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchStraightFlush);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchFourOfAKind);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchFullhouse);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchFlush);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchStraight);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchThreeOfAKind);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchTwoPairs);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchOnePair);
        GamblingCardTypeMatch._matchList.push(GamblingCardTypeMatch.matchHighCard);
    };
    GamblingCardTypeMatch.clear = function () {
        GamblingCardTypeMatch.cardType = CardType.None;
    };
    /**
     * 匹配牌型
     */
    GamblingCardTypeMatch.matchCardType = function (handCardList) {
        if (!GamblingCardTypeMatch._matchList) {
            GamblingCardTypeMatch.initialize();
        }
        GamblingCardTypeMatch.clear();
        if (GamblingManager.roomInfo) {
            var allList = void 0;
            if (GamblingManager.roomInfo.cardList && handCardList) {
                allList = GamblingManager.roomInfo.cardList.concat(GamblingManager.roomInfo.handCardList);
            }
            else if (handCardList) {
                allList = handCardList.concat();
            }
            else if (GamblingManager.roomInfo.cardList) {
                allList = GamblingManager.roomInfo.cardList.concat();
            }
            if (allList) {
                for (var _i = 0, allList_1 = allList; _i < allList_1.length; _i++) {
                    var cardArr = allList_1[_i];
                    cardArr[2] = 0;
                }
                allList.sort(GamblingCardTypeMatch.sortByIndex);
                var func = void 0;
                for (var i = 0; i < GamblingCardTypeMatch._matchList.length; i++) {
                    func = GamblingCardTypeMatch._matchList[i];
                    if (func == GamblingCardTypeMatch.matchStraight || func == GamblingCardTypeMatch.matchStraightFlush) {
                        return GamblingCardTypeMatch.containAOper(func, allList);
                    }
                    else if (func(allList)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 包含A，算顺子，同花顺
     */
    GamblingCardTypeMatch.containAOper = function (func, allList) {
        if (func(allList)) {
            return true;
        }
        else {
            var isContainA = false;
            for (var j = 0; j < allList.length; j++) {
                if (allList[j][1] == CardDefined.GetInstance().maxCardIndex) {
                    isContainA = true;
                    break;
                }
            }
            if (isContainA) {
                for (var j = 0; j < allList.length; j++) {
                    if (allList[j][1] == CardDefined.GetInstance().maxCardIndex) {
                        allList[j][1] = CardDefined.GetInstance().minCardIndex;
                    }
                }
                allList.sort(GamblingCardTypeMatch.sortByIndex);
                var result = func(allList);
                for (var j = 0; j < allList.length; j++) {
                    if (allList[j][1] == CardDefined.GetInstance().minCardIndex) {
                        allList[j][1] = CardDefined.GetInstance().maxCardIndex;
                    }
                }
                return result;
            }
        }
        return false;
    };
    /**
     * 匹配皇家同花顺
     */
    GamblingCardTypeMatch.matchRoyalFlush = function (list) {
        var result = GamblingCardTypeMatch.matchStraightFlush(list);
        if (result && GamblingCardTypeMatch.resultList[0][1] == CardDefined.GetInstance().maxCardIndex) {
            GamblingCardTypeMatch.toFillMaxFlag();
            GamblingCardTypeMatch.cardType = CardType.RoyalFlush;
            return true;
        }
        return false;
    };
    /**
     * 匹配同花顺
     */
    GamblingCardTypeMatch.matchStraightFlush = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = GamblingManager.MaxCardNum - len;
            var startInfo = void 0;
            var nextInfo = void 0;
            var count = 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                count = 0;
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    count++;
                    if (startInfo[0] == nextInfo[0] && startInfo[1] - nextInfo[1] == count) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 4) {
                        GamblingCardTypeMatch.resultList = tmpList;
                        GamblingCardTypeMatch.toFillMaxFlag();
                        GamblingCardTypeMatch.cardType = CardType.StraightFlush;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配4条
     */
    GamblingCardTypeMatch.matchFourOfAKind = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = len - 4 + 1;
            var startInfo = void 0;
            var nextInfo = void 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (startInfo[1] == nextInfo[1]) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 3) {
                        GamblingCardTypeMatch.resultList = tmpList;
                        GamblingCardTypeMatch.toFillMaxFlag();
                        GamblingCardTypeMatch.toFillHighCard(list, tmpList[0][1], len);
                        GamblingCardTypeMatch.cardType = CardType.FourOfAKind;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配葫芦
     */
    GamblingCardTypeMatch.matchFullhouse = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = len - 3 + 1;
            var startInfo = void 0;
            var nextInfo = void 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (startInfo[1] == nextInfo[1]) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 2) {
                        var result = GamblingCardTypeMatch.toFillPair(list, tmpList, len);
                        if (result) {
                            GamblingCardTypeMatch.resultList = tmpList;
                            GamblingCardTypeMatch.toFillMaxFlag();
                            GamblingCardTypeMatch.cardType = CardType.Fullhouse;
                            return true;
                        }
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配同花
     */
    GamblingCardTypeMatch.matchFlush = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = GamblingManager.MaxCardNum - len;
            var startInfo = void 0;
            var nextInfo = void 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (startInfo[0] == nextInfo[0]) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 4) {
                        GamblingCardTypeMatch.resultList = tmpList;
                        GamblingCardTypeMatch.toFillMaxFlag();
                        GamblingCardTypeMatch.cardType = CardType.Flush;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配顺子
     */
    GamblingCardTypeMatch.matchStraight = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = GamblingManager.MaxCardNum - len;
            var startInfo = void 0;
            var nextInfo = void 0;
            var count = 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                count = 0;
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    count++;
                    if (startInfo[1] - nextInfo[1] == count) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 4) {
                        GamblingCardTypeMatch.resultList = tmpList;
                        GamblingCardTypeMatch.toFillMaxFlag();
                        GamblingCardTypeMatch.cardType = CardType.Straight;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配3条
     */
    GamblingCardTypeMatch.matchThreeOfAKind = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = len - 3 + 1;
            var startInfo = void 0;
            var nextInfo = void 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (startInfo[1] == nextInfo[1]) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 2) {
                        GamblingCardTypeMatch.resultList = tmpList;
                        GamblingCardTypeMatch.toFillMaxFlag();
                        GamblingCardTypeMatch.toFillHighCard(list, tmpList[0][1], len);
                        GamblingCardTypeMatch.cardType = CardType.ThreeOfAKind;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配两队
     */
    GamblingCardTypeMatch.matchTwoPairs = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var tmpList = new Array();
            var fitNum = 0;
            var numList = new Array();
            var cardInfo = void 0;
            for (var i = 0; i < len; i++) {
                cardInfo = list[i];
                GamblingCardTypeMatch.sameCardOper(list, cardInfo[1]);
                if (GamblingCardTypeMatch._sameCardList.length == 2) {
                    tmpList = tmpList.concat(GamblingCardTypeMatch._sameCardList);
                    fitNum++;
                    numList.push(cardInfo[1]);
                    if (fitNum == 2) {
                        GamblingCardTypeMatch.resultList = tmpList;
                        GamblingCardTypeMatch.toFillMaxFlag();
                        GamblingCardTypeMatch.toFillHighCard(list, numList, len);
                        GamblingCardTypeMatch.cardType = CardType.TwoPairs;
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 匹配一对
     */
    GamblingCardTypeMatch.matchOnePair = function (list) {
        var len = list.length;
        var tmpList = new Array();
        var fitNum = 0;
        var cardInfo;
        for (var i = 0; i < len; i++) {
            cardInfo = list[i];
            GamblingCardTypeMatch.sameCardOper(list, cardInfo[1]);
            if (GamblingCardTypeMatch._sameCardList.length == 2) {
                tmpList = tmpList.concat(GamblingCardTypeMatch._sameCardList);
                fitNum++;
                if (fitNum == 1) {
                    GamblingCardTypeMatch.resultList = tmpList;
                    GamblingCardTypeMatch.toFillMaxFlag();
                    GamblingCardTypeMatch.toFillHighCard(list, cardInfo[1], len);
                    GamblingCardTypeMatch.cardType = CardType.OnePair;
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 匹配高牌
     */
    GamblingCardTypeMatch.matchHighCard = function (list) {
        GamblingCardTypeMatch.toFillHighCard(list, -1, list.length);
        GamblingCardTypeMatch.toFillMaxFlag();
        // if (GamblingCardTypeMatch.resultList.length > 0)
        // {
        // 	GamblingCardTypeMatch.resultList[0].push(1); //最大牌
        // }
        GamblingCardTypeMatch.cardType = CardType.HighCard;
        return true;
    };
    /**
     * 填充对子
     */
    GamblingCardTypeMatch.toFillPair = function (list, tmpList, len) {
        var info;
        var count;
        var tmpInfo = tmpList[0];
        for (var i = 0; i < len; i++) {
            info = list[i];
            if (info[1] != tmpInfo[1]) {
                GamblingCardTypeMatch.sameCardOper(list, info[1]);
                if (GamblingCardTypeMatch._sameCardList.length == 2) {
                    tmpList = tmpList.concat(GamblingCardTypeMatch._sameCardList);
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 填充高牌
     */
    GamblingCardTypeMatch.toFillHighCard = function (list, excludeIndex, len) {
        var info;
        for (var i = 0; i < len; i++) {
            info = list[i];
            if (GamblingCardTypeMatch.resultList.length < GamblingManager.MaxBoardNum) {
                if (typeof excludeIndex == "number" && info[1] != excludeIndex) {
                    GamblingCardTypeMatch.resultList.push(info);
                }
                else if (excludeIndex instanceof Array && excludeIndex.indexOf(info[1]) == -1) {
                    GamblingCardTypeMatch.resultList.push(info);
                }
                if (GamblingCardTypeMatch.resultList.length == GamblingManager.MaxBoardNum) {
                    break;
                }
            }
        }
    };
    /**
     * 获取卡牌的数量
     */
    GamblingCardTypeMatch.sameCardOper = function (list, index) {
        if (!GamblingCardTypeMatch._sameCardList) {
            GamblingCardTypeMatch._sameCardList = new Array();
        }
        GamblingCardTypeMatch._sameCardList.length = 0;
        var len = list.length;
        var count = 0;
        for (var i = 0; i < len; i++) {
            if (list[i][1] == index) {
                GamblingCardTypeMatch._sameCardList.push(list[i]);
            }
        }
    };
    /**
     * 降序排列牌列表
     */
    GamblingCardTypeMatch.sortByIndex = function (a, b) {
        if (a[1] > b[1]) {
            return -1;
        }
        if (a[1] < b[1]) {
            return 1;
        }
        return 0;
    };
    GamblingCardTypeMatch.toFillMaxFlag = function () {
        var len = GamblingCardTypeMatch.resultList.length;
        for (var i = 0; i < len; i++) {
            GamblingCardTypeMatch.resultList[i][2] = 1; //添加最大牌标记
        }
    };
    /**
    * 获取卡牌描述
    */
    GamblingCardTypeMatch.getCardDes = function (type) {
        switch (type) {
            case CardType.RoyalFlush:
                return "皇家同花顺";
            case CardType.StraightFlush:
                return "同花顺";
            case CardType.FourOfAKind:
                return "四条";
            case CardType.Fullhouse:
                return "葫芦";
            case CardType.Flush:
                return "同花";
            case CardType.Straight:
                return "顺子";
            case CardType.ThreeOfAKind:
                return "三条";
            case CardType.TwoPairs:
                return "两对";
            case CardType.OnePair:
                return "一对";
            case CardType.HighCard:
                return "高牌";
            default:
                return StringConstant.empty;
        }
    };
    return GamblingCardTypeMatch;
}());
__reflect(GamblingCardTypeMatch.prototype, "GamblingCardTypeMatch");
//# sourceMappingURL=GamblingCardTypeMatch.js.map