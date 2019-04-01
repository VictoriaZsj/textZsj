/**
 * 动画类型
 */
var AnimationType;
(function (AnimationType) {
    /**
     * 公共牌出现
     */
    AnimationType[AnimationType["CardFaceBoardAppear"] = 1] = "CardFaceBoardAppear";
    /**
     * 卡牌亮牌
     */
    AnimationType[AnimationType["CardFaceBright"] = 2] = "CardFaceBright";
    /**
     * 卡牌移动到某点
     */
    AnimationType[AnimationType["CardFaceMoveToPoint"] = 3] = "CardFaceMoveToPoint";
    /**
     * 卡牌翻牌
     */
    AnimationType[AnimationType["CardFaceTurnToFace"] = 4] = "CardFaceTurnToFace";
    /**
     * 本家手牌动画1
     */
    AnimationType[AnimationType["SelfCard1Appear"] = 5] = "SelfCard1Appear";
    /**
     * 本家手牌动画2
     */
    AnimationType[AnimationType["SelfCard2Appear"] = 6] = "SelfCard2Appear";
    /**
     * 发牌/弃牌 动画
     */
    AnimationType[AnimationType["FlopCard"] = 50] = "FlopCard";
    /**
     * 牌局面板移动
     */
    AnimationType[AnimationType["GamblingGameGroupMove"] = 100] = "GamblingGameGroupMove";
    /**
     * 通用基于当前位置移动到某点
     */
    AnimationType[AnimationType["CommonMoveToPointByNowPos"] = 101] = "CommonMoveToPointByNowPos";
    /**
     * 通用基于相对位置移动
     */
    AnimationType[AnimationType["CommonMoveToRelativelyPos"] = 102] = "CommonMoveToRelativelyPos";
    /**
     * 赢取筹码
     */
    AnimationType[AnimationType["WinChips"] = 103] = "WinChips";
})(AnimationType || (AnimationType = {}));
//# sourceMappingURL=AnimationEnum.js.map