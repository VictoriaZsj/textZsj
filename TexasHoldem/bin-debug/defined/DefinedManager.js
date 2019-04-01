var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DefinedManager = (function () {
    function DefinedManager() {
    }
    /**
     * 重置
     */
    DefinedManager.Reset = function () {
        DefinedManager._parseSet = new Array(); //关联数组不能用length=0清空
    };
    /**
     * 设置配置表数据
     */
    DefinedManager.SetConfigData = function (data) {
        DefinedManager._parseSet = new Array();
        DefinedManager._dataMap.clear();
        if (data) {
            for (var key in data) {
                if (DefinedManager._dataMap.containsKey(key) == false) {
                    DefinedManager._dataMap.add(key, data[key]);
                }
                else {
                    console.log("Config有重复的:", key);
                }
            }
        }
    };
    /**
     * 设置配置数据仅在开发模式使用
     */
    DefinedManager.setData = function (key, data) {
        if (DefinedManager._dataMap.containsKey(key) == false) {
            DefinedManager._dataMap.add(key, data);
        }
        else {
            console.log("Config有重复的:", key);
        }
    };
    /**
     * 配置表是否已经解析过
     */
    DefinedManager.IsParsed = function (name) {
        return DefinedManager._parseSet[name] == true;
    };
    /**
     * 获取配置表数据
     */
    DefinedManager.GetData = function (name, suffix) {
        if (suffix === void 0) { suffix = ResSuffixName.JSONSuffix; }
        DefinedManager._parseSet[name] = true;
        return DefinedManager._dataMap.getValue(name);
    };
    DefinedManager._dataMap = new Dictionary();
    DefinedManager._parseSet = new Array();
    return DefinedManager;
}());
__reflect(DefinedManager.prototype, "DefinedManager");
//# sourceMappingURL=DefinedManager.js.map