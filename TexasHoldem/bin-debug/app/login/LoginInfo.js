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
/**
 * 登录信息
 */
var LoginInfo = (function (_super) {
    __extends(LoginInfo, _super);
    function LoginInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /// <summary>
        /// 是否是白名单用户
        /// </summary>
        _this.isWhitelist = false;
        /// <summary>
        /// 当前账号已经创建过角色
        /// </summary>
        _this.hasAlreadyCreateRole = false;
        return _this;
    }
    LoginInfo.prototype.reset = function () {
    };
    LoginInfo.CreateFromProto = function (obj) {
        var info = new LoginInfo(obj);
        if (obj["status"] != null) {
            info.isWhitelist = (parseInt(obj["status"]) < 0); //小于0为白名单
        }
        if (info.channeldata) {
            info.channeldata = JSON.parse(info.channeldata.toString());
        }
        return info;
    };
    return LoginInfo;
}(BaseServerValueInfo));
__reflect(LoginInfo.prototype, "LoginInfo");
/**
 * 角色信息
 */
var RoleInfo = (function () {
    function RoleInfo() {
    }
    RoleInfo.CreateFromProto = function (data) {
        var info = data;
        return info;
    };
    return RoleInfo;
}());
__reflect(RoleInfo.prototype, "RoleInfo");
//# sourceMappingURL=LoginInfo.js.map