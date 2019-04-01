var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChannelUtil = (function () {
    function ChannelUtil() {
    }
    /// <summary>
    /// 订单是否是非法的
    /// </summary>
    /// <param name="orderId"></param>
    /// <returns></returns>
    ChannelUtil.IsOrderIlleg = function (orderId) {
        if (!orderId) {
            return true;
        }
        var split = orderId.split('-');
        if (split.length != ChannelUtil.OrderLength) {
            return true;
        }
        return false;
    };
    /// <summary>
    /// 生成订单
    /// [QY账号ID]-[QY角色ID]-[角色所在服务器ID]-[商品ID(如果没有传0)]-[是否是测试，1是测试，0是正式]-[商品数量，默认1]
    /// </summary>
    /// <returns></returns>
    ChannelUtil.GenerateOrder = function (awardId, isTest) {
        var t = isTest ? "1" : "0";
        var result = LoginManager.loginInfo.userid + "-" + UserManager.userInfo.roleId + "-" + UserManager.serverInfo.id + "-" + awardId + "-" + t + "-" + (DateTimeUtil.formatTimestamp(TimeManager.GetServerUtcTimestamp()).substring(4));
        if (result.length > 30) {
            result = result.substring(0, 30); //订单号不超过30个字符
        }
        return result;
    };
    /// <summary>
    /// 获取渠道类型+"_"+登录类型的完整标识
    /// </summary>
    /// <param name="channel"></param>
    /// <param name="loginType"></param>
    /// <returns></returns>
    ChannelUtil.GetLoginChannel = function (channel, loginType) {
        if (!loginType) {
            return channel;
        }
        else {
            return StringUtil.format("{0}_{1}", channel, loginType);
        }
    };
    ChannelUtil.OrderLength = 6; //订单截取长度
    return ChannelUtil;
}());
__reflect(ChannelUtil.prototype, "ChannelUtil");
//# sourceMappingURL=ChannelUtil.js.map