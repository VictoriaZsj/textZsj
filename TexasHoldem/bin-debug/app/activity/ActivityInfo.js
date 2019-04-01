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
var ActivityInfo = (function (_super) {
    __extends(ActivityInfo, _super);
    function ActivityInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 活动的完成状态
         */
        _this.completeState = false;
        /**
         * 记录玩家累计活动的数据
         */
        _this.actionNum = 0;
        /**
         * 活动是否已经过期
         */
        _this.IsOutOfTime = false;
        /**
         * 活动参与开始的时间(服务器提供)
         */
        _this.severStartTime = TimeManager.Utc1970;
        /**
         * 活动参与的结束时间(服务器提供)
         */
        _this.severEndTime = TimeManager.Utc1970;
        /**
         * 活动参与开始的时间
         */
        _this.startTime = TimeManager.Utc1970;
        /**
         * 活动参与的结束时间
         */
        _this.endTime = TimeManager.Utc1970;
        /**
         * 活动提示时间
         */
        _this.notifyTime = TimeManager.Utc1970;
        /**
         * 已领取奖励的子项列表
         */
        _this.getAwardList = new Array();
        return _this;
    }
    ActivityInfo.prototype.reset = function () {
    };
    Object.defineProperty(ActivityInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = ActivityListDefined.GetInstance().getDefinition(this._id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    return ActivityInfo;
}(BaseServerValueInfo));
__reflect(ActivityInfo.prototype, "ActivityInfo");
//# sourceMappingURL=ActivityInfo.js.map