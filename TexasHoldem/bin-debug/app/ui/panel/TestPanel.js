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
 * 测试面板
 */
var TestPanel = (function (_super) {
    __extends(TestPanel, _super);
    function TestPanel() {
        var _this = _super.call(this) || this;
        _this.x = 150;
        _this.y = 0;
        _this.creatComponent();
        return _this;
    }
    TestPanel.prototype.creatComponent = function () {
        if (!this._testBtn) {
            this._testBtn = new eui.Button();
            this._testBtn.label = "测试";
            this._testBtn.horizontalCenter = 0;
            this._testBtn.verticalCenter = 0;
            this._testBtn.skinName = "buttonSkin22";
            this._testBtn.alpha = 0.3;
            this.addChild(this._testBtn);
        }
        this.addEvents();
    };
    TestPanel.prototype.addEvents = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    TestPanel.prototype.clickHandler = function (event) {
        var target = event.target;
        switch (target) {
            case this._testBtn:
                //UserManager.reqSetUserInfo("老李", "", 1);
                break;
        }
    };
    return TestPanel;
}(eui.Component));
__reflect(TestPanel.prototype, "TestPanel");
//# sourceMappingURL=TestPanel.js.map