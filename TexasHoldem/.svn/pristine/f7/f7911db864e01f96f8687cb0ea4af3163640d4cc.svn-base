/**
 * 物品信息
 */
class ItemInfo
{
    /**
     * 道具id
     */
    private _id: number;
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
        this._definition = ItemDefined.GetInstance().getItemDefinition(this.id);
    }

    private _definition: ItemDefinition;
    public get definition(): ItemDefinition
    {
        return this._definition;
    }
    /**
     * 数量
     */
    public count: number;
    /**
     * 是否为新物品
     */
    public isNew: boolean = false;
}