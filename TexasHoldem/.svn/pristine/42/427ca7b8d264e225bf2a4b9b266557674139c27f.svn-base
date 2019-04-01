/**
 *  资产管理类
 */
class PropertyManager
{
    /**
     * 金币差值
     */
    private static _goldOffset: number;
    /**
     * 钻石差值
     */
    private static _diamondOffset: number;
    /**
     * 经验差值
     */
    private static _expOffset: number;
    /**
     * 物品差值
     */
    public static _itemOffset: Array<ItemInfo> = new Array<ItemInfo>();

    private static _isOpen: boolean = false;
    /**
     * item获取列表
     */
    private static _itemGetList: Array<ItemGetInfo> = new Array<ItemGetInfo>();
    public static get itemGetList(): Array<ItemGetInfo>
    {
        return PropertyManager._itemGetList;
    }

    public static OpenGet()
    {
        PropertyManager._isOpen = true;
        ArrayUtil.Clear(PropertyManager._itemGetList);
        ArrayUtil.Clear(PropertyManager._itemOffset);
        PropertyManager._goldOffset = UserManager.userInfo.gold;
        PropertyManager._diamondOffset = UserManager.userInfo.diamond;
        PropertyManager._expOffset = UserManager.userInfo.exp;
        for (let item of ItemManager.itemList)
        {
            PropertyManager._itemOffset.push(item);
        }
    }

    public static Clear()
    {
        PropertyManager._isOpen = false;
    }

    private static ShowGoldPanel(count: number)
    {
        if (PropertyManager._isOpen)
        {
            if (count > 0)
            {
                UIManager.showPanel(UIModuleName.GetCoinTipsPanel, "您获得了" + MathUtil.formatNum(count) + "金币");
            }
        }
    }

    public static ShowItemList()
    {
        if (!PropertyManager._isOpen)
        {
            return;
        }
        PropertyManager._goldOffset = UserManager.userInfo.gold - PropertyManager._goldOffset;
        PropertyManager._diamondOffset = UserManager.userInfo.diamond - PropertyManager._diamondOffset;
        PropertyManager._expOffset = UserManager.userInfo.exp = PropertyManager._expOffset;
        for (let item of ItemManager.itemList)
        {
            if (PropertyManager._itemOffset.indexOf(item) == -1)
            {
                PropertyManager.AddBase(item.id, item.count);
            }
        }
        PropertyManager.AddBase(PropertyId.gold, PropertyManager._goldOffset);
        PropertyManager.AddBase(PropertyId.diamond, PropertyManager._diamondOffset);
        PropertyManager.AddBase(PropertyId.exp, PropertyManager._expOffset);
        if (PropertyManager._itemGetList.length == 1 && PropertyManager._itemGetList[0].id == PropertyId.gold)
        {
            PropertyManager.ShowGoldPanel(PropertyManager._itemGetList[0].count);
            return;
        }
        if (PropertyManager._itemGetList.length > 0)
        {
            let tips: string = "您获得了：";
            for (let i: number = 0; i < PropertyManager._itemGetList.length; i++)
            {
                let str: string = ItemDefined.GetInstance().getItemDefinition(PropertyManager._itemGetList[i].id).name + " * " + PropertyManager._itemGetList[i].count;
                if (i < PropertyManager._itemGetList.length - 1)
                {
                    str += "，";
                }
                tips += str;
            }
            UIManager.showPanel(UIModuleName.GetItemTipsPanel, PropertyManager._itemGetList);
        }
        PropertyManager.Clear();
    }

    public static AddBase(itemId: number, count: number)
    {
        if (count > 0 && PropertyManager._isOpen)
        {
            let info: ItemGetInfo = new ItemGetInfo();
            info.id = itemId;
            info.count = count;
            PropertyManager._itemGetList.push(info);
        }
    }

}