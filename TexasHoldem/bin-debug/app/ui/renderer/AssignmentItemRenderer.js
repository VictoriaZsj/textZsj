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
 * 任务项
 */
var AssignmentItemRenderer = (function (_super) {
    __extends(AssignmentItemRenderer, _super);
    function AssignmentItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AssignmentItemRenderer;
        return _this;
    }
    AssignmentItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    AssignmentItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            //this.achieveImg.source = this.bindData.definition.icon;
            this.desLabel.text = this.bindData.definition.name;
            this.rewardLabel.text = this.bindData.definition.rewardNum.toString();
            //this.rewardImg.source = this.bindData.definition.rewardId;
            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    };
    AssignmentItemRenderer.prototype.refreshiUI = function () {
        var groupInfo = AchieveProcessManager.getAchieveProcessInfoByGroup(this.bindData.definition.group);
        this.processImg.width = 300;
        if (!this.bindData.isComplete) {
            this.processImg.width *= groupInfo.process / this.bindData.definition.para1;
            this.processLabel.text = groupInfo.process + "/" + this.bindData.definition.para1;
            this.gotoBtn.visible = true;
            this.takePrizeBtn.visible = false;
        }
        else {
            this.processLabel.text = this.bindData.definition.para1 + "/" + this.bindData.definition.para1;
            this.gotoBtn.visible = false;
            this.takePrizeBtn.visible = true;
        }
    };
    AssignmentItemRenderer.prototype.onClick = function (event) {
        switch (event.target) {
            case this.takePrizeBtn:
                AchievementManager.reqTakeAchievePrize(this.bindData.id);
                break;
            case this.gotoBtn:
                break;
        }
    };
    AssignmentItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return AssignmentItemRenderer;
}(BaseItemRenderer));
__reflect(AssignmentItemRenderer.prototype, "AssignmentItemRenderer");
//# sourceMappingURL=AssignmentItemRenderer.js.map