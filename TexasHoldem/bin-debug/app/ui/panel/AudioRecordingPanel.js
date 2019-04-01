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
 * 正在录音面板
 */
var AudioRecordingPanel = (function (_super) {
    __extends(AudioRecordingPanel, _super);
    function AudioRecordingPanel() {
        var _this = _super.call(this) || this;
        _this.setGrayMask(false);
        _this.skinName = UISkinName.AudioRecordingPanel;
        return _this;
    }
    AudioRecordingPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    AudioRecordingPanel.prototype.ShowValue = function () {
        this.play.play();
    };
    AudioRecordingPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var isStop = appendData;
    };
    AudioRecordingPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.ShowValue();
    };
    AudioRecordingPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.play.pause();
        RecordAudioManager.ClearData();
    };
    return AudioRecordingPanel;
}(BasePanel));
__reflect(AudioRecordingPanel.prototype, "AudioRecordingPanel");
//# sourceMappingURL=AudioRecordingPanel.js.map