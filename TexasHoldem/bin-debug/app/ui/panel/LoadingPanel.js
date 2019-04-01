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
/// <summary>
/// 转圈loading
/// </summary>
var LoadingPanel = (function (_super) {
    __extends(LoadingPanel, _super);
    function LoadingPanel() {
        var _this = _super.call(this) || this;
        _this._timeStamp = 0;
        _this.maskAlpha = 0.01;
        _this.skinName = UISkinName.LoadingPanel;
        return _this;
    }
    LoadingPanel.prototype.onAwake = function (event) {
        this.isTween = false;
        _super.prototype.onAwake.call(this, event);
    };
    LoadingPanel.prototype.init = function (appendData) {
        this._allowTimeout = true;
        if (appendData) {
            this._allowTimeout = appendData;
        }
        this._time = egret.getTimer();
        this._isOut = false;
    };
    LoadingPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.loading.play();
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    LoadingPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.loading.pause();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    LoadingPanel.prototype.update = function (event) {
        if (this._allowTimeout && this._isOut == false) {
            var offsetTime = egret.getTimer() - this._time;
            if (offsetTime >= ProjectDefined.GetInstance().getValue(ProjectDefined.onTimeOut)) {
                this._isOut = true;
                UIManager.closePanel(UIModuleName.LoadingPanel);
                UIManager.dispatchEvent(UIModuleName.LoadingPanel, UIModuleEvent.OnTimeout);
            }
        }
    };
    return LoadingPanel;
}(BasePanel));
__reflect(LoadingPanel.prototype, "LoadingPanel");
//# sourceMappingURL=LoadingPanel.js.map