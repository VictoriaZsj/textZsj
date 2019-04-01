/**
 *商城管理
 */
class ShoppingManager
{
    public static shoppingList:Array<ShoppingInfo> = new Array<ShoppingInfo>();
	public static goldList:Array<ShoppingInfo> = new Array<ShoppingInfo>();
	public static diamondList:Array<ShoppingInfo> = new Array<ShoppingInfo>();
	public static vipList:Array<ShoppingInfo>=new Array<ShoppingInfo>();
	public static buyOverAction: DelegateDispatcher = new DelegateDispatcher();
	public static awardGoldList:Array<AwardDefinition>=new Array<AwardDefinition>();
    
	public static initialize()
	{
		ArrayUtil.Clear(ShoppingManager.shoppingList);
		let def: ShoppingInfo;
		for (let i: number = 0; i < PayDefined.GetInstance().dataList.length; i++)
		{	
			def=new ShoppingInfo();	 	
			def.id = PayDefined.GetInstance().dataList[i].id;
			if (def.definition.type==ListType.Gold){
				ShoppingManager.goldList.push(def); 
			}
			else if(def.definition.type==ListType.Diamond)
			{
				ShoppingManager.diamondList.push(def);
			}
			else if(def.definition.type==ListType.Vip)
			{
				ShoppingManager.vipList.push(def);
			}	
		}
        let awardDef:AwardDefinition;
		for(let i:number=0;i<ShoppingManager.goldList.length;i++)
		{
			awardDef=AwardDefined.GetInstance().getAwardDefinition(ShoppingManager.goldList[i].definition.awardId);
			ShoppingManager.awardGoldList.push(awardDef);
		}
	}
	/**
	 * 向服务器抛送订单
	*/
	public static reqShopping(awardId:number)
	{
		let callBack:Function=function (result: SpRpcResult)
		{
			ShoppingManager.buyOverAction.dispatch();//协议发送后抛出买完事件
			let goSavePanel:Function=function()
			{
				UIManager.showPanel(UIModuleName.SafeBoxPanel);
			}
			if(awardId>100&&awardId<104)//如果购买的是VIP
			{
				if(!UserManager.userInfo.isSafePwd)
				{
				AlertManager.showAlert("您开通了VIP，保险箱以为您免费开放，请尽快设定您的保险箱密码!",goSavePanel)
				}
			}
		}
		//todo
		SocketManager.call(Command.Award_Exchange_3113, { "Id": awardId },callBack,null,this);
	}
	/**
	 * 情况列表
	*/
    public static clearList()
    {
        ArrayUtil.Clear(ShoppingManager.diamondList);
		ArrayUtil.Clear(ShoppingManager.goldList);
		ArrayUtil.Clear(ShoppingManager.vipList);
    }
}

class ShoppingInfo 
{
	private _id: number = 0;
	public get id(): number
	{
		return this._id;
	}
	public set id(value: number)
	{
		this._id = value;
		this._definition = PayDefined.GetInstance().getDefinition(value);
	}		
	private _definition: ShoppingDefinition
	public get definition(): ShoppingDefinition
	{
		return this._definition;
	}
	public set definition(value: ShoppingDefinition)
	{
		this._definition = value;
	}
}
