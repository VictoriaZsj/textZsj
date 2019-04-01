var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 我的奖品管理
*/
var PrizeManager = (function () {
    function PrizeManager() {
    }
    /**
     * 发送获取奖品信息请求
    */
    PrizeManager.reqGetAwardList = function () {
        //todo 协议待添加
        SocketManager.call(Command.Friend_AddPlayer_3152, null, PrizeManager.getAwardListResponse, null, this);
    };
    /**
     * 获取奖品信息成功回调
    */
    PrizeManager.getAwardListResponse = function (result) {
        if (result.data) {
            if (!PrizeManager.notReceiveList) {
                PrizeManager.notReceiveList = new Array();
            }
            if (!PrizeManager.hasReceiveList) {
                PrizeManager.hasReceiveList = new Array();
            }
            for (var _i = 0, _a = result.data['awardList']; _i < _a.length; _i++) {
                var def = _a[_i];
                var info = new ItemDefinition();
                info = ItemDefined.GetInstance().getItemDefinition(def.id);
                def.name = info.name;
                def.icon = info.icon;
                def.des = info.des;
                def.effectType = info.effectType;
                if (def.state == PrizeState.NotReceive) {
                    PrizeManager.notReceiveList.push(def);
                }
                else {
                    PrizeManager.hasReceiveList.push(def);
                }
            }
        }
        PrizeManager.onGetAwardListEvent.dispatch();
    };
    /**
     * 发送领取奖品请求
    */
    PrizeManager.reqGetAward = function (id) {
        var callback = function (result) {
            PrizeManager.onGetAwardEvent.dispatch(id);
        };
        //todo 协议待添加
        SocketManager.call(Command.Friend_AddPlayer_3152, null, callback, null, this);
    };
    /**
     * 发送保存领奖信息请求
    */
    PrizeManager.reqSaveInfo = function (name, tel, qq, email, address) {
        //todo 协议待添加
        SocketManager.call(Command.Friend_AddPlayer_3152, { name: name, tel: tel, qq: qq, email: email, address: address }, PrizeManager.saveInfoResponse, null, this);
    };
    /**
     * 保存领奖信息成功回调
    */
    PrizeManager.saveInfoResponse = function (result) {
        AlertManager.showAlert("领奖信息保存成功");
    };
    /**
     * 获取奖品信息成功后发送的广播
    */
    PrizeManager.onGetAwardListEvent = new DelegateDispatcher();
    /**
     * 领取奖品成功后发送的广播
    */
    PrizeManager.onGetAwardEvent = new DelegateDispatcher();
    return PrizeManager;
}());
__reflect(PrizeManager.prototype, "PrizeManager");
//# sourceMappingURL=PrizeManager.js.map