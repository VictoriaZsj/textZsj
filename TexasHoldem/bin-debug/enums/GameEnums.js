var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginMode;
(function (LoginMode) {
    /// <summary>
    /// 游客登录
    /// </summary>
    LoginMode[LoginMode["Guest"] = 0] = "Guest";
    /// <summary>
    /// 账号登录
    /// </summary>
    LoginMode[LoginMode["Account"] = 1] = "Account";
    /// <summary>
    /// token登录
    /// </summary>
    LoginMode[LoginMode["Token"] = 2] = "Token";
    /// <summary>
    /// token调试登录
    /// </summary>
    LoginMode[LoginMode["TokenDebug"] = 3] = "TokenDebug";
})(LoginMode || (LoginMode = {}));
/// <summary>
/// 渠道登录类型
/// </summary>
var ChannelLoginType = (function () {
    function ChannelLoginType() {
    }
    ChannelLoginType.IsViewAccount = function (loginType) {
        switch (loginType) {
            case ChannelLoginType.Guest:
            case ChannelLoginType.Account:
            case ChannelLoginType.IntranetGuest:
            case ChannelLoginType.IntranetAccount:
                return true;
        }
        return false;
    };
    /// <summary>
    /// 获取渠道登录列表
    /// </summary>
    /// <param name="isDebug"></param>
    /// <param name="isSafe"></param>
    /// <param name="operatePlatform"></param>
    /// <returns></returns>
    ChannelLoginType.GetChannelLoginList = function (isDebug, isSafe, operatePlatform, channelType) {
        var list = new Array();
        if (operatePlatform == OperatePlatform.qin) {
            list.push(ChannelLoginType.Account);
            list.push(ChannelLoginType.Guest);
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                list.push(ChannelLoginType.Weixin);
            }
            if (isDebug) {
                list.push(ChannelLoginType.IntranetAccount);
                list.push(ChannelLoginType.IntranetGuest);
            }
        }
        else {
            if (isSafe) {
                list.push(ChannelLoginType.Guest);
                if (isDebug) {
                    if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                        list.push(ChannelLoginType.Weixin);
                    }
                }
            }
            else {
                if (isDebug) {
                    list.push(ChannelLoginType.Guest);
                }
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    list.push(ChannelLoginType.Weixin);
                }
            }
        }
        if (list.length <= 0) {
            throw new Error("登录类型列表长度不可能为0");
        }
        return list;
    };
    /**
     * 游客
     */
    ChannelLoginType.Guest = "guest";
    /// <summary>
    /// 内网游客登录
    /// </summary>
    ChannelLoginType.IntranetGuest = "intranetGuest";
    /**
     *  内网账号登录
     */
    ChannelLoginType.IntranetAccount = "intranetAccount";
    /**
     * 微信登录
     */
    ChannelLoginType.Weixin = "weixin";
    /**
     * 外网游戏账号登录
     */
    ChannelLoginType.Account = "account";
    /**
     * 客户端标识的渠道登录,Token登录
     */
    ChannelLoginType.Normal = "";
    return ChannelLoginType;
}());
__reflect(ChannelLoginType.prototype, "ChannelLoginType");
/**
 * UI层枚举
 */
var UILayerType;
(function (UILayerType) {
    // 无
    UILayerType[UILayerType["None"] = 0] = "None";
    // 内容层
    UILayerType[UILayerType["GameContent"] = 1] = "GameContent";
    // 主UI层
    UILayerType[UILayerType["MainUI"] = 2] = "MainUI";
    // 面板模块层
    UILayerType[UILayerType["Module"] = 3] = "Module";
    // tips层
    UILayerType[UILayerType["Tips"] = 4] = "Tips";
    // 引导层
    UILayerType[UILayerType["Guide"] = 5] = "Guide";
    // 警告层
    UILayerType[UILayerType["Warn"] = 6] = "Warn";
})(UILayerType || (UILayerType = {}));
/**
 * 面板对齐方式
 * */
var PanelAlignType;
(function (PanelAlignType) {
    /*空*/
    PanelAlignType[PanelAlignType["None"] = 0] = "None";
    /*中上*/
    PanelAlignType[PanelAlignType["Center_Top"] = 1] = "Center_Top";
    /*中中*/
    PanelAlignType[PanelAlignType["Center_Center"] = 2] = "Center_Center";
    /*中下*/
    PanelAlignType[PanelAlignType["Center_Bottom"] = 3] = "Center_Bottom";
    /*左上*/
    PanelAlignType[PanelAlignType["Left_Top"] = 4] = "Left_Top";
    /*左中*/
    PanelAlignType[PanelAlignType["Left_Center"] = 5] = "Left_Center";
    /*左下*/
    PanelAlignType[PanelAlignType["Left_Bottom"] = 6] = "Left_Bottom";
    /*右下*/
    PanelAlignType[PanelAlignType["Right_Top"] = 7] = "Right_Top";
    /*右中*/
    PanelAlignType[PanelAlignType["Right_Center"] = 8] = "Right_Center";
    /*右下*/
    PanelAlignType[PanelAlignType["Right_Bottom"] = 9] = "Right_Bottom";
})(PanelAlignType || (PanelAlignType = {}));
/**
 * 场景层枚举
 * */
var SceneLayer;
(function (SceneLayer) {
    /*无*/
    SceneLayer[SceneLayer["None"] = 0] = "None";
    /*地图层*/
    SceneLayer[SceneLayer["Map"] = 1] = "Map";
    /*模型层*/
    SceneLayer[SceneLayer["Model"] = 2] = "Model";
    /*特效层*/
    SceneLayer[SceneLayer["Effect"] = 3] = "Effect";
    /*数字层*/
    SceneLayer[SceneLayer["Text"] = 4] = "Text";
})(SceneLayer || (SceneLayer = {}));
/**
 * 场景类型枚举
 * */
var SceneType;
(function (SceneType) {
    SceneType[SceneType["None"] = 0] = "None";
    /**
     * 登录场景
     */
    SceneType[SceneType["Login"] = 1] = "Login";
    /**
     * 大厅
     */
    SceneType[SceneType["Hall"] = 2] = "Hall";
    /**
     * 游戏场景
     */
    SceneType[SceneType["Game"] = 3] = "Game";
})(SceneType || (SceneType = {}));
/**
 * 面板名枚举
 */
