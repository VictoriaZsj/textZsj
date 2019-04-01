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
 * 游戏大厅界面
 */
var GameHallPanel = (function (_super) {
    __extends(GameHallPanel, _super);
    function GameHallPanel() {
        var _this = _super.call(this) || this;
        //排行榜数据
        _this.rankList = new Array();
        _this.listNum = 4;
        _this.animeList = new Array();
        _this.setGrayMask(false);
        _this.skinName = UISkinName.GameHallPanel;
        return _this;
    }
    GameHallPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.moreGroup.visible = false;
    };
    GameHallPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.refreshUserInfoUI();
        this.refreshNewMail();
        if (!UserManager.userInfo.name || UserManager.userInfo.name.length <= 0) {
            this.showCreateRolePanel();
        }
        RankManager.reqRankList(RankManager.getListType(RankType.Gold, RankListType.Friend));
    };
    GameHallPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GameHallPanel.prototype.refreshUserInfoUI = function () {
        this.userNameLabel.text = UserManager.userInfo.name.toString();
        if (VipManager.isVip()) {
            this.vipLevelLabel.text = "VIP" + UserManager.userInfo.vipLevel;
            this.vipLevelLabel.visible = true;
        }
        else {
            this.vipLevelLabel.visible = false;
        }
        this.refreshGold();
    };
    /**
     * 刷新财产信息
     */
    GameHallPanel.prototype.refreshGold = function (num) {
        this.goldNumLabel.text = MathUtil.formatNum(UserManager.userInfo.gold);
        this.diamondNumLabel.text = MathUtil.formatNum(UserManager.userInfo.diamond);
    };
    /**
     * 刷新新邮件通知
     */
    GameHallPanel.prototype.refreshNewMail = function () {
        if (MailManager.unReadCount > 0) {
            this.newMail.visible = true;
        }
        else {
            this.newMail.visible = false;
        }
    };
    GameHallPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.setEnterAnime();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        VipManager.vipUpgradeEvent.addListener(this.refreshUserInfoUI, this);
        MailManager.haveNewMailEvent.addListener(this.refreshNewMail, this);
        UserManager.propertyChangeEvent.addListener(this.refreshGold, this);
        RankManager.getRankListEvent.addListener(this.getRankList, this);
    };
    GameHallPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.setOutAnime();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        VipManager.vipUpgradeEvent.removeListener(this.refreshUserInfoUI, this);
        MailManager.haveNewMailEvent.removeListener(this.refreshNewMail, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshGold, this);
        RankManager.getRankListEvent.removeListener(this.getRankList, this);
    };
    GameHallPanel.prototype.getRankList = function (type) {
        if (type == ReqRankType.FriendGold) {
            for (var i = 0; i < this.listNum; i++) {
                if (i < RankManager.currentRankList.length) {
                    this.rankList.push(RankManager.currentRankList[i]);
                }
                else {
                    this.rankList.push(null);
                }
            }
        }
        this.setRankInfo(this.rankingImg0, this.rankList[0]);
        this.setRankInfo(this.rankingImg1, this.rankList[1]);
        this.setRankInfo(this.rankingImg2, this.rankList[2]);
        this.setRankInfo(this.rankingImg3, this.rankList[3]);
    };
    GameHallPanel.prototype.setRankInfo = function (img, info) {
        img.visible = false;
        if (info) {
            img.visible = true;
            img.source = info.head;
        }
    };
    GameHallPanel.prototype.onClickHandler = function (event) {
        if (this.moreGroup.visible && event.target != this.moreBtn) {
            this.moreGroup.visible = false;
        }
        switch (event.target) {
            case this.borderImg:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                UIManager.showPanel(UIModuleName.UserInfoPanel);
                break;
            case this.addDiamondBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShoppingGpIndex.Diamond });
                break;
            case this.addGoldBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShoppingGpIndex.Gold });
                break;
            case this.pokerBtn:
                SoundManager.playButtonEffect(event.target);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.PlayingFieldPanel);
                break;
            case this.matchBtn:
                SoundManager.playButtonEffect(event.target);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.ChampionshipPanel);
                break;
            case this.hundredBattle:
                SoundManager.playButtonEffect(event.target);
                this.setOutAnime();
                // if (RoomManager.isInRoom)
                // {
                // 	AlertManager.showDoubleAlert("你已加入有房间，是否确定进入？", this.goToGame.bind(this));
                // }
                // else
                // {
                // 	UIManager.showPanel(UIModuleName.JoinInRoomPanel);
                // }
                UIManager.showPanel(UIModuleName.InviteFriendPanel);
                break;
            case this.signBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                UIManager.showPanel(UIModuleName.SignInPanel);
                break;
            case this.activityBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.ActivityPanel);
                break;
            case this.mailBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.newMail.visible = false;
                UIManager.showPanel(UIModuleName.MailPanel);
                break;
            case this.shopBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.ShoppingPanel);
                break;
            case this.friendBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.FriendPanel);
                break;
            case this.assignmentBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.AssignmentPanel);
                break;
            case this.moreBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.moreGroup.visible = !this.moreGroup.visible;
                break;
            case this.freeGoldBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                break;
            case this.safeBoxBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                if (VipManager.isVip()) {
                    this.setOutAnime();
                    UIManager.showPanel(UIModuleName.SafeBoxPanel);
                }
                else {
                    AlertManager.showConfirm("保险箱功能仅对VIP用户开放", this.goShoppingPanel.bind(this));
                }
                break;
            case this.gameRuleBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.GameRulePanel);
                break;
            case this.settingBtn:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                this.setOutAnime();
                UIManager.showPanel(UIModuleName.SetPanel);
                break;
            case this.rankingImg0:
                UserManager.reqShowOtherUserInfoPanel(this.rankList[0].roleId);
                break;
            case this.rankingImg1:
                UserManager.reqShowOtherUserInfoPanel(this.rankList[1].roleId);
                break;
            case this.rankingImg2:
                UserManager.reqShowOtherUserInfoPanel(this.rankList[2].roleId);
                break;
            case this.rankingImg3:
                UserManager.reqShowOtherUserInfoPanel(this.rankList[3].roleId);
                break;
            case this.rankingImg4:
            case this.rankingImg5:
                SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
                UIManager.showPanel(UIModuleName.RankPanel);
                break;
            case this.buyAccessBtn://todo
                //  UIManager.showPanel(UIModuleName.BuyAccessGamePanel,{smallestGold:data.smallestGold,biggestGold:data.biggestGold,bigChips:data.bigChips});
                break;
        }
    };
    GameHallPanel.prototype.goToGame = function () {
        SceneManager.switcScene(SceneType.Game);
    };
    GameHallPanel.prototype.setEnterAnime = function () {
        this.removeEnterAnime();
        this.userinfoGroup.y = -100;
        this.animeList.push(egret.Tween.get(this.userinfoGroup).to({ y: 0 }, 600, egret.Ease.backOut));
        this.rightMenu.x = 720;
        this.animeList.push(egret.Tween.get(this.rightMenu).to({ x: 570 }, 600, egret.Ease.backOut));
        this.ranking.x = -100;
        this.animeList.push(egret.Tween.get(this.ranking).to({ x: 0 }, 600, egret.Ease.backOut));
        this.gameButton.y = 1280;
        this.animeList.push(egret.Tween.get(this.gameButton).to({ y: 810 }, 800, egret.Ease.backOut));
        this.bottomButton.y = 1280;
        this.animeList.push(egret.Tween.get(this.bottomButton).to({ y: 1130 }, 600, egret.Ease.backOut));
        this.kanbanImg.alpha = 0;
        this.animeList.push(egret.Tween.get(this.kanbanImg).to({ alpha: 1 }, 200));
    };
    GameHallPanel.prototype.setOutAnime = function () {
        this.removeEnterAnime();
        this.userinfoGroup.y = 0;
        this.animeList.push(egret.Tween.get(this.userinfoGroup).to({ y: -100 }, 600));
        this.rightMenu.x = 570;
        this.animeList.push(egret.Tween.get(this.rightMenu).to({ x: 720 }, 600));
        this.ranking.x = 0;
        this.animeList.push(egret.Tween.get(this.ranking).to({ x: -100 }, 600));
        this.gameButton.y = 810;
        this.animeList.push(egret.Tween.get(this.gameButton).to({ y: 1280 }, 800));
        this.bottomButton.y = 1130;
        this.animeList.push(egret.Tween.get(this.bottomButton).to({ y: 1280 }, 600));
        this.kanbanImg.alpha = 1;
        this.animeList.push(egret.Tween.get(this.kanbanImg).to({ alpha: 0 }, 200).call(this.onCloseAnmComplete, this));
    };
    GameHallPanel.prototype.removeEnterAnime = function () {
        egret.Tween.removeTweens(this.userinfoGroup);
        egret.Tween.removeTweens(this.rightMenu);
        egret.Tween.removeTweens(this.ranking);
        egret.Tween.removeTweens(this.gameButton);
        egret.Tween.removeTweens(this.bottomButton);
        egret.Tween.removeTweens(this.kanbanImg);
    };
    GameHallPanel.prototype.onCloseAnmComplete = function () {
        UIManager.closePanel(this);
    };
    GameHallPanel.prototype.goShoppingPanel = function () {
        this.setOutAnime();
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: ShoppingGpIndex.Vip });
    };
    GameHallPanel.prototype.goSavePanel = function () {
        this.setOutAnime();
        UIManager.showPanel(UIModuleName.SafeBoxPanel);
    };
    /**
     * 打开创建角色面板
    */
    GameHallPanel.prototype.showCreateRolePanel = function () {
        LoginManager.OnCreateRole.addListener(this.onCreateRoleComplete, this);
        UIManager.showPanel(UIModuleName.CreateRolePanel);
    };
    GameHallPanel.prototype.onCreateRoleComplete = function () {
        LoginManager.OnCreateRole.removeListener(this.onCreateRoleComplete, this);
        this.refreshUserInfoUI();
        UIManager.closePanel(UIModuleName.CreateRolePanel);
    };
    return GameHallPanel;
}(BasePanel));
__reflect(GameHallPanel.prototype, "GameHallPanel");
//# sourceMappingURL=GameHallPanel.js.map