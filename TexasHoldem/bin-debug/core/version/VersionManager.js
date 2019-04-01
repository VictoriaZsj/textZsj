var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 版本管理
 */
var VersionManager = (function () {
    function VersionManager() {
    }
    Object.defineProperty(VersionManager, "loginPort", {
        /**
         * 登录端口
         */
        get: function () {
            if (VersionManager._isClientTest) {
                return ProjectDefined.GetInstance().getValue(ProjectDefined.testPort);
            }
            return ProjectDefined.GetInstance().getValue(ProjectDefined.port);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionManager, "loginAddress", {
        /**
         * 登录地址
         */
        get: function () {
            if (VersionManager._isClientTest) {
                return ProjectDefined.GetInstance().getValue(ProjectDefined.testAddress);
            }
            return ProjectDefined.GetInstance().getValue(ProjectDefined.address);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionManager, "isClientTest", {
        get: function () {
            return VersionManager._isClientTest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionManager, "isSafe", {
        get: function () {
            return VersionManager._isClientTest && VersionManager._isSafe;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionManager, "updateHandler", {
        get: function () {
            return VersionManager._updateHandler;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化，获取安装包版本号
     */
    VersionManager.Initialize = function () {
        var clientVersion;
        if (ChannelManager.clientVersion) {
            clientVersion = ChannelManager.clientVersion;
        }
        else {
            clientVersion = ProjectDefined.GetInstance().getValue(ProjectDefined.version);
        }
        VersionManager.SetClientVersion(clientVersion);
    };
    /**
     * 渠道初始化完毕
     */
    VersionManager.loadServerVersion = function () {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            ChannelManager.sdkHotUpdateComplete();
        }
        else {
            RES.getResByUrl(ProjectDefined.GetInstance().getValue(ProjectDefined.versionUrl) + "?" + Date.now().toString() + Math.random().toString(), VersionManager.onLoadVersionComplete, this, RES.ResourceItem.TYPE_JSON);
        }
    };
    VersionManager.onLoadVersionComplete = function (data) {
        if (data) {
            VersionManager._isSafe = true ? false : StringUtil.toBoolean(data.safe);
            VersionManager._isMaintain = parseInt(data.mt) == 1;
            var serverVersion = data.version;
            VersionManager.verifyVersion(serverVersion, JSON.stringify(data));
        }
        else {
            VersionManager.onLoadError();
        }
    };
    /**
     * 检测安装包版本
     */
    VersionManager.verifyVersion = function (serverVersion, data) {
        if (!serverVersion) {
            VersionManager.onLoadError();
            return;
        }
        var serverVList = StringUtil.toIntArray(serverVersion, StringConstant.Dot);
        VersionManager._isClientTest = true ? true : VersionUtil.CompareAllForce(VersionManager._clientVersionArray, serverVList);
        if (serverVList && VersionManager._clientVersionArray && serverVList.length > 2 && VersionManager._clientVersionArray.length > 2
            && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            if (VersionUtil.CompareForce(serverVList, VersionManager._clientVersionArray)) {
                AlertManager.showAlert("有新版本更新，需要更新才能进入游戏，点击确定前往更新!", VersionManager.gotoLoadNewVersion);
            }
            else {
                if (VersionUtil.CompareOptimize(serverVList, VersionManager._clientVersionArray)) {
                    AlertManager.showConfirm("有新版本更新，是否前往更新？", VersionManager.gotoLoadNewVersion, VersionManager.verifyVersion2, null, null, null, null, null, data);
                }
                else {
                    VersionManager.verifyVersion2(data);
                }
            }
        }
        else {
            ChannelManager.sdkHotUpdateComplete();
        }
    };
    VersionManager.verifyVersion2 = function (data) {
        if (VersionManager._isClientTest) {
            ChannelManager.sdkHotUpdateComplete();
        }
        else if (VersionManager._isMaintain) {
            VersionManager.LoadMaintainTxt();
        }
        else {
            ChannelManager.hotUpdate(data);
        }
    };
    VersionManager.onLoadError = function () {
        AlertManager.showAlert("加载版本文件失败！点击确定重新加载！", VersionManager.onReTryLoadVersion);
    };
    VersionManager.onReTryLoadVersion = function () {
        VersionManager.loadServerVersion();
    };
    VersionManager.SetClientVersion = function (value) {
        VersionManager._clientVersion = value;
        VersionManager._clientVersionArray = StringUtil.toIntArray(value, StringConstant.Dot);
    };
    /**
     * 跳转下载新的版本
     */
    VersionManager.gotoLoadNewVersion = function () {
        VersionManager._updateHandler.OpenUpdateUrl();
    };
    /**
     * 验证服务器版本(游戏内容版本)
     */
    VersionManager.VerifyGameServer = function (gameServerVersion) {
        var gsv = StringUtil.toIntArray(gameServerVersion, StringConstant.Dot);
        if ((VersionManager._clientVersionArray[0] != gsv[0]) || (VersionManager._clientVersionArray[1] < gsv[1])) {
            var info = new AlertInfo();
            info.title = "版本错误";
            info.message = "客户端版本与服务器版本不匹配，请更新客户端再进游戏。";
            info.confirmLabel = "前往下载";
            info.OnConfirm = VersionManager.gotoLoadNewVersion;
            AlertManager.showAlertInfo(info);
            return false;
        }
        return true;
    };
    /**
     * 加载维护文件
     */
    VersionManager.LoadMaintainTxt = function () {
        RES.getResByUrl(ProjectDefined.GetInstance().getValue(ProjectDefined.maintainUrl) + "?" + Date.now().toString() + Math.random().toString(), VersionManager.OnMaintainComplete, this, RES.ResourceItem.TYPE_TEXT);
    };
    VersionManager.OnMaintainComplete = function (data) {
        if (data) {
            AlertManager.showAlert(data.text, VersionManager.onReTryLoadVersion);
        }
        else {
            AlertManager.showAlert("游戏停机维护中，届时将无法登录游戏，请各位相互转告。具体开服时间可能会根据实际情况通告，敬请谅解。", VersionManager.onReTryLoadVersion);
        }
    };
    /**
     * 根据安全开关来控制组件的显示
     */
    VersionManager.setComponentVisibleBySafe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args != null) {
            if (VersionManager.isSafe) {
                for (var i = 0; i < args.length; i++) {
                    if (args[i]) {
                        args[i].visible = false;
                    }
                }
            }
            else {
                for (var i = 0; i < args.length; i++) {
                    if (args[i]) {
                        args[i].visible = true;
                    }
                }
            }
        }
    };
    VersionManager._isSafe = false;
    VersionManager._updateHandler = new UpdateHandler();
    return VersionManager;
}());
__reflect(VersionManager.prototype, "VersionManager");
//# sourceMappingURL=VersionManager.js.map