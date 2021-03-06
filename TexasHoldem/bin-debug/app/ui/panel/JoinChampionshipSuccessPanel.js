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
 * 锦标赛报名成功面板
 */
var JoinChampionshipSuccessPanel = (function (_super) {
    __extends(JoinChampionshipSuccessPanel, _super);
    function JoinChampionshipSuccessPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.JoinChampionshipSuccessPanel;
        return _this;
    }
    JoinChampionshipSuccessPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    JoinChampionshipSuccessPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    JoinChampionshipSuccessPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.nameLabel.text = this.panelData.name;
        var date = new Date(this.panelData.time * 1000);
        if (this.panelData.time - TimeManager.GetServerUtcTimestamp() > 3600 * 24) {
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate() + +DateTimeUtil.formatDate(date, DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
        }
        else {
            this.timeLabel.text = "今日" + DateTimeUtil.formatDate(date, DateTimeUtil.Format_Standard_NoSecond).split(" ")[1];
        }
        this.numLabel.text = this.panelData.applyNum + "/" + this.panelData.bNum;
        this.chipLabel.text = this.panelData.chip;
    };
    JoinChampionshipSuccessPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    };
    JoinChampionshipSuccessPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    };
    /**
     * 关闭面板
    */
    JoinChampionshipSuccessPanel.prototype.closePanel = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.closePanel(UIModuleName.JoinChampionshipSuccessPanel);
    };
    return JoinChampionshipSuccessPanel;
}(BasePanel));
__reflect(JoinChampionshipSuccessPanel.prototype, "JoinChampionshipSuccessPanel");
//# sourceMappingURL=JoinChampionshipSuccessPanel.js.map