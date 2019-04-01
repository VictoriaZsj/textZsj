class PiaoHuaAnime 
 {     
    private piaoHuaList:Array<eui.Image>;
    private piaoHuaTween:Array<egret.Tween> = new Array<egret.Tween>();

    private startY:number = 0;
    private endY:number = 750;
    private maxX:number = 500;
    private timer:egret.Timer=new egret.Timer(2500); 
    private index:number;
    public constructor(array: Array<eui.Image>)
	{        
       this.piaoHuaList = array;
	}

    public StartTween()
    {
        this.index = 0;
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.SetTweenRandom,this); 
        //开始计时  
        this.timer.start(); 
    }

    private SetTweenRandom()
    {
        if(this.index == this.piaoHuaList.length)
        {
            this.timer.stop();
            return;
        }
        let image:eui.Image = this.piaoHuaList[this.index];
        this.index++;
        let tw = egret.Tween.get(image, {
            loop: true,//设置循环播放
        })
        image.x = Math.random()*(this.maxX/2)+(this.maxX/2);
        image.y = this.startY;
        tw.to({x:Math.random()*image.x/2,y:this.endY,rotation: Math.random()*360},10000)//设置等待1000毫秒
        tw.play(); 
        this.piaoHuaTween.push(tw);     
    }

    public PauseTween()
    {
         for(let i: number = 0; i < this.piaoHuaList.length; i++)
        {
            if (this.piaoHuaTween[i])
            {
                this.piaoHuaTween[i].pause();
            }
        }
    }
 }

class Anime
{
    private animeItem: any;
    private itemTween: egret.Tween;

    private isDelay: boolean;
    private delayTime: number;
    private timer: egret.Timer;

    public constructor(item: any)
    {
        this.animeItem = item;
    }

    public SetTween(prop: any, during: number, isLoop: boolean, delayTime?: number, finish?: Function)
    {
        let tw = egret.Tween.get(this.animeItem, { loop: isLoop });
        if (finish)
        {
            tw.to(prop, during).call(finish, this);
        }
        else
        {
            tw.to(prop, during);
        }
        this.itemTween = tw;
        if (delayTime)
        {
            this.isDelay = true;
            this.delayTime = delayTime;
        }
        else
        {
            this.isDelay = false;
        }
    }

    public PlayTween()
    {
        if (this.isDelay)
        {
            let timer: egret.Timer = new egret.Timer(this.delayTime);
            timer.addEventListener(egret.TimerEvent.TIMER, this.TweenDelay, this);//开始计时 
            this.timer = timer; 
            this.timer.start();  
        }
        else
        {
            this.itemTween.setPaused(false);
        }
    }

    public PauseTween()
    {
        this.itemTween.setPaused(true);
    }

    private TweenDelay()
    {
        this.timer.stop();
        this.itemTween.setPaused(false);
    }
}