/**
 * 配置文件加载 
 */
class LoadConfig
{
	private static loadComplete: Delegate;
	/**
	 * 开始加载配置表及协议文件
	 */
	public static startLoad(callBack: Function, thisObj: any)
	{
		LoadConfig.loadComplete = new Delegate(callBack, thisObj);
		if (DEBUG)
		{
			LoadConfig.loadIndex = 0;
			LoadConfig.startLoadDevelopModeConfig();
		}
		else
		{
			RES.getResAsync("config_zip", function (data: any)
			{
				if (data != null)
				{
					let zip = new JSZip(data);
					let configJson: Object = JSON.parse(zip.file("config.json").asText());
					DefinedManager.SetConfigData(configJson);
					LoadConfig.loadLoginProtcolfile();
				}
				else
				{
					console.log("配置数据载入失败！", "config_zip");
				}
			}, this);
		}
	}
	private static loadList: Array<string> = ["project", "cardGroup", "cardWall", "error", "liangPai", "music",
		"outCard", "pai", "payList", "shouPai", "text", "exp", "name", "forbidden", "award", "room", "fastChat",
		"item", "achieve", "systemTime", "championship", "chips", "championshipPrize","championshipBlind","activity_list","activity_signin","mail"];
	private static loadIndex: number;
	private static startLoadDevelopModeConfig()
	{
		let key: string = LoadConfig.loadList[LoadConfig.loadIndex];
		RES.getResByUrl(PathName.Config + key + ResSuffixName.Json, LoadConfig.loadNext, this, RES.ResourceItem.TYPE_JSON);
	}
	private static loadNext(data: any, url: string)
	{
		let key: string = LoadConfig.loadList[LoadConfig.loadIndex];
		DefinedManager.setData(key, data);
		if (LoadConfig.loadIndex == LoadConfig.loadList.length)
		{
			LoadConfig.loadLoginProtcolfile();
		}
		else
		{
			LoadConfig.loadIndex++;
			LoadConfig.startLoadDevelopModeConfig();
		}
	}
	private static loadLoginProtcolfile()
	{
		RES.getResAsync("loginall_bin", function (data) 
		{
			if (data != null)
			{
				GameSetting.LoginBin = data;
				LoadConfig.loadc2sProtcolfile();
			}
			else
			{
				console.log("协议获取失败!loginall_bin");
			}
		}, this);
	}
	private static loadc2sProtcolfile()
	{
		RES.getResAsync("c2s_bin", function (data) 
		{
			if (data != null)
			{
				GameSetting.Gamec2sBin = data;
				LoadConfig.loads2cProtocolfile();
			}
			else
			{
				console.log("协议数据获取失败！c2s_bin");
			}
		}, this);
	}
	private static loads2cProtocolfile()
	{
		RES.getResAsync("s2c_bin", function (data) 
		{
			if (data != null)
			{
				GameSetting.Games2cBin = data;
				if (LoadConfig.loadComplete)
				{
					LoadConfig.loadComplete.invoke()
				}
			}
			else
			{
				console.log("协议数据获取失败！s2c_bin");
			}
		}, this);
	}
}