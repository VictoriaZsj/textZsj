/**
 * 提示框面板
 */
class AlertInfoPanel extends BasePanel
{
	public titleTxt: eui.Label;
	public subTxt: eui.Label;
	public infoTxt: eui.Label;
	public confirmBtn: eui.Button;
	public cancelBtn: eui.Button;
	public group: eui.Group;
	public action:UserInfoComponent;

	public constructor()
	{
		super();
		this.maskAlpha = 0;
		this.layer = UILayerType.Tips;
		this.skinName = UISkinName.AlertInfoPanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		let ly: eui.HorizontalLayout = new eui.HorizontalLayout();
		ly.horizontalAlign = egret.HorizontalAlign.CENTER;
		ly.gap = 66;
		this.group.layout = ly;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.onRender(null);
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		// this.titleTxt.text = "提示";
		this.infoTxt.text = StringConstant.empty;
		this.subTxt.text = StringConstant.empty;
		// this.confirmBtn.label = "确定";
		// this.cancelBtn.label = "取消";
		this.infoTxt.textAlign = egret.HorizontalAlign.CENTER;
		if (this.panelData)
		{
			if (this.panelData.title)
			{
				// this.titleTxt.text = this.panelData.title;
			}
			if (this.panelData.subTitle)
			{
				this.subTxt.text = this.panelData.subTitle;
			}
			if (this.panelData.message)
			{
				this.infoTxt.textFlow = TextUtil.parser(this.panelData.message);
			}
			if (this.panelData.confirmLabel)
			{
				this.confirmBtn.label = this.panelData.confirmLabel;
			}
			if (this.panelData.cancelLabel)
			{
				this.cancelBtn.label = this.panelData.cancelLabel;
			}
			if (this.panelData.alignment)
			{
				this.infoTxt.textAlign = this.panelData.alignment;
			}
			if (this.panelData.isSingle)
			{
				this.cancelBtn.visible = false;
				this.addChild(this.cancelBtn);
			}
			else
			{
				this.cancelBtn.visible = true;
				this.group.addChildAt(this.cancelBtn, 0);
			}
		}
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
		this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
		if (this.panelData instanceof AlertInfo)
		{
			PoolUtil.PutObject(this.panelData);
		}
	}
	private onConfirmClick(event: egret.TouchEvent)
	{
		if (this.panelData && this.panelData.OnConfirm)
		{
			this.panelData.OnConfirm(this.panelData.confirmParam);
		}
		super.onCloseBtnClickHandler(event);
		if (!event)
		{
			SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
		}
	}
	private onCancelClick(event: egret.TouchEvent)
	{
		if (this.panelData && this.panelData.OnCancel)
		{
			this.panelData.OnCancel(this.panelData.cancleParam);
		}
		super.onCloseBtnClickHandler(event);
		if (!event)
		{
			SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
		}
	}
}
class AlertInfo implements IPoolObject
{
	/// <summary>
	/// 标题
	/// </summary>
	public title: string = StringConstant.empty;
	/// <summary>
	/// 副标题
	/// </summary>
	public subTitle: string = StringConstant.empty;
	/// <summary>
	/// 消息
	/// </summary>
	public message: string = StringConstant.empty;
	/// <summary>
	/// 确定按钮文本
	/// </summary>
	public confirmLabel: string = StringConstant.empty;
	/// <summary>
	/// 取消按钮文本
	/// </summary>
	public cancelLabel: string = StringConstant.empty;
	/// <summary>
	/// 确定回调
	/// </summary>
	public OnConfirm: Function = null;
	/// <summary>
	/// 取消回调
	/// </summary>
	public OnCancel: Function = null;
	/// <summary>
	/// 确定回调参数
	/// </summary>
	public confirmParam: any = null;
	/// <summary>
	/// 取消回调参数
	/// </summary>
	public cancleParam: any = null;
	/// <summary>
	/// 拓展数据
	/// </summary>
	public extraData: any = null;
	/// <summary>
	/// 文本对齐
	/// </summary>
	public alignment: string = egret.HorizontalAlign.CENTER;
	/**
	 * 是否是单按钮
	 */
	public isSingle: boolean = true;
	public reset()
	{
		this.title = StringConstant.empty;
		this.subTitle = StringConstant.empty;
		this.message = StringConstant.empty;
		this.confirmLabel = StringConstant.empty;
		this.cancelLabel = StringConstant.empty;
		this.OnConfirm = null;
		this.OnCancel = null;
		this.confirmParam = null;
		this.cancleParam = null;
		this.extraData = null;
		this.alignment = egret.HorizontalAlign.CENTER;
		this.isSingle = true;
	}
}