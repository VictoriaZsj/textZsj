/**
 * 声音音效管理
 */
class SoundManager
{
	/**
 	* 是否播放背景音乐
 	*/
	private static _bgEnabled: boolean;
	public static get bgEnabled(): boolean
	{
		if (SoundManager._bgEnabled != undefined)
		{
			return SoundManager._bgEnabled;
		}
		return PrefsManager.getBoolean(PrefsManager.Sound_Bg_Enable);
	}
	/**
	 * 是否播放背景音乐
	 */
	public static set bgEnabled(value: boolean)
	{
		SoundManager._bgEnabled = value;
		PrefsManager.setBoolean(PrefsManager.Sound_Bg_Enable, value);
		if (value)
		{
			SoundManager.playBgMusic(SoundManager._currentSceneType);
		}
		else
		{
			SoundManager.stopBgMusic();
		}
	}
	/**
	 * 是否播放音效
	 */
	private static _effectEnabled: boolean;
	public static get effectEnabled(): boolean
	{
		if (SoundManager._effectEnabled != undefined)
		{
			return SoundManager._effectEnabled;
		}
		return PrefsManager.getBoolean(PrefsManager.Sound_Effect_Enable);
	}
	/**
	 * 音效值
	 */
	public static set effectEnabled(value: boolean)
	{
		SoundManager._effectEnabled = value;
	}

	/**
	 * 背景音乐声音值
	 */
	private static _bgVolume: number;
	public static get bgVolume(): number
	{
		if (SoundManager._bgVolume != undefined)
		{
			return SoundManager._bgVolume;
		}
		return PrefsManager.getNumber(PrefsManager.Sound_Bg_Volume, 0.7);
	}
	/**
	 * 音效值
	 */
	public static set bgVolume(value: number)
	{
		SoundManager._bgVolume = value;
	}

	private static _effectVolume: number;
	public static get effectVolume(): number
	{
		if (SoundManager._effectVolume != undefined)
		{
			return SoundManager._effectVolume;
		}
		return PrefsManager.getNumber(PrefsManager.Sound_Effect_Volume, 1);
	}
	/**
 	 * 音效值
     */
	public static set effectVolume(value: number)
	{
		SoundManager._effectVolume = value;
	}

	private static _bgSoundChannelList: Dictionary<SceneType, egret.SoundChannel>;
	private static _lastBgSoundChannel: egret.SoundChannel;
	private static _lastBgSound: egret.Sound;
	private static _playTimes: number = 1;

