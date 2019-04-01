var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *用户工具
 */
var UserUtil = (function () {
    function UserUtil() {
    }
    /**
     *获得当前等级经验百分比
    */
    UserUtil.getPercentage = function (levelValue, expValue) {
        var nextLevelExp;
        if (levelValue == 1) {
            return Math.round((expValue / ExpDefined.GetInstance().dataList[1].exp) * 100) / 100;
        }
        if (levelValue > 1 && levelValue < 100) {
            for (var i = 1; i < levelValue; i++) {
                expValue = expValue - ExpDefined.GetInstance().dataList[i].exp;
            }
            nextLevelExp = ExpDefined.GetInstance().dataList[i].exp;
            return Math.round((expValue / nextLevelExp) * 100) / 100;
        }
        if (levelValue == 100) {
            return 0;
        }
    };
    /**
     * 获得当前等级称号
    */
    UserUtil.getTitle = function (level) {
        for (var i = 0; i < ExpDefined.GetInstance().dataList.length; i++) {
            if (level == ExpDefined.GetInstance().dataList[i].level) {
                return ExpDefined.GetInstance().dataList[i].title;
            }
        }
        return null;
    };
    /**
     * 判断昵称是否合法
    */
    UserUtil.isLegalNickName = function (nickNameLable) {
        var nickName = nickNameLable;
        //是否为空
        if (!nickName) {
            AlertManager.showAlert("昵称不能为空");
            return false;
        }
        //长度是否合法
        if (nickName.length > 6) {
            AlertManager.showAlert("昵称不能大于6个字");
            return false;
        }
        //格式是否合法
        if (!(/^[\u4e00-\u9fa5\dA-Za-z]+$/.test(nickName))) {
            AlertManager.showAlert("昵称只能为汉字、英文和数字");
            return false;
        }
        //是否含有屏蔽词
        if (this.isContainForbiddenName(nickName)) {
            AlertManager.showAlert("您输入的昵称包含屏蔽词");
            return false;
        }
        return true;
    };
    /**
     * 判断是否包含屏蔽词
    */
    UserUtil.isContainForbiddenName = function (nickName) {
        for (var i = 0; i < ForbiddenDefined.GetInstance().dataList.length; i++) {
            if (nickName.indexOf(ForbiddenDefined.GetInstance().dataList[i].des.toString()) >= 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * 生成随机昵称并返回改昵称
    */
    UserUtil.randomNickName = function (sex) {
        sex = sex < Sex.Female ? Sex.Male : Sex.Female;
        var firstName = this.randomFirstName();
        var lastName = this.randomLastName(sex);
        return firstName.trim() + lastName.trim();
    };
    /**
     * 生成随机昵称的姓
    */
    UserUtil.randomFirstName = function () {
        var firstNameIndex = MathUtil.getRandom(0, NameDefined.GetInstance().lastNameRange - 1);
        var firstName = NameDefined.GetInstance().dataList[firstNameIndex].name;
        return firstName;
    };
    /**
     * 生成随机昵称的名
    */
    UserUtil.randomLastName = function (sex) {
        var lastNameIndex;
        var lastNameInfo;
        if (sex == Sex.Male) {
            lastNameIndex = MathUtil.getRandom(0, NameDefined.GetInstance().bboyFirstNameRange - 1);
            lastNameInfo = NameDefined.GetInstance().dataList[lastNameIndex];
            return lastNameInfo.boy;
        }
        else {
            lastNameIndex = MathUtil.getRandom(0, NameDefined.GetInstance().dataList.length - 1);
            lastNameInfo = NameDefined.GetInstance().dataList[lastNameIndex];
            return lastNameInfo.girl;
        }
    };
    return UserUtil;
}());
__reflect(UserUtil.prototype, "UserUtil");
//# sourceMappingURL=UserUtil.js.map