var UIModuleName = (function () {
    function UIModuleName() {
    }
    UIModuleName.NetworkPanel = "NetworkPanel";
    /**
     * 文本tips面板
     */
    UIModuleName.TextTipsPanel = "TextTipsPanel";
    /**
     * 获得金币面板
     */
    UIModuleName.GetCoinTipsPanel = "GetCoinTipsPanel";
    /**
     * 提示框
     */
    UIModuleName.AlertInfoPanel = "AlertInfoPanel";
    /**
     * 好友消息界面
    */
    UIModuleName.FriendMsgPanel = "FriendMsgPanel";
    /**
     * 加载界面
     */
    UIModuleName.LoadingPanel = "LoadingPanel";
    /**
     * 登录界面
     */
    UIModuleName.LoginPanel = "LoginPanel";
    /**
     * 用户协议界面
     */
    UIModuleName.UserAngreementPanel = "UserAngreementPanel";
    /**
     * 游戏大厅界面
     */
    UIModuleName.GameHallPanel = "GameHallPanel";
    /**
     * 跑马灯
     */
    UIModuleName.MarqueePanel = "MarqueePanel";
    /**
     * 充值面板
     */
    UIModuleName.PayPanel = "PayPanel";
    /**
     * 创建房间面板
     */
    UIModuleName.CreateRoomPanel = "CreateRoomPanel";
    /**
     * 文本信息面板 如规则面板
     */
    UIModuleName.TextInfoPanel = "TextInfoPanel";
    /**
     * 加入房间
     */
    UIModuleName.JoinInRoomPanel = "JoinInRoomPanel";
    /**
     * 注册面板
     */
    UIModuleName.RegisterPanel = "RegisterPanel";
    /**
     * 本地登录面板
     */
    UIModuleName.LoginLocalPanel = "LoginLocalPanel";
    /**
     * 登录场景面板
     */
    UIModuleName.LoginBar = "LoginBar";
    /**
     * 选择登录方式面板
     */
    UIModuleName.EnterLoginPanel = "EnterLoginPanel";
    /**
     * 场景加载切换面板
     */
    UIModuleName.LoadingSwitchPanel = "LoadingSwitchPanel";
    /**
     * 用户信息面板
     */
    UIModuleName.UserInfoPanel = "UserInfoPanel";
    /**
     * 登录场景背景界面
     */
    UIModuleName.LoginSceneBgPanel = "LoginSceneBgPanel";
    /**
     *游戏分享面板
     */
    UIModuleName.ShareGamePanel = "ShareGamePanel";
    /**
     * 正在录音面板
     */
    UIModuleName.AudioRecordingPanel = "AudioRecordingPanel";
    /**
    * 会员福利面板
    */
    UIModuleName.VipPanel = "VipPanel";
    /**
    * 创建角色面板
    */
    UIModuleName.CreateRolePanel = "CreateRolePanel";
    /**
     * 编辑资料面板
     */
    UIModuleName.EditUserInfoPanel = "EditUserInfoPanel";
    /**
     * 修改昵称面板
     */
    UIModuleName.ChangeUserNamePanel = "ChangeUserNamePanel";
    /**
     * 商城面板
     */
    UIModuleName.ShoppingPanel = "ShoppingPanel";
    /**
     * 游戏场面板
     */
    UIModuleName.PlayingFieldPanel = "PlayingFieldPanel";
    /**
     * 键盘面板
     */
    UIModuleName.KeyBoardPanel = "KeyBoardPanel";
    /**
     * 进入私人房输入密码面板
     */
    UIModuleName.EnterRoomPwdPanel = "EnterRoomPwdPanel";
    /**
     * 设置面板
     */
    UIModuleName.SetPanel = "SetPanel";
    /**
     * 玩法面板
     */
    UIModuleName.GameRulePanel = "GameRulePanel";
    /**
     *  创建私人房输入密码面板
     */
    UIModuleName.CreateRoomPwdPanel = "CreateRoomPwdPanel";
    /**
     * 保险箱面板
    */
    UIModuleName.SafeBoxPanel = "SafeBoxPanel";
    /**
     * 好友面板
    */
    UIModuleName.FriendPanel = "FriendPanel";
    /**
     * 邮件面板
     */
    UIModuleName.MailPanel = "MailPanel";
    /**
     * 聊天面板
     */
    UIModuleName.ChatPanel = "ChatPanel";
    /**
     * 我的奖品面板
     */
    UIModuleName.PrizePanel = "PrizePanel";
    /**
     * 锦标赛面板
    */
    UIModuleName.ChampionshipPanel = "ChampionshipPanel";
    /**
     * 成就信息面板
     */
    UIModuleName.AchievementItemPanel = "AchievementItemPanel";
    /**
     * 邀请好友面板
    */
    UIModuleName.InviteFriendPanel = "InviteFriendPanel";
    /**
     * 排行榜面板
     */
    UIModuleName.RankPanel = "RankPanel";
    /**
     *邀请信息面板
    */
    UIModuleName.InviteMsgPanel = "InviteMsgPanel";
    /**
     * 任务面板
    */
    UIModuleName.AssignmentPanel = "AssignmentPanel";
    /**
     *锦标赛报名成功面板
    */
    UIModuleName.JoinChampionshipSuccessPanel = "JoinChampionshipSuccessPanel";
    /**
     * 加注面板
    */
    UIModuleName.AddChipsPanel = "AddChipsPanel";
    /**
     * 牌局面板
     */
    UIModuleName.GamblingPanel = "GamblingPanel";
    /**
     * 锦标赛赛事详情信息面板
    */
    UIModuleName.ChampionshipInfoPanel = "ChampionshipInfoPanel";
    /**
     * 买入游戏面板
    */
    UIModuleName.BuyAccessGamePanel = "BuyAccessGamePanel";
    /**
     * 活动中心面板
     */
    UIModuleName.ActivityPanel = "ActivityPanel";
    /**
     * 活动页面（只有一张图片）
     */
    UIModuleName.SimplePicturePanel = "SimplePicturePanel";
    /**
     * 活动页面（具有图文内容的活动）
     */
    UIModuleName.NormalActivityPanel = "NormalActivityPanel";
    /**
     * 赛事1分钟开始提醒面板
    */
    UIModuleName.MinuteRemindPanel = "MinuteRemindPanel";
    /**
     * 赛事20秒开始提醒面板
    */
    UIModuleName.SecondRemindPanel = "SecondRemindPanel";
    /**
     * 签到面板
    */
    UIModuleName.SignInPanel = "SignInPanel";
    return UIModuleName;
}());
__reflect(UIModuleName.prototype, "UIModuleName");
/**
 * 皮肤路径枚举
 * */
