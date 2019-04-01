var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *商城管理
 */
var ShoppingManager = (function () {
    function ShoppingManager() {
    }
    ShoppingManager.initialize = function () {
        ArrayUtil.Clear(ShoppingManager.shoppingList);
        var def;
        for (var i = 0; i < PayDefined.GetInstance().dataList.length; i++) {
            def = new ShoppingInfo();
            def.id = PayDefined.GetInstance().dataList[i].id;
            if (def.definition.type == ListType.Gold) {
                ShoppingManager.goldList.push(def);
            }
            else if (def.definition.type == ListType.Diamond) {
                ShoppingManager.diamondList.push(def);
            }
            else if (def.definition.type == ListType.Vip) {
                ShoppingManager.vipList.push(def);
            }
        }
        var awardDef;
        for (var i = 0; i < ShoppingManager.goldList.length; i++) {
            awardDef = AwardDefined.GetInstance().getAwardDefinition(ShoppingManager.goldList[i].definition.awardId);
            ShoppingManager.awardGoldList.push(awardDef);
        }
    };
    /**
     * 向服务器抛送订单
    */
    ShoppingManager.reqShopping = function (awardId) {
        var callBack = function (result) {
            ShoppingManager.buyOverAction.dispatch(); //协议发送后抛出买完事件
            var goSavePanel = function () {
                UIManager.showPanel(UIModuleName.SafeBoxPanel);
            };
            if (awardId > 100 && awardId < 104) {
                if (!UserManager.userInfo.isSafePwd) {
                    AlertManager.showAlert("您开通了VIP，保险箱以为您免费开放，请尽快设定您的保险箱密码!", goSavePanel);
                }
            }
        };
        //todo
        SocketManager.call(Command.Award_Exchange_3113, { "Id": awardId }, callBack, null, this);
    };
    /**
     * 情况列表
    */
    ShoppingManager.clearList = function () {
        ArrayUtil.Clear(ShoppingManager.diamondList);
        ArrayUtil.Clear(ShoppingManager.goldList);
        ArrayUtil.Clear(ShoppingManager.vipList);
    };
    ShoppingManager.shoppingList = new Array();
    ShoppingManager.goldList = new Array();
    ShoppingManager.diamondList = new Array();
    ShoppingManager.vipList = new Array();
    ShoppingManager.buyOverAction = new DelegateDispatcher();
    ShoppingManager.awardGoldList = new Array();
    return ShoppingManager;
}());
__reflect(ShoppingManager.prototype, "ShoppingManager");
var ShoppingInfo = (function () {
    function ShoppingInfo() {
        this._id = 0;
    }
    Object.defineProperty(ShoppingInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = PayDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShoppingInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            this._definition = value;
        },
        enumerable: true,
        configurable: true
    });
    return ShoppingInfo;
}());
__reflect(ShoppingInfo.prototype, "ShoppingInfo");
//# sourceMappingURL=ShoppingManager.js.map