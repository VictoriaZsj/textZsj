var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户信息管理
 */
var UserManager = (function () {
    function UserManager() {
    }
    /**
     * 重新登录
     */
    UserManager.reLogin = function () {
        UserManager.userInfo = null;
        //ArrayUtil.Clear(UserManager.achievementInfoList);
        UserManager.otherUserInfoClear();
    };
    UserManager.otherUserInfoClear = function () {
        if (UserManager.otherUserInfo) {
            UserManager.otherUserInfo.reset();
        }
    };
    UserManager.initialize = function (roleId, data) {
        UserManager.otherUserInfoClear();
        UserManager.userInfo = new UserInfo();
        if (ChannelManager.loginType == ChannelLoginType.Weixin) {
            var name_1 = undefined;
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("name")) {
                name_1 = LoginManager.loginInfo.channeldata["name"];
            }
            var head = undefined;
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("head")) {
                head = LoginManager.loginInfo.channeldata["head"];
            }
            var sex = Sex.Male;
            if (LoginManager.loginInfo.channeldata.hasOwnProperty("sex")) {
                sex = parseInt(LoginManager.loginInfo.channeldata["sex"]);
            }
            if ((name_1 !== null && name_1 !== undefined && UserManager.userInfo.name != name_1) ||
                (head !== null && head !== undefined && UserManager.userInfo.head != head) || (UserManager.userInfo.sex != sex)) {
                UserManager.reqSetUserInfo(null, sex, null);
            }
        }
        UserManager.userInfo.copyValueFrom(data);
        UserManager.playerNameOper(UserManager.userInfo);
        SocketManager.AddCommandListener(Command.Role_Push_ExpChange_2028, UserManager.onExpChangeResult, this);
        SocketManager.AddCommandListener(Command.Role_Push_PropertyChange_2000, UserManager.onPropetyChangeHandler, this);
    };
    /**
     * 用户经验更改
     */
    UserManager.onExpChangeResult = function (result) {
        if (result.data) {
            if (UserManager.userInfo.level < ExpDefined.GetInstance().dataList[ExpDefined.GetInstance().dataList.length - 1].level && UserManager.userInfo.level != result.data["level"]) {
                UserManager.userInfo.level = result.data["level"];
                UserManager.levelUpgrade.dispatch();
            }
            UserManager.userInfo.exp = result.data["exp"];
        }
    };
    UserManager.onPropetyChangeHandler = function (result) {
        if (result.data && UserManager.userInfo) {
            UserManager.setNumProperty("gold", result.data);
            UserManager.setNumProperty("diamond", result.data);
            UserManager.setNumProperty("safeGold", result.data);
            UserManager.propertyChangeEvent.dispatch();
        }
    };
    /**
     * 仅限于number类型
     */
    UserManager.setNumProperty = function (name, source) {
        if (source[name]) {
            UserManager.userInfo[name] = source[name];
        }
        else {
            UserManager.userInfo[name] = 0;
        }
    };
    UserManager.reqGetOtherUserInfo = function (roleId, flag) {
        var callback = function (result) {
            if (!UserManager.otherUserInfo) {
                UserManager.otherUserInfo = new UserInfo();
            }
            if (result.data) {
                UserManager.playerNameOper(result.data);
                UserManager.otherUserInfo.copyValueFrom(result.data);
                AchievementManager.setAllAchieveList(UserManager.otherUserInfo, result);
                if (flag == FriendUIType.FriendList || flag == FriendUIType.GiftList) {
                    FriendManager.getUserInfoResult(result, flag);
                }
                else {
                    UserManager.otherUserInfo.vipType = VipManager.getVipType(UserManager.otherUserInfo.vipTime, UserManager.otherUserInfo.yearVipTime);
                    UserManager.otherUserInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.otherUserInfo.vipType).speed;
                    UserManager.getOtherUserInfoEa.dispatch();
                }
            }
        };
        UserManager.sendGetUserInfo(roleId, callback, null);
    };
    UserManager.reqShowOtherUserInfoPanel = function (roleId) {
        var callback = function (result) {
            if (!UserManager.otherUserInfo) {
                UserManager.otherUserInfo = new UserInfo();
            }
            if (result.data) {
                UserManager.playerNameOper(result.data);
                UserManager.otherUserInfo.copyValueFrom(result.data);
                AchievementManager.setAllAchieveList(UserManager.otherUserInfo, result);
                UserManager.otherUserInfo.vipType = VipManager.getVipType(UserManager.otherUserInfo.vipTime, UserManager.otherUserInfo.yearVipTime);
                UserManager.otherUserInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.otherUserInfo.vipType).speed;
                UserManager.getOtherUserInfoEa.dispatch();
            }
            if (FriendManager.isFriend(UserManager.otherUserInfo.roleId)) {
                UIManager.showPanel(UIModuleName.UserInfoPanel);
            }
            else {
                UIManager.showPanel(UIModuleName.UserInfoPanel, { type: FriendInfoType.Send });
            }
        };
        UserManager.sendGetUserInfo(roleId, callback);
    };
    /**
     * 获取其他用户信息
     */
    UserManager.sendGetUserInfo = function (roleId, callback, errorCallBack) {
        SocketManager.call(Command.Friend_GetRoleInfo_3023, { "roleId": roleId }, callback, errorCallBack, this);
    };
    /**
     * 发送创建角色信息请求
    */
    UserManager.reqCreateRole = function (name, sex) {
        var callback = function (result) {
            if (name != null) {
                UserManager.userInfo.name = name;
            }
            if (sex != null) {
                UserManager.userInfo.sex = sex;
            }
            LoginManager.OnCreateRole.dispatch();
        };
        var obj = {};
        if (name != null) {
            obj["name"] = name;
        }
        if (sex != null) {
            obj["sex"] = sex;
        }
        SocketManager.call(Command.Role_Create_3012, obj, callback, null, this);
    };
    /**
     * 设置昵称
     */
    UserManager.editUserName = function (name) {
        UserManager.reqCreateRole(name, null);
    };
    /**
     * 设置用户基础信息
     */
    UserManager.reqSetUserInfo = function (sign, sex, age) {
        var callBack = function (result) {
            if (obj["sign"] != null) {
                UserManager.userInfo.sign = obj["sign"];
            }
            if (obj["sex"] != null) {
                UserManager.userInfo.sex = obj["sex"];
            }
            if (obj["age"] != null) {
                UserManager.userInfo.age = obj["age"];
            }
            UserManager.playerNameOper(UserManager.userInfo);
            UserManager.onSetUserInfoComplete.dispatch();
        };
        var obj = {};
        if (sign != null) {
            obj["sign"] = sign;
        }
        if (sex != null) {
            obj["sex"] = sex;
        }
        if (age != null) {
            obj["age"] = age;
        }
        SocketManager.call(Command.Role_SetInfo_3609, obj, callBack, null, this);
    };
    UserManager.playerNameOper = function (pInfo, propertyName, propertyId) {
        if (propertyName === void 0) { propertyName = "name"; }
        if (propertyId === void 0) { propertyId = "roleId"; }
        if (pInfo && pInfo.hasOwnProperty(propertyId)) {
            var tmpObj = pInfo;
            var pre = StringConstant.empty;
            if (ChannelManager.loginType == ChannelLoginType.Guest && tmpObj[propertyName] != "游客") {
                pre = "游客";
            }
            if (!tmpObj[propertyName]) {
                tmpObj[propertyName] = pre + "";
            }
            else {
                tmpObj[propertyName] = pre + tmpObj[propertyName];
            }
        }
    };
    /**
     * 等级升级事件
     */
    UserManager.levelUpgrade = new DelegateDispatcher();
    /**
     * 资产变更事件
     */
    UserManager.propertyChangeEvent = new DelegateDispatcher();
    //---------------------------------------------
    // event
    //---------------------------------------------
    /**
     * 拉取用户信息事件
     */
    UserManager.getOtherUserInfoEa = new DelegateDispatcher();
    /**
     * 设置用户信息完毕
     */
    UserManager.onSetUserInfoComplete = new DelegateDispatcher();
    return UserManager;
}());
__reflect(UserManager.prototype, "UserManager");
//# sourceMappingURL=UserManager.js.map