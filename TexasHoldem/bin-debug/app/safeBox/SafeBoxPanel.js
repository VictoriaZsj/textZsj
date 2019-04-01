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
 * 保险箱面板
 */
var SafeBoxPanel = (function (_super) {
    __extends(SafeBoxPanel, _super);
    function SafeBoxPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.SafeBoxPanel;
        return _this;
    }
    SafeBoxPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        var array = new Array();
        array.push(this.saveGoldGroup);
        array.push(this.withdrawGroup);
        array.push(this.pwdGroup);
        this.saveTab.init(array);
        this.setTips("");
    };
    SafeBoxPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        //刷新资产
        this.refreshProperty();
        // 存入滑动条刻度
        if (parseInt(this.currentGold.text) >= 10000) {
            this.saveScaleHs = Math.floor(parseInt(this.currentGold.text) / 10000);
        }
        else {
            this.saveScaleHs = 0;
        }
        // 取出滑动条刻度
        if (parseInt(this.saveGold.text) >= 10000) {
            this.withdrawScaleHs = parseInt(this.saveGold.text) / 10000;
        }
        else {
            this.withdrawScaleHs = 0;
        }
        //设置存入滑动条进度
        this.saveGoldHs.value = 0;
        this.saveGoldHs.maximum = this.saveScaleHs;
        //设置取出滑动条进度
        this.withdrawGoldHs.value = 0;
        this.withdrawGoldHs.maximum = this.withdrawScaleHs;
        this.withdrawPwd.restrict = "0-9";
        this.importGoldHs();
        this.exportGoldHs();
    };
    SafeBoxPanel.prototype.onEnterAnmComplete = function () {
        _super.prototype.onEnterAnmComplete.call(this);
        if (UserManager.userInfo.isSafePwd == undefined || UserManager.userInfo.isSafePwd == false) {
            AlertManager.showAlert("尊贵的VIP用户，请先创建您的保险箱密码，创建后才可使用保险箱功能。", this.goPwdGroup.bind(this));
        }
        else if (UserManager.userInfo.isSafePwd == true) {
            this.modifyPwd_gp.visible = true;
            this.createPwd_gp.visible = false;
        }
    };
    SafeBoxPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    SafeBoxPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.saveGoldHs.addEventListener(egret.Event.CHANGE, this.importGoldHs, this);
        this.saveGoldHs.addEventListener(eui.UIEvent.CHANGE_START, this.unEnoughGold, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.withdrawGoldHs.addEventListener(egret.Event.CHANGE, this.exportGoldHs, this);
        this.withdrawGoldHs.addEventListener(eui.UIEvent.CHANGE_START, this.unEnoughGold, this);
        this.withdrawAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.withdrawSubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandle, this);
        this.addEventListener(egret.TouchEvent.FOCUS_IN, this.showKeyboard, this);
        SafeBoxManager.pwdSuccessEvent.addListener(this.createPwdSuccessHandle, this);
        SafeBoxManager.modifyPwdEvent.addListener(this.modifyPwdSuccessHandle, this);
        UserManager.propertyChangeEvent.addListener(this.refreshProperty, this);
    };
    SafeBoxPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.saveGoldHs.removeEventListener(egret.Event.CHANGE, this.importGoldHs, this);
        this.saveGoldHs.removeEventListener(eui.UIEvent.CHANGE_START, this.unEnoughGold, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.subBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.withdrawGoldHs.removeEventListener(egret.Event.CHANGE, this.exportGoldHs, this);
        this.withdrawGoldHs.removeEventListener(eui.UIEvent.CHANGE_START, this.unEnoughGold, this);
        this.withdrawAddBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.withdrawSubBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldBtnHandle, this);
        this.removeEventListener(egret.TouchEvent.FOCUS_IN, this.showKeyboard, this);
        this.removeEventListener(egret.TouchEvent.FOCUS_IN, this.showKeyboard, this);
        SafeBoxManager.pwdSuccessEvent.removeListener(this.createPwdSuccessHandle, this);
        UserManager.propertyChangeEvent.removeListener(this.refreshProperty, this);
    };
    /**
     * 密码组
    */
    SafeBoxPanel.prototype.goPwdGroup = function () {
        this.saveTab.tabBar.selectedIndex = 2;
        this.saveTab.viewStack.selectedIndex = 2;
        this.createPwd_gp.visible = true;
        this.modifyPwd_gp.visible = false;
    };
    /**
     * 刷新资产
    */
    SafeBoxPanel.prototype.refreshProperty = function () {
        this.withdrawPwd.text = "";
        this.currentGold.text = UserManager.userInfo.gold.toString();
        this.saveGold.text = UserManager.userInfo.safeGold.toString();
        this.resetScaleHs();
    };
    /**
     * 创建密码成功操作
    */
    SafeBoxPanel.prototype.createPwdSuccessHandle = function () {
        UserManager.userInfo.isSafePwd = true;
        this.createPwd.text = "";
        this.createAgainPwd.text = "";
        this.createPwd_gp.visible = false;
        this.modifyPwd_gp.visible = true;
        this.pwdGroup.name = "修改密码";
        UIManager.showFloatTips("创建成功");
    };
    /**
     * 修改密码成功操作
    */
    SafeBoxPanel.prototype.modifyPwdSuccessHandle = function () {
        this.oldPwd.text = "";
        this.newPwd.text = "";
        this.againPwd.text = "";
        UIManager.showFloatTips("密码修改成功");
    };
    /**
     * 面板点击
    */
    SafeBoxPanel.prototype.onClickHandle = function (event) {
        switch (event.target) {
            case this.saveBtn:
                this.saveGoldHandler();
                break;
            case this.withdrawBtn:
                this.withdrawGoldHandler();
                break;
            case this.createPwdBtn:
                this.createPwdHandle();
                break;
            case this.modifyPwdBtn:
                this.modifyPwdHandle();
                break;
            default:
                UIManager.closePanel(UIModuleName.KeyBoardPanel);
        }
    };
    /**
     * 滑动存入金币滚动条
    */
    SafeBoxPanel.prototype.importGoldHs = function () {
        this.saveCount.text = (this.saveGoldHs.value).toString() + "万";
    };
    /**
     * 存入金币
    */
    SafeBoxPanel.prototype.saveGoldHandler = function () {
        if (parseInt(this.saveCount.text) != 0) {
            var num = parseInt(this.saveCount.text) * 10000;
            //重置计算数	
            this.saveGoldHs.value = 0;
            this.saveCount.text = "0万";
            //请求存入金币
            SafeBoxManager.reqSaveWithdrawGold(num, SafeType.Save);
        }
        else {
            UIManager.showFloatTips("不能存入0");
        }
    };
    /**
     * 滑动取出金币滚动条
    */
    SafeBoxPanel.prototype.exportGoldHs = function () {
        this.withdrawCount.text = (this.withdrawGoldHs.value).toString() + "万";
    };
    /**
     * 取出金币
    */
    SafeBoxPanel.prototype.withdrawGoldHandler = function () {
        if (this.withdrawPwd.text == "") {
            UIManager.showFloatTips("密码不能为空");
        }
        else if (this.withdrawPwd.text.length < 6) {
            this.setTips("密码不能小于6位数字");
        }
        else {
            if (parseInt(this.withdrawCount.text) != 0) {
                var num = parseInt(this.withdrawCount.text) * 10000;
                //重置计算数									
                this.withdrawGoldHs.value = 0;
                this.withdrawCount.text = "0万";
                SafeBoxManager.reqSaveWithdrawGold(num, SafeType.Withdraw, parseInt(this.withdrawPwd.text));
                this.withdrawPwd.text = "";
            }
            else {
                UIManager.showFloatTips("取出金额为空");
            }
            this.setTips("");
        }
    };
    /**
      * 金币不足
     */
    SafeBoxPanel.prototype.unEnoughGold = function (event) {
        switch (event.target) {
            case this.saveGoldHs:
                if (this.saveGoldHs.maximum == 0) {
                    UIManager.showFloatTips("当前可存金币不足一万");
                }
                break;
            case this.withdrawGoldHs:
                if (this.withdrawGoldHs.maximum == 0) {
                    UIManager.showFloatTips("保险箱金币为0");
                }
        }
    };
    /**
      * 点击金币加减按钮
     */
    SafeBoxPanel.prototype.goldBtnHandle = function (event) {
        switch (event.target) {
            case this.addBtn:
                this.saveGoldHs.value++;
                break;
            case this.subBtn:
                this.saveGoldHs.value--;
                break;
            case this.withdrawAddBtn:
                this.withdrawGoldHs.value++;
                break;
            case this.withdrawSubBtn:
                this.withdrawGoldHs.value--;
                break;
        }
        if (this.saveGoldHs.value > this.saveGoldHs.maximum) {
            this.saveGoldHs.value = this.saveGoldHs.maximum;
        }
        else if (this.withdrawGoldHs.value > this.withdrawGoldHs.maximum) {
            this.withdrawGoldHs.value = this.withdrawGoldHs.maximum;
        }
        else if (this.saveGoldHs.value < 0) {
            this.saveGoldHs.value = 0;
        }
        else if (this.withdrawGoldHs.value < 0) {
            this.withdrawGoldHs.value = 0;
        }
        this.importGoldHs();
        this.exportGoldHs();
    };
    /**
   * 搜索框获得焦点触发的操作
  */
    SafeBoxPanel.prototype.showKeyboard = function (event) {
        this.setTips("");
        this.inputType = event.target;
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.keyboardHandle, target: this, isNotHasMask: true, searchLabelFlag: this.inputType });
    };
    /**
     * 键盘事件处理
    */
    SafeBoxPanel.prototype.keyboardHandle = function (type, inputType, num) {
        // 键盘按下
        if (type == 1) {
            if (inputType.text.length < 6) {
                inputType.text = inputType.text + num;
            }
        }
        else if (type == 2) {
            if (inputType.text.length > 0) {
                inputType.text = inputType.text.slice(0, inputType.text.length - 1);
            }
        }
        else if (type == 3) {
            inputType.text = "";
        }
        else if (type == 4) {
            return;
        }
        else {
            return;
        }
    };
    /**
     * 重置刻度盘
    */
    SafeBoxPanel.prototype.resetScaleHs = function () {
        this.saveScaleHs = Math.floor(parseInt(this.currentGold.text) / 10000);
        this.saveGoldHs.maximum = this.saveScaleHs;
        this.withdrawScaleHs = parseInt(this.saveGold.text) / 10000;
        this.withdrawGoldHs.maximum = this.withdrawScaleHs;
    };
    /*
    * 创建密码操作
    */
    SafeBoxPanel.prototype.createPwdHandle = function () {
        if (this.createPwd.text.length == 0 || this.createAgainPwd.text.length == 0) {
            this.setTips("密码不能为空");
        }
        else if (this.createPwd.text.length < 6) {
            this.setTips("密码不能小于6位数字");
        }
        else if (parseInt(this.createPwd.text) == parseInt(this.createAgainPwd.text)) {
            var newPwd = parseInt(this.createPwd.text);
            SafeBoxManager.reqCreatePwd(newPwd);
        }
        else {
            this.setTips("*两次密码不一致");
        }
    };
    /**
     * 修改密码操作
    */
    SafeBoxPanel.prototype.modifyPwdHandle = function () {
        if (this.oldPwd.text.length == 0 || this.newPwd.text.length == 0 || this.againPwd.text.length == 0) {
            this.setTips("密码不能为空");
        }
        else if (this.oldPwd.text.length < 6 || this.newPwd.text.length < 6 || this.againPwd.text.length < 6) {
            this.setTips("密码不能小于6位数字");
        }
        else if (parseInt(this.newPwd.text) != parseInt(this.againPwd.text)) {
            this.setTips("新密码两次不一致");
        }
        else {
            var newPwd = parseInt(this.newPwd.text);
            var oldPwd = parseInt(this.oldPwd.text);
            SafeBoxManager.reqModifyPwd(newPwd, oldPwd);
        }
    };
    /**
      * 设置提示
     */
    SafeBoxPanel.prototype.setTips = function (tipName) {
        this.tipPwd.text = tipName;
    };
    return SafeBoxPanel;
}(BackHomeAnimePanel));
__reflect(SafeBoxPanel.prototype, "SafeBoxPanel");
//# sourceMappingURL=SafeBoxPanel.js.map