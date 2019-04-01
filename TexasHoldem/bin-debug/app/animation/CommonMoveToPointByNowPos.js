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
 * 基于当前位置移动到某点(通用)
 */
var CommonMoveToPointByNowPos = (function (_super) {
    __extends(CommonMoveToPointByNowPos, _super);
    function CommonMoveToPointByNowPos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonMoveToPointByNowPos.prototype.run = function (x, y) {
        _super.prototype.run.call(this, x, y);
        var tween = egret.Tween.get(this.target);
        tween.to({ x: x, y: y }, 300, egret.Ease.sineIn).call(this.runOver, this);
    };
    return CommonMoveToPointByNowPos;
}(BaseAnimation));
__reflect(CommonMoveToPointByNowPos.prototype, "CommonMoveToPointByNowPos");
//# sourceMappingURL=CommonMoveToPointByNowPos.js.map