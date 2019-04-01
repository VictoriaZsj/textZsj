/**
 * 牌面显示组件
 */
class CardFaceComponent extends BaseComponent<Array<number>>
{
	public backFace: eui.Image;
	public cardGroup: eui.Group;
	public numImg: eui.Image;
	public flushBigImg: eui.Image;
	public flushSmallImg: eui.Image;
	public frontFaceImg: eui.Image;
	public maskImg: eui.Image;
	public maxFlagImg: eui.Image;

	public initMatrix: egret.Matrix;
    public mcGroup:eui.Group;
	public constructor()
	{
		super();
		this.skinName = UIComponentSkinName.CardFaceComponent;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
	}
	public init(data: Array<number>)
	{
		super.init(data);
		this.rendererStart(null);
	}
	protected rendererStart(event: egret.Event)
	{
		super.rendererStart(event);

		this.backFace.visible = true;
		this.cardGroup.visible = false;
		this.showMask(false);
		this.showMaxFlag(false);

		if (this.bindData)
		{
			let numRes: string = StringConstant.empty;
			let bigRes: string = StringConstant.empty;

			if (this.bindData[0] > 2)
			{
				numRes = ResPrefixName.card + ResPrefixName.FlushBlack + this.bindData[1] + ResSuffixName.PNGSuffix;
			}
			else
			{
				numRes = ResPrefixName.card + ResPrefixName.FlushRed + this.bindData[1] + ResSuffixName.PNGSuffix;
			}

			this.numImg.source = numRes;
			this.flushSmallImg.source = ResPrefixName.Flush + this.bindData[0] + ResSuffixName.PNGSuffix;

			//大于10，小于A
			if (this.bindData[1] > GamblingManager.FlushSplitIndex && this.bindData[1] < CardDefined.GetInstance().maxCardIndex)
			{
				bigRes = ResPrefixName.card + this.bindData[0] + "_" + this.bindData[1] + ResSuffixName.PNGSuffix;
			}
			else
			{
				bigRes = ResPrefixName.Flush + this.bindData[0] + ResSuffixName.PNGSuffix;
			}
			this.flushBigImg.source = bigRes;
		}
		else
		{
			this.numImg.source = "";
			this.flushBigImg.source = "";
			this.flushSmallImg.source = "";
		}
		if (!this.initMatrix)
		{
			this.initMatrix = this.matrix.clone();
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
		}
	}
	public disappear()
	{
		this.visible = false;
	}
	public showMask(flag: boolean)
	{
		this.maskImg.visible = flag;
	}
	public showMaxFlag(flag: boolean)
	{
		this.maxFlagImg.visible = flag;
	}
	public initElementsShow()
	{
		this.backFace.visible = true;
		this.cardGroup.visible = false;
		this.frontFaceImg.visible = false;
	}
	public initElementsShow2()
	{
		this.backFace.visible = false;
		this.frontFaceImg.visible = false;
		this.cardGroup.visible = true;
	}
}