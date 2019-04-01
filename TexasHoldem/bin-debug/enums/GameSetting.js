var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏配置
 * */
var GameSetting = (function () {
    function GameSetting() {
    }
    Object.defineProperty(GameSetting, "shakeEnabled", {
        get: function () {
            if (GameSetting._shakeEnabled != undefined) {
                return GameSetting._shakeEnabled;
            }
            return PrefsManager.getBoolean(PrefsManager.Shake_Enable);
        },
        set: function (value) {
            GameSetting.shakeEnabled = value;
            PrefsManager.setBoolean(PrefsManager.Shake_Enable, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 舞台宽高
     * */
    GameSetting.StageWidth = 720;
    GameSetting.StageHeight = 1280;
    /**
     * 是否同意了用户协议
     */
    GameSetting.IsAgreeUserAgreement = false;
    /**
     * 是否登录了
     */
    GameSetting.IsLogined = false;
    /**
     * 登陆协议文件
     */
    GameSetting.LoginBin = null;
    /**
     * 游戏协议文件c2s
     */
    GameSetting.Gamec2sBin = null;
    /**
     * 游戏协议文件s2c
     */
    GameSetting.Games2cBin = null;
    /**
     * 牌的总数
     */
    GameSetting.CardTotalNum = 112;
    /**
     * 最大牌的索引红中
     */
    GameSetting.MaxCardIndex = 28;
    /**
     * 闲家手牌最大张数
     */
    GameSetting.MaxShouPaiNum = 13;
    /**
     * 庄家手牌最大张数
     */
    GameSetting.ZhuangJiaShouPaiNum = 14;
    /**
     * 一张牌的最大张数
     */
    GameSetting.OneTypeTotalNum = 4;
    /**
     * 4张4张发牌，总共发12张
     */
    GameSetting.FaFourCardModel = 12;
    /**
     * 一秒的毫秒数
     */
    GameSetting.OneSecondMS = 1000;
    /**
     * 对家组层级
     */
    GameSetting.DuiJiaGrouplayer = 0;
    /**
     * 对家手牌层级
     */
    GameSetting.DuiJiaShouPaiLayer = 5;
    /**
     * 上家碰杠牌层级
     */
    GameSetting.ShangJiaGroupLayer = 10;
    /**
     * 上家手牌层级
     */
    GameSetting.ShangJiaShouPaiLayer = 15;
    /**
     * 下家碰杠牌层级
     */
    GameSetting.XiaJiaGroupLayer = 20;
    /**
     * 下家手牌层级
     */
    GameSetting.XiaJiaShouPaiLayer = 25;
    /**
     * 牌墙层级其他家
     */
    GameSetting.CardWallOther = 35;
    /**
 * 出牌层级 本家
 */
    GameSetting.OutBenJiaLayer = 36;
    /**
     * 出牌层级 对家
     */
    GameSetting.OutDuiJiaLayer = 37;
    /**
     * 出牌层级 下家
     */
    GameSetting.OutXiaJiaLayer = 38;
    /**
     * 出牌层级 上家
     */
    GameSetting.OutShangJiaLayer = 39;
    /**
     * 本家组牌层级
     */
    GameSetting.BenJiaGroupLayer = 40;
    /**
     * 牌墙层级本家
     */
    GameSetting.CardWallLayerBenJia = 45;
    /**
     * 本家手牌层级
     */
    GameSetting.BenJiaShouPaiLayer = 50;
    /**
     * 最大邮件数量
     */
    GameSetting.MaxMailNum = 30;
    return GameSetting;
}());
__reflect(GameSetting.prototype, "GameSetting");
//# sourceMappingURL=GameSetting.js.map