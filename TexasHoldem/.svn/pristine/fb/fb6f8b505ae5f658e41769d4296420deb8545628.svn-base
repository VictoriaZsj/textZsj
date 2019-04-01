/**
 * 牌局面板设置
 */
class GamblingPanelSetting
{
	/**
	 * 最小坑位索引
	 */
	public static readonly MinPitIndex: number = 1;

	/**
	 * 荷官位置
	 */
	public static readonly DILAPoint: egret.Point = new egret.Point(342, 473);

	/**
 	* 按钮位置列表 位置从0-9
 	*/
	public static buttonPosList: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(258, 964),
		new egret.Point(110, 832),
		new egret.Point(110, 476),
		new egret.Point(110, 274),
		new egret.Point(325, 252),
		new egret.Point(402, 250),
		new egret.Point(575, 274),
		new egret.Point(575, 476),
		new egret.Point(575, 832)];
	/**
	 * 头像位置列表 hcenter vcenter
	 */
	public static headPosList: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(-7, 413),
		new egret.Point(-311, 184),
		new egret.Point(-311, -164),
		new egret.Point(-311, -366),
		new egret.Point(-90, -478),
		new egret.Point(133, -478),
		new egret.Point(308, -366),
		new egret.Point(308, -164),
		new egret.Point(308, 184)];
	/**
	 * 公共牌列表
	 */
	public static boardPosList: Array<egret.Point> = [
		new egret.Point(-181, -15),
		new egret.Point(-90, -15),
		new egret.Point(1, -15),
		new egret.Point(92, -15),
		new egret.Point(182, -15),
	];
	/**
	 * 向后获取指定差值个目标索引
	 */
	public static getNextIndex(sourceIndex: number, offset: number = 1): number
	{
		sourceIndex += offset;
		if (sourceIndex > GamblingManager.maxSeats)
		{
			sourceIndex -= GamblingManager.maxSeats;
		}
		if (sourceIndex > GamblingManager.maxSeats)
		{
			sourceIndex = GamblingManager.maxSeats;
		}
		return sourceIndex;
	}
	/**
	 * 向前获取指定差值个目标索引
	 */
	public static getPreIndex(sourceIndex: number, offset: number = 1): number
	{
		sourceIndex -= offset;
		if (sourceIndex <= 0)
		{
			sourceIndex += GamblingManager.maxSeats;
		}
		if (sourceIndex < GamblingPanelSetting.MinPitIndex)
		{
			sourceIndex = GamblingPanelSetting.MinPitIndex;
		}
		return sourceIndex;
	}

	/**
	 * 获取两个索引的差值
	 */
	public static getOffset(sourceIndex: number, targetIndex: number): number
	{
		let offset: number = targetIndex - sourceIndex;
		if (offset < 0)
		{
			return offset + GamblingManager.maxSeats;
		}
		return offset;
	}
	/**
	 * 获取座位中间值
	 */
	public static get centerNum(): number
	{
		if (GamblingManager.roomInfo && GamblingManager.roomInfo.definition)
		{
			return Math.floor(GamblingManager.roomInfo.definition.seat / 2) + 1;
		}
		return 0;
	}
}