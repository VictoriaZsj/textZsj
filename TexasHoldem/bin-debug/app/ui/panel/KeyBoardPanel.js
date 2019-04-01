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
 * 键盘面板
 */
var KeyBoardPanel = (function (_super) {
    __extends(KeyBoardPanel, _super);
    function KeyBoardPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.KeyBoardPanel;
        return _this;
    }
    KeyBoardPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0.1;
        this._btnList = new Array();
        for (var i = 0; i <= 9; i++) {
            this._btnList.push(this["numBtn" + i.toString()]);
        }
    };
    KeyBoardPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    KeyBoardPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.isbgNotCanClick = false;
        this.isNotHasMask = false;
        this.searchLabelFlag = "";
        if (this.panelData.isbgNotCanClick == true) {
            this.isbgNotCanClick = true;
        }
        if (this.panelData.isNotHasMask == true) {
            this.isNotHasMask = true;
        }
        if (this.isNotHasMask) {
            this.setGrayMask(false);
        }
        else {
            this.setGrayMask(true);
        }
        if (this.panelData.searchLabelFlag) {
            this.searchLabelFlag = this.panelData.searchLabelFlag;
        }
        egret.Tween.removeTweens(this.anmGroup);
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 1286;
        enter.to({ y: 816 }, 200);
    };
    KeyBoardPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.keyboardClickHandler, this);
        PlayingFieldManager.onCloseKeyboardEvent.addListener(this.immediatelyClose, this);
    };
    KeyBoardPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.keyboardClickHandler, this);
        PlayingFieldManager.onCloseKeyboardEvent.removeListener(this.immediatelyClose, this);
    };
    /**
     * 直接关闭
    */
    KeyBoardPanel.prototype.immediatelyClose = function () {
        this.anmGroup.y = 1286;
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    };
    /**
     * 退场动画
    */
    KeyBoardPanel.prototype.outAnime = function () {
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 816;
        enter.to({ y: 1286 }, 200).call(this.onCloseAnmComplete, this);
    };
    KeyBoardPanel.prototype.onCloseAnmComplete = function () {
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    };
    /**
     * 数字键盘按钮事件处理
    */
    KeyBoardPanel.prototype.keyboardClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        this.type = -1;
        var index = this._btnList.indexOf(event.target);
        if (index >= 0) {
            this.type = 1; //数字键按下
            if (this.panelData.callback) {
                if (this.panelData.target) {
                    if (!this.searchLabelFlag) {
                        this.panelData.callback.call(this.panelData.target, this.type, index.toString());
                    }
                    else {
                        this.panelData.callback.call(this.panelData.target, this.type, this.searchLabelFlag, index.toString());
                    }
                }
                else {
                    if (!this.searchLabelFlag) {
                        this.panelData.callback(this.type, index.toString());
                    }
                    else {
                        this.panelData.callback(this.type, this.searchLabelFlag, index.toString());
                    }
                }
            }
        }
        else {
            switch (event.target) {
                case this.resetBtn:
                    this.type = 3; //清除键按下
                    break;
                case this.delBtn:
                    this.type = 2; //删除键按下
                    break;
                case this.anmGroup:
                    break;
                case this.bgImg:
                    break;
                default:
                    this.type = 4; //点击遮罩
                    if (!this.isbgNotCanClick) {
                        this.outAnime();
                    }
                    break;
            }
            if (this.panelData.callback) {
                if (this.panelData.target) {
                    if (!this.searchLabelFlag) {
                        this.panelData.callback.call(this.panelData.target, this.type);
                    }
                    else {
                        this.panelData.callback.call(this.panelData.target, this.type, this.searchLabelFlag);
                    }
                }
                else {
                    if (!this.searchLabelFlag) {
                        this.panelData.callback(this.type);
                    }
                    else {
                        this.panelData.callback(this.type, this.searchLabelFlag);
                    }
                }
            }
        }
    };
    return KeyBoardPanel;
}(BasePanel));
__reflect(KeyBoardPanel.prototype, "KeyBoardPanel");
//# sourceMappingURL=KeyBoardPanel.js.map