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
 * 牌局面板移动支持
 */
var GamblingPanelMoveSupport = (function (_super) {
    __extends(GamblingPanelMoveSupport, _super);
    function GamblingPanelMoveSupport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toNum = 300;
        _this._isMove = false;
        return _this;
    }
    GamblingPanelMoveSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._isMove = false;
        this._moveHandler = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.GamblingGameGroupMove);
        this._moveHandler.setTarget(this.target.gameGroup);
    };
    GamblingPanelMoveSupport.prototype.move = function () {
        this._lastStageX = -1;
        this._initMatrix = null;
        if (this.target.gameGroup.x > 0) {
            this._moveHandler.run(0);
        }
        else {
            this._moveHandler.run(this.toNum);
        }
    };
    GamblingPanelMoveSupport.prototype.onEnable = function () {
        this.target.optionsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionsTapHandler, this);
        this.target.gameGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this, true);
        this.target.gameGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true);
    };
    GamblingPanelMoveSupport.prototype.onDisable = function () {
        this.target.gameGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this, true);
        this.target.gameGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true);
        this.target.optionsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.optionsTapHandler, this);
    };
    GamblingPanelMoveSupport.prototype.onTouchEnd = function (e) {
        if (e.target == this.target.gameGroup) {
            this.stop();
            this._initMatrix = null;
        }
    };
    GamblingPanelMoveSupport.prototype.onTouchMove = function (e) {
        if (e.target == this.target.gameGroup) {
            if (!this._initMatrix) {
                this._initMatrix = this.target.gameGroup.matrix;
            }
            var offsetX = 0;
            if (this._lastStageX != -1) {
                offsetX = e.stageX - this._lastStageX;
            }
            else {
                this._lastStageX = e.stageX;
            }
            this._initMatrix.tx += offsetX;
            if (this._initMatrix.tx > this.toNum) {
                this._initMatrix.tx = this.toNum;
            }
            if (this._initMatrix.tx < 0) {
                this._initMatrix.tx = 0;
            }
            this.target.gameGroup.matrix = this._initMatrix;
            this._isMove = true;
        }
    };
    GamblingPanelMoveSupport.prototype.stop = function () {
        if (this._isMove) {
            if (this.target.gameGroup.x > this.toNum / 2) {
                this._moveHandler.run(this.toNum);
            }
            else {
                this._moveHandler.run(0);
            }
        }
    };
    GamblingPanelMoveSupport.prototype.optionsTapHandler = function (event) {
        this.move();
    };
    return GamblingPanelMoveSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelMoveSupport.prototype, "GamblingPanelMoveSupport");
//# sourceMappingURL=GamblingPanelMoveSupport.js.map