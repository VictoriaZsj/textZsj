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
 * 活动页面（只有一张图片）
 */
var SimplePicturePanel = (function (_super) {
    __extends(SimplePicturePanel, _super);
    function SimplePicturePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.SimplePicturePanel;
        return _this;
    }
    SimplePicturePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    SimplePicturePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this.info = appendData;
        }
    };
    SimplePicturePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.activityScroller.viewport.scrollV = 0;
        if (this.info) {
            //this.activityImg.source = this.info.definition.imgId
            this.titleLabel.text = this.info.definition.name;
        }
    };
    SimplePicturePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    SimplePicturePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return SimplePicturePanel;
}(BaseAnmiatePanel));
__reflect(SimplePicturePanel.prototype, "SimplePicturePanel");
//# sourceMappingURL=SimplePicturePanel.js.map