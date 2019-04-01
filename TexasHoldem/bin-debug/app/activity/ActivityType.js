var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActivityType = (function () {
    function ActivityType() {
    }
    /**
     * 纯图片活动
     */
    ActivityType.img = "img";
    /**
     * 图片+文字获得
     */
    ActivityType.des = "des";
    /**
     * 签到活动
     */
    ActivityType.signin = "signin";
    return ActivityType;
}());
__reflect(ActivityType.prototype, "ActivityType");
//# sourceMappingURL=ActivityType.js.map