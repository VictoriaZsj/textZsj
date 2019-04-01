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
 * 坐下位置转动
 */
var GamblingPanelPitTurnSupport = (function (_super) {
    __extends(GamblingPanelPitTurnSupport, _super);
    function GamblingPanelPitTurnSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelPitTurnSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    GamblingPanelPitTurnSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.BuyInGameEvent.addListener(this.onBuyInGame, this);
    };
    GamblingPanelPitTurnSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.BuyInGameEvent.removeListener(this.onBuyInGame, this);
    };
    GamblingPanelPitTurnSupport.prototype.onBuyInGame = function (pos) {
        var pitInfo = this.target.getPitInfo(pos);
        this._offset = GamblingManager.maxSeats + (GamblingPanelSetting.MinPitIndex - pitInfo.index);
        this._isClockwise = pitInfo.index > GamblingPanelSetting.centerNum;
        this._nowRunIndex = 0;
        this.runNext();
    };
    GamblingPanelPitTurnSupport.prototype.runNext = function () {
        var point;
        var virtualPitIndex;
        var pitInfo;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
            pitInfo = this.target.pitList[i];
            if (this._isClockwise) {
                virtualPitIndex = GamblingPanelSetting.getNextIndex(pitInfo.index, this._nowRunIndex);
            }
            else {
                virtualPitIndex = GamblingPanelSetting.getPreIndex(pitInfo.index, this._nowRunIndex);
            }
            point = GamblingPanelSetting.headPosList[virtualPitIndex];
            if (i == GamblingManager.maxSeats) {
                pitInfo.headComponent.turnAnim.run(point.x, point.y, this.tryRunNext, this);
            }
            else {
                pitInfo.headComponent.turnAnim.run(point.x, point.y, null, null);
            }
        }
        this._nowRunIndex++;
    };
    GamblingPanelPitTurnSupport.prototype.tryRunNext = function () {
        if (this._nowRunIndex >= this._offset) {
            var pitInfo = void 0;
            for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
                pitInfo = this.target.pitList[i];
                //移动完毕改变坑位的索引 位置变了，最下面的坑位始终要在1号位
                pitInfo.index = GamblingPanelSetting.getNextIndex(pitInfo.index, this._offset);
            }
            this.target.setPit(); //重新设置坑位信息
        }
        else {
            this.runNext();
        }
    };
    return GamblingPanelPitTurnSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelPitTurnSupport.prototype, "GamblingPanelPitTurnSupport");
//# sourceMappingURL=GamblingPanelPitTurnSupport.js.map