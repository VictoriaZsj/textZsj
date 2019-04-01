/**
 * 赢牌组件
 */
class WinCardComponent extends BaseComponent<number>
{
    public winnerHead: eui.Image;
    public winCardBoderArray: Array<eui.Image>;
    public mcGroup: eui.Group;
    public seat_mcGroup:eui.Group;
    public constructor()
    {
        super();
        this.skinName = UIComponentSkinName.WinCardComponent;
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }
    public init(data: number)
    {
        super.init(data);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
    }
    protected rendererStart(event: egret.Event)
    {
        super.rendererStart(event);
    }
    public winPlay()
    {
        AnimationFactory.getWinCardAnim(this.mcGroup);
        AnimationFactory.getSeatAnim(this.seat_mcGroup);
    }
   

}


