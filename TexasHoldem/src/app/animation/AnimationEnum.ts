/**
 * 动画类型
 */
enum AnimationType
{
	/**
	 * 公共牌出现
	 */
	CardFaceBoardAppear = 1,
	/**
	 * 卡牌亮牌
	 */
	CardFaceBright = 2,
	/**
	 * 卡牌移动到某点
	 */
	CardFaceMoveToPoint = 3,
	/**
	 * 卡牌翻牌
	 */
	CardFaceTurnToFace = 4,
	/**
	 * 本家手牌动画1
	 */
	SelfCard1Appear = 5,
	/**
	 * 本家手牌动画2
	 */
	SelfCard2Appear = 6,
	/**
	 * 发牌/弃牌 动画
	 */
	FlopCard = 50,
	/**
	 * 牌局面板移动
	 */
	GamblingGameGroupMove = 100,
	/**
	 * 通用基于当前位置移动到某点
	 */
	CommonMoveToPointByNowPos = 101,
	/**
	 * 通用基于相对位置移动
	 */
	CommonMoveToRelativelyPos = 102,
	/**
	 * 赢取筹码
	 */
	WinChips = 103,
}