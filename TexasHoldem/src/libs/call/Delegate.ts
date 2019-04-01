/**
 * 委托
 */
class Delegate
{
	private _method: Function;
	public get method()
	{
		return this._method;
	}
	private _target: any;
	public get target()
	{
		return this._target;
	}
	
	public constructor(method: Function, target: any)
	{
		this._method = method;
		this._target = target;
	}
	/**
	 * 是否相等
	 */
	public equals(obj:Delegate)
	{
		if(obj != null)
		{
			if(this._method == obj._method && this._target == obj._target)
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 是否相等
	 */
	public equals2(method: Function, target: any)
	{
		if(this._method == method && this._target == target)
		{
			return true;
		}
		return false;
	}
	public invoke(params?: any)
	{
		FuncUtil.invoke(this._method, this._target, params);
	}
}