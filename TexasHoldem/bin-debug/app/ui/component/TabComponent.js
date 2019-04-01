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
 * 带有选项组件
 */
var TabComponent = (function (_super) {
    __extends(TabComponent, _super);
    function TabComponent() {
        var _this = _super.call(this) || this;
        /**
         * 是否开启缓动
         */
        _this.isTween = true;
        return _this;
    }
    TabComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.viewStack = new eui.ViewStack();
        this.tabBar = new eui.TabBar();
        this.tabBar.horizontalCenter = 0;
        this.viewStack.horizontalCenter = 0;
        this.disableTabIndex = -1;
        this.disableTabDes = "";
        this.enterTabindex = -1;
    };
    TabComponent.prototype.init = function (data, appendData) {
        this.bindData = data;
        if (appendData) {
            if (appendData.tabSkinName) {
                this.tabSkinName = appendData.tabSkinName;
            }
            if (appendData.enterTabindex != undefined) {
                this.enterTabindex = appendData.enterTabindex;
            }
        }
    };
    TabComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
        if (!this.bindData) {
            console.log("传入数据为空");
            return;
        }
        if (typeof this.bindData[0] == 'string' && this.bindData[0].constructor == String) {
            var array = new eui.ArrayCollection(this.bindData);
            this.tabBar.dataProvider = array;
        }
        else if (this.bindData[0] instanceof eui.Group) {
            for (var i = 0; i < this.bindData.length; i++) {
                this.viewStack.addChild(this.bindData[i]);
            }
            this.tabBar.dataProvider = this.viewStack;
            if (this.enterTabindex != -1) {
                this.viewStack.selectedIndex = this.enterTabindex;
            }
            this.addChild(this.viewStack);
        }
        else {
            console.log("传入类型错误");
            return;
        }
        this.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        if (this.tabSkinName) {
            this.tabBar.itemRendererSkinName = this.tabSkinName;
        }
        else {
            this.tabBar.itemRendererSkinName = UIComponentSkinName.ButtonSkin2;
        }
        if (this.enterTabindex != -1) {
            this.tabBar.selectedIndex = this.enterTabindex;
        }
        this.addChild(this.tabBar);
    };
    TabComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        if (this.isTween) {
            this.setEnterAnime();
        }
        this.tabBar.addEventListener(egret.Event.CHANGING, this.disableChanging, this);
    };
    TabComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.tabBar.removeEventListener(egret.Event.CHANGING, this.disableChanging, this);
        this.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
    };
    TabComponent.prototype.onBarItemTap = function (event) {
        SoundManager.playEffect(Sex.Male, MusicAction.buttonClick);
    };
    /**
     * 设置选中某个选项
     */
    TabComponent.prototype.setSelectIndex = function (index) {
        this.tabBar.selectedIndex = index;
        this.viewStack.selectedIndex = index;
    };
    /**
     * 禁用某个选项卡
     */
    TabComponent.prototype.setDisableTabIndex = function (index) {
        this.disableTabIndex = index;
    };
    TabComponent.prototype.disableChanging = function (event) {
        if (this.tabBar.selectedIndex == this.disableTabIndex) {
            event.preventDefault();
            AlertManager.showAlertByString(this.disableTabDes);
        }
    };
    TabComponent.prototype.setEnterTabGroup = function (item) {
        if (!this.bindData) {
            console.log("传入数据为空");
            return;
        }
        for (var i = 0; i < this.bindData.length; i++) {
            if (this.bindData[i] == item) {
                this.enterTabindex = i;
            }
        }
    };
    TabComponent.prototype.setEnterAnime = function () {
        egret.Tween.removeTweens(this.tabBar);
        egret.Tween.removeTweens(this.viewStack);
        this.tabBar.scaleX = 0;
        this.tabBar.scaleY = 0;
        egret.Tween.get(this.tabBar).wait(100).to({ scaleX: 1, scaleY: 1 }, 200);
        this.viewStack.y = 1280;
        egret.Tween.get(this.viewStack).wait(200).to({ y: this.tabBar.y - 100 }, 250);
    };
    return TabComponent;
}(BaseComponent));
__reflect(TabComponent.prototype, "TabComponent");
//# sourceMappingURL=TabComponent.js.map