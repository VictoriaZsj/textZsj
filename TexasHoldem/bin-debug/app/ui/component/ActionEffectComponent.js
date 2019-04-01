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
 * 行为特效组件
 */
var ActionEffectComponent = (function (_super) {
    __extends(ActionEffectComponent, _super);
    function ActionEffectComponent() {
        var _this = _super.call(this) || this;
        _this.skinName = UIComponentSkinName.ActionEffectComponent;
        return _this;
    }
    ActionEffectComponent.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.effectTweenGroup.stop();
    };
    ActionEffectComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
        this.imgBg.alpha = 0;
        this.imgAction.alpha = 0;
        // this.imgAction.source = ImageSource.getActionEffectImgSource(this.bindData.actionType);
    };
    ActionEffectComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.imgAction.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.effectTweenGroup.addEventListener(egret.Event.COMPLETE, this.onTweenComplete, this);
    };
    ActionEffectComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.effectTweenGroup.removeEventListener(egret.Event.COMPLETE, this.onTweenComplete, this);
        this.imgAction.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
    };
    ActionEffectComponent.prototype.onComplete = function (event) {
        this.imgAction.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.effectTweenGroup.play();
    };
    ActionEffectComponent.prototype.onTweenComplete = function (event) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.destroy();
    };
    return ActionEffectComponent;
}(BaseComponent));
__reflect(ActionEffectComponent.prototype, "ActionEffectComponent");
//# sourceMappingURL=ActionEffectComponent.js.map