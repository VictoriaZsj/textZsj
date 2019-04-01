/**
 * 场景管理
 */
class SceneManager
{
	private static _switchPanel: LoadingSwitchPanel;
	/**
	 * 显示切换面板
	 */
	public static showSwitchPanel():void
	{
		if (!UIManager.isShowPanelObj(SceneManager._switchPanel))
		{
			UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
		}
		if (!SceneManager._switchPanel)
		{
			SceneManager._switchPanel = UIManager.getPanel(UIModuleName.LoadingSwitchPanel) as LoadingSwitchPanel;
		}
	}
	/**
	 * 关闭切换面板
	 */
	public static closeSwitchPanel():void
	{
		UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
	}
	/**
	 * 更新切换面板进度条
	 */
	public static updateSwitchProgress(progress:number):void
	{
		if (SceneManager._switchPanel)
		{
			SceneManager._switchPanel.updateProgress(progress, "正在加载场景资源.....");
		}
	}
	/**
	 * 场景缓存列表
	 */
	public static cacheSceneList: Dictionary<SceneType, BaseScene>;
	/**
	 * 当前场景
	 */
	private static _currentScene: BaseScene;

	/**
	 * 当前场景类型
	 */
	public static _currentSceneType: SceneType;
	/**
	 * 切换场景
	 */
	public static switcScene(type: SceneType):void
	{
		if (!SceneManager.cacheSceneList)
		{
			SceneManager.cacheSceneList = new Dictionary<SceneType, BaseScene>();
		}
		SceneManager._currentSceneType = type;
		if (SceneManager._currentScene)
		{
			SceneManager._currentScene.clear();
		}
		let scene: BaseScene = SceneManager.cacheSceneList.getValue(type);
		if (!scene)
		{
			switch (SceneManager._currentSceneType)
			{
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
			if (scene)
			{
				SceneManager.cacheSceneList.add(type, scene);
			}
		}
		if (scene)
		{
			scene.initialize();
		}
		SoundManager.playBgMusic(SceneManager._currentSceneType);
	}
}

