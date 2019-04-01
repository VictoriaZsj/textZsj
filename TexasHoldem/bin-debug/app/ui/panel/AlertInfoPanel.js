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
 * 提示框面板
 */
var AlertInfoPanel = (function (_super) {
    __extends(AlertInfoPanel, _super);
    function AlertInfoPanel() {
        var _this = _super.call(this) || this;
        _this.maskAlpha = 0;
        _this.layer = UILayerType.Tips;
        _this.skinName = UISkinName.AlertInfoPanel;
        return _this;
    }
    AlertInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        var ly = new eui.HorizontalLayout();
        ly.horizontalAlign = egret.HorizontalAlign.CENTER;
        ly.gap = 66;
        this.group.layout = ly;
    };
    AlertInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.onRender(null);
    };
    AlertInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        // this.titleTxt.text = "提示";
        this.infoTxt.text = StringConstant.empty;
        this.subTxt.text = StringConstant.empty;
        // this.confirmBtn.label = "确定";
        // this.cancelBtn.label = "取消";
        this.infoTxt.textAlign = egret.HorizontalAlign.CENTER;
        if (this.panelData) {
            if (this.panelData.title) {
                // this.titleTxt.text = this.panelData.title;
            }
            if (this.panelData.subTitle) {
                this.subTxt.text = this.panelData.subTitle;
            }
            if (this.panelData.message) {
                this.infoTxt.textFlow = TextUtil.parser(this.panelData.message);
            }
            if (this.panelData.confirmLabel) {
                this.confirmBtn.label = this.panelData.confirmLabel;
            }
            if (this.panelData.cancelLabel) {
                this.cancelBtn.label = this.panelData.cancelLabel;
            }
            if (this.panelData.alignment) {
                this.infoTxt.textAlign = this.panelData.alignment;
            }
            if (this.panelData.isSingle) {
                this.cancelBtn.visible = false;
                this.addChild(this.cancelBtn);
            }
            else {
                this.cancelBtn.visible = true;
                this.group.addChildAt(this.cancelBtn, 0);
            }
        }
    };
    AlertInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
    };
    AlertInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
        if (this.panelData instanceof AlertInfo) {
            PoolUtil.PutObject(this.panelData);
        }
    };
    AlertInfoPanel.prototype.onConfirmClick = function (event) {
        if (this.panelData && this.panelData.OnConfirm) {
            this.panelData.OnConfirm(this.panelData.confirmParam);
        }
        _super.prototype.onCloseBtnClickHandler.call(this, event);
        if (!event) {
            SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        }
    };
    AlertInfoPanel.prototype.onCancelClick = function (event) {
        if (this.panelData && this.panelData.OnCancel) {
            this.panelData.OnCancel(this.panelData.cancleParam);
        }
        _super.prototype.onCloseBtnClickHandler.call(this, event);
        if (!event) {
            SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        }
    };
    return AlertInfoPanel;
}(BasePanel));
__reflect(AlertInfoPanel.prototype, "AlertInfoPanel");
var AlertInfo = (function () {
    function AlertInfo() {
        /// <summary>
        /// 标题
        /// </summary>
        this.title = StringConstant.empty;
        /// <summary>
        /// 副标题
        /// </summary>
        this.subTitle = StringConstant.empty;
        /// <summary>
        /// 消息
        /// </summary>
        this.message = StringConstant.empty;
        /// <summary>
        /// 确定按钮文本
        /// </summary>
        this.confirmLabel = StringConstant.empty;
        /// <summary>
        /// 取消按钮文本
        /// </summary>
        this.cancelLabel = StringConstant.empty;
        /// <summary>
        /// 确定回调
        /// </summary>
        this.OnConfirm = null;
        /// <summary>
        /// 取消回调
        /// </summary>
        this.OnCancel = null;
        /// <summary>
        /// 确定回调参数
        /// </summary>
        this.confirmParam = null;
        /// <summary>
        /// 取消回调参数
        /// </summary>
        this.cancleParam = null;
        /// <summary>
        /// 拓展数据
        /// </summary>
        this.extraData = null;
        /// <summary>
        /// 文本对齐
        /// </summary>
        this.alignment = egret.HorizontalAlign.CENTER;
        /**
         * 是否是单按钮
         */
        this.isSingle = true;
    }
    AlertInfo.prototype.reset = function () {
        this.title = StringConstant.empty;
        this.subTitle = StringConstant.empty;
        this.message = StringConstant.empty;
        this.confirmLabel = StringConstant.empty;
        this.cancelLabel = StringConstant.empty;
        this.OnConfirm = null;
        this.OnCancel = null;
        this.confirmParam = null;
        this.cancleParam = null;
        this.extraData = null;
        this.alignment = egret.HorizontalAlign.CENTER;
        this.isSingle = true;
    };
    return AlertInfo;
}());
__reflect(AlertInfo.prototype, "AlertInfo", ["IPoolObject", "Object"]);
//# sourceMappingURL=AlertInfoPanel.js.map