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
 * 通用基于当前相对位置移动
 */
var CommonMoveToRelativelyPos = (function (_super) {
    __extends(CommonMoveToRelativelyPos, _super);
    function CommonMoveToRelativelyPos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonMoveToRelativelyPos.prototype.run = function (hcenter, vcenter, callBack, thisObj) {
        _super.prototype.run.call(this, hcenter, vcenter, callBack, thisObj);
        this._callBack = new Delegate(callBack, thisObj);
        var tween = egret.Tween.get(this.target);
        tween.to({ horizontalCenter: hcenter, verticalCenter: vcenter }, 300, egret.Ease.sineIn).call(this.runOver, this);
    };
    CommonMoveToRelativelyPos.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this._callBack.invoke();
    };
    CommonMoveToRelativelyPos.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._callBack = null;
    };
    return CommonMoveToRelativelyPos;
}(BaseAnimation));
__reflect(CommonMoveToRelativelyPos.prototype, "CommonMoveToRelativelyPos");
//# sourceMappingURL=CommonMoveToRelativelyPos.js.map