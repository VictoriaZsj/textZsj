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
 * 创建房间游戏renderer
 */
var CreateRoomPanelItemRenderer = (function (_super) {
    __extends(CreateRoomPanelItemRenderer, _super);
    function CreateRoomPanelItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.CreateRoomPanelRenderer;
        return _this;
    }
    CreateRoomPanelItemRenderer.prototype.createChildren = function () {
        this.dataChanged();
    };
    CreateRoomPanelItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            this.radioBtn1.label = this.data.des;
            this.radioBtn1.groupName = this.data.groupName;
            this.costImg.visible = this.costLabel.visible = this.data.isRound;
            if (this.costLabel.visible) {
                this.costLabel.text = "房卡(     x" + (this.data.num / 8).toString() + ")";
                var label = this.radioBtn1.labelDisplay;
            }
        }
    };
    return CreateRoomPanelItemRenderer;
}(BaseItemRenderer));
__reflect(CreateRoomPanelItemRenderer.prototype, "CreateRoomPanelItemRenderer");
//# sourceMappingURL=CreateRoomPanelItemRenderer.js.map