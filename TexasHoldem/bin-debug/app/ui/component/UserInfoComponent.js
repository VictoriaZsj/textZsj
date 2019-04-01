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
 * 用户头像信息
 */
var UserInfoComponent = (function (_super) {
    __extends(UserInfoComponent, _super);
    function UserInfoComponent() {
        var _this = _super.call(this) || this;
        _this.skinName = UIComponentSkinName.UserInfoComponent;
        return _this;
    }
    UserInfoComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    UserInfoComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    UserInfoComponent.prototype.rendererStart = function (event) {
        if (this.bindData.userInfo.name) {
            this.nameLabel.text = this.bindData.userInfo.name;
        }
        else {
            this.nameLabel.text = this.bindData.roleId.toString();
        }
        this.commonIcon.init(this.bindData);
        this.idLabel.text = this.bindData.roleId.toString();
        this.sexImg.source = UIUtil.getSexImgSource(this.bindData.userInfo.sex);
    };
    return UserInfoComponent;
}(BaseComponent));
__reflect(UserInfoComponent.prototype, "UserInfoComponent");
//# sourceMappingURL=UserInfoComponent.js.map