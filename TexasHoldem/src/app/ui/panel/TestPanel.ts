/**
 * 测试面板
 */
class TestPanel extends eui.Component
{
	private _testBtn: eui.Button;
	public constructor()
	{
		super();
		this.x = 150;
		this.y = 0;
		this.creatComponent();
	}
	private creatComponent()
	{
		if (!this._testBtn)
		{
			this._testBtn = new eui.Button();

			this._testBtn.label = "测试";
			this._testBtn.horizontalCenter = 0;
			this._testBtn.verticalCenter = 0;
			this._testBtn.skinName = "buttonSkin22";
			this._testBtn.alpha = 0.3;
			this.addChild(this._testBtn);
		}
		this.addEvents();
	}
	private addEvents()
	{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
	}
	private clickHandler(event: egret.TouchEvent)
	{
		let target = event.target;
		switch (target)
		{
			case this._testBtn:
				//UserManager.reqSetUserInfo("老李", "", 1);
				break;
		}
	}
}