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
 * 游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this) || this;
    }
    GameScene.prototype.clear = function () {
        UIManager.closePanel(UIModuleName.GamblingPanel);
    };
    GameScene.prototype.initialize = function () {
        this.resGroupName = ResGroupName.Gambling;
        _super.prototype.initialize.call(this);
        UIManager.closePanel(UIModuleName.LoginSceneBgPanel);
    };
    GameScene.prototype.onResourceLoadComplete = function () {
        _super.prototype.onResourceLoadComplete.call(this);
        UIManager.showPanel(UIModuleName.GamblingPanel);
    };
    return GameScene;
}(BaseScene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map