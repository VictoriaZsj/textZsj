var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *  资产管理类
 */
var PropertyManager = (function () {
    function PropertyManager() {
    }
    Object.defineProperty(PropertyManager, "itemGetList", {
        get: function () {
            return PropertyManager._itemGetList;
        },
        enumerable: true,
        configurable: true
    });
    PropertyManager.OpenGet = function () {
        PropertyManager._isOpen = true;
        ArrayUtil.Clear(PropertyManager._itemGetList);
        PropertyManager._goldOffset = UserManager.userInfo.gold;
        PropertyManager._diamondOffset = UserManager.userInfo.diamond;
        PropertyManager._expOffset = UserManager.userInfo.exp;
    };
    PropertyManager.OpenGoldGet = function () {
        PropertyManager._goldOffset = UserManager.userInfo.gold;
    };
    PropertyManager.OpenDiamondGet = function () {
        PropertyManager._diamondOffset = UserManager.userInfo.diamond;
    };
    PropertyManager.Clear = function () {
        PropertyManager._isOpen = false;
    };
    PropertyManager.ShowGoldPanel = function () {
        if (PropertyManager._isOpen == false) {
            var doffset = UserManager.userInfo.gold - PropertyManager._goldOffset;
            if (doffset > 0) {
                UIManager.showPanel(UIModuleName.GetCoinTipsPanel, "您获得了" + MathUtil.formatNum(doffset) + "金币");
            }
        }
    };
    PropertyManager.ShowItemList = function () {
        if (!PropertyManager._isOpen) {
            return;
        }
        PropertyManager._goldOffset = UserManager.userInfo.gold - PropertyManager._goldOffset;
        PropertyManager._diamondOffset = UserManager.userInfo.diamond - PropertyManager._diamondOffset;
        PropertyManager._expOffset = UserManager.userInfo.exp = PropertyManager._expOffset;
        PropertyManager.AddBase(PropertyId.gold, PropertyManager._goldOffset);
        PropertyManager.AddBase(PropertyId.diamond, PropertyManager._diamondOffset);
        PropertyManager.AddBase(PropertyId.exp, PropertyManager._expOffset);
        if (PropertyManager._itemGetList.length > 0) {
            var tips = "您获得了：";
            for (var i = 0; i < PropertyManager._itemGetList.length; i++) {
                var str = ItemDefined.GetInstance().getItemDefinition(PropertyManager._itemGetList[i].id).name + " * " + PropertyManager._itemGetList[i].count;
                if (i < PropertyManager._itemGetList.length - 1) {
                    str += "，";
                }
                tips += str;
            }
            UIManager.showPanel(UIModuleName.GetCoinTipsPanel, tips);
        }
    };
    PropertyManager.AddBase = function (itemId, count) {
        if (count > 0 && PropertyManager._isOpen) {
            var info = new ItemGetInfo();
            info.id = itemId;
            info.count = count;
            PropertyManager._itemGetList.push(info);
        }
    };
    PropertyManager._isOpen = false;
    /**
     * item获取列表
     */
    PropertyManager._itemGetList = new Array();
    return PropertyManager;
}());
__reflect(PropertyManager.prototype, "PropertyManager");
//# sourceMappingURL=PropertyManager.js.map