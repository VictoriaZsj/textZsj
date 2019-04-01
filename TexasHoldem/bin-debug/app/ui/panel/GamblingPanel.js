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
 * 牌局面板
 */
var GamblingPanel = (function (_super) {
    __extends(GamblingPanel, _super);
    function GamblingPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UIModuleName.GamblingPanel;
        return _this;
    }
    Object.defineProperty(GamblingPanel.prototype, "moveSpt", {
        get: function () {
            return this._moveSpt;
        },
        enumerable: true,
        configurable: true
    });
    GamblingPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.potChipsList.itemRenderer = ChipsShowRenderer;
        this.pitList = new Array();
        this.pitList.push(null);
        var pitInfo;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
            pitInfo = new GamblingPitInfo();
            pitInfo.index = i;
            pitInfo.headComponent = this["pit" + i.toString()];
            pitInfo.headComponent.chipsShowComponent = this["chips" + i.toString()];
            this.pitList.push(pitInfo);
        }
        this.setPit();
        this._supportList = new Array();
        this.supportsConstructor();
        this.cardList = new Array();
        for (var i = 1; i <= GamblingManager.MaxBoardNum; i++) {
            this["card" + i.toString()].scaleX = this["card" + i.toString()].scaleY = 0.1;
            this.cardList.push(this["card" + i.toString()]);
        }
    };
    GamblingPanel.prototype.supportsConstructor = function () {
        this._pitDataSupport = new GamblingPanelPitDataSupport(this);
        this._moveSpt = new GamblingPanelMoveSupport(this);
        var actionSpt = new GamblingPanelActionSupport(this);
        var buttonPosSpt = new GamblingPanelButtonPosSupport(this);
        var flopCardSpt = new GamblingPanelFlopCardSupport(this);
        var infoRefreshSpt = new GamblingPanelInfoRefreshSupport(this);
        var oneLoopOverSpt = new GamblingPanelOneLoopOverSupport(this);
        var pitTurnSpt = new GamblingPanelPitTurnSupport(this);
        var roundOverSpt = new GamblingPanelRoundOverSupport(this);
        this._supportList.push(actionSpt, buttonPosSpt, flopCardSpt, infoRefreshSpt, this._moveSpt, oneLoopOverSpt, pitTurnSpt, roundOverSpt, this._pitDataSupport);
    };
    GamblingPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        for (var _i = 0, _a = this._supportList; _i < _a.length; _i++) {
            var support = _a[_i];
            support.initialize();
        }
    };
    GamblingPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GamblingPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        for (var _i = 0, _a = this._supportList; _i < _a.length; _i++) {
            var support = _a[_i];
            support.onEnable();
        }
    };
    GamblingPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        for (var _i = 0, _a = this._supportList; _i < _a.length; _i++) {
            var support = _a[_i];
            support.onDisable();
        }
    };
    /**
     * 设置头像的坑位信息
     */
    GamblingPanel.prototype.setPit = function () {
        if (this.pitList) {
            var len = this.pitList.length;
            var pitInfo = void 0;
            for (var i = 0; i < len; i++) {
                pitInfo = this.pitList[i];
                pitInfo.headComponent.setPit(pitInfo.index);
            }
        }
    };
    /**
     * 获取当前坑位的playerpos
     */
    GamblingPanel.prototype.getPlayerPos = function (pit) {
        return this._pitDataSupport.getPlayerPos(pit);
    };
    /**
     * 根据玩家位置获取坑位信息
     */
    GamblingPanel.prototype.getPitInfo = function (playerPos) {
        return this._pitDataSupport.getPitInfo(playerPos);
    };
    /**
     * 获取头像组件，根据玩家位置
     */
    GamblingPanel.prototype.getHeadComponent = function (playerPos) {
        return this._pitDataSupport.getHeadComponent(playerPos);
    };
    /**
     * 获取下一个有玩家的坑位信息 如果都没有则返回null
     */
    GamblingPanel.prototype.getNextPlayerPitInfo = function (pit) {
        return this._pitDataSupport.getNextPlayerPitInfo(pit);
    };
    /**
     * 获取下一个位置的玩家信息
     */
    GamblingPanel.prototype.getNextPlayerInfo = function (playerPos) {
        return this._pitDataSupport.getNextPlayerInfo(playerPos);
    };
    /**
     * 根据玩家信息获取坑位信息
     */
    GamblingPanel.prototype.getPitInfoByPlayerInfo = function (playerInfo) {
        return this._pitDataSupport.getPitInfoByPlayerInfo(playerInfo);
    };
    return GamblingPanel;
}(BasePanel));
__reflect(GamblingPanel.prototype, "GamblingPanel");
//# sourceMappingURL=GamblingPanel.js.map