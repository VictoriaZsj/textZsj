/**
 * 底池 边池筹码显示项
 */
class ChipsShowRenderer extends BaseItemRenderer<number>
{
	public chips: ChipsShowComponent;
	public constructor()
	{
		super();
		this.skinName = UIRendererSkinName.ChipsShowRenderer;
	}
	protected createChildren()
	{
		this.dataChanged();
	}
	protected dataChanged(): void
	{
		super.dataChanged();
		if (this.bindData > 0 && this.chips)
		{
			this.chips.init(this.bindData);
		}
	}
}