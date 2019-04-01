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
 * 游戏规则面板
 */
var GameRulePanel = (function (_super) {
    __extends(GameRulePanel, _super);
    function GameRulePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.GameRulePanel;
        return _this;
    }
    GameRulePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        //创建标签页
        var array = new Array();
        array.push(this.RuleIntroGroup);
        array.push(this.cardTypeGroup);
        array.push(this.funcKeyIntroGroup);
        this.gameRullTab.init(array);
    };
    GameRulePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    GameRulePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GameRulePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    GameRulePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return GameRulePanel;
}(BackHomeAnimePanel));
__reflect(GameRulePanel.prototype, "GameRulePanel");
//# sourceMappingURL=GameRulePanel.js.map