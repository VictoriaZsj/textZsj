var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PiaoHuaAnime = (function () {
    function PiaoHuaAnime(array) {
        this.piaoHuaTween = new Array();
        this.startY = 0;
        this.endY = 750;
        this.maxX = 500;
        this.timer = new egret.Timer(2500);
        this.piaoHuaList = array;
    }
    PiaoHuaAnime.prototype.StartTween = function () {
        this.index = 0;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.SetTweenRandom, this);
        //开始计时  
        this.timer.start();
    };
    PiaoHuaAnime.prototype.SetTweenRandom = function () {
        if (this.index == this.piaoHuaList.length) {
            this.timer.stop();
            return;
        }
        var image = this.piaoHuaList[this.index];
        this.index++;
        var tw = egret.Tween.get(image, {
            loop: true,
        });
        image.x = Math.random() * (this.maxX / 2) + (this.maxX / 2);
        image.y = this.startY;
        tw.to({ x: Math.random() * image.x / 2, y: this.endY, rotation: Math.random() * 360 }, 10000); //设置等待1000毫秒
        tw.play();
        this.piaoHuaTween.push(tw);
    };
    PiaoHuaAnime.prototype.PauseTween = function () {
        for (var i = 0; i < this.piaoHuaList.length; i++) {
            if (this.piaoHuaTween[i]) {
                this.piaoHuaTween[i].pause();
            }
        }
    };
    return PiaoHuaAnime;
}());
__reflect(PiaoHuaAnime.prototype, "PiaoHuaAnime");
var Anime = (function () {
    function Anime(item) {
        this.animeItem = item;
    }
    Anime.prototype.SetTween = function (prop, during, isLoop, delayTime, finish) {
        var tw = egret.Tween.get(this.animeItem, { loop: isLoop });
        if (finish) {
            tw.to(prop, during).call(finish, this);
        }
        else {
            tw.to(prop, during);
        }
        this.itemTween = tw;
        if (delayTime) {
            this.isDelay = true;
            this.delayTime = delayTime;
        }
        else {
            this.isDelay = false;
        }
    };
    Anime.prototype.PlayTween = function () {
        if (this.isDelay) {
            var timer = new egret.Timer(this.delayTime);
            timer.addEventListener(egret.TimerEvent.TIMER, this.TweenDelay, this); //开始计时 
            this.timer = timer;
            this.timer.start();
        }
        else {
            this.itemTween.setPaused(false);
        }
    };
    Anime.prototype.PauseTween = function () {
        this.itemTween.setPaused(true);
    };
    Anime.prototype.TweenDelay = function () {
        this.timer.stop();
        this.itemTween.setPaused(false);
    };
    return Anime;
}());
__reflect(Anime.prototype, "Anime");
//# sourceMappingURL=PiaohuaAnime.js.map