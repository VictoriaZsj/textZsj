/**
 * 与服务器通信的数据体 注：类里面定义的属性字段需要和 协议工具平台一致;继承此类的对象，不要写协议对象里面没有属性的寄存器，因为寄存器会被拷贝覆盖掉
 */
abstract class BaseServerValueInfo
{
	constructor(data?: any)
	{
		this.reset();
		if (data)
		{
			this.copyValueFrom(data);
		}
	}
	abstract reset();
	/**
	 * 注：此拷贝方法，很简单，仅为一维拷贝，会将原对象的强类型对象属性，变为动态对象类型属性，如：对象里面有指定对象的属性 拷贝之后对象属性的类型为Object
	 */
	public copyValueFrom(data: any)
	{
		if (data)
		{
			for (let key in data)
			{
				let property: any = this[key];
				if (!(property instanceof Function)) //函数属性不拷贝
				{
					if (data[key] == undefined)
					{
						switch (typeof this[key])
						{
							case "number":
								data[key] = 0;
								break;
							case "string":
								data[key] = StringConstant.empty;
								break;
						}
					}
					else
					{
						this[key] = data[key];
					}
				}
			}
		}
	}

	/**
	 * 根据所需要的属性拷贝
	 */
	public copyValueFromThis(data: any)
	{
		if (data)
		{
			for (let key in this)
			{
				let property: any = data[key];
				if (!(property instanceof Function)) //函数属性不拷贝
				{
					this[key] = data[key];
				}
			}
		}
	}
}