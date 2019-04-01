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
 * 跑马灯界面
 */
var MarqueePanel = (function (_super) {
    __extends(MarqueePanel, _super);
    function MarqueePanel() {
        var _this = _super.call(this) || this;
        _this.isTween = false;
        _this.panelAlignType = PanelAlignType.Center_Top;
        _this.offsetV = 200;
        _this.layer = UILayerType.Tips;
        _this.setTouchChildren(false);
        _this.setTouchEnable(false);
        _this.setGrayMask(false);
        _this.skinName = UISkinName.MarqueePanel;
        return _this;
    }
    MarqueePanel.prototype.onAwake = function (event) {
        this.scroller.viewport = this.textGroup;
        _super.prototype.onAwake.call(this, event);
    };
    MarqueePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        egret.Tween.removeTweens(this.scroller.viewport);
        if (appendData) {
            this.textLabel.text = appendData;
        }
    };
    MarqueePanel.prototype.onRender = function (event) {
        ChatManager.isOnMessage = true;
        this.move = new egret.Tween(this.scroller.viewport, null, null);
        var duration = this.textLabel.textWidth * 20;
        var targetPos = this.textLabel.textWidth;
        this.scroller.viewport.scrollH = -620;
        if (duration < 10000) {
            duration = 10000;
        }
        this.move.to({ scrollH: targetPos }, duration).call(this.onTweenGroupComplete, this);
        this.move.play();
        // console.log("this.textLabel.textWidth", targetPos);
        _super.prototype.onRender.call(this, event);
    };
    MarqueePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        UIUtil.hideScrollerBar(this.scroller, true, true);
        if (!this.panelData) {
            UIManager.showFloatTips("跑马灯内容为空！");
            this.onTweenGroupComplete();
        }
    };
    MarqueePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        ChatManager.isOnMessage = false;
        egret.Tween.removeTweens(this.scroller.viewport);
    };
    MarqueePanel.prototype.onTweenGroupComplete = function () {
        egret.Tween.removeTweens(this.textGroup);
        this.onCloseBtnClickHandler(null);
        ChatManager.nextMessage();
    };
    return MarqueePanel;
}(BasePanel));
__reflect(MarqueePanel.prototype, "MarqueePanel");
//# sourceMappingURL=MarqueePanel.js.map