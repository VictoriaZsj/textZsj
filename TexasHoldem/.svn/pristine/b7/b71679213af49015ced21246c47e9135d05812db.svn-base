/**
 * 正在录音面板
 */
class AudioRecordingPanel extends BasePanel
{
    public play: egret.tween.TweenGroup;

    private _voice: eui.Image;
    public constructor()
    {
        super();
        this.setGrayMask(false);
        this.skinName = UISkinName.AudioRecordingPanel;
    }

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }
    private ShowValue()
    {
        this.play.play();
    }

    public init(appendData: any)
    {
        super.init(appendData);
        let isStop: boolean = appendData;
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.ShowValue();
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.play.pause();
        RecordAudioManager.ClearData();
    }
}