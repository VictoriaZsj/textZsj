/**
 * 赛事场房间信息
*/
class PlayingFieldRoomInfo extends BaseServerValueInfo
{
    /**
     * 模式
    */
    public pattern: number;
    /**
     * 房间Id
    */
    public id: number;
    /**
     * 房间类型Id
    */
    public roomId: number;
    /**
     * 房间玩家人数
    */
    public player: number;
    /**
     * 房间最大玩家人数
    */
    public maxPlayer: number;
    /**
     * 小盲
    */
    public smallBlind: number;
    /**
     * 大盲
    */
    public bigBlind: number;
    /**
     * 最小买入
    */
    public minBuy: number;
    /**
     * 最大买入
    */
    public maxBuy: number;
    /**
     * 税
    */
    public tax: number;
    /**
     * 房间类型
    */
    public type: number;

    public reset()
    {

    }
}