/**
 *用户工具
 */
class UserUtil
{
    /**
     *获得当前等级经验百分比
    */
    public static getPercentage(levelValue: number, expValue: number): number
    {
        let nextLevelExp: number;
        if (levelValue == 1)
        {
            return Math.round((expValue / ExpDefined.GetInstance().dataList[1].exp) * 100) / 100;
        }
        if (levelValue > 1 && levelValue < 100)
        {
            for (var i: number = 1; i < levelValue; i++)
            {
                expValue = expValue - ExpDefined.GetInstance().dataList[i].exp;
            }
            nextLevelExp = ExpDefined.GetInstance().dataList[i].exp;
            return Math.round((expValue / nextLevelExp) * 100) / 100;
        }
        if (levelValue == 100)
        {
            return 0;
        }
    }
    /**
     * 获得当前等级称号
    */
    public static getTitle(level: number): string
    {
        for (let i: number = 0; i < ExpDefined.GetInstance().dataList.length; i++)
        {
            if (level == ExpDefined.GetInstance().dataList[i].level)
            {
                return ExpDefined.GetInstance().dataList[i].title;
            }
        }
        return null;
    }
    /**
     * 判断昵称是否合法
    */
    public static isLegalNickName(nickNameLable: string): boolean
    {
        let nickName = nickNameLable;
        //是否为空
        if (!nickName)
        {
            AlertManager.showAlert("昵称不能为空");
            return false;
        }
        //长度是否合法
        if (nickName.length > 6)
        {
            AlertManager.showAlert("昵称不能大于6个字");
            return false;
        }
        //格式是否合法
        if (!(/^[\u4e00-\u9fa5\dA-Za-z]+$/.test(nickName)))
        {
            AlertManager.showAlert("昵称只能为汉字、英文和数字");
            return false;
        }
        //是否含有屏蔽词
        if (this.isContainForbiddenName(nickName))
        {
            AlertManager.showAlert("您输入的昵称包含屏蔽词");
            return false;
        }
        return true;
    }
    /**
     * 判断是否包含屏蔽词
    */
    public static isContainForbiddenName(nickName: string): boolean
    {
        for (let i: number = 0; i < ForbiddenDefined.GetInstance().dataList.length; i++)
        {
            if (nickName.indexOf(ForbiddenDefined.GetInstance().dataList[i].des.toString()) >= 0)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 生成随机昵称并返回改昵称
    */
    public static randomNickName(sex: number): string
    {
        sex = sex < Sex.Female ? Sex.Male : Sex.Female;
        let firstName: string = this.randomFirstName();
        let lastName: string = this.randomLastName(sex);
        return firstName.trim() + lastName.trim();
    }
    /**
     * 生成随机昵称的姓
    */
    private static randomFirstName(): string
    {
        let firstNameIndex: number = MathUtil.getRandom(0, NameDefined.GetInstance().lastNameRange - 1);
        let firstName: string = NameDefined.GetInstance().dataList[firstNameIndex].name;
        return firstName;
    }
    /**
     * 生成随机昵称的名
    */
    private static randomLastName(sex: number): string
    {
        let lastNameIndex: number;
        let lastNameInfo: NameDefinition;
        if (sex == Sex.Male)
        {
            lastNameIndex = MathUtil.getRandom(0, NameDefined.GetInstance().bboyFirstNameRange - 1);
            lastNameInfo = NameDefined.GetInstance().dataList[lastNameIndex];
            return lastNameInfo.boy;
        } else
        {
            lastNameIndex = MathUtil.getRandom(0, NameDefined.GetInstance().dataList.length - 1);
            lastNameInfo = NameDefined.GetInstance().dataList[lastNameIndex];
            return lastNameInfo.girl;
        }
    }
}