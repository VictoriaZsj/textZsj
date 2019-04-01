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
 * 成就信息面板
 */
var AchievementItemPanel = (function (_super) {
    __extends(AchievementItemPanel, _super);
    function AchievementItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.AchievementItemPanel;
        _this._isMaskClickClose = true;
        return _this;
    }
    AchievementItemPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    AchievementItemPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this.info = appendData;
        }
    };
    AchievementItemPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.item.init(this.info);
        this.achieveName.text = this.info.definition.name;
        this.progress.text = this.info.definition.para1.toString();
        this.des.text = this.info.definition.description;
        this.complete.visible = this.info.isComplete;
    };
    AchievementItemPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    AchievementItemPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return AchievementItemPanel;
}(BasePanel));
__reflect(AchievementItemPanel.prototype, "AchievementItemPanel");
//# sourceMappingURL=AchievementItemPanel.js.map