var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息操作
 */
var SpRpcOp;
(function (SpRpcOp) {
    SpRpcOp[SpRpcOp["None"] = 0] = "None";
    SpRpcOp[SpRpcOp["Request"] = 1] = "Request";
    SpRpcOp[SpRpcOp["Response"] = 2] = "Response";
    SpRpcOp[SpRpcOp["Unknown"] = 4] = "Unknown";
})(SpRpcOp || (SpRpcOp = {}));
/**
 * 通信消息返回
 */
var SpRpcResult = (function () {
    function SpRpcResult() {
    }
    return SpRpcResult;
}());
__reflect(SpRpcResult.prototype, "SpRpcResult");
//# sourceMappingURL=SpRpcResult.js.map