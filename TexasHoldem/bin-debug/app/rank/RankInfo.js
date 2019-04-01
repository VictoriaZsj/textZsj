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
var RankInfo = (function (_super) {
    __extends(RankInfo, _super);
    function RankInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankInfo.prototype.reset = function () {
        this.roleId = 0;
        this.name = StringConstant.empty;
        this.score = 0;
        this.rank = 0;
        this.head = ImageSource.Default_Head;
        this.change = RankChange.NoChange;
    };
    return RankInfo;
}(BaseServerValueInfo));
__reflect(RankInfo.prototype, "RankInfo");
//# sourceMappingURL=RankInfo.js.map