var UISkinName = (function () {
    function UISkinName() {
    }
    /**
     * 文本tips面板
     */
    UISkinName.TextTipsPanel = "resource/assets/skins/panel/TextTipsSkin.exml";
    /**
     * 获得金币面板
     */
    UISkinName.GetCoinTipsPanel = "resource/assets/skins/panel/GetCionTipsSkin.exml";
    /**
     * 确定提示框
     */
    UISkinName.AlertInfoPanel = "resource/assets/skins/panel/AlertInfoPanel.exml";
    /**
     * 加载界面
     */
    UISkinName.LoadingPanel = "resource/assets/skins/panel/LoadingPanel.exml";
    /**
     * 登录界面
     */
    UISkinName.LoginPanel = "resource/assets/skins/panel/LoginPanel.exml";
    /**
     * 用户同意界面
     */
    UISkinName.UserAngreementPanel = "resource/assets/skins/panel/UserAngreementPanel.exml";
    /**
     * 游戏大厅界面
     */
    UISkinName.GameHallPanel = "resource/assets/skins/panel/GameHallPanel.exml";
    /**
     * 跑马灯界面
     */
    UISkinName.MarqueePanel = "resource/assets/skins/panel/MarqueePanel.exml";
    /**
     * 充值面板
     */
    UISkinName.PayPanel = "resource/assets/skins/panel/PayPanel.exml";
    /**
     * 创建房间面板
     */
    UISkinName.CreateRoomPanel = "resource/assets/skins/panel/CreateRoomPanel.exml";
    /**
     * 文本信息面板
     */
    UISkinName.TextInfoPanel = "resource/assets/skins/panel/TextInfoPanel.exml";
    /**
     * 加入房间
     */
    UISkinName.JoinInRoomPanel = "resource/assets/skins/panel/JoinInRoomPanel.exml";
    /**
     * 注册面板
     */
    UISkinName.RegisterPanel = "resource/assets/skins/panel/RegisterPanel.exml";
    /**
     * 本地登录面板
     */
    UISkinName.LoginLocalPanel = "resource/assets/skins/panel/LoginLocalPanel.exml";
    /**
     * 登录场景面板
     */
    UISkinName.LoginBar = "resource/assets/skins/panel/LoginBar.exml";
    /**
     * 选择登录方式面板
     */
    UISkinName.EnterLoginPanel = "resource/assets/skins/panel/EnterLoginPanel.exml";
    /**
     * 战绩信息面板
     */
    UISkinName.RoundInfoPanel = "resource/assets/skins/panel/RoundInfoPanel.exml";
    /**
     * 游戏场景面板
     */
    UISkinName.GameScenePanel = "resource/assets/skins/panel/GameScenePanel.exml";
    /**
     * 场景加载切换面板
     */
    UISkinName.LoadingSwitchPanel = "resource/assets/skins/panel/LoadingSwitchPanel.exml";
    /**
     * 用户信息面板
     */
    UISkinName.UserInfoPanel = "resource/assets/skins/panel/UserInfoPanel.exml";
    /**
     * 登录场景背景界面
     */
    UISkinName.LoginSceneBgPanel = "resource/assets/skins/panel/LoginSceneBgPanel.exml";
    /**
     * 游戏分享面板
     */
    UISkinName.ShareGamePanel = "resource/assets/skins/panel/ShareGamePanel.exml";
    /**
     * 正在录音面板
     */
    UISkinName.AudioRecordingPanel = "resource/assets/skins/panel/AudioRecordingPanel.exml";
    /**
     * 会员福利面板
     */
    UISkinName.VipPanel = "resource/assets/skins/panel/VipPanel.exml";
    /**
     * 创建角色面板
     */
    UISkinName.CreateRolePanel = "resource/assets/skins/panel/CreateRolePanel.exml";
    /**
     * 编辑资料面板
     */
    UISkinName.EditUserInfoPanel = "resource/assets/skins/panel/EditUserInfoPanel.exml";
    /**
     * 修改昵称面板
     */
    UISkinName.ChangeUserNamePanel = "resource/assets/skins/panel/ChangeUserNamePanel.exml";
    /**
     * 商城面板
     */
    UISkinName.ShoppingPanel = "resource/assets/skins/panel/ShoppingPanel.exml";
    /**
     * 游戏场面板
     */
    UISkinName.PlayingFieldPanel = "resource/assets/skins/panel/PlayingFieldPanel.exml";
    /**
     * 键盘面板
     */
    UISkinName.KeyBoardPanel = "resource/assets/skins/panel/KeyBoardPanel.exml";
    /**
     * 设置面板
     */
    UISkinName.SetPanel = "resource/assets/skins/panel/SetPanel.exml";
    /**
    * 玩法面板
    */
    UISkinName.GameRulePanel = "resource/assets/skins/panel/GameRulePanel.exml";
    /**
     * 加入私人房密码面板
     */
    UISkinName.EnterRoomPwdPanel = "resource/assets/skins/panel/EnterRoomPwdPanel.exml";
    /**
     * 创建私人房密码面板
     */
    UISkinName.CreateRoomPwdPanel = "resource/assets/skins/panel/CreateRoomPwdPanel.exml";
    /**
     * 保险箱面板
    */
    UISkinName.SafeBoxPanel = "resource/assets/skins/panel/SafeBoxPanel.exml";
    /**
     * 好友面板
    */
    UISkinName.FriendPanel = "resource/assets/skins/panel/FriendPanel.exml";
    /**
     * 邮箱面板
     */
    UISkinName.MailPanel = "resource/assets/skins/panel/MailPanel.exml";
    /**
     * 聊天面板
     */
    UISkinName.ChatPanel = "resource/assets/skins/panel/ChatPanel.exml";
    /**
     * 我的奖品面板
     */
    UISkinName.PrizePanel = "resource/assets/skins/panel/PrizePanel.exml";
    /**
     * 锦标赛面板
    */
    UISkinName.ChampionshipPanel = "resource/assets/skins/panel/ChampionshipPanel.exml";
    /**
     * 成就信息面板
     */
    UISkinName.AchievementItemPanel = "resource/assets/skins/panel/AchievementItemPanel.exml";
    /**
     * 邀请好友面板
    */
    UISkinName.InviteFriendPanel = "resource/assets/skins/panel/InviteFriendPanel.exml";
    /**
     * 排行榜面板
     */
    UISkinName.RankPanel = "resource/assets/skins/panel/RankPanel.exml";
    /**
     * 好友消息面板
    */
    UISkinName.FriendMsgPanel = "resource/assets/skins/panel/FriendMsgPanel.exml";
    /**
     * 邀请信息面板
    */
    UISkinName.InviteMsgPanel = "resource/assets/skins/panel/InviteMsgPanel.exml";
    /**
     * 任务面板
    */
    UISkinName.AssignmentPanel = "resource/assets/skins/panel/AssignmentPanel.exml";
    /**
     * 锦标赛报名成功面板
    */
    UISkinName.JoinChampionshipSuccessPanel = "resource/assets/skins/panel/JoinChampionshipSuccessPanel.exml";
    /**
     * 加注面板
    */
    UISkinName.AddChipsPanel = "resource/assets/skins/panel/AddChipsPanel.exml";
    /**
     * 牌局面板
    */
    UISkinName.GamblingPanel = "resource/assets/skins/panel/GamblingPanel.exml";
    /**
     * 锦标赛赛事详情信息面板
    */
    UISkinName.ChampionshipInfoPanel = "resource/assets/skins/panel/ChampionshipInfoPanel.exml";
    /**
     * 买入游戏面板
    */
    UISkinName.BuyAccessGamePanel = "resource/assets/skins/panel/BuyAccessGamePanel.exml";
    /**
     * 活动中心面板
     */
    UISkinName.ActivityPanel = "resource/assets/skins/panel/activity/ActivityPanel.exml";
    /**
    * 活动页面（只有一张图片）
    */
    UISkinName.SimplePicturePanel = "resource/assets/skins/panel/activity/SimplePicturePanel.exml";
    /**
     * 活动页面（具有图文内容的活动）
     */
    UISkinName.NormalActivityPanel = "resource/assets/skins/panel/activity/NormalActivityPanel.exml";
    /**
     * 赛事1分钟开始提醒面板
    */
    UISkinName.MinuteRemindPanel = "resource/assets/skins/panel/MinuteRemindPanel.exml";
    /**
     * 赛事20秒开始提醒面板
    */
    UISkinName.SecondRemindPanel = "resource/assets/skins/panel/SecondRemindPanel.exml";
    /**
     * 签到面板
    */
    UISkinName.SignInPanel = "resource/assets/skins/panel/SignInPanel.exml";
    return UISkinName;
}());
__reflect(UISkinName.prototype, "UISkinName");
/**
 * 项皮肤枚举
 * */
