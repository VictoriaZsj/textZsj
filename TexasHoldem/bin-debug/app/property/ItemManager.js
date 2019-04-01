var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 物品管理
 */
var ItemManager = (function () {
    function ItemManager() {
    }
    ItemManager.reset = function () {
        ArrayUtil.Clear(ItemManager.itemList);
    };
    ItemManager.initialize = function (result) {
        ItemManager.reset();
        if (result.data) {
            for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                var info = _a[_i];
                var item = new ItemInfo();
                item.id = info.Id;
                item.count = info.Count;
                ItemManager.itemList.push(item);
            }
        }
        SocketManager.AddCommandListener(Command.Rec_ItemListChange_2002, this.onItemListChange, this);
    };
    ItemManager.onItemListChange = function (result) {
        if (result.data) {
            for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                var info = _a[_i];
                var item = ItemManager.getItemById(info.Id);
                if (info) {
                    item.count = info.Count;
                    ItemManager.checkItemCount(item);
                }
                else {
                    item = new ItemInfo();
                    item.id = info.Id;
                    item.count = info.Count;
                    ItemManager.itemList.push(item);
                }
            }
        }
        ItemManager.itemChangeEvent.dispatch();
    };
    ItemManager.getItemById = function (id) {
        for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == id) {
                return item;
            }
        }
        return null;
    };
    /**
     * 使用物品的请求
     */
    ItemManager.reqUseItem = function (id, count) {
        var iteminfo = ItemManager.getItemById(id);
        var number = count;
        var callback = function () {
            iteminfo.count -= number;
            ItemManager.checkItemCount(iteminfo);
        };
        if (!iteminfo || iteminfo.count < count) {
            UIManager.showFloatTips("物品不存在或数量不够");
        }
        else {
            SocketManager.call(Command.Req_UseItem_3021, { "Id": id, "Count": count, "msg": null }, callback, null, this);
        }
    };
    /**
     * 检查物品是用完
     */
    ItemManager.checkItemCount = function (info) {
        if (info.count == 0) {
            ArrayUtil.RemoveItem(info, ItemManager.itemList);
        }
    };
    /**
     * 根据类型获取道具列表
     */
    ItemManager.getItemListByType = function (type) {
        var result = new Array();
        for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition.type == type) {
                result.push(info);
            }
        }
        return result;
    };
    /**
     * 是否拥有某赛事的门票
    */
    ItemManager.isHaveTicket = function (ticketId) {
        if (ItemManager.itemList && ItemManager.itemList.length > 0) {
            for (var _i = 0, _a = ItemManager.itemList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.id == ticketId) {
                    return true;
                }
            }
        }
        return false;
    };
    ItemManager.itemList = new Array();
    /**
     * 物品变更事件
     */
    ItemManager.itemChangeEvent = new DelegateDispatcher();
    return ItemManager;
}());
__reflect(ItemManager.prototype, "ItemManager");
//# sourceMappingURL=ItemManager.js.map