/**
 * 基础项渲染信息
 */
abstract class BaseItemRenderer<T> extends eui.ItemRenderer
{
	public bindData: T;
	public constructor()
	{
		super();
		this.skinName = "";
	}
	protected createChildren()
	{
		this.dataChanged();
	}
	protected dataChanged(): void
	{
		this.bindData = this.data;
	}
	public destroy()
	{

	}
}