	private static _bgSoundList: Dictionary<SceneType, egret.Sound>;
	/**
	 * 音效列表
	 */
	private static _effectSoundList: Dictionary<string, egret.Sound>;
	/**
	 * 播放背景音乐
	 */
	public static playBgMusic(type: SceneType)
	{
		SoundManager._currentSceneType = type;
		if (!SoundManager.bgEnabled)
		{
			return;
		}
		SoundManager._lastPos = 0;
		if (!SoundManager._bgSoundList)
		{
			SoundManager._bgSoundList = new Dictionary<SceneType, egret.Sound>();
		}
		if (!SoundManager._bgSoundChannelList)
		{
			SoundManager._bgSoundChannelList = new Dictionary<SceneType, egret.SoundChannel>();
		}
		if (type == SceneType.Login)
		{
			type = SceneType.Hall;
		}
		if (SoundManager._lastBgSoundChannel)
		{
			SoundManager._lastBgSoundChannel.stop();
		}
		let soundChannel: egret.SoundChannel = SoundManager._bgSoundChannelList.getValue(type);
		let sound: egret.Sound = SoundManager._bgSoundList.getValue(type);
		if (sound && sound.length > 0)
		{
			soundChannel = sound.play(0, SoundManager._playTimes);
			soundChannel.volume = SoundManager.bgVolume;
			soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
		}
		else
		{
			if (!sound)
			{
				sound = new egret.Sound();
				SoundManager._bgSoundList.add(type, sound);
			}
			sound.addEventListener(egret.Event.COMPLETE, SoundManager.onSoundLoadComplete, this);
			let url: string = PathName.Sound + MusicResEnum.getBgSoundRes(type) + ResSuffixName.Mp3Suffix;
			sound.load(RES.getVersionController().getVirtualUrl(url));
		}
		SoundManager._lastBgSound = sound;
		SoundManager._lastBgSoundChannel = soundChannel;
		SoundManager._bgSoundChannelList.add(type, soundChannel);
		SoundManager._bgSoundList.add(type, sound);
	}
	public static changeBgMusic(volume: number)
	{
		if (this._lastBgSoundChannel && volume != undefined && SoundManager.bgEnabled)
		{
			this._lastBgSoundChannel.volume = volume;
		}
	}
	private static _lastPos: number = 0;
	private static _currentSceneType: SceneType;
	public static bgMusicOpen(type: SceneType)
	{
		SoundManager._currentSceneType = type;
		if (this._lastBgSoundChannel && this._lastBgSound)
		{
			if (!SoundManager._bgEnabled)
			{
				SoundManager._lastPos = this._lastBgSoundChannel.position;
			}
			this._lastBgSoundChannel.stop();
			this._lastBgSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
			if (SoundManager._bgEnabled)
			{
				this._lastBgSoundChannel = this._lastBgSound.play(SoundManager._lastPos, this._playTimes);
				this._lastBgSoundChannel.volume = SoundManager.bgVolume;
				this._lastBgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
				SoundManager._bgSoundChannelList.add(SoundManager._currentSceneType, this._lastBgSoundChannel);
				SoundManager._bgSoundList.add(SoundManager._currentSceneType, this._lastBgSound);
			}
		}
		else
		{
			if (SoundManager._bgEnabled)
			{
				SoundManager.playBgMusic(SoundManager._currentSceneType);
			}
		}
	}
	private static onSoundLoadComplete(event: egret.Event)
	{
		//获取加载到的 Sound 对象
		var sound: egret.Sound = event.target as egret.Sound;
		sound.removeEventListener(egret.Event.COMPLETE, SoundManager.onSoundLoadComplete, this);
		let type: SceneType = SoundManager._bgSoundList.getKey(sound);
		if (type)
		{
			//播放音乐
			var channel: egret.SoundChannel = sound.play(0, SoundManager._playTimes);
			channel.volume = SoundManager.bgVolume;
			SoundManager._bgSoundChannelList.add(type, channel);
			channel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
			SoundManager._lastBgSoundChannel = channel;
			SoundManager._lastBgSound = sound;
		}
	}
	private static onSoundPlayComplete(event: egret.Event)
	{
		let channel: egret.SoundChannel = event.target as egret.SoundChannel;
		let type: SceneType = SoundManager._bgSoundChannelList.getKey(channel);
		channel.removeEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
		if (type)
		{
			this._lastBgSound = SoundManager._bgSoundList.getValue(type);
			this._lastBgSoundChannel = this._lastBgSound.play(0, SoundManager._playTimes);
			this._lastBgSoundChannel.volume = SoundManager.bgVolume;
			this._lastBgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, SoundManager.onSoundPlayComplete, this);
			SoundManager._bgSoundChannelList.add(SoundManager._currentSceneType, this._lastBgSoundChannel);
			SoundManager._bgSoundList.add(SoundManager._currentSceneType, this._lastBgSound);
			channel = null;
		}
	}
	/**
	 * 停止背景音乐
	 */
	public static stopBgMusic()
	{
		if (SoundManager._lastBgSoundChannel)
		{
			SoundManager._lastBgSoundChannel.stop();
		}
	}
	/**
	 * 播放音效
	 */
	public static playEffect(sex: number, action: string, pai?: number)
	{
		if (!SoundManager.effectEnabled)
		{
			return;
		}
		if (!SoundManager._effectSoundList)
		{
			SoundManager._effectSoundList = new Dictionary<string, egret.Sound>();
		}
		if (!sex)
		{
			sex = Sex.Male;
		}
		let resUrl: string = MusicDefined.GetInstance().getSexMusicDefinition(sex, action, pai);
		if (resUrl)
		{
			let key: string;
			if (pai != undefined)
			{
				key = sex.toString() + action + pai.toString() + resUrl;
			}
			else
			{
				key = sex.toString() + action + resUrl;
			}
			let sound: egret.Sound = SoundManager._effectSoundList.getValue(key);
			if (sound && sound.length > 0)
			{
				let channel: egret.SoundChannel = sound.play(0, 1);
				channel.volume = SoundManager.effectVolume;
			}
			else
			{
				if (!sound)
				{
					sound = new egret.Sound();
					SoundManager._effectSoundList.add(key, sound);
				}
				sound.addEventListener(egret.Event.COMPLETE, SoundManager.onEffectSoundLoadComplete, this);
				let url: string = PathName.Sound + resUrl + ResSuffixName.Mp3Suffix;
				sound.load(RES.getVersionController().getVirtualUrl(url));
			}
		}
	}
	/**
	 * 音效加载完毕
	 */
	private static onEffectSoundLoadComplete(event: egret.Event)
	{
		let sound: egret.Sound = event.target as egret.Sound;
		sound.removeEventListener(egret.Event.COMPLETE, SoundManager.onEffectSoundLoadComplete, this);
		let channel: egret.SoundChannel = sound.play(0, 1);
		channel.volume = SoundManager.effectVolume;
	}
	/**
	 * 播放按钮音效
	 */
	public static playButtonEffect(target: any)
	{
		if (target instanceof eui.Button) //播放按钮音效
		{
			SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
		}
	}
}