/**
 * 行牌接口
 */
interface IGamblingHandler
{
	/**
	 * 一局开始
	 */
	roundStart();
	/**
	 * 一局结束
	 */
	roundOver();
	/**
	 * 一圈结束
	 */
	loopOver();
}