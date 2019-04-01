/**
 * 字符串工具
 */
class StringUtil 
{
	public static toBoolean(str:string):boolean
	{
		if(StringUtil.isNullOrEmpty(str))
		{
			return false;
		}
		if(str == '0' || str == 'false')
		{
			return false;
		}
		return true;
	}
	/**
	 * 是否是undefined null ""
	 */
	public static isNullOrEmpty(str: string): boolean
	{
		if (str === undefined || str === null || str === "")
		{
			return true;
		}
		return false;
	}
	/**
	 * 是否是undefined null(不包括空字符串)
	 */
	public static isNull(str: string): boolean
	{
		if (str === undefined || str === null)
		{
			return true;
		}
		return false;
	}
	/**
	 * 格式化
	 */
	public static format(str: string, ...args): string
	{
		if (args && str)
		{
			for (let i: number = 0; i < args.length; i++)
			{
				str = str.replace("{" + i.toString() + "}", args[i])
			}
		}
		return str;
	}
	/**
	 * 字符串转换成int数组
	 */
	public static toIntArray(content: string, separator: string = ','): Array<number>
	{
		let stringList: Array<string> = StringUtil.toStringArray(content, separator);
		if (stringList == null)
		{
			return null;
		}
		let list: Array<number> = new Array<number>(stringList.length);
		let str: string;
		for (let i: number = 0; i < stringList.length; i++)
		{
			str = stringList[i];
			list[i] = str ? parseInt(str) : 0;
		}
		return list;
	}
	/**
	 * 字符串转换成float数组
	 */
	public static toFloatArray(content: string, separator: string = ','): Array<number>
	{
		let stringList: Array<string> = StringUtil.toStringArray(content, separator);
		if (stringList == null)
		{
			return null;
		}
		let list: Array<number> = new Array<number>(stringList.length);
		let str: string;
		for (let i: number = 0; i < stringList.length; i++)
		{
			list[i] = str ? parseFloat(str) : 0;
		}
		return list;
	}
	/**
	 * 字符串转换成字符数组
	 */
	public static toStringArray(content: string, separator: string = ','): Array<string>
	{
		if (!content)
		{
			return null;
		}
		return content.split(separator);
	}
}

