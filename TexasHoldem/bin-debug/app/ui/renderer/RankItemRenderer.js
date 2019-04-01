var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 排行榜渲染项
 */
var RankItemRenderer = (function (_super) {
    __extends(RankItemRenderer, _super);
    function RankItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.RankItemRenderer;
        return _this;
    }
    RankItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
        this.gotoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    };
    RankItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.refresh();
    };
    RankItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
            this.itemImg.source = this.bindData.head;
            this.rankLabel.text = RankManager.getRankDes(this.bindData.rank);
            this.nameLabel.text = this.bindData.name;
            this.numLabel.text = this.bindData.score.toString();
            this.showUpOrDown();
            if (this.bindData.change) {
                switch (this.bindData.change) {
                    case RankChange.Up:
                        this.showUpOrDown(this.upLabel);
                        break;
                    case RankChange.Down:
                        this.showUpOrDown(this.downLabel);
                        break;
                }
            }
        }
    };
    RankItemRenderer.prototype.gotoUserInfo = function () {
        UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
    };
    RankItemRenderer.prototype.showUpOrDown = function (show) {
        this.upLabel.visible = false;
        this.downLabel.visible = false;
        if (show) {
            show.visible = true;
        }
    };
    RankItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.gotoButton) {
            this.gotoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        }
    };
    return RankItemRenderer;
}(BaseItemRenderer));
__reflect(RankItemRenderer.prototype, "RankItemRenderer");
//# sourceMappingURL=RankItemRenderer.js.map