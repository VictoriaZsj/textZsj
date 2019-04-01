var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景管理
 */
var SceneManager = (function () {
    function SceneManager() {
    }
    /**
     * 显示切换面板
     */
    SceneManager.showSwitchPanel = function () {
        if (!UIManager.isShowPanelObj(SceneManager._switchPanel)) {
            UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
        }
        if (!SceneManager._switchPanel) {
            SceneManager._switchPanel = UIManager.getPanel(UIModuleName.LoadingSwitchPanel);
        }
    };
    /**
     * 关闭切换面板
     */
    SceneManager.closeSwitchPanel = function () {
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
    };
    /**
     * 更新切换面板进度条
     */
    SceneManager.updateSwitchProgress = function (progress) {
        if (SceneManager._switchPanel) {
            SceneManager._switchPanel.updateProgress(progress, "正在加载场景资源.....");
        }
    };
    /**
     * 切换场景
     */
    SceneManager.switcScene = function (type) {
        if (!SceneManager.cacheSceneList) {
            SceneManager.cacheSceneList = new Dictionary();
        }
        SceneManager._currentSceneType = type;
        if (SceneManager._currentScene) {
            SceneManager._currentScene.clear();
        }
        var scene = SceneManager.cacheSceneList.getValue(type);
        if (!scene) {
            switch (SceneManager._currentSceneType) {
                case SceneType.Login:
                    scene = new LoginScene();
                    break;
                case SceneType.Hall:
                    scene = new HallScene();
                    break;
                case SceneType.Game:
                    scene = new GameScene();
                    break;
            }
            if (scene) {
                SceneManager.cacheSceneList.add(type, scene);
            }
        }
        if (scene) {
            scene.initialize();
        }
        SoundManager.playBgMusic(SceneManager._currentSceneType);
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map