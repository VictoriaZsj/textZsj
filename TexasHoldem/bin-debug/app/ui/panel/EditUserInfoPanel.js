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
 * 编辑资料面板
 */
var EditUserInfoPanel = (function (_super) {
    __extends(EditUserInfoPanel, _super);
    function EditUserInfoPanel() {
        var _this = _super.call(this) || this;
        _this.isCloseButtonTween = false;
        _this.skinName = UISkinName.EditUserInfoPanel;
        return _this;
    }
    EditUserInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.sexButtonGroup = new eui.RadioButtonGroup();
        this.sexMaleButton.group = this.sexButtonGroup;
        this.sexMaleButton.value = Sex.Male;
        this.sexFemaleButton.group = this.sexButtonGroup;
        this.sexFemaleButton.value = Sex.Female;
        this.sexUnkonwnButton.group = this.sexButtonGroup;
        this.sexUnkonwnButton.value = Sex.Unknown;
        this.sexButtonGroup.selectedValue = UserManager.userInfo.sex;
        this.ageLabel.inputType = egret.TextFieldInputType.TEL;
        this.ageLabel.restrict = "0-9";
        this.ageLabel.maxChars = 2;
        this.userDesLabel.maxChars = 30;
    };
    EditUserInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.refreshInfo();
    };
    EditUserInfoPanel.prototype.refreshInfo = function () {
        this.headImg.source = UserManager.userInfo.head;
        this.userDesLabel.text = UserManager.userInfo.sign;
        this.ageLabel.text = UserManager.userInfo.age.toString();
        this.sexLabel.text = this.sexButtonGroup.getRadioButtonAt(UserManager.userInfo.sex).label;
    };
    EditUserInfoPanel.prototype.reqSaveEdit = function () {
        var userDes = null;
        var userSex = null;
        var userAge = null;
        if (this.userDesLabel.text != UserManager.userInfo.sign) {
            userDes = this.userDesLabel.text;
        }
        if (this.sexButtonGroup.selectedValue != UserManager.userInfo.sex) {
            userSex = this.sexButtonGroup.selectedValue;
        }
        if (parseInt(this.ageLabel.text) != UserManager.userInfo.age) {
            userAge = parseInt(this.ageLabel.text);
        }
        UserManager.reqSetUserInfo(userDes, userSex, userAge);
    };
    EditUserInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sexButtonGroup.addEventListener(egret.Event.CHANGE, this.changeActive, this);
    };
    EditUserInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sexButtonGroup.removeEventListener(egret.Event.CHANGE, this.changeActive, this);
    };
    /**
     * 点击面板按钮事件处理
    */
    EditUserInfoPanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.sexGroup.visible) {
            this.sexGroup.visible = false;
        }
        switch (event.target) {
            case this.closeButton:
                this.reqSaveEdit();
                break;
            case this.sexLabel:
            case this.showSexSelect:
                this.sexGroup.visible = true;
                break;
        }
    };
    /**
     * 改变选项卡按钮状态
    */
    EditUserInfoPanel.prototype.changeActive = function (event) {
        this.sexLabel.text = this.sexButtonGroup.selection.label;
    };
    return EditUserInfoPanel;
}(BasePanel));
__reflect(EditUserInfoPanel.prototype, "EditUserInfoPanel");
//# sourceMappingURL=EditUserInfoPanel.js.map