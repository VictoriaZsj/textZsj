/**
 * 游戏按钮
 */
class GameButton extends eui.Button
{
	public isLoadComplete: boolean;
	private btnProxy: any;
	private _isTweenOver: boolean;
	private _initW: number;
	private _initH: number;
	private _initSx: number;
	private _initSy: number;
	public constructor()
	{
		super();
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
		this.btnProxy = this;
	}
	protected createChildren()
	{
		this._isTweenOver = true;
		this._initSx = this.scaleX;
		this._initSy = this.scaleY;
	}
	protected onTouchBegin(event: egret.TouchEvent)
	{
		super.onTouchBegin(event);
		this._isTweenOver = false;
		egret.Tween.removeTweens(this.btnProxy.btnImg);
		let tween: egret.Tween = egret.Tween.get(this.btnProxy.btnImg, { onChange: this.update.bind(this) });
		tween.to({ scaleX: 1.05, scaleY: 1.05 }, 255).call(this.tweenComplete.bind(this));
		UIUtil.setGlowerFilter(this.btnProxy.btnImg)
	}
	private tweenComplete()
	{
		this._isTweenOver = true;
	}
	protected onTouchCancle(event: egret.TouchEvent)
	{
		super.onTouchCancle(event);
		this.buttonReleased();
	}
	protected buttonReleased()
	{
		egret.Tween.removeTweens(this.btnProxy.btnImg);
		let tween: egret.Tween = egret.Tween.get(this.btnProxy.btnImg, { onChange: this.update.bind(this) });
		tween.to({ scaleX: 1, scaleY: 1 }, 255);
		UIUtil.clearFilters(this.btnProxy.btnImg);
	}
	private update()
	{
		if (this._initW != undefined && this._initH != undefined)
		{
			let nowW: number = this.btnProxy.btnImg.scaleX * this._initW;
			let nowH: number = this.btnProxy.btnImg.scaleY * this._initH;
			let nowX: number = -(nowW - this._initW) / 2;
			let nowY: number = -(nowH - this._initH) / 2;
			this.btnProxy.btnImg.x = nowX;
			this.btnProxy.btnImg.y = nowY;
			// console.log(this._initW, nowW, nowX, nowY);
		}
	}
	protected rendererStart(event: egret.Event)
	{
		this._initW = this.btnProxy.btnImg.width;
		this._initH = this.btnProxy.btnImg.height;
		this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
	}
	private onEnable(event: egret.Event)
	{
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
		this.addEventListener(egret.Event.RENDER, this.rendererStart, this);
		this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
	}
	private onDisable(event: egret.Event)
	{
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
		this.removeEventListener(egret.TouchEvent.RENDER, this.rendererStart, this);
		this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
		this.btnProxy.btnImg.x = this.btnProxy.btnImg.y = 0;
		// this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
}