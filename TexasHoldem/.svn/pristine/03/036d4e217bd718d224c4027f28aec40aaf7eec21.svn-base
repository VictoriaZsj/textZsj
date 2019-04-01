/**
 * 物品管理
 */
class ItemManager
{
    public static itemList: Array<ItemInfo> = new Array<ItemInfo>();
    /**
     * 物品变更事件
     */
    public static itemChangeEvent: DelegateDispatcher = new DelegateDispatcher();

    public static reset()
    {
        ArrayUtil.Clear(ItemManager.itemList);
    }

    public static initialize(result: SpRpcResult)
    {
        ItemManager.reset();
        if (result.data)
        {
            for (let info of result.data)
            {
                let item: ItemInfo = new ItemInfo();
                item.id = info.Id;
                item.count = info.Count;
                ItemManager.itemList.push(item);
            }
        }
        SocketManager.AddCommandListener(Command.Rec_ItemListChange_2002, this.onItemListChange, this);
    }

    private static onItemListChange(result: SpRpcResult)
    {
        if (result.data)
        {
            for (let info of result.data)
            {
                let item: ItemInfo = ItemManager.getItemById(info.Id);
                if (info)
                {
                    item.count = info.Count;
                    ItemManager.checkItemCount(item);
                }
                else
                {
                    item = new ItemInfo();
                    item.id = info.Id;
                    item.count = info.Count;
                    ItemManager.itemList.push(item);
                }
            }
        }
        ItemManager.itemChangeEvent.dispatch();
    }

    public static getItemById(id: number): ItemInfo
    {
        for (let item of ItemManager.itemList)
        {
            if (item.id == id)
            {
                return item;
            }
        }
        return null;
    }

    /**
     * 使用物品的请求
     */
    public static reqUseItem(id: number, count: number)
    {
        let iteminfo: ItemInfo = ItemManager.getItemById(id);
        let number = count;
        let callback: Function = function ()
        {
            iteminfo.count -= number;
            ItemManager.checkItemCount(iteminfo);
        }

        if (!iteminfo || iteminfo.count < count)
        {
            UIManager.showFloatTips("物品不存在或数量不够");
        }
        else
        {
            SocketManager.call(Command.Req_UseItem_3021, { "Id": id, "Count": count, "msg": null }, callback, null, this);
        }
    }

    /**
     * 检查物品是用完
     */
    private static checkItemCount(info: ItemInfo)
    {
        if (info.count == 0)
        {
            ArrayUtil.RemoveItem<ItemInfo>(info, ItemManager.itemList);
        }
    }
    /**
     * 根据类型获取道具列表
     */
    public static getItemListByType(type: number): Array<ItemInfo>
    {
        let result: Array<ItemInfo> = new Array<ItemInfo>();
        for (let info of ItemManager.itemList)
        {
            if (info.definition.type == type)
            {
                result.push(info);
            }
        }
        return result;
    }
    /**
     * 是否拥有某赛事的门票
    */
    public static isHaveTicket(ticketId: number): boolean
    {
        if (ItemManager.itemList && ItemManager.itemList.length > 0)
        {
            for (let def of ItemManager.itemList)
            {
                if (def.id == ticketId)
                {
                    return true;
                }
            }
        }
        return false;
    }
}