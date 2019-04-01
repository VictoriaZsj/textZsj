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
 * 成就renderer
 */
var AchievementItemRenderer = (function (_super) {
    __extends(AchievementItemRenderer, _super);
    function AchievementItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AchievementItemRenderer;
        return _this;
    }
    AchievementItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    AchievementItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.itemImg.source = this.bindData.definition.icon;
            this.textLabel.text = MathUtil.formatNum(this.bindData.definition.para1);
            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    };
    AchievementItemRenderer.prototype.refreshiUI = function () {
        var userInfo;
        if (UserManager.otherUserInfo == null || UserManager.otherUserInfo.roleId == UserManager.userInfo.roleId) {
            userInfo = UserManager.userInfo;
        }
        else {
            userInfo = UserManager.otherUserInfo;
        }
        this.achieveGroup.visible = true;
        if (this.bindData.isComplete) {
            this.achieveMask.visible = false;
        }
        else if (this.bindData.definition.preId == 0) {
            this.achieveMask.visible = true;
        }
        else if (AchievementManager.getAchieveInfoById(userInfo.allAchieveList, this.bindData.definition.preId).isComplete) {
            this.achieveMask.visible = true;
        }
        else {
            this.achieveGroup.visible = false;
        }
    };
    AchievementItemRenderer.prototype.init = function (info) {
        this.info = info;
        this.itemImg.source = info.definition.icon;
        this.textLabel.text = MathUtil.formatNum(info.definition.para1);
        this.achieveGroup.visible = true;
        this.achieveMask.visible = false;
    };
    AchievementItemRenderer.prototype.onClick = function (event) {
        UIManager.showPanel(UIModuleName.AchievementItemPanel, this.bindData);
    };
    AchievementItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return AchievementItemRenderer;
}(BaseItemRenderer));
__reflect(AchievementItemRenderer.prototype, "AchievementItemRenderer");
//# sourceMappingURL=AchievementItemRenderer.js.map