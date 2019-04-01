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
 * 游戏面板共用组件
 */
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onAwake, _this);
        _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onEnable, _this);
        _this.skinName = "";
        return _this;
    }
    BaseComponent.prototype.init = function (data) {
        this.bindData = data;
    };
    /**
     * 皮肤文件加载完成时调用，仅面板初始化调用一次
     * */
    BaseComponent.prototype.onAwake = function (event) {
        this.isLoadComplete = true;
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
    };
    BaseComponent.prototype.onEnable = function (event) {
        this.addEventListener(egret.Event.RENDER, this.rendererStart, this);
        this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    /**
     * 如果没有必要，面板的所有事件移除需写在此方法内
     */
    BaseComponent.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
        this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    /**
     * 渲染开始 侦听到此事件时，可以对可视列表里面的任意元素进行操作 可在此方法内做刷新UI的操作
     */
    BaseComponent.prototype.rendererStart = function (event) {
        this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
    };
    BaseComponent.prototype.destroy = function () {
        this.onDisable(null);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onAwake, this);
        this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onEnable, this);
    };
    return BaseComponent;
}(eui.Component));
__reflect(BaseComponent.prototype, "BaseComponent");
//# sourceMappingURL=BaseComponent.js.map