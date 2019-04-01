class RankInfo extends BaseServerValueInfo
{
    public reset()
    {
        this.roleId = 0;
        this.name = StringConstant.empty;
        this.score = 0;
        this.rank = 0;
        this.head = ImageSource.Default_Head;
        this.change = RankChange.NoChange;
    }
    /**
     * id
     */
    public roleId: number;
    /**
     * 昵称
     */
    public name: string;
    /**
    * 排行榜数值
    */
    public score: number;
    /**
     * 排行
     */
    public rank: number;
    /**
    * 头像地址
    */
    public head: string;
    /**
     * 排名变化
     */
    public change: RankChange;
}