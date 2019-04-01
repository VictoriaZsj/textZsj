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
 * 设置面板
 */
var SetPanel = (function (_super) {
    __extends(SetPanel, _super);
    function SetPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = UISkinName.SetPanel;
        return _this;
    }
    SetPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    SetPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (!ProjectDefined.GetInstance().gameFeedback) {
            this.forum.text = StringConstant.empty;
            this.QQ.text = ProjectDefined.GetInstance().gameFeedback.QQ;
            this.customerService.text = StringConstant.empty;
        }
        if (ProjectDefined.GetInstance().gameFeedback.forum) {
            this.forum.text = ProjectDefined.GetInstance().gameFeedback.forum;
        }
        else if (!ProjectDefined.GetInstance().gameFeedback.forum) {
            this.forum.text = StringConstant.empty;
        }
        if (ProjectDefined.GetInstance().gameFeedback.QQ) {
            this.QQ.text = ProjectDefined.GetInstance().gameFeedback.QQ;
        }
        else if (!ProjectDefined.GetInstance().gameFeedback.QQ) {
            this.QQ.text = StringConstant.empty;
        }
        if (ProjectDefined.GetInstance().gameFeedback.customerService) {
            this.customerService.text = ProjectDefined.GetInstance().gameFeedback.customerService;
        }
        else if (!ProjectDefined.GetInstance().gameFeedback.customerService) {
            this.customerService.text = StringConstant.empty;
        }
    };
    SetPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.bgSoundTog.selected = SoundManager.bgEnabled;
        this.soundEffectTog.selected = SoundManager.effectEnabled;
        this.shakeTog.selected = GameSetting.shakeEnabled;
    };
    SetPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.bgSoundTog.addEventListener(egret.Event.CHANGE, this.closeBgSoundHandler, this);
        this.soundEffectTog.addEventListener(egret.Event.CHANGE, this.closeSoundEffectHandler, this);
        this.reLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reLoginClickHandler, this);
    };
    SetPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.bgSoundTog.removeEventListener(egret.Event.CHANGE, this.closeBgSoundHandler, this);
        this.soundEffectTog.removeEventListener(egret.Event.CHANGE, this.closeSoundEffectHandler, this);
        this.reLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reLoginClickHandler, this);
    };
    SetPanel.prototype.closeBgSoundHandler = function (event) {
        SoundManager.playEffect(Sex.Female, MusicAction.buttonClick);
        SoundManager.bgEnabled = this.bgSoundTog.selected;
    };
    SetPanel.prototype.closeSoundEffectHandler = function (event) {
        SoundManager.playEffect(Sex.Female, MusicAction.buttonClick);
        SoundManager.effectEnabled = this.soundEffectTog.selected;
        PrefsManager.setBoolean(PrefsManager.Sound_Effect_Enable, this.soundEffectTog.selected);
    };
    SetPanel.prototype.reLoginClickHandler = function (event) {
        ChannelManager.Logout();
    };
    return SetPanel;
}(BackHomeAnimePanel));
__reflect(SetPanel.prototype, "SetPanel");
//# sourceMappingURL=SetPanel.js.map