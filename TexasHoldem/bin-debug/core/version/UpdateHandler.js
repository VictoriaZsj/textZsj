var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UpdateHandler = (function () {
    function UpdateHandler() {
    }
    /// <summary>
    /// 获取渠道客户端URL地址
    /// </summary>
    /// <param name="callback"></param>
    UpdateHandler.prototype.GetUpdateChannelURL = function (callback) {
        if (StringUtil.isNull(this._updateChannelUrl)) {
            this._updateCallback = callback;
            RES.getResByUrl(ProjectDefined.GetInstance().getValue(ProjectDefined.updateUrl), this.OnGetUpdateChannelCompdate, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            if (callback != null) {
                callback(this._updateChannelUrl);
            }
            this._updateCallback = null;
        }
    };
    UpdateHandler.prototype.OnGetUpdateChannelCompdate = function (text) {
        this.ParseUpdate(text);
        if (this._updateCallback != null && StringUtil.isNull(this._updateChannelUrl) == false) {
            this._updateCallback(this._updateChannelUrl);
            this._updateCallback = null;
        }
    };
    /// <summary>
    /// 前往下载新版本安装包
    /// </summary>
    UpdateHandler.prototype.OpenUpdateUrl = function () {
        if (StringUtil.isNull(this._updateChannelUrl)) {
            RES.getResByUrl(ProjectDefined.GetInstance().getValue(ProjectDefined.updateUrl), this.OnUpdateCompdate, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            window.location.href = this._updateChannelUrl;
        }
    };
    UpdateHandler.prototype.OnUpdateCompdate = function (text) {
        this.ParseUpdate(text, true);
        if (StringUtil.isNull(this._updateChannelUrl) == false) {
            window.location.href = this._updateChannelUrl;
        }
    };
    UpdateHandler.prototype.ParseUpdate = function (text, isAlert) {
        if (isAlert === void 0) { isAlert = false; }
        if (StringUtil.isNull(text)) {
            if (isAlert) {
                this.exceptionAlert();
            }
        }
        else {
            try {
                var data = JSON.parse(text);
                this._updateChannelUrl = data[ChannelManager.bundleId];
            }
            catch (Exception) {
                if (isAlert) {
                    this.exceptionAlert();
                }
            }
        }
    };
    UpdateHandler.prototype.exceptionAlert = function () {
        AlertManager.showAlert("下载出错，请到应用商店下载");
        this._updateCallback = null;
    };
    return UpdateHandler;
}());
__reflect(UpdateHandler.prototype, "UpdateHandler");
//# sourceMappingURL=UpdateHandler.js.map