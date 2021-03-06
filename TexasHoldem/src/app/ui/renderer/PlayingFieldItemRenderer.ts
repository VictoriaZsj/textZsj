/**
 * 游戏场面板房间列表项渲染
 */
class PlayingFieldItemRenderer extends BaseItemRenderer<PlayingFieldRoomInfo>{
    /**
     * 模式
    */
    public patternImage: eui.Image;
    /**
     * 房间Id
    */
    public roomIdLabel: eui.Label;
    /**
     * 房间玩家人数
    */
    public roomPlayNumImage: eui.Image;
    /**
     * 房间最大玩家人数
    */
    public roomMaxPlayNumImage: eui.Image;
    /**
     * 盲注
    */
    public blindLabel: eui.Label;
    /**
     * 买入
    */
    public buyLabel: eui.Label;

    public toggleBtn0: eui.ToggleButton;
    public toggleBtn1: eui.ToggleButton;
    public toggleBtn2: eui.ToggleButton;
    public toggleBtn3: eui.ToggleButton;
    public toggleBtn4: eui.ToggleButton;
    public toggleBtn5: eui.ToggleButton;
    public toggleBtn6: eui.ToggleButton;
    public toggleBtn7: eui.ToggleButton;
    public toggleBtn8: eui.ToggleButton;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.PlayingFieldItemRenderer;
    }
    protected createChildren()
    {
        this.toggleBtn0.touchEnabled = this.toggleBtn1.touchEnabled = this.toggleBtn2.touchEnabled = this.toggleBtn3.touchEnabled = this.toggleBtn4.touchEnabled = this.toggleBtn5.touchEnabled = this.toggleBtn6.touchEnabled = this.toggleBtn7.touchEnabled = this.toggleBtn8.touchEnabled = false;
        for (let i: number = 0; i < 9; i++)
        {
            this["toggleBtn" + i].visible = false;
        }
        this.dataChanged();
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            if (this.bindData.id.toString().length < 5)
            {
                this.roomIdLabel.text = (Array(5).join('0') + this.bindData.id).slice(-5);
            } else
            {
                this.roomIdLabel.text = this.bindData.id.toString();
            }
            this.blindLabel.text = MathUtil.formatNum(this.bindData.smallBlind) + "/" + MathUtil.formatNum(this.bindData.bigBlind);
            this.buyLabel.text = MathUtil.formatNum(this.bindData.minBuy) + "/" + MathUtil.formatNum(this.bindData.maxBuy);
            if(this.bindData.pattern == Pattern.AllIn){
                this.patternImage.source = "zhouhuiyuan_png";
            }else if(this.bindData.pattern == Pattern.Fast)
            {
                this.patternImage.source = "yuehuiyuan_png";
            }else if(this.bindData.pattern == Pattern.Ante)
            {
                this.patternImage.source = ImageSource.TestImg;
            }else if(this.bindData.pattern == Pattern.NoUpperLimit)
            {
                this.patternImage.source = ImageSource.TestImg;
            }
            for (let i: number = 0; i < this.bindData.maxPlayer; i++)
            {
                 this["toggleBtn" + i].visible = true;
            }
            for (let j: number = 0; j < this.bindData.player; j++)
            {
                 this["toggleBtn" + j].selected = true;
            }
        }
    }
}