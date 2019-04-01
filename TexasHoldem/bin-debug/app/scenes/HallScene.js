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
 * 游戏大厅
 */
var HallScene = (function (_super) {
    __extends(HallScene, _super);
    function HallScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallScene.prototype.clear = function () {
        UIManager.closePanel(UIModuleName.GameHallPanel);
    };
    HallScene.prototype.initialize = function () {
        this.resGroupName = ResGroupName.Hall;
        _super.prototype.initialize.call(this);
        UIManager.closePanel(UIModuleName.LoginSceneBgPanel);
    };
    HallScene.prototype.onResourceLoadComplete = function () {
        _super.prototype.onResourceLoadComplete.call(this);
        UIManager.showPanel(UIModuleName.GameHallPanel);
    };
    return HallScene;
}(BaseScene));
__reflect(HallScene.prototype, "HallScene");
//# sourceMappingURL=HallScene.js.map