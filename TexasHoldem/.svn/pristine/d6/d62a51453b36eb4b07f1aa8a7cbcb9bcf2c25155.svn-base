/**
 * 坐下/增加金币 逻辑支持
 */
class GamblingPanelSitDownAndAddCoinSupport extends BaseGamblingPanelSupport
{
	public initialize()
	{
		super.initialize();
	}
	public onEnable()
	{
		super.onEnable();
		for (let pit of this.target.pitList) 
		{
			pit.headComponent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
		}
		this.target.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyTapHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		for (let pit of this.target.pitList) 
		{
			pit.headComponent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
		}
		this.target.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyTapHandler, this);
	}
	private pitTouchHandler(event: egret.TouchEvent)
	{
		let headComponent: GamblingHeadComponent = event.currentTarget;
		for (let pit of this.target.pitList) 
		{
			if (pit.headComponent == headComponent && GamblingManager.roomInfo)
			{
				let pos: number = this.target.getPlayerPos(pit);
				let maxNum: number = Math.min(GamblingManager.roomInfo.definition.bBuyin, UserManager.userInfo.gold);
				let minNum: number = GamblingManager.roomInfo.definition.sBuyin;
				let bBlind: number = GamblingManager.roomInfo.bBlind;
				UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { isAddCoin: false, maxNum: maxNum, minNum: minNum, bBlind: bBlind, pos: pos });
				break;
			}
		}
	}
	private buyTapHandler(event: egret.TouchEvent)
	{
		if (GamblingManager.self) //已在座位上
		{
			let maxNum: number = GamblingManager.self.bankRoll + UserManager.userInfo.gold;
			maxNum = Math.min(GamblingManager.roomInfo.definition.bBuyin, maxNum);
			let minNum: number = GamblingManager.self.bankRoll;
			if(minNum >= maxNum)
			{
				//UIManager.showFloatTips("金币已达上限！");
				//return;
				minNum = maxNum;
			}
			let bBlind: number = GamblingManager.roomInfo.bBlind;
			UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { isAddCoin: true, maxNum: maxNum, minNum: minNum, bBlind: bBlind });
		}
		else
		{
			UIManager.showPanel(UIModuleName.ShoppingPanel);
		}

	}
	public clear()
	{
		super.clear();
	}
}