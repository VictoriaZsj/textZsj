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
 * 场景加载切换面板
 */
var LoadingSwitchPanel = (function (_super) {
    __extends(LoadingSwitchPanel, _super);
    function LoadingSwitchPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.LoadingSwitchPanel;
        return _this;
    }
    LoadingSwitchPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        var data = RES.getRes(MovieClipData.SaiZi_Json);
        var txtr = RES.getRes(MovieClipData.SaiZi_Png);
        this._mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this._saiziMc = new egret.MovieClip(this._mcFactory.generateMovieClipData());
        this.mcGroup.addChild(this._saiziMc);
        this._saiziMc.play();
    };
    LoadingSwitchPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.updateProgress(0, StringConstant.empty);
        if (appendData) {
            this.updateProgress(appendData.value, appendData.info);
        }
        this.loading.play();
    };
    LoadingSwitchPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    LoadingSwitchPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._saiziMc.addEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
    };
    LoadingSwitchPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._saiziMc.removeEventListener(egret.Event.COMPLETE, this.onPlayComplete, this);
        this.loading.pause();
    };
    LoadingSwitchPanel.prototype.onPlayComplete = function (event) {
        this._saiziMc.gotoAndPlay(1);
    };
    LoadingSwitchPanel.prototype.updateProgress = function (value, str) {
        if (this.isLoadComplete && value) {
            // this.progressImg.width = this.progressImg.maxWidth * value;
            // this.infoTxt.text = str;
        }
    };
    return LoadingSwitchPanel;
}(BasePanel));
__reflect(LoadingSwitchPanel.prototype, "LoadingSwitchPanel");
//# sourceMappingURL=LoadingSwitchPanel.js.map