var UIRendererSkinName = (function () {
    function UIRendererSkinName() {
    }
    /**
     * 充值面板项渲染
     */
    UIRendererSkinName.PayPanelItemRenderer = "resource/assets/skins/renderer/PayPanelItemRenderer.exml";
    /**
     * 创建房间面板项渲染
     */
    UIRendererSkinName.CreateRoomPanelRenderer = "resource/assets/skins/renderer/CreateRoomPanelRenderer.exml";
    /**
     * 文本项
     */
    UIRendererSkinName.TextRenderer = "resource/assets/skins/renderer/TextRenderer.exml";
    /**
     * 我的奖品项
     */
    UIRendererSkinName.MyAwardPanelItemRenderer = "resource/assets/skins/renderer/MyAwardPanelItemRenderer.exml";
    /**
     * 商城金币项
     */
    UIRendererSkinName.GoldListItemRenderer = "resource/assets/skins/renderer/GoldListItemRenderer.exml";
    /**
     * 商城钻石项
     */
    UIRendererSkinName.DiamondListItemRenderer = "resource/assets/skins/renderer/DiamondListItemrenderer.exml";
    /**
     * vip列表项
     */
    UIRendererSkinName.VipListItemRenderer = "resource/assets/skins/renderer/VipListItemRenderer.exml";
    /**
     * 房间列表项
     */
    UIRendererSkinName.PlayingFieldItemRenderer = "resource/assets/skins/renderer/PlayingFieldItemRenderer.exml";
    /**
     * 好友列表项
     */
    UIRendererSkinName.FriendItemRenderer = "resource/assets/skins/renderer/FriendItemRenderer.exml";
    /**
     * 成就项
     */
    UIRendererSkinName.AchievementItemRenderer = "resource/assets/skins/renderer/AchievementItemRenderer.exml";
    /**
     * 邮件项
     */
    UIRendererSkinName.MailItemRenderer = "resource/assets/skins/renderer/MailItemRenderer.exml";
    /**
     * 礼物项
     */
    UIRendererSkinName.GiftItemRenderer = "resource/assets/skins/renderer/GiftItemRenderer.exml";
    /**
     * 好友请求项
     */
    UIRendererSkinName.FriendRequestItemRenderer = "resource/assets/skins/renderer/FriendRequestItemRenderer.exml";
    /**
     * 添加好友项
     */
    UIRendererSkinName.AddFriendItemRenderer = "resource/assets/skins/renderer/AddFriendItemRenderer.exml";
    /**
     * 聊天项
     */
    UIRendererSkinName.ChatItemRenderer = "resource/assets/skins/renderer/ChatItemRenderer.exml";
    /**
     * 表情项
     */
    UIRendererSkinName.FaceItemRenderer = "resource/assets/skins/renderer/FaceItemRenderer.exml";
    /**
     * 快捷输入项
     */
    UIRendererSkinName.FastChatItemRenderer = "resource/assets/skins/renderer/FastChatItemRenderer.exml";
    /**
     * 锦标赛赛事列表项
     */
    UIRendererSkinName.ChampionshipItemRenderer = "resource/assets/skins/renderer/ChampionshipItemRenderer.exml";
    /**
     * 邀请好友列表项
     */
    UIRendererSkinName.InviteFriendItemRenderer = "resource/assets/skins/renderer/InviteFriendItemRenderer.exml";
    /**
     * 排行榜渲染项
     */
    UIRendererSkinName.RankItemRenderer = "resource/assets/skins/renderer/RankItemRenderer.exml";
    /**
     * 我的门票项
     */
    UIRendererSkinName.MyTicketItemRenderer = "resource/assets/skins/renderer/MyTicketItemRenderer.exml";
    /**
     * 最近赛况项
     */
    UIRendererSkinName.OutsItemRenderer = "resource/assets/skins/renderer/OutsItemRenderer.exml";
    /**
     * 最近赛况折叠项
     */
    UIRendererSkinName.OutsChildItemRenderer = "resource/assets/skins/renderer/OutsChildItemRenderer.exml";
    /**
     * 任务项
     */
    UIRendererSkinName.AssignmentItemRenderer = "resource/assets/skins/renderer/AssignmentItemRenderer.exml";
    /**
     * 筹码显示项
     */
    UIRendererSkinName.ChipsShowRenderer = "resource/assets/skins/renderer/ChipsShowRenderer.exml";
    /**
     * 锦标赛赛事信息排名项
     */
    UIRendererSkinName.ChampionshipRankItemRenderer = "resource/assets/skins/renderer/ChampionshipRankItemRenderer.exml";
    /**
     * 锦标赛赛事信息盲注项
     */
    UIRendererSkinName.BlindItemRenderer = "resource/assets/skins/renderer/BlindItemRenderer.exml";
    /**
     * 锦标赛赛事信息奖励项
     */
    UIRendererSkinName.AwardItemRenderer = "resource/assets/skins/renderer/AwardItemRenderer.exml";
    /**
     * 创建私人房最大携带项
     */
    UIRendererSkinName.PersonalRoomItemRenderer = "resource/assets/skins/renderer/PersonalRoomItemRenderer.exml";
    /**
     * 签到项
    */
    UIRendererSkinName.SignInGoldItemRenderer = "resource/assets/skins/renderer/SignInGoldItemRenderer.exml";
    /**
     * 活动列表渲染项
     */
    UIRendererSkinName.ActivityItemRenderer = "resource/assets/skins/renderer/ActivityItemRenderer.exml";
    /**
     * 活动奖励渲染项
     */
    UIRendererSkinName.ActivityAwardItemRenderer = "resource/assets/skins/renderer/ActivityAwardItemRenderer.exml";
    return UIRendererSkinName;
}());
__reflect(UIRendererSkinName.prototype, "UIRendererSkinName");
/**
 * 组件皮肤枚举
 */
