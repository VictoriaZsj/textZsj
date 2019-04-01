var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 网络请求处理
 */
var URLLoader = (function () {
    function URLLoader() {
    }
    URLLoader.cancelLoad = function (onComplete, thisObject) {
        for (var i = URLLoader._waitList.length - 1; i >= 0; i--) {
            var loadInfo = URLLoader._waitList[i];
            if (loadInfo.onComplete == onComplete && loadInfo.thisObject == thisObject) {
                loadInfo.dispose();
                URLLoader._waitList.splice(i, 1);
            }
        }
        if (URLLoader._waitList.length == 0) {
            URLLoader._isLoading = false;
            URLLoader.disposeLoader();
        }
    };
    URLLoader.CancelAll = function () {
        URLLoader._isLoading = false;
        for (var _i = 0, _a = URLLoader._waitList; _i < _a.length; _i++) {
            var info = _a[_i];
            info.dispose();
        }
        URLLoader._waitList.length = 0;
        URLLoader.disposeLoader();
    };
    URLLoader.disposeLoader = function () {
        if (URLLoader._httpRequest) {
            URLLoader._httpRequest.abort();
            URLLoader._httpRequest.removeEventListener(egret.Event.COMPLETE, URLLoader.OnLoadCompleted, this);
            URLLoader._httpRequest.removeEventListener(egret.IOErrorEvent.IO_ERROR, URLLoader.OnLoadIOError, this);
            URLLoader._httpRequest = null;
        }
    };
    /**
     * 加载内容
     */
    URLLoader.downloadContent = function (url, dataFormat, onComplete, onError, thisObject) {
        if (onComplete === void 0) { onComplete = null; }
        if (onError === void 0) { onError = null; }
        if (onComplete && thisObject == null) {
            throw new Error('onComplete不为空时，thisObject不能为空');
        }
        var loadInfo = new URLLoadInfo();
        loadInfo.url = url;
        loadInfo.thisObject = thisObject;
        loadInfo.dataFormat = dataFormat;
        loadInfo.onComplete = onComplete;
        loadInfo.onError = onError;
        URLLoader._waitList.push(loadInfo);
        //开始加载
        URLLoader.LoadNext();
    };
    URLLoader.LoadNext = function () {
        if (URLLoader._isLoading == false) {
            URLLoader.disposeLoader();
            if (URLLoader._waitList.length > 0) {
                URLLoader._isLoading = true;
                var loadInfo = URLLoader._waitList[0];
                URLLoader._httpRequest = new egret.HttpRequest();
                URLLoader._httpRequest.addEventListener(egret.Event.COMPLETE, URLLoader.OnLoadCompleted, this);
                URLLoader._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, URLLoader.OnLoadIOError, this);
                URLLoader._httpRequest.open(loadInfo.url, egret.HttpMethod.POST);
                URLLoader._httpRequest["url"] = loadInfo.url;
                URLLoader._httpRequest.send();
            }
        }
    };
    URLLoader.OnLoadCompleted = function (event) {
        var loader = event.currentTarget;
        var data = loader.response;
        var loadInfo;
        for (var i = URLLoader._waitList.length - 1; i >= 0; i--) {
            loadInfo = URLLoader._waitList[i];
            if (loadInfo && loadInfo.url == loader["url"]) {
                URLLoader._waitList.splice(i, 1);
                FuncUtil.invoke(loadInfo.onComplete, loadInfo.thisObject, data);
                loadInfo.dispose();
            }
        }
        URLLoader._isLoading = false;
        URLLoader.LoadNext();
    };
    URLLoader.OnLoadIOError = function (event) {
        var loader = event.currentTarget;
        var loadInfo;
        for (var i = URLLoader._waitList.length - 1; i >= 0; i--) {
            loadInfo = URLLoader._waitList[i];
            if (loadInfo && loadInfo.url == loader["url"]) {
                URLLoader._waitList.splice(i, 1);
                FuncUtil.invoke(loadInfo.onError, loadInfo.thisObject, event);
                loadInfo.dispose();
            }
        }
        URLLoader._isLoading = false;
        URLLoader.LoadNext();
    };
    URLLoader._waitList = new Array(); //等待加载列表
    URLLoader._isLoading = false;
    return URLLoader;
}());
__reflect(URLLoader.prototype, "URLLoader");
/**
 * 网络请求信息
 */
var URLLoadInfo = (function () {
    function URLLoadInfo() {
    }
    URLLoadInfo.prototype.dispose = function () {
        this.onComplete = null;
        this.onError = null;
        this.onProgress = null;
        this.thisObject = null;
    };
    return URLLoadInfo;
}());
__reflect(URLLoadInfo.prototype, "URLLoadInfo");
//# sourceMappingURL=URLLoader.js.map