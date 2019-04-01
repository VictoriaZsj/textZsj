var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Command = (function () {
    function Command() {
    }
    /**
    * 登录
    */
    Command.Login_login = "login";
    Command.Login_exchange = "exchange";
    Command.Login_auth = "auth";
    //--------------------------------------------------------------
    // System
    //--------------------------------------------------------------
    /**
     * 心跳
     */
    Command.System_Heartbeat_3016 = "c3016";
    /**
     * 请求服务器推送
     */
    Command.System_GetNotice_3004 = "c3004";
    /**
     * 抢占登录
     */
    Command.System_Response_Login_2013 = "c2013";
    /**
     * 0点定时重置通知
     */
    Command.System_Push_ResetTime0_2015 = "c2015";
    /**
     * 获取角色信息
     */
    Command.Role_GetInfo_3000 = "c3000";
    /**
     * 资产变更推送
     */
    Command.Role_Push_PropertyChange_2000 = "c2000";
    /**
     * 请求购买房卡（测试专用）
     */
    Command.Req_BuyCard_3001 = "c3001";
    //--------------------------------------------------------------
    // Hosted
    //--------------------------------------------------------------
    /**
     * 推送玩家托管状态
     */
    Command.Hosted_PushState_2024 = "c2024";
    /**
     * 请求托管
     */
    Command.Hosted_Req_3022 = "c3022";
    //--------------------------------------------------------------
    // Chat
    //--------------------------------------------------------------
    /**
     * 聊天消息推送
     */
    Command.Chat_PushMessage_2014 = "c2014";
    /**
     * 发送聊天信息
     */
    Command.Chat_SendMessage_3019 = "c3019";
    /**
     * 请求上传签名
     */
    Command.Chat_Record_Sgin_3018 = "c3018";
    //--------------------------------------------------------------
    // Mail
    //--------------------------------------------------------------
    /**
     * 拉取邮件列表的请求
     */
    Command.Mail_GetList_3097 = "c3097";
    /**
     * 请求领取邮件附件
     */
    Command.Mail_TakePrize_3098 = "c3098";
    /**
     * 新邮件通知推送
     */
    Command.Mail_Push_New_2024 = "c2024";
    //--------------------------------------------------------------
    // Friend
    //--------------------------------------------------------------
    /**
     * 请求好友列表信息
    */
    Command.Friend_GetList_3156 = "c3156";
    /**
     * 请求赠送好友金币
    */
    Command.Friend_GiveGold_3151 = "c3151";
    /**
     * 好友赠送金币通知推送
     */
    Command.Friend_Push_GiveGold_2037 = "c2037";
    /**
     * 请求获取好友详细信息
     */
    Command.Friend_GetRoleInfo_3023 = "c3023";
    /**
     * 请求领取好友赠送的金币
     */
    Command.Friend_ReceiveGift_3150 = "c3150";
    /**
     * 请求好友请求列表
     */
    Command.Friend_RequestList_3157 = "c3157";
    /**
     * 发送是否接受好友请求的请求
     */
    Command.Friend_Receive_3154 = "c3154";
    /**
     * 发送搜索用户的请求
     */
    Command.Friend_SearchPlayer_3153 = "c3153";
    /**
     * 发送删除好友的请求
     */
    Command.Friend_DelPlayer_3155 = "c3155";
    /**
     * 发送添加用户为好友的请求
     */
    Command.Friend_AddPlayer_3152 = "c3152";
    /**
     * 好友添加成功的通知推送
     */
    Command.Friend_Push_AddSuccess_2036 = "c2036";
    /**
     *被好友删除的通知推送
     */
    Command.Friend_Push_BeDel_2035 = "c2035";
    /**
     * 好友在线通知推送
     */
    Command.Friend_Push_OnlineState_2064 = "c2064";
    /**
     * 添加好友请求通知推送
     */
    Command.Friend_Push_RequestFriend_2038 = "c2038";
    /**
     * 好友邀请推送
    */
    Command.Friend_Push_Invite_2111 = "c2111";
    //--------------------------------------------------------------
    // Award
    //--------------------------------------------------------------
    /**
     * 兑换奖励
     */
    Command.Award_Exchange_3113 = "c3113";
    /**
     * 拉取兑换信息
     */
    Command.Award_GetInfo_3112 = "c3112";
    //--------------------------------------------------------------
    // Achievement
    //--------------------------------------------------------------
    /**
     * 推送成就更新
     */
    Command.Achievement_PushChange_2023 = "c2023";
    /**
     * 拉取成就列表
     */
    Command.Achievement_GetList_3090 = "c3090";
    /**
     * 领取成就奖励
     */
    Command.Achievement_GetPrize_3088 = "c3088";
    //--------------------------------------------------------------
    // Activity
    //--------------------------------------------------------------
    /**
     * 拉取活动列表
     */
    Command.Activity_GetList_3233 = "c3233";
    /**
     * 推送活动
     */
    Command.Activity_Push_2088 = "c2088";
    /**
     * 请求领取活动奖励
     */
    Command.Activity_GetPrize_3202 = "c3202";
    //--------------------------------------------------------------
    // 
    //--------------------------------------------------------------
    /**
     * 会员时间戳变更推送
     */
    Command.Vip_GetVipTime_2001 = "c2001";
    /**
     * 推送玩家离线
     */
    Command.Role_Push_Offline_2026 = "c2026";
    /**
     * 拉取分享好友列表
     */
    Command.Req_BindFriendList_3027 = "c3027";
    /**
     * 设置角色基础信息
     */
    Command.Role_SetInfo_3609 = "c3609";
    /**
     * 用户经验变更推送
     */
    Command.Role_Push_ExpChange_2028 = "c2028";
    /**
     * 请求游戏场房间列表信息
     */
    Command.Req_RoomInfo_3002 = "c3002";
    /**
     * 发送创建角色的请求
     */
    Command.Role_Create_3012 = "c3012";
    /**
     * 发送存取金币的请求
     */
    Command.Req_saveORwithdraw_3014 = "c3014";
    /**
     * 发送保险箱密码请求
    */
    Command.Req_safePwd_3017 = "c3017";
    /**
     * 发送好友邀请
    */
    Command.Req_SendGameInvite_3608 = "c3608";
    /**
     * 拉取排行榜信息
     */
    Command.Req_RankList_3110 = "c3110";
    /**
     * 拉取物品列表
     */
    Command.Req_ItemList_3020 = "c3020";
    /**
     * 物品变更的推送
     */
    Command.Rec_ItemListChange_2002 = "c2002";
    /**
     * 使用物品请求
     */
    Command.Req_UseItem_3021 = "c3021";
    /**
     * 创建私人房
    */
    Command.Req_CreatePersonalRoom_3610 = "c3610";
    //--------------------------------------------------------------
    // 行牌流程
    //--------------------------------------------------------------
    /**
     * 获取牌局信息
     */
    Command.Req_EnterRoomInfo_3600 = "c3600";
    /**
     * 请求下一局开始
     */
    Command.Req_NextRound_3601 = "c3601";
    /**
     * 请求说话
     */
    Command.Req_Action_3602 = "c3602";
    /**
     * 请求离开房间
     */
    Command.Req_LeaveRoom_3603 = "c3603";
    /**
     * 请求买入游戏
     */
    Command.Req_BuyInGame_3604 = "c3604";
    /**
     * 请求站起
     */
    Command.Req_StandUp_3605 = "c3605";
    /**
     * 请求亮牌
     */
    Command.Req_BrightCard_3606 = "c3606";
    /**
     * 请求增加金币
     */
    Command.Req_AddCoin_3607 = "c3607";
    /**
     * 推送牌局结束
     */
    Command.Push_OneRoundOver_2106 = "c2106";
    /**
     * 推送下一局开始
     */
    Command.Push_NextRoundStart_2107 = "c2107";
    /**
     * 推送盲注前注变化
     */
    Command.Push_BlindChange_2100 = "c2100";
    /**
     * 推送底池变化
     */
    Command.Push_PotChipsChange_2101 = "c2101";
    /**
     * 推送一轮押注结束
     */
    Command.Push_OneLoopOver_2102 = "c2102";
    /**
     * 推送玩家坐下/站起
     */
    Command.Push_SitOrStand_2103 = "c2103";
    /**
     * 推送玩家状态变更
     */
    Command.Push_PlayerStateChange_2104 = "c2104";
    /**
     * 推送说话位置变更
     */
    Command.Push_ActionPosChange_2105 = "c2105";
    /**
     * 推送手牌
     */
    Command.Push_HandCard_2108 = "c2108";
    /**
     * 推送亮牌
     */
    Command.Push_BrightCard_2109 = "c2109";
    /**
     * 推送玩家筹码变化
     */
    Command.Push_ChipsChange_2110 = "c2110";
    /**
     * 推送等待操作的玩家列表
     */
    Command.Push_PlayerListStateChange_2113 = "c2113";
    return Command;
}());
__reflect(Command.prototype, "Command");
//# sourceMappingURL=Command.js.map