/*滤镜工具*/
class FilterUtil
{
	private static _grayMatrix: Array<number> = [
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0, 0, 0, 1, 0
		];
	private static _grayFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(FilterUtil._grayMatrix);
	private static _grayArray: Array<egret.ColorMatrixFilter> = [FilterUtil._grayFilter];
	public static get grayArray(): Array<egret.ColorMatrixFilter>
	{
		return FilterUtil._grayArray;
	}
	private static _defaultMatrix: Array<number> = [
		1, 0, 0, 0, 0,
		0, 1, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0
	];
	private static _defaultColorFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(FilterUtil._defaultMatrix);
	private static _defaultArray: Array<egret.ColorMatrixFilter> = [FilterUtil._defaultColorFilter];
	public static defaultArray():Array<egret.ColorMatrixFilter>
	{
		return FilterUtil._defaultArray;
	}
	/*灰度*/
	public static setGray(target: egret.DisplayObject)
	{
		target.filters = FilterUtil._grayArray;
	}
	/*默认*/
	public static setDefault(target: egret.DisplayObject)
	{
		target.filters = FilterUtil._defaultArray;
	}
}

