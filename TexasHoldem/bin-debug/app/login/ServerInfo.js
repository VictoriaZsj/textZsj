var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <summary>
/// 服务器信息
/// </summary>
var ServerInfo = (function (_super) {
    __extends(ServerInfo, _super);
    function ServerInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /// <summary>
        /// 当前服务器角色id，没有为0
        /// </summary>
        _this.roleId = 0;
        return _this;
    }
    Object.defineProperty(ServerInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInfo.prototype, "isCrowded", {
        /// <summary>
        /// 是否是拥挤
        /// </summary>
        get: function () {
            return this._count > ProjectDefined.GetInstance().getValue(ProjectDefined.serverCrowded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInfo.prototype, "count", {
        set: function (value) {
            this._count = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInfo.prototype, "isMaintain", {
        /// <summary>
        /// 是否在维护
        /// </summary>
        get: function () {
            return this._isMaintain;
        },
        enumerable: true,
        configurable: true
    });
    ServerInfo.prototype.reset = function () {
    };
    ServerInfo.CreateFromProto = function (data, refarea) {
        var info = new ServerInfo(data);
        var v = data["status"];
        if (v == 1) {
            info._isMaintain = true;
        }
        else {
            info._isMaintain = false;
        }
        // info._definition = ServerDefined.GetInstance().GetServerDefinition(info.id);
        // if (info._definition == null)
        // {
        // 	area++;
        // 	info._definition = new ServerDefinition();
        // 	info._definition.id = info.id;
        // 	info._definition.name = info.id.ToString();
        // 	info._definition.area = area;
        // 	info._definition.state = ServerState.Normal;
        // }
        return info;
    };
    return ServerInfo;
}(BaseServerValueInfo));
__reflect(ServerInfo.prototype, "ServerInfo");
//# sourceMappingURL=ServerInfo.js.map