var UIComponentSkinName = (function () {
    function UIComponentSkinName() {
    }
    /**
     * 房间玩家信息项
     */
    UIComponentSkinName.RoomUserHeadInfoComponent = "resource/assets/skins/component/RoomUserHeadInfoComponent.exml";
    /**
     * 行为特效
     */
    UIComponentSkinName.ActionEffectComponent = "resource/assets/skins/component/ActionEffectComponent.exml";
    /**
     * 输入数字组件
     */
    UIComponentSkinName.NumComponent = "resource/assets/skins/component/NumComponent.exml";
    //===========================================================
    // cardface
    //===========================================================
    /**
     * 通用Icon组件
     */
    UIComponentSkinName.CommonIcon = "resource/assets/skins/component/CommonIcon.exml";
    /**
     * 用户头像信息组件
     */
    UIComponentSkinName.UserInfoComponent = "resource/assets/skins/component/UserInfoComponent.exml";
    /**
     * 按钮
     */
    UIComponentSkinName.ButtonSkin2 = "resource/assets/skins/component/buttonSkin2.exml";
    /**
     * 操作CD组件
     */
    UIComponentSkinName.GamblingCdComponent = "resource/assets/skins/component/GamblingCdComponent.exml";
    /**
     * 牌局玩家头像组件
     */
    UIComponentSkinName.GamblingHeadComponet = "resource/assets/skins/component/GamblingHeadComponet.exml";
    /**
     * 牌面显示组件
     */
    UIComponentSkinName.CardFaceComponent = "resource/assets/skins/component/CardFaceComponent.exml";
    /**
     * 筹码显示组件
     */
    UIComponentSkinName.ChipsShowComponent = "resource/assets/skins/component/ChipsShowComponent.exml";
    /**
     * 操作组件
     */
    UIComponentSkinName.GamblingActionComponent = "resource/assets/skins/component/GamblingActionComponent.exml";
    /**
     * 赢牌组件
    */
    UIComponentSkinName.WinCardComponent = "resource/assets/skins/component/WinCardComponent.exml";
    return UIComponentSkinName;
}());
__reflect(UIComponentSkinName.prototype, "UIComponentSkinName");
/**
 * 图片资源路径
 * */
var ImageSource = (function () {
    function ImageSource() {
    }
    /**
     * 灰色背景
     */
    ImageSource.GrayBg = "bg_page4_2_png";
    /**
     * 男性图片
     */
    ImageSource.MaleImg = "boy_png";
    /**
     * 女性图片
     */
    ImageSource.FemaleImg = "girl_png";
    /**
     * 头像
     */
    ImageSource.Default_Head = "1001_png";
    /**
     * 测试头像
    */
    ImageSource.TestImg = "fangka_png";
    return ImageSource;
}());
__reflect(ImageSource.prototype, "ImageSource");
/**
 * 资源组名
 */
var ResGroupName = (function () {
    function ResGroupName() {
    }
    /**
     * 游戏启动前的资源
     */
    ResGroupName.Preload = "preload";
    /**
     * 公共资源
     */
    ResGroupName.Pub = "pub";
    /**
     * 游戏大厅资源
     */
    ResGroupName.Hall = "hall";
    /**
     * 麻将牌桌场景资源
     */
    ResGroupName.Gambling = "gambling";
    return ResGroupName;
}());
__reflect(ResGroupName.prototype, "ResGroupName");
/**
 * 资源前缀
 * */
var ResPrefixName = (function () {
    function ResPrefixName() {
    }
    /*地图*/
    ResPrefixName.Map = "map_";
    /**
     * 红色数字资源前缀
     */
    ResPrefixName.NumRed = "red_";
    /**
     * 绿色资源数字前缀
     */
    ResPrefixName.NumGreen = "greed_";
    /**
     * 黄色数字资源前缀
     */
    ResPrefixName.NumYellow = "yellow_";
    /**
     * 积分
     */
    ResPrefixName.JiFen = "jifen";
    /**
     * 分
     */
    ResPrefixName.Fen = "fen";
    /**
     * 花色
     */
    ResPrefixName.Flush = "flush_";
    /**
     * 牌
     */
    ResPrefixName.card = "pai_";
    /**
     * 花色黑
     */
    ResPrefixName.FlushBlack = "hei_";
    /**
     * 花色红
     */
    ResPrefixName.FlushRed = "hong_";
    return ResPrefixName;
}());
__reflect(ResPrefixName.prototype, "ResPrefixName");
/**
 * 后缀名
 * */
