/**
 * 买入游戏面板
 */
class BuyAccessGamePanel extends BasePanel
{
	public unEnoughGoldGp: eui.Group;
	public buyAccessGp: eui.Group;
	public currentProperty: eui.Label;
	public countLable: eui.Label;
	public smallestLabel: eui.Label;
	public biggestLabel: eui.Label;
	public buyAccessHs: eui.HSlider;
	public autoBuyCheck: eui.CheckBox;
	public shoppingBtn: eui.Button;
	public buyAccessBtn: eui.Button;
	public priceLabel: eui.Label;
	public goldLabel: eui.Label;
	public buyNowBtn: eui.Button;

	public constructor()
	{
		super();
		this.skinName = UISkinName.BuyAccessGamePanel;
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		if (UserManager.userInfo.gold < appendData.minNum)
		{
			this.buyAccessGp.visible = false;
			this.unEnoughGoldHandle(appendData.minNum);
			this.unEnoughGoldGp.visible = true;
		}
		else
		{
			this.unEnoughGoldGp.visible = false;
			this.buyAccessGp.visible = true;
			this.smallestLabel.text = MathUtil.formatNum(appendData.minNum);
			this.biggestLabel.text = MathUtil.formatNum(appendData.maxNum);
			this.currentProperty.text = MathUtil.formatNum(UserManager.userInfo.gold);
			this.buyAccessHs.minimum = appendData.minNum;
			this.buyAccessHs.maximum = appendData.maxNum;
			this.buyAccessHs.value = this.buyAccessHs.minimum;
			this.buyAccessHs.snapInterval = appendData.bBlind;
			this.countLable.text = "$" + MathUtil.formatNum(this.buyAccessHs.value);

			if (GamblingManager.roomInfo)
			{
				if (GamblingManager.roomInfo.isAutoBuy != undefined)
				{
					this.autoBuyCheck.selected = GamblingManager.roomInfo.isAutoBuy;
				}
				else
				{
					this.autoBuyCheck.selected = true; //默认选中
				}
			}
		}

	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.buyAccessHs.addEventListener(egret.Event.CHANGE, this.countBuyGold, this);
		this.buyNowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
		this.shoppingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
		this.buyAccessBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyAccessHandle, this);

		GamblingManager.BuyInGameEvent.addListener(this.buyInGameHandler, this);
		GamblingManager.AddCoinEvent.addListener(this.buyInGameHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.buyAccessHs.removeEventListener(egret.Event.CHANGE, this.countBuyGold, this);
		this.buyNowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
		this.shoppingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
		this.buyAccessBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyAccessHandle, this);

		GamblingManager.BuyInGameEvent.removeListener(this.buyInGameHandler, this);
		GamblingManager.AddCoinEvent.removeListener(this.buyInGameHandler, this);
	}
	/**
	 * 进入商城充值
	 */
	private goShopping(event: egret.TouchEvent)
	{
		this.onCloseBtnClickHandler(null);
		UIManager.showPanel(UIModuleName.ShoppingPanel);
	}
	/**
	 * 买入游戏处理
	*/
	private buyAccessHandle(event: egret.TouchEvent)
	{
		if (this.panelData.isAddCoin)
		{
			GamblingManager.reqAddCoin(this.buyAccessHs.value);
		}
		else
		{
			GamblingManager.reqBuyInGame(this.buyAccessHs.value, this.autoBuyCheck.selected, this.panelData.pos);
		}
	}
	private buyInGameHandler()
	{
		this.onCloseBtnClickHandler(null);
	}
	/**
	 * 金币不足处理
	*/
	private unEnoughGoldHandle(smallestGold: number)
	{
		//当前资产与最小买入的差值
		let goldOffset: number = smallestGold - UserManager.userInfo.gold;
		// let awardDef = AwardDefined.GetInstance().(ShoppingManager.awardGoldList.id,ShoppingManager.awardGoldList)
		// let goldIndex=awardDef.costType.indexOf(CostType.RMB);
		if (ShoppingManager.awardGoldList.length > 0)
		{
			for (let i: number = 0; i < ShoppingManager.awardGoldList.length; i++)
			{
				if (i == 0)
				{
					if (goldOffset < ShoppingManager.awardGoldList[i].rewardNum[0])
					{
						this.priceLabel.text = "仅需" + ShoppingManager.awardGoldList[i].costNum[0] + "元";
						this.goldLabel.text = ShoppingManager.awardGoldList[i].name;
						return;
					}
				};
				if (i > 0)
				{
					if (ShoppingManager.awardGoldList[i - 1].rewardNum[0] < goldOffset && goldOffset < ShoppingManager.awardGoldList[i].rewardNum[0])
					{
						this.priceLabel.text = "仅需" + ShoppingManager.awardGoldList[i].costNum[0] + "元";
						this.goldLabel.text = ShoppingManager.awardGoldList[i].name;
						return;
					}
				}
			}
		}
	}
	/**
	 * 计算买入金币
	*/
	private countBuyGold(event: egret.TouchEvent)
	{
		this.countLable.text = "$" + MathUtil.formatNum(this.buyAccessHs.value);
	}
}