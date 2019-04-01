/**
 * 基础场景
 */
abstract class BaseScene 
{
    abstract clear();
    public isResLoaded: boolean;
    public resGroupName;
    public initialize()
    {
        this.clear();
        if (this.resGroupName != undefined && !this.isResLoaded)
        {
            SceneManager.showSwitchPanel();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(this.resGroupName);
        }
        else
        {
            this.onResourceLoadComplete();
        }
    }
    protected onResourceLoadComplete(): void
    {
        this.isResLoaded = true;
        SceneManager.closeSwitchPanel()
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    }
    protected onResourceProgress(event: RES.ResourceEvent)
    {
        console.log("场景资源加载地址：" + event.resItem.url);
        SceneManager.updateSwitchProgress(event.itemsLoaded / event.itemsTotal);
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void
    {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void
    {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
}