var ResSuffixName = (function () {
    function ResSuffixName() {
    }
    /*json格式*/
    ResSuffixName.JSONSuffix = "_json";
    /*png格式*/
    ResSuffixName.PNGSuffix = "_png";
    /**
     * MP3 资源格式
     */
    ResSuffixName.Mp3Suffix = ".mp3";
    /**
     * json 资源格式
     */
    ResSuffixName.Json = ".json";
    return ResSuffixName;
}());
__reflect(ResSuffixName.prototype, "ResSuffixName");
/**
 * 路径名
 * */
var PathName = (function () {
    function PathName() {
    }
    /*地图背景资源路径*/
    PathName.Map = "resource/assets/map/map_";
    /**
     * 小图片资源
     */
    PathName.Piece = "resource/assets/images/ui/piece/";
    /**
     * 骰子图片
     */
    PathName.Touzi = "dice_";
    /**
     * 音效
     */
    PathName.Sound = "resource/assets/sound/";
    /**
     * 配置表路径
     */
    PathName.Config = "resource/config/";
    return PathName;
}());
__reflect(PathName.prototype, "PathName");
/**
 * 字符串静态常量枚举
 * */
var StringConstant = (function () {
    function StringConstant() {
    }
    /*空字符串*/
    StringConstant.empty = "";
    /**
     * 点
     */
    StringConstant.Dot = ".";
    /**
     * 下划线
     */
    StringConstant.UnderLine = "_";
    /**
     * 逗号
     */
    StringConstant.Comma = ',';
    return StringConstant;
}());
__reflect(StringConstant.prototype, "StringConstant");
/**
 * 文本信息ID
 */
var TextId;
(function (TextId) {
    TextId[TextId["None"] = 0] = "None";
    /**
     * 用户协议
     */
    TextId[TextId["UserAngreement"] = 1] = "UserAngreement";
    /**
     * 玩法 todo
     */
    TextId[TextId["PlayWay"] = 2] = "PlayWay";
    /**
     * 版本信息
     */
    TextId[TextId["Version"] = 201] = "Version";
    /**
     * 信息
     */
    TextId[TextId["Info"] = 301] = "Info";
})(TextId || (TextId = {}));
/**
 * 滚动方向
 */
