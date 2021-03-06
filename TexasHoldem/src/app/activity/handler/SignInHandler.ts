/**
 * 签到管理
 */
class SignInHandler
{
    public  signInList:Array<SignInInfo> = new Array<SignInInfo>();
	public  lastTime:number;
	public  signInDayNum:number;
    public  isTodaySignIn:boolean=false;

	public  initialize(lastTime:number,signInDayNum:number)
	{
		this.lastTime=lastTime;
		this.signInDayNum=signInDayNum;
		let compareResult:boolean=this.compareDate();
		if(compareResult)
		{
			ActivityManager.signInHandler.isTodaySignIn=true;
		}
		let def: SignInInfo;
		for (let i: number = 0; i < SignInDefined.GetInstance().dataList.length; i++)
		{		
			def=new SignInInfo();	 
			def.id = SignInDefined.GetInstance().dataList[i].id;
			this.signInList.push(def); 
		};
		
	}
	public onEnable()
	{
		ArrayUtil.Clear(this.signInList);
	}

	public resetSignIn()
	{
		this.isTodaySignIn=false;
	}
	/**
	 * 日期比较
	*/
	public compareDate():boolean
	{
        let today:Date=new Date();
		let todayDate:string=DateTimeUtil.formatTimestamp(today.getTime(),DateTimeUtil.Format_Standard_Date);
		let lastTimeDate:string=DateTimeUtil.formatTimestamp(ActivityManager.signInHandler.lastTime,DateTimeUtil.Format_Standard_Date);
		let Date1=new Date(todayDate);
		let Date2=new Date(lastTimeDate);
		if(Date1.getTime()==Date2.getTime())
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

class SignInInfo 
{
	private _id: number = 0;
	public get id(): number
	{
		return this._id;
	}
	public set id(value: number)
	{
		this._id = value;
		this._definition = SignInDefined.GetInstance().getDefinition(value);
	}		
	private _definition: SignInDefinition
	public get definition(): SignInDefinition
	{
		return this._definition;
	}
}

enum SignInDay
{
	/**
	 * 签到3天
	*/
	signInThree=2,
	/**
	 * 签到5天
	*/
	signInFive=4,
	/**
	 * 签到7天
	*/
	signInSeven=6,
}
