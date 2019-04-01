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
 * 用户信息面板
 */
var UserInfoPanel = (function (_super) {
    __extends(UserInfoPanel, _super);
    function UserInfoPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.UserInfoPanel;
        return _this;
    }
    UserInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isCloseButtonTween = false;
        this.isMaskClickClose = true;
    };
    UserInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this.friendInfoType = appendData.type;
        }
        var array = new Array();
        array.push(this.dataGroup);
        array.push(this.situationGroup);
        array.push(this.achievementGroup);
        this.userInfoTab.init(array);
        this.userInfoTab.isTween = false;
        this.userInfoTab.viewStack.y = -150;
        UIUtil.listRenderer(this.achieveList, this.achieveScroller, AchievementItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, false);
    };
    UserInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        var otherUserInfo = UserManager.otherUserInfo;
        if (otherUserInfo == null || otherUserInfo.roleId == UserManager.userInfo.roleId) {
            this.showFriendUI(this.myInfoBtnGroup);
            this.setInfo(UserManager.userInfo);
            this.refreshAchieveInfo(UserManager.userInfo);
        }
        else {
            if (this.friendInfoType) {
                switch (this.friendInfoType) {
                    case FriendInfoType.Receive:
                        this.showFriendUI(this.receiveOtherBtnGroup);
                        break;
                    case FriendInfoType.Send:
                        this.showFriendUI(this.sendOtherInfoBtnGroup);
                        break;
                }
            }
            else {
                this.showFriendUI(this.friendInfoBtnGroup);
            }
            this.setInfo(UserManager.otherUserInfo);
            this.refreshAchieveInfo(UserManager.otherUserInfo);
        }
    };
    UserInfoPanel.prototype.setInfo = function (info) {
        this.diamondNumLabel.text = info.diamond.toString();
        this.goldNumLabel.text = info.gold.toString();
        this.refreshUserInfo(info);
        this.refreshOtherVipInfo(info);
        this.userIdLabel.text = info.roleId.toString();
        this.levelLabel.text = info.level.toString();
        this.titleLabel.text = UserUtil.getTitle(info.level);
        this.levelProgressImg.width = 328;
        this.levelProgressImg.width *= UserUtil.getPercentage(info.level, info.exp);
        this.joinTimeLabel.text = DateTimeUtil.formatDate(new Date(info.createdTime * 1000), DateTimeUtil.Format_Standard_Date);
        this.maxGoldLabel.text = info.maxGold.toString();
        this.maxGoldOnetimeLabel.text = info.maxGoldOnetimes.toString();
        this.frindNumLabel.text = info.friendNum.toString();
        this.winTimeLabel.text = info.gameTimes.toString() + "/" + info.winTimes.toString();
        this.winProbabilityLabel.text = Math.round(info.gameTimes == 0 ? 0 : (info.winTimes / info.gameTimes) * 100).toString() + "%";
        this.maxHandLabel.text = info.maxHandName;
        this.championTimesLabel.text = info.championTimes.toString();
        // for (let i: number = 0; i < this.maxHandGroup.numChildren; i++)
        // {
        // 	let img:eui.Image = this.maxHandGroup.getChildAt(i) as eui.Image;
        // 	img.source = info.maxHandList[i].toString();
        // }
    };
    UserInfoPanel.prototype.refreshUserInfo = function (info) {
        this.userNameLabel.text = info.name;
        this.userImg.source = info.head;
        this.sexImg.visible = true;
        switch (info.sex) {
            case Sex.Female:
                this.sexImg.source = ImageSource.FemaleImg;
                break;
            case Sex.Male:
                this.sexImg.source = ImageSource.MaleImg;
                break;
            case Sex.Unknown:
                this.sexImg.visible = false;
                break;
        }
        this.ageLabel.text = info.age.toString();
        this.userDesLabel.text = info.sign;
    };
    UserInfoPanel.prototype.refreshMyInfo = function () {
        this.refreshUserInfo(UserManager.userInfo);
    };
    UserInfoPanel.prototype.refreshVipInfo = function () {
        this.refreshOtherVipInfo(UserManager.userInfo);
    };
    UserInfoPanel.prototype.refreshOtherVipInfo = function (info) {
        if (!VipManager.isVip(info)) {
            this.vipGroup.visible = false;
        }
        else {
            this.vipLevelLabel.text = info.vipLevel.toString();
        }
    };
    UserInfoPanel.prototype.refreshAchieveInfo = function (userInfo) {
        this.achieveList.dataProvider = new eui.ArrayCollection(AchievementManager.getAchieveListByTag(AchieveTag.Achievement));
    };
    UserInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        VipManager.vipUpgradeEvent.addListener(this.refreshVipInfo, this);
        UserManager.onSetUserInfoComplete.addListener(this.refreshMyInfo, this);
    };
    UserInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        VipManager.vipUpgradeEvent.removeListener(this.refreshVipInfo, this);
        UserManager.onSetUserInfoComplete.removeListener(this.refreshMyInfo, this);
        UserManager.otherUserInfo = null;
    };
    /**
     * 点击面板按钮事件处理
    */
    UserInfoPanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        switch (event.target) {
            case this.changeNameBtn:
                UIManager.showPanel(UIModuleName.ChangeUserNamePanel);
                break;
            case this.myPrizeBtn:
                UIManager.showPanel(UIModuleName.PrizePanel);
                break;
            case this.myVipBtn:
                UIManager.showPanel(UIModuleName.VipPanel);
                break;
            case this.userImg:
                UIManager.showPanel(UIModuleName.EditUserInfoPanel);
                break;
            case this.deleteFriendBtn:
                if (UserManager.otherUserInfo) {
                    FriendManager.reqRemovePlayer(UserManager.otherUserInfo.roleId);
                }
                break;
            case this.requestBtn:
                if (UserManager.otherUserInfo) {
                    FriendManager.reqAddPlayer(UserManager.otherUserInfo.roleId);
                }
                break;
            case this.refuseBtn:
                if (UserManager.otherUserInfo) {
                    FriendManager.reqReceiveFriendRequest(UserManager.otherUserInfo.roleId, IsReceive.NotREceive);
                }
                break;
            case this.acceptBtn:
                if (UserManager.otherUserInfo) {
                    FriendManager.reqReceiveFriendRequest(UserManager.otherUserInfo.roleId, IsReceive.Receive);
                }
                break;
        }
    };
    UserInfoPanel.prototype.showFriendUI = function (showGroup) {
        this.myInfoBtnGroup.visible = false;
        this.friendInfoBtnGroup.visible = false;
        this.receiveOtherBtnGroup.visible = false;
        this.sendOtherInfoBtnGroup.visible = false;
        showGroup.visible = true;
    };
    return UserInfoPanel;
}(BasePanel));
__reflect(UserInfoPanel.prototype, "UserInfoPanel");
//# sourceMappingURL=UserInfoPanel.js.map