var ScrollViewDirection;
(function (ScrollViewDirection) {
    ScrollViewDirection[ScrollViewDirection["None"] = 0] = "None";
    /**
     * 水平 从左向右
     */
    ScrollViewDirection[ScrollViewDirection["Horizontal_L_R"] = 1] = "Horizontal_L_R";
    /**
     * 垂直从上到下
     */
    ScrollViewDirection[ScrollViewDirection["Vertical_T_D"] = 2] = "Vertical_T_D";
})(ScrollViewDirection || (ScrollViewDirection = {}));
/// <summary>
/// 运营平台（值要全小写。配置表、服务器连接、版本管理）
/// </summary>
var OperatePlatform = (function () {
    function OperatePlatform() {
    }
    Object.defineProperty(OperatePlatform, "current", {
        /**
         * 获取当前运营平台
         */
        get: function () {
            return OperatePlatform.qin;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 沁游外网-测试的平台
     */
    OperatePlatform.qin = "qin";
    /**
     * 中国
     */
    OperatePlatform.cn = "cn";
    return OperatePlatform;
}());
__reflect(OperatePlatform.prototype, "OperatePlatform");
/// <summary>
/// 渠道类型(唯一的)
/// 命名规则为：平台/地区+渠道类型
/// </summary>
var ChannelType = (function () {
    function ChannelType() {
    }
    /// <summary>
    /// 游客渠道标识，所有平台的游客都是这个标识
    /// </summary>
    ChannelType.guest = "guest";
    /// <summary>
    /// 沁游发行-沁游外网测试的
    /// </summary>
    ChannelType.qin = "qin";
    return ChannelType;
}());
__reflect(ChannelType.prototype, "ChannelType");
/// <summary>
/// 系统重进类型
/// </summary>
var SystemReenterType;
(function (SystemReenterType) {
    /// <summary>
    /// 正常进入
    /// </summary>
    SystemReenterType[SystemReenterType["Normal"] = 1] = "Normal";
    /// <summary>
    /// 登出
    /// </summary>
    SystemReenterType[SystemReenterType["Logout"] = 2] = "Logout";
    /// <summary>
    /// 语言设置
    /// </summary>
    SystemReenterType[SystemReenterType["LangSetting"] = 3] = "LangSetting";
})(SystemReenterType || (SystemReenterType = {}));
/**
 * 性别
 */
var Sex;
(function (Sex) {
    /**
     * 未知
     */
    Sex[Sex["Unknown"] = 0] = "Unknown";
    /**
     * 男性
     */
    Sex[Sex["Male"] = 1] = "Male";
    /**
     * 女性
     */
    Sex[Sex["Female"] = 2] = "Female";
})(Sex || (Sex = {}));
/**
 * 游戏模式
*/
var Pattern;
(function (Pattern) {
    /**
     * 全下/弃牌模式
    */
    Pattern[Pattern["AllIn"] = 0] = "AllIn";
    /**
     * 快速出牌模式
    */
    Pattern[Pattern["Fast"] = 1] = "Fast";
    /**
     * 前注模式
    */
    Pattern[Pattern["Ante"] = 2] = "Ante";
    /**
     * 无上限模式
    */
    Pattern[Pattern["NoUpperLimit"] = 3] = "NoUpperLimit";
})(Pattern || (Pattern = {}));
/**
 * 行为类型
 */
var ActionType;
(function (ActionType) {
})(ActionType || (ActionType = {}));
/**
 * 房间状态
 */
var RoomState;
(function (RoomState) {
})(RoomState || (RoomState = {}));
/**
 * 玩法的类型
 */
var PlayModeType;
(function (PlayModeType) {
})(PlayModeType || (PlayModeType = {}));
/**
 * 资源类型
 */
var NumResType;
(function (NumResType) {
    /**
     * 红
     */
    NumResType[NumResType["Red"] = 1] = "Red";
    /**
     * 绿
     */
    NumResType[NumResType["Green"] = 2] = "Green";
    /**
     * 黄
     */
    NumResType[NumResType["Yellow"] = 3] = "Yellow";
})(NumResType || (NumResType = {}));
/**
 * 音效枚举
 */
var MusicAction = (function () {
    function MusicAction() {
    }
    /**
     * 失败
     */
    MusicAction.lost = "lost";
    /**
     * 胜利
     */
    MusicAction.win = "win";
    /**
     * 按钮点击
     */
    MusicAction.buttonClick = "buttonClick";
    /**
     * 卡牌点击
     */
    MusicAction.cardClick = "cardClick";
    /**
     * 发牌
     */
    MusicAction.fapai = "fapai";
    return MusicAction;
}());
__reflect(MusicAction.prototype, "MusicAction");
/**
 * 音乐，音效名枚举
 */
var MusicResEnum = (function () {
    function MusicResEnum() {
    }
    /**
     * 获取背景音乐音效资源
     */
    MusicResEnum.getBgSoundRes = function (type) {
        switch (type) {
            case SceneType.Login:
            case SceneType.Hall:
                return MusicResEnum.Login_Hall;
            case SceneType.Game:
                return MusicResEnum.Game;
        }
        return StringConstant.empty;
    };
    /**
     * 登录&大厅
     */
    MusicResEnum.Login_Hall = "bg_hall";
    /**
     * 游戏
     */
    MusicResEnum.Game = "bg_playing";
    return MusicResEnum;
}());
__reflect(MusicResEnum.prototype, "MusicResEnum");
/**
 * 分隔符类型
 */
var SeparatorType = (function () {
    function SeparatorType() {
    }
    /**
     * 分号
     */
    SeparatorType.semicolon = ";";
    return SeparatorType;
}());
__reflect(SeparatorType.prototype, "SeparatorType");
/**
 * 动画数据
 */
var MovieClipData = (function () {
    function MovieClipData() {
    }
    /**
     * 骰子动画数据
     */
    MovieClipData.SaiZi_Json = "saizi_json";
    /**
     * 骰子动画图片
     */
    MovieClipData.SaiZi_Png = "saizi_png";
    /**
     * 赢牌动画数据
     */
    MovieClipData.WinCard_Json = "winCard_mc_json";
    /**
     * 赢牌动画图片
     */
    MovieClipData.WinCard_Png = "winCard_png";
    /**
     * 坐下动画数据
     */
    MovieClipData.SeatDown_Json = "seatDown_mc_json";
    /**
     * 坐下动画图片
     */
    MovieClipData.SeatDown_Png = "seatDown_png";
    return MovieClipData;
}());
__reflect(MovieClipData.prototype, "MovieClipData");
/**
 * 特效资源枚举
 */
var ParticleSource = (function () {
    function ParticleSource() {
    }
    /**
     * 获得金币图片
     */
    ParticleSource.GetCoin_Img = "getCoin_png";
    /**
     * 获得金币配置
     */
    ParticleSource.GetCoin_Json = "getCoin_json";
    return ParticleSource;
}());
__reflect(ParticleSource.prototype, "ParticleSource");
var VipCard;
(function (VipCard) {
    //周卡id
    VipCard[VipCard["WeekVip"] = 101] = "WeekVip";
    //月卡id
    VipCard[VipCard["MonthVip"] = 102] = "MonthVip";
})(VipCard || (VipCard = {}));
var PlayingFieldPattern;
(function (PlayingFieldPattern) {
    /**
     * 初级场
    */
    PlayingFieldPattern[PlayingFieldPattern["PrimaryPattern"] = 1] = "PrimaryPattern";
    /**
     * 中级场
    */
    PlayingFieldPattern[PlayingFieldPattern["MiddlePattern"] = 2] = "MiddlePattern";
    /**
     * 高级场
    */
    PlayingFieldPattern[PlayingFieldPattern["HighPattern"] = 3] = "HighPattern";
})(PlayingFieldPattern || (PlayingFieldPattern = {}));
var IsReceive;
(function (IsReceive) {
    /**
    * 拒绝
    */
    IsReceive[IsReceive["NotREceive"] = 0] = "NotREceive";
    /**
     * 接受
    */
    IsReceive[IsReceive["Receive"] = 1] = "Receive";
})(IsReceive || (IsReceive = {}));
var PropertyId;
(function (PropertyId) {
    PropertyId[PropertyId["gold"] = 1] = "gold";
    PropertyId[PropertyId["diamond"] = 2] = "diamond";
    PropertyId[PropertyId["vipExp"] = 3] = "vipExp";
    PropertyId[PropertyId["exp"] = 4] = "exp";
})(PropertyId || (PropertyId = {}));
var FriendInfoType;
(function (FriendInfoType) {
    /**
     * 接收好友申请
     */
    FriendInfoType[FriendInfoType["Receive"] = 1] = "Receive";
    /**
     * 发送好友申请
     */
    FriendInfoType[FriendInfoType["Send"] = 2] = "Send";
})(FriendInfoType || (FriendInfoType = {}));
var CostType;
(function (CostType) {
    /**
     * 消耗类型为金币
    */
    CostType[CostType["Gold"] = 1] = "Gold";
    /**
     * 消耗类型为钻石
    */
    CostType[CostType["Diamond"] = 3] = "Diamond";
    /**
     * 消耗类型为人民币
    */
    CostType[CostType["RMB"] = 10] = "RMB";
})(CostType || (CostType = {}));
var ListType;
(function (ListType) {
    /**
     * 列表项类型为金币
    */
    ListType[ListType["Gold"] = 1] = "Gold";
    /**
     * 列表项类型为钻石
    */
    ListType[ListType["Diamond"] = 2] = "Diamond";
    /**
     * 列表项类型为vip
    */
    ListType[ListType["Vip"] = 3] = "Vip";
})(ListType || (ListType = {}));
var ShoppingGpIndex;
(function (ShoppingGpIndex) {
    /**
     * 金币组索引
    */
    ShoppingGpIndex[ShoppingGpIndex["Gold"] = 0] = "Gold";
    /**
     * 钻石组索引
    */
    ShoppingGpIndex[ShoppingGpIndex["Diamond"] = 1] = "Diamond";
    /**
     * vip组索引
    */
    ShoppingGpIndex[ShoppingGpIndex["Vip"] = 2] = "Vip";
})(ShoppingGpIndex || (ShoppingGpIndex = {}));
var SafeType;
(function (SafeType) {
    /**
     * 保险箱存入
    */
    SafeType[SafeType["Save"] = 1] = "Save";
    /**
     * 保险箱取出
    */
    SafeType[SafeType["Withdraw"] = 2] = "Withdraw";
})(SafeType || (SafeType = {}));
/**
 * 成就/任务组
 */
var AchieveGroup;
(function (AchieveGroup) {
    /**
     * 金币达人
     */
    AchieveGroup[AchieveGroup["GoldGroup"] = 101] = "GoldGroup";
    /**
     * 好友达人
     */
    AchieveGroup[AchieveGroup["FriendGroup"] = 121] = "FriendGroup";
    /**
     * 等级达人
     */
    AchieveGroup[AchieveGroup["LevelGroup"] = 141] = "LevelGroup";
    /**
     * 对子达人
     */
    AchieveGroup[AchieveGroup["OnePairGroup"] = 161] = "OnePairGroup";
    /**
     * 两对达人
     */
    AchieveGroup[AchieveGroup["TwoPairsGroup"] = 181] = "TwoPairsGroup";
    /**
     * 三条达人
     */
    AchieveGroup[AchieveGroup["ThreeOfAKindGroup"] = 201] = "ThreeOfAKindGroup";
    /**
     * 顺子达人
     */
    AchieveGroup[AchieveGroup["StraightGroup"] = 221] = "StraightGroup";
    /**
     * 同花达人
     */
    AchieveGroup[AchieveGroup["FlushGroup"] = 241] = "FlushGroup";
    /**
     * 葫芦达人
     */
    AchieveGroup[AchieveGroup["FullhouseGroup"] = 261] = "FullhouseGroup";
    /**
     * 四条达人
     */
    AchieveGroup[AchieveGroup["FourOfAKindGroup"] = 281] = "FourOfAKindGroup";
    /**
     * 同花顺达人
     */
    AchieveGroup[AchieveGroup["StraightFlushGroup"] = 301] = "StraightFlushGroup";
    /**
     * 皇家同花顺达人
     */
    AchieveGroup[AchieveGroup["RoyalFlushGroup"] = 321] = "RoyalFlushGroup";
    /**
     * 初级场对局
     */
    AchieveGroup[AchieveGroup["PrimaryPatternGroup"] = 1001] = "PrimaryPatternGroup";
    /**
     * 中级场对局
    */
    AchieveGroup[AchieveGroup["MiddlePatternGroup"] = 1021] = "MiddlePatternGroup";
    /**
     * 高级场对局
    */
    AchieveGroup[AchieveGroup["HighPatternGroup"] = 1041] = "HighPatternGroup";
    /**
     * 胜利
     */
    AchieveGroup[AchieveGroup["WinGroup"] = 2001] = "WinGroup";
    /**
     * 等级提升
     */
    AchieveGroup[AchieveGroup["LevelUpGroup"] = 3001] = "LevelUpGroup";
})(AchieveGroup || (AchieveGroup = {}));
/**
 * 成就类型
 */
var AchieveType;
(function (AchieveType) {
    /**
     * 金币
     */
    AchieveType[AchieveType["Gold"] = 1] = "Gold";
    /**
     * 好友
     */
    AchieveType[AchieveType["Friend"] = 2] = "Friend";
    /**
     * 等级
     */
    AchieveType[AchieveType["Level"] = 3] = "Level";
    /**
     * 牌型
     */
    AchieveType[AchieveType["CardType"] = 4] = "CardType";
    /**
     * 初级场
     */
    AchieveType[AchieveType["PrimaryPattern"] = 101] = "PrimaryPattern";
    /**
     * 中级场
     */
    AchieveType[AchieveType["MiddlePattern"] = 102] = "MiddlePattern";
    /**
     * 高级场
     */
    AchieveType[AchieveType["HighPattern"] = 103] = "HighPattern";
    /**
     * 胜利
     */
    AchieveType[AchieveType["Win"] = 201] = "Win";
})(AchieveType || (AchieveType = {}));
/**
 * 星期枚举
 */
var WeekDay;
(function (WeekDay) {
    WeekDay[WeekDay["Sunday"] = 0] = "Sunday";
    WeekDay[WeekDay["Monday"] = 1] = "Monday";
    WeekDay[WeekDay["Tuesday"] = 2] = "Tuesday";
    WeekDay[WeekDay["Wednesday"] = 3] = "Wednesday";
    WeekDay[WeekDay["Thursday"] = 4] = "Thursday";
    WeekDay[WeekDay["Friday"] = 5] = "Friday";
    WeekDay[WeekDay["Saturday"] = 6] = "Saturday";
})(WeekDay || (WeekDay = {}));
// ---------------------------------------------------------------------------
// 牌局gambling
// ---------------------------------------------------------------------------
/**
 * 牌型
 */
var CardType;
(function (CardType) {
    /**
     * 无
     */
    CardType[CardType["None"] = 0] = "None";
    /**
     * 高牌
     */
    CardType[CardType["HighCard"] = 1] = "HighCard";
    /**
     * 一对
     */
    CardType[CardType["OnePair"] = 2] = "OnePair";
    /**
     * 两对
     */
    CardType[CardType["TwoPairs"] = 3] = "TwoPairs";
    /**
     * 3条
     */
    CardType[CardType["ThreeOfAKind"] = 4] = "ThreeOfAKind";
    /**
     * 顺子
     */
    CardType[CardType["Straight"] = 5] = "Straight";
    /**
     * 同花
     */
    CardType[CardType["Flush"] = 6] = "Flush";
    /**
     * 葫芦
     */
    CardType[CardType["Fullhouse"] = 7] = "Fullhouse";
    /**
     * 4条(金刚)
     */
    CardType[CardType["FourOfAKind"] = 8] = "FourOfAKind";
    /**
     * 同花顺
     */
    CardType[CardType["StraightFlush"] = 9] = "StraightFlush";
    /**
     * 皇家同花顺
     */
    CardType[CardType["RoyalFlush"] = 10] = "RoyalFlush";
})(CardType || (CardType = {}));
/**
 * 花色枚举
 */
var FlushType;
(function (FlushType) {
    /**
     * 方块
     */
    FlushType[FlushType["Diamonds"] = 1] = "Diamonds";
    /**
     * 红桃
     */
    FlushType[FlushType["Hearts"] = 2] = "Hearts";
    /**
     * 黑桃
     */
    FlushType[FlushType["Spades"] = 3] = "Spades";
    /**
     * 草花
     */
    FlushType[FlushType["Clubs"] = 4] = "Clubs";
})(FlushType || (FlushType = {}));
// ---------------------------------------------------------------------------
// 牌局gambling end
// --------------------------------------------------------------------------- 
//# sourceMappingURL=GameEnums.js.map