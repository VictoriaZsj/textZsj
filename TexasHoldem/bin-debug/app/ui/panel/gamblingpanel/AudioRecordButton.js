var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 录音按钮
 */
var AudioRecordButton = (function () {
    function AudioRecordButton() {
        /**
         * 是否正在录音
         */
        this._isRecording = false;
        this._isOnRecord = false;
        this._isPress = false;
    }
    AudioRecordButton.prototype.initialize = function (btn) {
        this._recordButton = btn;
    };
    AudioRecordButton.prototype.OnEnable = function () {
        this._recordButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOutSide, this);
        this._recordButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRecordBtnBegin, this);
        this._recordButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onRecordBtnEnd, this);
        this._recordButton.addEventListener(egret.TouchEvent.LEAVE_STAGE, this.onLevelStage, this);
        GameManager.stage.addEventListener(egret.Event.DEACTIVATE, this.SystemManager_OnGamePause, this);
        ChannelManager.OnApplicationFocus.addListener(this.OnApplicationFocus, this);
    };
    AudioRecordButton.prototype.OnDisable = function () {
        this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOutSide, this);
        this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRecordBtnBegin, this);
        this._recordButton.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRecordBtnEnd, this);
        this._recordButton.removeEventListener(egret.TouchEvent.LEAVE_STAGE, this.onLevelStage, this);
        GameManager.stage.removeEventListener(egret.Event.DEACTIVATE, this.SystemManager_OnGamePause, this);
        ChannelManager.OnApplicationFocus.removeListener(this.OnApplicationFocus, this);
        RecordAudioManager.RestoreMusicSetting();
    };
    AudioRecordButton.prototype.SystemManager_OnGamePause = function (event) {
        if (this._isRecording == true) {
            this.StopRecording(true); //取消录音
        }
    };
    AudioRecordButton.prototype.OnApplicationFocus = function (focusStatus) {
        if (focusStatus == false) {
            if (this._isRecording == true) {
                this.StopRecording(true); //取消录音
            }
        }
    };
    AudioRecordButton.prototype.onRecordBtnBegin = function (event) {
        var go = event.currentTarget;
        if (!RecordAudioManager.CheckMicrophone(true)) {
            return;
        }
        if (RecordAudioManager.IsStillHandling()) {
            UIManager.showFloatTips("上一条音频数据上传中");
            return;
        }
        if (this._isRecording == false) {
            this._isRecording = true;
            ChannelManager.recordAudio(AudioRecordActions.StartRecord);
            this.StopRecordLater();
            UIManager.showPanel(UIModuleName.AudioRecordingPanel, true);
        }
    };
    /**
     * 记录完毕
     */
    AudioRecordButton.prototype.onRecordBtnEnd = function (event) {
        this.StopRecording(false);
    };
    /**
     * 滑出
     */
    AudioRecordButton.prototype.onOutSide = function (event) {
        this.StopRecording(true);
    };
    /**
     * 离开舞台
     */
    AudioRecordButton.prototype.onLevelStage = function (event) {
        this.StopRecording(true);
    };
    AudioRecordButton.prototype.StopRecordLater = function () {
        egret.clearTimeout(this._recordTimer);
        this._recordTimer = egret.setTimeout(this.StopRecording, this, ProjectDefined.GetInstance().getValue(ProjectDefined.chatMaxRecordTime), false);
    };
    AudioRecordButton.prototype.StopRecording = function (isCancel) {
        egret.clearTimeout(this._recordTimer);
        if (this._isRecording) {
            this._isRecording = false;
            UIManager.closePanel(UIModuleName.AudioRecordingPanel);
            if (!isCancel) {
                ChannelManager.recordAudio(AudioRecordActions.StopRecord);
                RecordAudioManager.RecordVoice(AudioRecordActions.StopRecord);
                console.log("停止录音");
            }
            else {
                ChannelManager.recordAudio(AudioRecordActions.CancelRecord);
                RecordAudioManager.RecordVoice(AudioRecordActions.CancelRecord);
                console.log("取消录音");
            }
        }
    };
    AudioRecordButton.prototype.SetGray = function (value) {
        if (value) {
            FilterUtil.setGray(this._recordButton);
        }
        else {
            FilterUtil.setDefault(this._recordButton);
        }
        this._recordButton.touchEnabled = !value;
    };
    return AudioRecordButton;
}());
__reflect(AudioRecordButton.prototype, "AudioRecordButton");
//# sourceMappingURL=AudioRecordButton.js.map