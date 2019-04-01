var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 配置文件加载
 */
var LoadConfig = (function () {
    function LoadConfig() {
    }
    /**
     * 开始加载配置表及协议文件
     */
    LoadConfig.startLoad = function (callBack, thisObj) {
        LoadConfig.loadComplete = new Delegate(callBack, thisObj);
        if (true) {
            LoadConfig.loadIndex = 0;
            LoadConfig.startLoadDevelopModeConfig();
        }
        else {
            RES.getResAsync("config_zip", function (data) {
                if (data != null) {
                    var zip = new JSZip(data);
                    var configJson = JSON.parse(zip.file("config.json").asText());
                    DefinedManager.SetConfigData(configJson);
                    LoadConfig.loadLoginProtcolfile();
                }
                else {
                    console.log("配置数据载入失败！", "config_zip");
                }
            }, this);
        }
    };
    LoadConfig.startLoadDevelopModeConfig = function () {
        var key = LoadConfig.loadList[LoadConfig.loadIndex];
        RES.getResByUrl(PathName.Config + key + ResSuffixName.Json, LoadConfig.loadNext, this, RES.ResourceItem.TYPE_JSON);
    };
    LoadConfig.loadNext = function (data, url) {
        var key = LoadConfig.loadList[LoadConfig.loadIndex];
        DefinedManager.setData(key, data);
        if (LoadConfig.loadIndex == LoadConfig.loadList.length) {
            LoadConfig.loadLoginProtcolfile();
        }
        else {
            LoadConfig.loadIndex++;
            LoadConfig.startLoadDevelopModeConfig();
        }
    };
    LoadConfig.loadLoginProtcolfile = function () {
        RES.getResAsync("loginall_bin", function (data) {
            if (data != null) {
                GameSetting.LoginBin = data;
                LoadConfig.loadc2sProtcolfile();
            }
            else {
                console.log("协议获取失败!loginall_bin");
            }
        }, this);
    };
    LoadConfig.loadc2sProtcolfile = function () {
        RES.getResAsync("c2s_bin", function (data) {
            if (data != null) {
                GameSetting.Gamec2sBin = data;
                LoadConfig.loads2cProtocolfile();
            }
            else {
                console.log("协议数据获取失败！c2s_bin");
            }
        }, this);
    };
    LoadConfig.loads2cProtocolfile = function () {
        RES.getResAsync("s2c_bin", function (data) {
            if (data != null) {
                GameSetting.Games2cBin = data;
                if (LoadConfig.loadComplete) {
                    LoadConfig.loadComplete.invoke();
                }
            }
            else {
                console.log("协议数据获取失败！s2c_bin");
            }
        }, this);
    };
    LoadConfig.loadList = ["project", "cardGroup", "cardWall", "error", "liangPai", "music",
        "outCard", "pai", "payList", "shouPai", "text", "exp", "name", "forbidden", "award", "room", "fastChat",
        "item", "achieve", "systemTime", "championship", "chips", "championshipPrize", "championshipBlind", "activity_list", "activity_signin", "mail"];
    return LoadConfig;
}());
__reflect(LoadConfig.prototype, "LoadConfig");
//# sourceMappingURL=LoadConfig.js.map