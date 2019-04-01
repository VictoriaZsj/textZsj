/**
 * 消息操作
 */
enum SpRpcOp
{
	None = 0,
	Request = 1,
	Response = 2,
	Unknown = 4,
}
/**
 * 通信消息返回
 */
class SpRpcResult
{
	public op: SpRpcOp;
	/**
	 * 命令ID
	 */
	public cmdId: string;
	/**
	 * 会话标示
	 */
	public session: number;
	/**
	 * 返回数据
	 */
	public data: any;
	/**
	 * 错误码 为0 则是正常返回
	 */
	public error: number;
}