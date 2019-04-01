/**
 * 排行榜渲染项
 */
class RankItemRenderer extends BaseItemRenderer<RankInfo>
{
    public itemImg: eui.Image//用户头像
    public rankLabel: eui.Label;//排名
    public nameLabel: eui.Label;//用户名字
    public numLabel: eui.Label;//数值（财富，等级，vip等）
    public upLabel: eui.Label;//上升标识
    public downLabel: eui.Label;//下降标识
    public gotoButton: eui.Label;//查看详情

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.RankItemRenderer;
    }
    protected createChildren()
    {
        this.dataChanged();
        this.gotoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        this.refresh();
    }

    private refresh()
    {
        if (this.bindData)
        {
            this.itemImg.source = this.bindData.head;
            this.rankLabel.text = RankManager.getRankDes(this.bindData.rank);
            this.nameLabel.text = this.bindData.name;
            this.numLabel.text = this.bindData.score.toString();
            this.showUpOrDown();
            if (this.bindData.change)
            {
                switch (this.bindData.change)
                {
                    case RankChange.Up:
                        this.showUpOrDown(this.upLabel);
                        break;
                    case RankChange.Down:
                        this.showUpOrDown(this.downLabel);
                        break;
                }
            }
        }
    }

    private gotoUserInfo()
    {
        UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
    }

    private showUpOrDown(show?: egret.DisplayObject)
    {
        this.upLabel.visible = false;
        this.downLabel.visible = false;
        if (show)
        {
            show.visible = true;
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.gotoButton)
        {
            this.gotoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        }
    }
}