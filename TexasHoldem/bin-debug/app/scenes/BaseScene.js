var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 基础场景
 */
var BaseScene = (function () {
    function BaseScene() {
    }
    BaseScene.prototype.initialize = function () {
        this.clear();
        if (this.resGroupName != undefined && !this.isResLoaded) {
            SceneManager.showSwitchPanel();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(this.resGroupName);
        }
        else {
            this.onResourceLoadComplete();
        }
    };
    BaseScene.prototype.onResourceLoadComplete = function () {
        this.isResLoaded = true;
        SceneManager.closeSwitchPanel();
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    };
    BaseScene.prototype.onResourceProgress = function (event) {
        console.log("场景资源加载地址：" + event.resItem.url);
        SceneManager.updateSwitchProgress(event.itemsLoaded / event.itemsTotal);
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    BaseScene.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    BaseScene.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    return BaseScene;
}());
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map