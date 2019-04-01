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
 * 牌局信息刷新
 */
var GamblingPanelInfoRefreshSupport = (function (_super) {
    __extends(GamblingPanelInfoRefreshSupport, _super);
    function GamblingPanelInfoRefreshSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelInfoRefreshSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        if (GamblingManager.roomInfo) {
            this.refresh();
        }
    };
    GamblingPanelInfoRefreshSupport.prototype.refresh = function () {
        this.target.roomIdLabel.text = GamblingManager.roomInfo.id.toString();
        this.target.usualBlindGroup.visible = false;
        this.target.anteGroup.visible = false;
        this.target.championshipBlindGroup.visible = false;
        switch (GamblingManager.roomInfo.gamblingType) {
            case GamblingType.Common:
                this.target.usualBlindGroup.visible = true;
                break;
            case GamblingType.Championship:
                this.target.championshipBlindGroup.visible = true;
                this.target.anteGroup.visible = true;
                break;
            case GamblingType.Personal:
                break;
        }
        this.refreshBlindLabel();
        this.refreshPotLabel();
    };
    GamblingPanelInfoRefreshSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.PotChipsChangeEvent.addListener(this.potChipsChangeHandler, this);
        GamblingManager.PlayerStateChangeEvent.addListener(this.potChipsChangeHandler, this);
        GamblingManager.BlindChangeEvent.addListener(this.blindChangeHandler, this);
    };
    GamblingPanelInfoRefreshSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.PotChipsChangeEvent.removeListener(this.potChipsChangeHandler, this);
        GamblingManager.BlindChangeEvent.removeListener(this.blindChangeHandler, this);
        GamblingManager.PlayerStateChangeEvent.removeListener(this.potChipsChangeHandler, this);
    };
    GamblingPanelInfoRefreshSupport.prototype.potChipsChangeHandler = function () {
        this.refreshPotLabel();
    };
    GamblingPanelInfoRefreshSupport.prototype.blindChangeHandler = function () {
        this.refreshBlindLabel();
    };
    GamblingPanelInfoRefreshSupport.prototype.refreshPotLabel = function () {
        this.target.potLabel.text = GamblingManager.totalPotChips.toString();
    };
    GamblingPanelInfoRefreshSupport.prototype.refreshBlindLabel = function () {
        this.target.championshipBlindLabel.text = this.target.usualblindLabel.text = GamblingManager.roomInfo.sBlind.toString() + "/" + GamblingManager.roomInfo.bBlind.toString();
        this.target.anteLabel.text = GamblingManager.roomInfo.ante.toString();
    };
    return GamblingPanelInfoRefreshSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelInfoRefreshSupport.prototype, "GamblingPanelInfoRefreshSupport");
//# sourceMappingURL=GamblingPanelInfoRefreshSupport.js.map