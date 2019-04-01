/**
 * 我的奖品管理
*/
class PrizeManager
{
    /**
     * 未领取的奖品列表
    */
    public static notReceiveList: Array<PrizeInfo>;
    /**
     * 已领取的奖品列表
    */
    public static hasReceiveList: Array<PrizeInfo>;
    /**
     * 用于奖品列表项的内容是已领取还是未领取的判断
    */
    public static renderFlag: number;

    /**
     * 发送获取奖品信息请求 
    */
    public static reqGetAwardList()
    {
        //todo 协议待添加
        SocketManager.call(Command.Friend_AddPlayer_3152,null,PrizeManager.getAwardListResponse,null,this);
    }
    /**
     * 获取奖品信息成功回调
    */
    public static getAwardListResponse(result: SpRpcResult)
    {
        if (result.data)
        {
            if (!PrizeManager.notReceiveList)
            {
                PrizeManager.notReceiveList = new Array<PrizeInfo>();
            }
            if (!PrizeManager.hasReceiveList)
            {
                PrizeManager.hasReceiveList = new Array<PrizeInfo>();
            }
            for (let def of result.data['awardList'])
            {
                let info: ItemDefinition = new ItemDefinition();
                info = ItemDefined.GetInstance().getItemDefinition(def.id);
                def.name = info.name;
                def.icon = info.icon;
                def.des = info.des;
                def.effectType = info.effectType;
                if (def.state == PrizeState.NotReceive)
                {
                    PrizeManager.notReceiveList.push(def);
                } else
                {
                    PrizeManager.hasReceiveList.push(def);
                }
            }
        }
        PrizeManager.onGetAwardListEvent.dispatch();
    }
    /**
     * 发送领取奖品请求
    */
    public static reqGetAward(id: number)
    {
        let callback: Function = function (result: SpRpcResult)
        {
            PrizeManager.onGetAwardEvent.dispatch(id);
        }
        //todo 协议待添加
        SocketManager.call(Command.Friend_AddPlayer_3152,null,callback,null,this);
    }
    /**
     * 发送保存领奖信息请求
    */
    public static reqSaveInfo(name: string, tel: number, qq: number, email: string, address: string)
    {
        //todo 协议待添加
        SocketManager.call(Command.Friend_AddPlayer_3152, { name: name, tel: tel, qq: qq, email: email, address: address },PrizeManager.saveInfoResponse,null,this);
    }
    /**
     * 保存领奖信息成功回调
    */
    public static saveInfoResponse(result: SpRpcResult)
    {
        AlertManager.showAlert("领奖信息保存成功");
    }

    /**
     * 获取奖品信息成功后发送的广播
    */
    public static onGetAwardListEvent: DelegateDispatcher = new DelegateDispatcher();
    /**
     * 领取奖品成功后发送的广播
    */
    public static onGetAwardEvent: DelegateDispatcher = new DelegateDispatcher();
}