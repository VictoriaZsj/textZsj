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
 * 创建角色
*/
var CreateRolePanel = (function (_super) {
    __extends(CreateRolePanel, _super);
    function CreateRolePanel() {
        var _this = _super.call(this) || this;
        _this.radioGroup = new eui.RadioButtonGroup();
        _this.layer = UILayerType.Tips;
        _this.skinName = UISkinName.CreateRolePanel;
        return _this;
    }
    CreateRolePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.nickNameLable.type = egret.TextFieldType.INPUT;
        this.manRadioBtn.label = "男";
        this.manRadioBtn.value = Sex.Male;
        this.manRadioBtn.selected = true;
        this.sex = this.manRadioBtn.value;
        this.manRadioBtn.group = this.radioGroup;
        this.womanRadioBtn.label = "女";
        this.womanRadioBtn.value = Sex.Female;
        this.womanRadioBtn.group = this.radioGroup;
    };
    CreateRolePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.nickNameLable.text = UserUtil.randomNickName(this.sex);
    };
    CreateRolePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.radioGroup.addEventListener(eui.UIEvent.CHANGE, this.sexRadioChangeHandler, this);
        this.manRadioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.womanRadioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.randomNameHandler, this);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
    };
    CreateRolePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.radioGroup.removeEventListener(eui.UIEvent.CHANGE, this.sexRadioChangeHandler, this);
        this.manRadioBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.womanRadioBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sexRadioClickHandler, this);
        this.randomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.randomNameHandler, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterHandler, this);
    };
    /**
     * 更改性别触发的操作
    */
    CreateRolePanel.prototype.sexRadioChangeHandler = function (event) {
        var radioGroup = event.target;
        var name;
        this.sex = radioGroup.selectedValue;
        this.nickNameLable.text = UserUtil.randomNickName(this.sex);
    };
    /**
     * 更改性别按钮点击播放声音
    */
    CreateRolePanel.prototype.sexRadioClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
    };
    /**
     * 点击随机按钮触发的操作
    */
    CreateRolePanel.prototype.randomNameHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        this.nickNameLable.text = UserUtil.randomNickName(this.sex);
    };
    /**
     * 点击进入游戏按钮触发的操作
    */
    CreateRolePanel.prototype.enterHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (UserUtil.isLegalNickName(this.nickNameLable.text)) {
            //首先验证是否重名
            UserManager.reqCreateRole(this.nickNameLable.text, this.sex);
        }
    };
    return CreateRolePanel;
}(BasePanel));
__reflect(CreateRolePanel.prototype, "CreateRolePanel");
//# sourceMappingURL=CreateRolePanel.js.map