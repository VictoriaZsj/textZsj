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
 * 操作CD组件
 */
var GamblingCdComponent = (function (_super) {
    __extends(GamblingCdComponent, _super);
    function GamblingCdComponent() {
        var _this = _super.call(this) || this;
        _this._angle = 0;
        _this._phase = 0;
        _this._maxPhase = 0;
        _this._index = 1;
        _this.skinName = UIComponentSkinName.GamblingCdComponent;
        return _this;
    }
    GamblingCdComponent.prototype.onAwake = function (event) {
        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._shape.x = this.cdImg.width / 2;
        this._shape.y = this.cdImg.height / 2;
        this.cdImg.mask = this._shape;
        if (!this._filterList) {
            this._filterList = [];
        }
    };
    GamblingCdComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    /**
     * 如果没有必要，面板的所有事件移除需写在此方法内
     */
    GamblingCdComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        Tick.removeFrameInvoke(this.tick, this);
    };
    GamblingCdComponent.prototype.init = function (data) {
        if (data != undefined) {
            this._cdTime = data;
        }
        else {
            this._cdTime = 15;
        }
    };
    GamblingCdComponent.prototype.start = function (startTime) {
        if (!startTime) {
            startTime = TimeManager.GetServerUtcTimestamp();
        }
        this._colorMatrix = [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        if (!this._colorFilter) {
            this._colorFilter = new egret.ColorMatrixFilter(this._colorMatrix);
        }
        this.cdImg.filters = null;
        this._index = 1;
        var remainTime = TimeManager.GetServerUtcTimestamp() - startTime;
        this._phase = remainTime * this.stage.frameRate;
        this._shape.rotation = -90;
        this._maxPhase = this.stage.frameRate * this._cdTime;
        this._angleStep = 360 / this._maxPhase;
        this._angle = this._angleStep * this._phase;
        this._timePhase1 = this._maxPhase / 3;
        this._timePhase2 = this._timePhase1 * 2;
        Tick.addFrameInvoke(this.tick, this);
    };
    GamblingCdComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
    };
    GamblingCdComponent.prototype.tick = function () {
        this.mgraphics(this._angle);
        this._angle += this._angleStep;
        if (this._angle >= 360) {
            this._angle = this._angle % 360;
            this._index *= -1;
        }
        if (this._phase >= this._timePhase1 && this._phase < this._timePhase2) {
            this._colorMatrix[1] += 0.015;
            this._colorMatrix[6] -= 0.0008;
        }
        else if (this._phase >= this._timePhase2) {
            this._colorMatrix[6] -= 0.0014;
        }
        if (this._colorMatrix[1] > 1) {
            this._colorMatrix[1] = 1;
        }
        if (this._colorMatrix[6] <= 0) {
            this._colorMatrix[6] = 0;
        }
        this._colorFilter.matrix = this._colorMatrix;
        this._filterList[0] = this._colorFilter;
        this.cdImg.filters = this._filterList;
        this._phase += 1;
        if (this._phase >= this._maxPhase) {
            //超时操作
        }
        console.log(this._phase);
    };
    GamblingCdComponent.prototype.mgraphics = function (_angle) {
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0xffffff, 1);
        this._shape.graphics.moveTo(0, 0);
        this._shape.graphics.lineTo(50, 0);
        this._shape.graphics.drawArc(0, 0, 50, 0, _angle * Math.PI / 180, this._index == -1);
        this._shape.graphics.lineTo(0, 0);
        this._shape.graphics.endFill();
    };
    return GamblingCdComponent;
}(BaseComponent));
__reflect(GamblingCdComponent.prototype, "GamblingCdComponent");
//# sourceMappingURL=GamblingCdComponent.js.map