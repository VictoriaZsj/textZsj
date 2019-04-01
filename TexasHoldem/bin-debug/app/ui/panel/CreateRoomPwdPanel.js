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
 * 创建私人房密码面板
*/
var CreateRoomPwdPanel = (function (_super) {
    __extends(CreateRoomPwdPanel, _super);
    function CreateRoomPwdPanel() {
        var _this = _super.call(this, true) || this;
        _this.skinName = UISkinName.CreateRoomPwdPanel;
        return _this;
    }
    CreateRoomPwdPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIUtil.listRenderer(this.maxCarryList, this.maxCarryScroller, PersonalRoomItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON);
        this.setGrayMask(true);
        this.openPanelName = UIModuleName.CreateRoomPwdPanel;
    };
    CreateRoomPwdPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.getMaxCarrayInfo();
    };
    CreateRoomPwdPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createRoom, this);
        this.labelGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeIndex, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        PlayingFieldManager.onSelectedMaxCarryEvent.addListener(this.setAnte, this);
        this.maxCarryList.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.reset, this);
    };
    CreateRoomPwdPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.createRoom, this);
        this.labelGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeIndex, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        PlayingFieldManager.onSelectedMaxCarryEvent.removeListener(this.setAnte, this);
        this.maxCarryList.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.reset, this);
        UIManager.getPanel(UIModuleName.CreateRoomPwdPanel).y = 0;
    };
    CreateRoomPwdPanel.prototype.enterPwd = function (type, num) {
        if (num) {
            var label = this.getUnWriteLabel();
            if (label) {
                label.refresh(parseInt(num));
            }
        }
        //键盘删除键按下
        if (type == 2) {
            var delLabel = this.getWirteLabel();
            if (delLabel) {
                delLabel.refresh();
            }
        }
        else if (type == 3) {
            this.resetLabel();
        }
    };
    /**
     * 设置前注数据
    */
    CreateRoomPwdPanel.prototype.setAnte = function (id) {
        if (id) {
            var info = RoomDefined.GetInstance().getDefinition(id);
            if (info) {
                this.anteaLabel.label = info.ante[0].toString();
                this.antebLabel.label = info.ante[1].toString();
                this.antecLabel.label = info.ante[2].toString();
                this.antedLabel.label = info.ante[3].toString();
            }
            this.ante = 0;
            if (this.selectedAnte) {
                this.selectedAnte.selected = false;
                this.anteaLabel.selected = true;
                this.selectedAnte = this.anteaLabel;
            }
        }
    };
    /**
     * 重置
    */
    CreateRoomPwdPanel.prototype.reset = function () {
        if (PlayingFieldManager.maxCarryList) {
            PlayingFieldManager.selectedId = PlayingFieldManager.maxCarryList[0].id;
            this.anteaLabel.label = PlayingFieldManager.maxCarryList[0].ante[0].toString();
            this.antebLabel.label = PlayingFieldManager.maxCarryList[0].ante[1].toString();
            this.antecLabel.label = PlayingFieldManager.maxCarryList[0].ante[2].toString();
            this.antedLabel.label = PlayingFieldManager.maxCarryList[0].ante[3].toString();
        }
        if (this.selectedAnte) {
            this.selectedAnte.selected = false;
        }
        this.ante = 0;
        this.anteaLabel.selected = true;
        this.selectedAnte = this.anteaLabel;
    };
    /**
     * 点击事件处理
    */
    CreateRoomPwdPanel.prototype.onClickHandler = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        switch (event.target) {
            case this.anteaLabel:
                this.ante = this.changeToNum(this.anteaLabel.label);
                this.changSelectAnte(this.anteaLabel);
                break;
            case this.antebLabel:
                this.ante = this.changeToNum(this.antebLabel.label);
                this.changSelectAnte(this.antebLabel);
                break;
            case this.antecLabel:
                this.ante = this.changeToNum(this.antecLabel.label);
                this.changSelectAnte(this.antecLabel);
                break;
            case this.antedLabel:
                this.ante = this.changeToNum(this.antedLabel.label);
                this.changSelectAnte(this.antedLabel);
                break;
        }
    };
    /**
     * 更改前注选中项
    */
    CreateRoomPwdPanel.prototype.changSelectAnte = function (selectAnte) {
        if (!this.selectedAnte) {
            selectAnte.selected = true;
            this.selectedAnte = selectAnte;
        }
        else {
            if (selectAnte != this.selectedAnte) {
                this.selectedAnte.selected = false;
                selectAnte.selected = true;
                this.selectedAnte = selectAnte;
            }
            else {
                this.selectedAnte.selected = !this.selectedAnte.selected;
            }
        }
    };
    /**
     * 去掉万  亿
    */
    CreateRoomPwdPanel.prototype.changeToNum = function (str) {
        var w = str.indexOf("万");
        var y = str.indexOf("亿");
        if (w == -1 && y == -1) {
            return parseInt(str);
        }
        else {
            if (w != -1) {
                return parseInt(str) * 10000;
            }
            if (y != -1) {
                return parseInt(str) * 100000000;
            }
            return null;
        }
    };
    /**
     * 输入密码框点击事件
    */
    CreateRoomPwdPanel.prototype.changeIndex = function () {
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.callback, target: this, isbgNotCanClick: false });
        UIManager.getPanel(UIModuleName.CreateRoomPwdPanel).y = -50;
    };
    /**
     * 获取最大携带数数据和前注数据
    */
    CreateRoomPwdPanel.prototype.getMaxCarrayInfo = function () {
        var infoList = RoomDefined.GetInstance().getInfoByType(11);
        if (infoList) {
            PlayingFieldManager.maxCarryList = infoList;
            this.reset();
        }
        this.maxCarryList.dataProvider = new eui.ArrayCollection(PlayingFieldManager.maxCarryList);
    };
    /**
     * 创建私人房
    */
    CreateRoomPwdPanel.prototype.createRoom = function (event) {
        SoundManager.playButtonEffect(event.target);
        var str = this.getRoomPwd();
        var roompwd = parseInt(str);
        if (roompwd > 0 && roompwd.toString().length < 6) {
            AlertManager.showAlert("请先输入6位数的密码再创建房间！");
            return;
        }
        else if (PlayingFieldManager.selectedId) {
            var roomInfo = RoomDefined.GetInstance().getDefinition(PlayingFieldManager.selectedId);
            if (roomInfo) {
                if (UserManager.userInfo.gold < roomInfo.sBuyin) {
                    AlertManager.showAlert("您的金币不足" + MathUtil.formatNum(roomInfo.sBuyin) + ",请补充金币或者选择低场次进入。");
                    return;
                }
            }
            // PlayingFieldManager.reqCreatePersonalRoom(PlayingFieldManager.selectedId, roompwd, this.ante);
            UIManager.showFloatTips("发送创建房间请求"); //todo 测试代码
        }
        else {
            AlertManager.showAlert("请选择最大携带！");
        }
    };
    return CreateRoomPwdPanel;
}(EnterRoomPwdPanel));
__reflect(CreateRoomPwdPanel.prototype, "CreateRoomPwdPanel");
//# sourceMappingURL=CreateRoomPwdPanel.js.map