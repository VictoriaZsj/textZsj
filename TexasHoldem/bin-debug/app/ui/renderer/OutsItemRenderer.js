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
 * 锦标赛最近赛况项面板
*/
var OutsItemRenderer = (function (_super) {
    __extends(OutsItemRenderer, _super);
    function OutsItemRenderer() {
        var _this = _super.call(this) || this;
        /**
         * 子列表
        */
        _this.list = new eui.List();
        _this.skinName = UIRendererSkinName.OutsItemRenderer;
        return _this;
    }
    OutsItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    OutsItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.dirBtn.touchEnabled = false;
            this.headImg.source = this.bindData.rankList[0].head;
            var date = new Date(this.bindData.time * 1000);
            if (this.bindData.time - TimeManager.GetServerUtcTimestamp() > 3600 * 24) {
                this.dateLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
            }
            else {
                this.dateLabel.text = "今天";
            }
            this.nameLabel.text = this.bindData.name;
            this.rankLabel.text = "冠军";
            this.userNameLabel.text = this.bindData.rankList[0].name;
            this.awardLabel.text = this.bindData.rankList[0].award;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setOutsRankInfo, this);
        }
    };
    OutsItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setOutsRankInfo, this);
    };
    /**
     * 设置最近赛况点击触发的操作事件
    */
    OutsItemRenderer.prototype.setOutsRankInfo = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        if (ChampionshipManager.spreadItem) {
            if (ChampionshipManager.spreadItem == this.dirBtn) {
                this.dirBtn.selected = !this.dirBtn.selected;
            }
            else {
                if (ChampionshipManager.childlist) {
                    ChampionshipManager.childlist.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBubble, this);
                    ChampionshipManager.spreadItem.parent.removeChild(ChampionshipManager.childlist);
                    ChampionshipManager.spreadItem.parent.height = ChampionshipManager.spreadItem.parent.height - ChampionshipManager.childlist.height;
                    ChampionshipManager.childlist = null;
                }
                ChampionshipManager.spreadItem.selected = false;
                ChampionshipManager.spreadItem = this.dirBtn;
                this.dirBtn.selected = true;
            }
        }
        else {
            ChampionshipManager.spreadItem = this.dirBtn;
            this.dirBtn.selected = true;
        }
        if (this.dirBtn.selected == true) {
            this.createChild();
        }
        else {
            this.delChild();
        }
    };
    /**
     * 创建折叠项
    */
    OutsItemRenderer.prototype.createChild = function () {
        UIUtil.bindRender(this.list, OutsChildItemRenderer);
        this.list.useVirtualLayout = true;
        this.list.width = 720;
        var layout = new eui.VerticalLayout();
        layout.gap = 1;
        this.list.layout = layout;
        var rankList = new Array();
        if (this.bindData.rankList && this.bindData.rankList.length > 0) {
            for (var i = 1; i < this.bindData.rankList.length; i++) {
                rankList[i - 1] = this.bindData.rankList[i];
            }
        }
        this.list.dataProvider = new eui.ArrayCollection(rankList);
        this.list.y = this.height;
        this.list.height = 60 * rankList.length;
        this.list.bottom = 1;
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBubble, this);
        ChampionshipManager.childlist = this.list;
        this.addChild(this.list);
        this.height = this.list.height + this.height;
    };
    /**
     * 删除折叠项
    */
    OutsItemRenderer.prototype.delChild = function () {
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancelBubble, this);
        ChampionshipManager.childlist = null;
        this.height = this.height - this.list.height;
        this.list.parent.removeChild(this.list);
    };
    /**
     * 取消冒泡
    */
    OutsItemRenderer.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    return OutsItemRenderer;
}(BaseItemRenderer));
__reflect(OutsItemRenderer.prototype, "OutsItemRenderer");
//# sourceMappingURL=OutsItemRenderer.js.map