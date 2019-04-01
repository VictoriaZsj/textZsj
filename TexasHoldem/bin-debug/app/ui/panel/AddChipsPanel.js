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
 * 加注面板
 */
var AddChipsPanel = (function (_super) {
    __extends(AddChipsPanel, _super);
    function AddChipsPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.AddChipsPanel;
        return _this;
    }
    AddChipsPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
    };
    AddChipsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        //设置存入滑动条进度
        this.addChipsVs.value = appendData.minChips;
        this.countLable.text = this.addChipsVs.value.toString();
        this.addChipsVs.minimum = appendData.minChips;
        this.addChipsVs.maximum = appendData.maxChips;
        //每次滚动最小刻度数
        this.addChipsVs.snapInterval = appendData.bBlind;
    };
    AddChipsPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    AddChipsPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addChipsVs.addEventListener(egret.Event.CHANGE, this.addChipsHandle, this);
        this.addChipsVs.thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
        this.addChipsVs.thumb.addEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
        GamblingManager.ActionOverEvent.addListener(this.actionOverHandler, this);
    };
    AddChipsPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.addChipsVs.removeEventListener(egret.Event.CHANGE, this.addChipsHandle, this);
        this.addChipsVs.thumb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.confirmAddChips, this);
        this.addChipsVs.thumb.removeEventListener(egret.TouchEvent.TOUCH_END, this.confirmAddChips, this);
        GamblingManager.ActionOverEvent.removeListener(this.actionOverHandler, this);
    };
    /**
     * 加注变化
    */
    AddChipsPanel.prototype.addChipsHandle = function () {
        this.countLable.text = this.addChipsVs.value.toString();
    };
    /**
     * 确定加注
    */
    AddChipsPanel.prototype.confirmAddChips = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._posX = event.stageX;
                this._posY = event.stageY;
                break;
            case egret.TouchEvent.TOUCH_END:
                if (event.stageX == this._posX && event.stageY == this._posY) {
                    if (this.addChipsVs.value > 0) {
                        GamblingManager.reqAction(PlayerState.Raise, this.addChipsVs.value);
                        console.log("加注：", this.addChipsVs.value);
                    }
                }
                break;
        }
    };
    AddChipsPanel.prototype.actionOverHandler = function () {
        this.onCloseBtnClickHandler(null);
    };
    return AddChipsPanel;
}(BasePanel));
__reflect(AddChipsPanel.prototype, "AddChipsPanel");
//# sourceMappingURL=AddChipsPanel.js.map