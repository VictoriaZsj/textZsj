/**
 * 本地存储管理
 */
class PrefsManager
{
	public static Login_Account: string = "login_account";
	public static Login_Password: string = "login_password";
	public static Login_Token: string = "login_token";
	public static Login_LoginType: string = "login_loginType";
	public static Sound_Bg_Volume: string = "sound_bg_volume";
	public static Sound_Bg_Enable: string = "sound_bg_enable";
	public static Sound_Effect_Volume: string = "sound_effect_volume";
	public static Sound_Effect_Enable: string = "sound_effect_enable";
	public static Shake_Enable:string="shake_enable";

	public static SetAccountPassword(account: string, pwd: string)
	{
		PrefsManager.setValue(PrefsManager.Login_Account, account);
		PrefsManager.setValue(PrefsManager.Login_Password, pwd);
	}
	public static setValue(key: string, value: string, isPrivate: boolean = false)
	{
		if (isPrivate)
		{
			egret.localStorage.setItem(PrefsManager.getUserId() + key, value);
		}
		else
		{
			egret.localStorage.setItem(key, value);
		}
	}
	public static getValue(key: string, isPrivate: boolean = false): string
	{
		if (isPrivate)
		{
			return egret.localStorage.getItem(PrefsManager.getUserId() + key);
		}
		else
		{
			return egret.localStorage.getItem(key);
		}
	}
	public static setBoolean(key: string, value: boolean, isPrivate: boolean = false)
	{
		PrefsManager.setValue(key, value.toString(), isPrivate);
	}
	public static getBoolean(key: string, defaultValue:boolean = false, isPrivate: boolean = false): boolean
	{
		let value: string = PrefsManager.getValue(key, isPrivate);
		if(StringUtil.isNullOrEmpty(value))
		{
			return defaultValue;
		}
		return StringUtil.toBoolean(value);
	}
	public static setNumber(key: string, value: number, isPrivate: boolean = false)
	{
		PrefsManager.setValue(key, value.toString(), isPrivate);
	}
	public static getNumber(key: string, defaultValue:number = 0, isPrivate: boolean = false): number
	{
		let value: string = PrefsManager.getValue(key, isPrivate);
		if(StringUtil.isNullOrEmpty(value))
		{
			return defaultValue;
		}
		return parseFloat(value);
	}
	private static getUserId(): string
	{
		if (LoginManager.loginInfo)
		{
			return LoginManager.loginInfo.userid.toString();
		}
		return StringConstant.empty;
	}
}