/**
 * 字典数据结构类
 */
class Dictionary<KT, VT>
{
	private keys: KT[] = [];
	private values: VT[] = [];

	public get count(): number
	{
		return this.keys.length;
	}

	/**
	 * 添加
	 */
	public add(key: KT, value: VT): void
	{
		var index:number = this.keys.indexOf(key, 0);
		if(index >= 0)
		{
			this.values[index] = value;
		}
		else
		{
			this.keys.push(key);
			this.values.push(value);
		}
	}
	/**
	 * 移除
	 */
	public remove(key: KT)
	{
		var index:number = this.keys.indexOf(key, 0);
		if(index >= 0)
		{
			this.keys.splice(index, 1);
			this.values.splice(index, 1);
		}
	}
	/**
	 * 根据值获取KEY
	 */
	public getKey(value: VT): KT
	{
		let index: number = this.values.indexOf(value);
		if (index >= 0)
		{
			return this.keys[index];
		}
		return null;
	}
	/**
	 *开启"[]"访问的情况下，缓存与字典数据为同一份，引用数据会同时修改，
	 *非引用数据不能被修改，只能访问
	 */
	public getValue(key: KT): VT
	{
		var index:number = this.keys.indexOf(key, 0);
		if (index != -1)
		{
			return this.values[index];
		}
		return null;
	}
	public containsKey(key: KT): boolean
	{
		for (let i:number = 0, length:number = this.keys.length; i < length; ++i)
		{
			if (this.keys[i] === key)
			{
				return true;
			}
		}
		return false;
	}
	public containsValue(value: VT): boolean
	{
		for (let i:number = 0, length:number = this.values.length; i < length; ++i)
		{
			if (this.values[i] === value)
			{
				return true;
			}
		}
		return false;
	}
	public getKeys(): KT[]
	{
		return this.keys;
	}

	public getValues(): VT[]
	{
		return this.values;
	}
	public clear()
	{
		this.keys.length = 0;
		this.values.length = 0;
	}
}
