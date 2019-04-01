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
/**
 *房间信息
*/
var RoomDefined = (function (_super) {
    __extends(RoomDefined, _super);
    function RoomDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomDefined.GetInstance = function () {
        if (!RoomDefined._instance) {
            RoomDefined._instance = new RoomDefined();
        }
        if (DefinedManager.IsParsed(RoomDefined.forbiddenConfig) == false) {
            RoomDefined._instance.initialize();
        }
        return RoomDefined._instance;
    };
    RoomDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(RoomDefined.forbiddenConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    RoomDefined.prototype.getBlindInfoById = function (id) {
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.id == id) {
                return def;
            }
        }
        return;
    };
    /**
     * 通过type获得数据
    */
    RoomDefined.prototype.getInfoByType = function (type) {
        if (this.dataList != null) {
            var infoList = new Array();
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.type == type) {
                    infoList.push(def);
                }
            }
            return infoList;
        }
        return;
    };
    RoomDefined.forbiddenConfig = "room";
    return RoomDefined;
}(BaseDefined));
__reflect(RoomDefined.prototype, "RoomDefined");
/**
* 盲注信息定义
*/
var RoomDefinition = (function () {
    function RoomDefinition() {
    }
    return RoomDefinition;
}());
__reflect(RoomDefinition.prototype, "RoomDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=RoomDefined.js.map