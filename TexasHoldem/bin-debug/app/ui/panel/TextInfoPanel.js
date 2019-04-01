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
 * 文本信息面板
 */
var TextInfoPanel = (function (_super) {
    __extends(TextInfoPanel, _super);
    function TextInfoPanel() {
        var _this = _super.call(this) || this;
        _this._txtCount = 35;
        _this.isMaskClickClose = true;
        _this._contentList = new Array();
        _this.skinName = UISkinName.TextInfoPanel;
        return _this;
    }
    TextInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.txtGroupScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.isCloseButtonTween = false;
    };
    TextInfoPanel.prototype.init = function (appendData) {
        if (this._lastShowContainer) {
            if (appendData == this.panelData) {
                this._lastShowContainer.visible = true;
            }
            else {
                this._lastShowContainer.visible = false;
            }
        }
        else {
            this.txtList.visible = false;
            this.txtGroup.visible = false;
        }
        _super.prototype.init.call(this, appendData);
        this._def = TextDefined.GetInstance().getDefinition(this.panelData);
        this.contentContainerOper();
    };
    TextInfoPanel.prototype.contentContainerOper = function () {
        if (this._def) {
            if (this._def.isRichTxt) {
                this.txtGroupScroller.viewport = this.txtGroup;
            }
            else {
                this.txtGroupScroller.viewport = this.txtList;
            }
        }
    };
    TextInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        UIUtil.hideScrollerBar(this.txtGroupScroller, true, false);
        if (this._def) {
            this.titleLabel.text = this._def.title;
            if (!this._def.isRichTxt) {
                this.txtList.visible = true;
                this._lastShowContainer = this.txtList;
                this.contentOper();
                UIUtil.listRenderer(this.txtList, this.txtGroupScroller, TextRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, this._contentList, true);
            }
            else {
                this.txtLabel.textFlow = TextUtil.parser(this._def.text);
                this.txtGroup.visible = true;
                this._lastShowContainer = this.txtGroup;
            }
        }
        this.txtGroupScroller.stopAnimation();
        this.txtGroupScroller.viewport.scrollV = 0;
    };
    TextInfoPanel.prototype.contentOper = function () {
        ArrayUtil.Clear(this._contentList);
        var str = this._def.text;
        var splitStr = "\n";
        // if (this._def.isRichTxt)
        // {
        // 	splitStr = "<br/>"
        // }
        if (str.indexOf(splitStr) == -1) {
            this._contentList.push(str);
        }
        else {
            var index = 0;
            var tmpStr = StringConstant.empty;
            var line = 0;
            var oneStr = void 0;
            var reaLine = void 0;
            while (str.length > 0) {
                index = str.indexOf(splitStr);
                if (index != -1) {
                    // if (this._def.isRichTxt)
                    // {
                    // 	oneStr = str.slice(0, index + 5);
                    // 	str = str.slice(index + 5, str.length);
                    // }
                    // else
                    // {
                    oneStr = str.slice(0, index + 1);
                    str = str.slice(index + 1, str.length);
                    // }
                    if (oneStr.length > this._txtCount) {
                        while (oneStr.length > 0) {
                            tmpStr = oneStr.slice(0, this._txtCount) + splitStr;
                            this._contentList.push(tmpStr);
                            oneStr = oneStr.substring(this._txtCount, oneStr.length);
                        }
                    }
                    else {
                        this._contentList.push(oneStr);
                    }
                }
                else {
                    this._contentList.push(str);
                    break;
                }
            }
        }
    };
    TextInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    TextInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return TextInfoPanel;
}(BasePanel));
__reflect(TextInfoPanel.prototype, "TextInfoPanel");
//# sourceMappingURL=TextInfoPanel.js.map