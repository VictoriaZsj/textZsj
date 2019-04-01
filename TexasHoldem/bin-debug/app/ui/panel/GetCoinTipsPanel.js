var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 获得金币面板
 */
var GetCoinTipsPanel = (function (_super) {
    __extends(GetCoinTipsPanel, _super);
    function GetCoinTipsPanel() {
        var _this = _super.call(this) || this;
        _this.layer = UILayerType.Tips;
        _this.setTouchChildren(false);
        _this.setTouchEnable(false);
        _this.setGrayMask(false);
        _this.skinName = UISkinName.GetCoinTipsPanel;
        return _this;
    }
    GetCoinTipsPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    GetCoinTipsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (this.panelData) {
            this.textLabel.text = this.panelData;
            this.removeTweenEvents();
            this.creatCoinTween();
            this.createTween();
        }
    };
    GetCoinTipsPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    GetCoinTipsPanel.prototype.creatCoinTween = function () {
        // for (let i: number = 0; i < 10; i++)
        // {
        // 	let img: eui.Image = new eui.Image("hua" + (i % 4 + 1) + "_png");
        // 	img.y = -100;
        // 	img.x = Math.random() * 720;
        // 	img.scaleX = 3;
        // 	img.scaleY = 3;
        // 	egret.Tween.get(img).wait(i * 50).to({ y: 1280 }, 1000,egret.Ease.cubicIn);
        // 	this.coinGroup.addChild(img);
        // }
        if (!this.ptc) {
            var texture = RES.getRes(ParticleSource.GetCoin_Img);
            var config = RES.getRes(ParticleSource.GetCoin_Json);
            this.ptc = new particle.GravityParticleSystem(texture, config);
        }
        this.addChild(this.ptc);
        this.ptc.start(1000);
    };
    GetCoinTipsPanel.prototype.createTween = function () {
        this.alpha = 1;
        this._disappearTween = new egret.Tween(this, null, null);
        this._disappearTween.wait(2000).to({ alpha: 1 }, 50, egret.Ease.quadOut).call(this.onPlayOver, this);
        this._disappearTween.play();
    };
    GetCoinTipsPanel.prototype.onPlayOver = function (thisObject) {
        this.onCloseBtnClickHandler(null);
        this._disappearTween = null;
        this.ptc.stop(true);
        this.removeChild(this.ptc);
    };
    GetCoinTipsPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeTweenEvents();
    };
    GetCoinTipsPanel.prototype.removeTweenEvents = function () {
        if (this._disappearTween) {
            egret.Tween.removeTweens(this);
            this._disappearTween = null;
        }
    };
    return GetCoinTipsPanel;
}(BasePanel));
__reflect(GetCoinTipsPanel.prototype, "GetCoinTipsPanel");
//# sourceMappingURL=GetCoinTipsPanel.js.map