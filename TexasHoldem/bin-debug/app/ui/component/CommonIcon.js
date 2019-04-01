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
//通用图标
var CommonIcon = (function (_super) {
    __extends(CommonIcon, _super);
    function CommonIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = UIComponentSkinName.CommonIcon;
        return _this;
    }
    CommonIcon.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    CommonIcon.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    CommonIcon.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    CommonIcon.prototype.rendererStart = function (event) {
        UIUtil.ShowHead(this.icon, this.bindData.head);
    };
    CommonIcon.prototype.SetMove = function (x, y) {
        this.x = x;
        this.y = y;
    };
    CommonIcon.prototype.GetIconWidth = function () {
        if (this.icon != null) {
            return this.icon.width;
        }
        return 0;
    };
    CommonIcon.prototype.GetIconHeight = function () {
        if (this.icon.height != null) {
            return this.icon.height;
        }
        return 0;
    };
    CommonIcon.prototype.SetGray = function (isGray) {
        if (isGray) {
            FilterUtil.setGray(this.icon);
        }
        else {
            FilterUtil.setDefault(this.icon);
        }
    };
    return CommonIcon;
}(BaseComponent));
__reflect(CommonIcon.prototype, "CommonIcon");
//# sourceMappingURL=CommonIcon.js.map