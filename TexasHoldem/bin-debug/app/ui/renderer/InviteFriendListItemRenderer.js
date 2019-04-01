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
 * 邀请好友项列表
*/
var InviteFriendListItemRenderer = (function (_super) {
    __extends(InviteFriendListItemRenderer, _super);
    function InviteFriendListItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.InviteFriendItemRenderer;
        return _this;
    }
    InviteFriendListItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    InviteFriendListItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData && this.headImg != null) {
            this.isCheckedBtn.selected = this.bindData.state;
            this.headImg.source = ImageSource.TestImg;
            this.nameLabel.text = this.bindData.friendInfo.name;
            if (this.bindData.friendInfo.offlineTime) {
                this.isOnlinetoggleBtn.selected = false;
            }
            else {
                this.isOnlinetoggleBtn.selected = true;
            }
        }
    };
    InviteFriendListItemRenderer.prototype.setChecked = function (flag) {
        if (this.isCheckedBtn) {
            this.isCheckedBtn.selected = flag;
        }
    };
    return InviteFriendListItemRenderer;
}(BaseItemRenderer));
__reflect(InviteFriendListItemRenderer.prototype, "InviteFriendListItemRenderer");
//# sourceMappingURL=InviteFriendListItemRenderer.js.map