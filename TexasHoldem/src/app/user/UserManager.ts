/**
 * 用户信息管理
 */
class UserManager
{
	/**
	 * 玩家资料
	 */
	public static userInfo: UserInfo;
	/**
	 * 其他用户资料缓存
	 */
	public static otherUserInfo: UserInfo;
	/**
	 * 服务器信息
	 */
	public static serverInfo: ServerInfo;
	/**
     * 等级升级事件
     */
	public static levelUpgrade: DelegateDispatcher = new DelegateDispatcher();
	/**
	 * 资产变更事件
	 */
	public static propertyChangeEvent: DelegateDispatcher = new DelegateDispatcher();

	/**
 	* 创建角色成功事件/修改昵称事件
	*/
	public static onCreateRoleEvent: DelegateDispatcher = new DelegateDispatcher();
	/**
	 * 重新登录
	 */
	public static reLogin()
	{
		UserManager.userInfo = null;
		//ArrayUtil.Clear(UserManager.achievementInfoList);
		UserManager.otherUserInfoClear();
	}
	private static otherUserInfoClear()
	{
		if (UserManager.otherUserInfo)
		{
			UserManager.otherUserInfo.reset();
		}
	}
	public static initialize(roleId: number, data: any)
	{
		UserManager.otherUserInfoClear();
		UserManager.userInfo = new UserInfo();

		if (ChannelManager.loginType == ChannelLoginType.Weixin)
		{
			let name: string = undefined;
			if (LoginManager.loginInfo.channeldata.hasOwnProperty("name"))
			{
				name = LoginManager.loginInfo.channeldata["name"];
			}
			let head: string = undefined;
			if (LoginManager.loginInfo.channeldata.hasOwnProperty("head"))
			{
				head = LoginManager.loginInfo.channeldata["head"];
			}
			let sex: number = Sex.Male;
			if (LoginManager.loginInfo.channeldata.hasOwnProperty("sex"))
			{
				sex = parseInt(LoginManager.loginInfo.channeldata["sex"]);
			}
			if ((name !== null && name !== undefined && UserManager.userInfo.name != name) ||
				(head !== null && head !== undefined && UserManager.userInfo.head != head) || (UserManager.userInfo.sex != sex))
			{
				UserManager.reqSetUserInfo(null, sex, null);
			}
		}
		UserManager.userInfo.copyValueFrom(data);
		UserManager.playerNameOper(UserManager.userInfo);
		SocketManager.AddCommandListener(Command.Role_Push_ExpChange_2028, UserManager.onExpChangeResult, this);
		SocketManager.AddCommandListener(Command.Role_Push_PropertyChange_2000, UserManager.onPropetyChangeHandler, this);
	}
	/**
	 * 用户经验更改
	 */
	public static onExpChangeResult(result: SpRpcResult)
	{
		if (result.data)
		{
			if (UserManager.userInfo.level < ExpDefined.GetInstance().dataList[ExpDefined.GetInstance().dataList.length - 1].level && UserManager.userInfo.level != result.data["level"])
			{
				UserManager.userInfo.level = result.data["level"];
				UserManager.levelUpgrade.dispatch();
			}
			UserManager.userInfo.exp = result.data["exp"];
		}
	}
	public static onPropetyChangeHandler(result: SpRpcResult)
	{
		if (result.data && UserManager.userInfo)
		{
			UserManager.setNumProperty("gold", result.data);
			UserManager.setNumProperty("diamond", result.data);
			UserManager.setNumProperty("safeGold", result.data);
			UserManager.propertyChangeEvent.dispatch();
		}
	}
	/**
	 * 仅限于number类型
	 */
	private static setNumProperty(name: string, source: any)
	{
		if (source[name])
		{
			UserManager.userInfo[name] = source[name];
		}
		else
		{
			UserManager.userInfo[name] = 0;
		}
	}
	public static reqGetOtherUserInfo(roleId: number, flag?: number)
	{
		let callback: Function = function (result: SpRpcResult)
		{
			if (!UserManager.otherUserInfo)
			{
				UserManager.otherUserInfo = new UserInfo();
			}
			if (result.data)
			{
				UserManager.playerNameOper(result.data);
				UserManager.otherUserInfo.copyValueFrom(result.data);
				AchievementManager.setAllAchieveList(UserManager.otherUserInfo, result);
				if (flag == FriendUIType.FriendList || flag == FriendUIType.GiftList)
				{
					FriendManager.getUserInfoResult(result, flag);
				}
				else
				{
					UserManager.otherUserInfo.vipType = VipManager.getVipType(UserManager.otherUserInfo.vipTime, UserManager.otherUserInfo.yearVipTime);
					UserManager.otherUserInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.otherUserInfo.vipType).speed;
					UserManager.getOtherUserInfoEa.dispatch();
				}

			}
		}
		UserManager.sendGetUserInfo(roleId, callback, null);
	}
	public static reqShowOtherUserInfoPanel(roleId: number)
	{
		let callback: Function = function (result: SpRpcResult)
		{
			if (!UserManager.otherUserInfo)
			{
				UserManager.otherUserInfo = new UserInfo();
			}
			if (result.data)
			{
				UserManager.playerNameOper(result.data);
				UserManager.otherUserInfo.copyValueFrom(result.data);
				AchievementManager.setAllAchieveList(UserManager.otherUserInfo, result);
				UserManager.otherUserInfo.vipType = VipManager.getVipType(UserManager.otherUserInfo.vipTime, UserManager.otherUserInfo.yearVipTime);
				UserManager.otherUserInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.otherUserInfo.vipType).speed;
				UserManager.getOtherUserInfoEa.dispatch();
			}
			if (FriendManager.isFriend(UserManager.otherUserInfo.roleId))
			{
				UIManager.showPanel(UIModuleName.UserInfoPanel);
			}
			else
			{
				UIManager.showPanel(UIModuleName.UserInfoPanel, { type: FriendInfoType.Send });
			}
		}
		UserManager.sendGetUserInfo(roleId, callback);
	}

	/**
	 * 获取其他用户信息
	 */
	public static sendGetUserInfo(roleId: number, callback: Function, errorCallBack?: Function)
	{
		SocketManager.call(Command.Friend_GetRoleInfo_3023, { "roleId": roleId }, callback, errorCallBack, this);
	}

	/**
	 * 发送创建角色信息请求
	*/
	public static reqCreateRole(name: string, sex: number)
	{
		let callback: Function = function (result: SpRpcResult)
		{
			if (name != null)
			{
				UserManager.userInfo.name = name;
			}
			if (sex != null)
			{
				UserManager.userInfo.sex = sex;
			}
			UserManager.onCreateRoleEvent.dispatch();
		};
		let obj: Object = {};
		if (name != null)
		{
			obj["name"] = name;
		}
		if (sex != null)
		{
			obj["sex"] = sex;
		}
		SocketManager.call(Command.Role_Create_3012, obj, callback, null, this);
	}

	/**
	 * 设置昵称
	 */
	public static editUserName(name: string)
	{
		UserManager.reqCreateRole(name, null);
	}
	/**
	 * 设置用户基础信息
	 */
	public static reqSetUserInfo(sign: string, sex: number, age: number)
	{
		let callBack: Function = function (result: SpRpcResult)
		{
			if (obj["sign"] != null)
			{
				UserManager.userInfo.sign = obj["sign"];
			}
			if (obj["sex"] != null)
			{
				UserManager.userInfo.sex = obj["sex"];
			}
			if (obj["age"] != null)
			{
				UserManager.userInfo.age = obj["age"];
			}
			UserManager.playerNameOper(UserManager.userInfo);
			UserManager.onSetUserInfoComplete.dispatch();
		};
		let obj: Object = {};
		if (sign != null)
		{
			obj["sign"] = sign;
		}
		if (sex != null)
		{
			obj["sex"] = sex;
		}
		if (age != null)
		{
			obj["age"] = age;
		}
		SocketManager.call(Command.Role_SetInfo_3609, obj, callBack, null, this);
	}
	public static playerNameOper(pInfo: Object, propertyName: string = "name", propertyId: string = "roleId")
	{
		if (pInfo && pInfo.hasOwnProperty(propertyId))
		{
			let tmpObj: any = pInfo;
			let pre: string = StringConstant.empty;
			if (ChannelManager.loginType == ChannelLoginType.Guest && tmpObj[propertyName] != "游客")
			{
				pre = "游客";
			}
			if (!tmpObj[propertyName])
			{
				tmpObj[propertyName] = pre + "";
			}
			else
			{
				tmpObj[propertyName] = pre + tmpObj[propertyName];
			}
		}
	}
	//---------------------------------------------
	// event
	//---------------------------------------------
	/**
	 * 拉取用户信息事件
	 */
	public static getOtherUserInfoEa: DelegateDispatcher = new DelegateDispatcher();
	/**
	 * 设置用户信息完毕
	 */
	public static onSetUserInfoComplete: DelegateDispatcher = new DelegateDispatcher();
}