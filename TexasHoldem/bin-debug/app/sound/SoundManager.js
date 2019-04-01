var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 声音音效管理
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    Object.defineProperty(SoundManager, "bgEnabled", {
        get: function () {
            if (SoundManager._bgEnabled != undefined) {
                return SoundManager._bgEnabled;
            }
            return PrefsManager.getBoolean(PrefsManager.Sound_Bg_Enable);
        },
        /**
         * 是否播放背景音乐
         */
        set: function (value) {
            SoundManager._bgEnabled = value;
            PrefsManager.setBoolean(PrefsManager.Sound_Bg_Enable, value);
            if (value) {
                SoundManager.playBgMusic(SoundManager._currentSceneType);
            }
            else {
                SoundManager.stopBgMusic();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager, "effectEnabled", {
        get: function () {
            if (SoundManager._effectEnabled != undefined) {
                return SoundManager._effectEnabled;
            }
            return PrefsManager.getBoolean(PrefsManager.Sound_Effect_Enable);
        },
        /**
         * 音效值
         */
        set: function (value) {
            SoundManager._effectEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager, "bgVolume", {
        get: function () {
            if (SoundManager._bgVolume != undefined) {
                return SoundManager._bgVolume;
            }
            return PrefsManager.getNumber(PrefsManager.Sound_Bg_Volume, 0.7);
        },
        /**
         * 音效值
         */
        set: function (value) {
            SoundManager._bgVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager, "effectVolume", {
        get: function () {
            if (SoundManager._effectVolume != undefined) {
                return SoundManager._effectVolume;
            }
            return PrefsManager.getNumber(PrefsManager.Sound_Effect_Volume, 1);
        },
        /**
         * 音效值
         */
        set: function (value) {
            SoundManager._effectVolume = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 播放背景音乐
     */
    SoundManager.playBgMusic = function (type) {
        SoundManager._currentSceneType = type;
        if (!SoundManager.bgEnabled) {
            return;
        }
        SoundManager._lastPos = 0;
        if (!SoundManager._bgSoundList) {
            SoundManager._bgSoundList = new Dictionary();
        }
        if (!SoundManager._bgSoundChannelList) {
            SoundManager._bgSoundChannelList = new Dictionary();
        }
        if (type == SceneType.Login) {
            type = SceneType.Hall;
        }
        if (SoundManager._lastBgSoundChannel) {
            SoundManager._lastBgSoundChannel.stop();
        }
        var soundChannel = SoundManager._bgSoundChannelList.getValue(type);
        var sound = SoundManager._bgSoundList.getValue(type);
        if (sound && sound.length > 0) {
            soundChannel = sound.play(0, SoundManager._playTimes);
            soundChannel.volume = SoundManager.bgVolume;
            soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
        }
        else {
            if (!sound) {
                sound = new egret.Sound();
                SoundManager._bgSoundList.add(type, sound);
            }
            sound.addEventListener(egret.Event.COMPLETE, SoundManager.onSoundLoadComplete, this);
            var url = PathName.Sound + MusicResEnum.getBgSoundRes(type) + ResSuffixName.Mp3Suffix;
            sound.load(RES.getVersionController().getVirtualUrl(url));
        }
        SoundManager._lastBgSound = sound;
        SoundManager._lastBgSoundChannel = soundChannel;
        SoundManager._bgSoundChannelList.add(type, soundChannel);
        SoundManager._bgSoundList.add(type, sound);
    };
    SoundManager.changeBgMusic = function (volume) {
        if (this._lastBgSoundChannel && volume != undefined && SoundManager.bgEnabled) {
            this._lastBgSoundChannel.volume = volume;
        }
    };
    SoundManager.bgMusicOpen = function (type) {
        SoundManager._currentSceneType = type;
        if (this._lastBgSoundChannel && this._lastBgSound) {
            if (!SoundManager._bgEnabled) {
                SoundManager._lastPos = this._lastBgSoundChannel.position;
            }
            this._lastBgSoundChannel.stop();
            this._lastBgSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
            if (SoundManager._bgEnabled) {
                this._lastBgSoundChannel = this._lastBgSound.play(SoundManager._lastPos, this._playTimes);
                this._lastBgSoundChannel.volume = SoundManager.bgVolume;
                this._lastBgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
                SoundManager._bgSoundChannelList.add(SoundManager._currentSceneType, this._lastBgSoundChannel);
                SoundManager._bgSoundList.add(SoundManager._currentSceneType, this._lastBgSound);
            }
        }
        else {
            if (SoundManager._bgEnabled) {
                SoundManager.playBgMusic(SoundManager._currentSceneType);
            }
        }
    };
    SoundManager.onSoundLoadComplete = function (event) {
        //获取加载到的 Sound 对象
        var sound = event.target;
        sound.removeEventListener(egret.Event.COMPLETE, SoundManager.onSoundLoadComplete, this);
        var type = SoundManager._bgSoundList.getKey(sound);
        if (type) {
            //播放音乐
            var channel = sound.play(0, SoundManager._playTimes);
            channel.volume = SoundManager.bgVolume;
            SoundManager._bgSoundChannelList.add(type, channel);
            channel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
            SoundManager._lastBgSoundChannel = channel;
            SoundManager._lastBgSound = sound;
        }
    };
    SoundManager.onSoundPlayComplete = function (event) {
        var channel = event.target;
        var type = SoundManager._bgSoundChannelList.getKey(channel);
        channel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
        if (type) {
            this._lastBgSound = SoundManager._bgSoundList.getValue(type);
            this._lastBgSoundChannel = this._lastBgSound.play(0, SoundManager._playTimes);
            this._lastBgSoundChannel.volume = SoundManager.bgVolume;
            this._lastBgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
            SoundManager._bgSoundChannelList.add(SoundManager._currentSceneType, this._lastBgSoundChannel);
            SoundManager._bgSoundList.add(SoundManager._currentSceneType, this._lastBgSound);
            channel = null;
        }
    };
    /**
     * 停止背景音乐
     */
    SoundManager.stopBgMusic = function () {
        if (SoundManager._lastBgSoundChannel) {
            SoundManager._lastBgSoundChannel.stop();
        }
    };
    /**
     * 播放音效
     */
    SoundManager.playEffect = function (sex, action, pai) {
        if (!SoundManager.effectEnabled) {
            return;
        }
        if (!SoundManager._effectSoundList) {
            SoundManager._effectSoundList = new Dictionary();
        }
        if (!sex) {
            sex = Sex.Male;
        }
        var resUrl = MusicDefined.GetInstance().getSexMusicDefinition(sex, action, pai);
        if (resUrl) {
            var key = void 0;
            if (pai != undefined) {
                key = sex.toString() + action + pai.toString() + resUrl;
            }
            else {
                key = sex.toString() + action + resUrl;
            }
            var sound = SoundManager._effectSoundList.getValue(key);
            if (sound && sound.length > 0) {
                var channel = sound.play(0, 1);
                channel.volume = SoundManager.effectVolume;
            }
            else {
                if (!sound) {
                    sound = new egret.Sound();
                    SoundManager._effectSoundList.add(key, sound);
                }
                sound.addEventListener(egret.Event.COMPLETE, SoundManager.onEffectSoundLoadComplete, this);
                var url = PathName.Sound + resUrl + ResSuffixName.Mp3Suffix;
                sound.load(RES.getVersionController().getVirtualUrl(url));
            }
        }
    };
    /**
     * 音效加载完毕
     */
    SoundManager.onEffectSoundLoadComplete = function (event) {
        var sound = event.target;
        sound.removeEventListener(egret.Event.COMPLETE, SoundManager.onEffectSoundLoadComplete, this);
        var channel = sound.play(0, 1);
        channel.volume = SoundManager.effectVolume;
    };
    /**
     * 播放按钮音效
     */
    SoundManager.playButtonEffect = function (target) {
        if (target instanceof eui.Button) {
            SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
        }
    };
    SoundManager._playTimes = 1;
    SoundManager._lastPos = 0;
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map