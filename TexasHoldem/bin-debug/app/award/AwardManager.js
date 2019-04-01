var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 奖励兑换管理
 */
var AwardManager = (function () {
    function AwardManager() {
    }
    AwardManager.Initialize = function (data) {
        AwardManager.Reset();
        var objs = data.data["DataList"];
        if (objs) {
            var data_1;
            for (var i = 0; i < objs.length; i++) {
                data_1 = objs[i];
                var id = parseInt(data_1["Id"]);
                if (AwardManager._map.containsKey(id)) {
                    AwardManager._map.getValue(id).times = parseInt(data_1["Count"]);
                    if (data_1["Time"] != null) {
                        AwardManager._map.getValue(id).lastTime = parseInt(data_1["Time"]);
                    }
                    else {
                        AwardManager._map.getValue(id).lastTime = 0;
                    }
                }
            }
        }
        /**
         * 次数更新推送
         */
        // SocketManager.AddCommandListener(Command.Role_Get_2031, AwardManager.OnExchangeNotifyFromServer, AwardManager);
    };
    AwardManager.OnExchangeNotifyFromServer = function (data) {
        var id = parseInt(data.data["Id"]);
        var info;
        if (AwardManager._map.getValue(id)) {
            info = AwardManager._map.getValue(id);
            info.times = parseInt(data.data["Count"]);
            info.lastTime = TimeManager.GetServerUtcTimestamp();
        }
        AwardManager.OnAwardValueChanged.dispatch();
    };
    /**
     * 发送兑换id
     */
    AwardManager.Exchange = function (id, count, needAlert) {
        if (count === void 0) { count = 1; }
        if (needAlert === void 0) { needAlert = true; }
        var type = AwardManager.GetNotFitErrorType(id);
        if (type != AwardExchangeErrorType.NoError) {
            egret.log("[兑换错误，错误id]：" + type.toString());
            return;
        }
        if (needAlert) {
            PropertyManager.OpenGet();
        }
        if (count < 1) {
            count = 1;
        }
        var callback = function (result) {
            AwardManager.OnExchangeFromServer(id, count, needAlert);
        };
        SocketManager.call(Command.Award_Exchange_3113, { "Id": id, "Count": count }, callback, null, this);
    };
    AwardManager.OnExchangeFromServer = function (id, count, needAlert) {
        var info = null;
        if (AwardManager._map.containsKey(id)) {
            info = AwardManager._map.getValue(id);
            info.times += count;
            AwardManager.OnExchanged.dispatch();
        }
        if (needAlert) {
            PropertyManager.ShowItemList();
        }
    };
    /**
     * 获取不满足条件的错误信息
     */
    AwardManager.GetNotFitErrorType = function (id) {
        var result = AwardExchangeErrorType.NoError;
        var info = AwardManager.GetExchangeInfo(id);
        if (!info) {
            result = result | AwardExchangeErrorType.NullAward;
            return result;
        }
        var limit = AwardManager.GetAwardLimit(id);
        if (limit != 0 && info.times >= limit) {
            result = result | AwardExchangeErrorType.OverTimes;
        }
        var serverTime = TimeManager.GetServerLocalDateTime();
        if (info.definition.level > UserManager.userInfo.level) {
            result = result | AwardExchangeErrorType.LevelNotEnough;
        }
        if (!AwardDefined.GetInstance().getPrevIdIsNull(id)) {
            var preInfo = AwardManager.GetExchangeInfo(info.definition.preId);
            limit = AwardManager.GetAwardLimit(info.definition.preId);
            if (preInfo.times < limit) {
                result = result | AwardExchangeErrorType.PreNotComplete;
            }
        }
        return result;
    };
    /**
     * 客户端判断是否已经达到兑换上限
     */
    AwardManager.IsToLimitClient = function (awardId) {
        var limit = AwardManager.GetAwardLimit(awardId);
        var times = AwardManager.GetTimes(awardId);
        if (times >= limit && limit != 0) {
            return true;
        }
        return false;
    };
    /**
     * 获取当前兑换的次数
     */
    AwardManager.GetTimes = function (id) {
        var info = AwardManager.GetExchangeInfo(id);
        if (info) {
            return info.times;
        }
        return 0;
    };
    AwardManager.GetAwardLimit = function (awardId) {
        var def = AwardDefined.GetInstance().getAwardDefinition(awardId);
        if (def) {
            if (StringUtil.isNullOrEmpty(def.costName)) {
                return def.limit;
            }
            return 0;
        }
    };
    /**
     * 获取最近一次的修改时间
     */
    AwardManager.GetLastAlterDate = function (id) {
        var info = AwardManager.GetExchangeInfo(id);
        if (info) {
            return info.lastTime;
        }
        return 0;
    };
    /**
     * 获得兑换信息
     */
    AwardManager.GetExchangeInfo = function (id) {
        var info;
        if (AwardManager._map.getValue(id)) {
            info = AwardManager._map.getValue(id);
        }
        return info;
    };
    AwardManager.Reset = function () {
        AwardManager._map.clear();
        var defDic = AwardDefined.GetInstance().awardDefinitionDic;
        var keys = defDic.getKeys();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var info = new AwardTimesInfo();
            info.id = key;
            info.times = 0;
            info.lastTime = TimeManager.Utc1970.getTime();
            AwardManager._map.add(info.id, info);
        }
    };
    AwardManager.OnExchanged = new DelegateDispatcher();
    AwardManager.OnAwardValueChanged = new DelegateDispatcher();
    AwardManager._map = new Dictionary();
    return AwardManager;
}());
__reflect(AwardManager.prototype, "AwardManager");
//# sourceMappingURL=AwardManager.js.map