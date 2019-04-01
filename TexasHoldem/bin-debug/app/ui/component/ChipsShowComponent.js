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
 * 筹码组件
 */
var ChipsShowComponent = (function (_super) {
    __extends(ChipsShowComponent, _super);
    function ChipsShowComponent() {
        var _this = _super.call(this) || this;
        /**
         * 一个筹码的高度
        */
        _this._chipSelfHeight = 9;
        _this._oneWidth = 55;
        _this._offsetW = 8;
        _this.skinName = UIComponentSkinName.ChipsShowComponent;
        return _this;
    }
    ChipsShowComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        if (!this._allImgList) {
            this._allImgList = new Array();
        }
    };
    ChipsShowComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._callBack = null;
        this.remove();
        this.clear();
    };
    /**
     * 筹码组件
    */
    ChipsShowComponent.prototype.chipsShow = function (data, pos) {
        this.numLabel.text = data.toString();
        this.bgImg.width = this.numLabel.width + this._oneWidth + this._offsetW;
        this.bgImg.x = 0;
        this.creatChips(data);
        switch (pos) {
            case ChipsPosType.Left:
                this.numLabel.x = this._oneWidth;
                this.numLabel.textAlign = egret.HorizontalAlign.LEFT;
                break;
            case ChipsPosType.Right:
                this.numLabel.x = this._offsetW;
                this.numLabel.textAlign = egret.HorizontalAlign.RIGHT;
                break;
        }
        this.setInitValue(pos);
    };
    /**
     * 创建筹码数
     */
    ChipsShowComponent.prototype.creatChips = function (chipNum) {
        egret.Tween.removeTweens(this.chipBar);
        this.chipBar.alpha = 1;
        this.clear();
        if (ChipsDefined.GetInstance().dataList) {
            var imgList = new Array();
            var dataLen = ChipsDefined.GetInstance().dataList.length;
            var def = void 0;
            for (var i = dataLen - 1; i > 0; i--) {
                def = ChipsDefined.GetInstance().dataList[i];
                var imgNum = Math.floor(chipNum / def.phase);
                for (var j = 0; j < imgNum; j++) {
                    var img = new eui.Image(def.img + ResSuffixName.PNGSuffix);
                    imgList.push(img);
                }
                chipNum %= def.phase;
            }
            this._allImgList.push(imgList);
        }
    };
    /**
     * 设置初始值
    */
    ChipsShowComponent.prototype.setInitValue = function (pos) {
        var len = this._allImgList.length;
        if (len > 0) {
            var imgArray = this._allImgList[0];
            var imgLen = imgArray.length;
            var img = void 0;
            var yPos = -imgLen * this._chipSelfHeight * 2;
            if (yPos < -300) {
                yPos = -300;
            }
            else if (yPos > -80) {
                yPos = -80;
            }
            for (var m = 0; m < imgLen; m++) {
                img = imgArray[m];
                img.y = yPos;
                img.scaleX = 0.5;
                img.scaleY = 0.5;
                if (pos == ChipsPosType.Left) {
                    img.x = 0;
                }
                else if (pos == ChipsPosType.Right) {
                    img.x = this.bgImg.width - this._oneWidth + 3;
                }
                this.addChild(img);
            }
            this.createVerticalTween();
        }
    };
    /**
     * 设置下注动画
    */
    ChipsShowComponent.prototype.createVerticalTween = function () {
        var imgList = this._allImgList[0];
        var len = imgList.length;
        for (var m = 0; m < len; m++) {
            egret.Tween.get(imgList[m]).wait(m * 50).to({ y: -m * this._chipSelfHeight }, 400, egret.Ease.sineIn);
        }
    };
    /**
     * 赢取筹码动画
     */
    ChipsShowComponent.prototype.winChipsTween = function (pointList, callBack, thisObj) {
        this._callBack = new Delegate(callBack, thisObj);
        var pLen = pointList.length;
        var locX;
        var locY;
        var imgList;
        if (this._allImgList.length > 0) {
            var point = void 0;
            for (var i = 0; i < pLen; i++) {
                point = pointList[i];
                locX = point.x - this.x;
                locY = point.y - this.y;
                if (i == 0) {
                    this.toRunList(this._allImgList[0], locX, locY);
                }
                else {
                    imgList = this.cloneImgList(this._allImgList[0]); //处理 多人分配奖池的情况
                    this.toRunList(imgList, locX, locY);
                }
            }
        }
    };
    ChipsShowComponent.prototype.toRunList = function (imgList, x, y) {
        var len = imgList.length;
        for (var n = len - 1; n >= 0; n--) {
            if (n == 0) {
                egret.Tween.get(imgList[n]).wait((len - n) * 10).to({ x: x, y: y, alpha: 0 }, 400, egret.Ease.sineIn).call(this.remove, this);
            }
            else {
                egret.Tween.get(imgList[n]).wait((len - n) * 10).to({ x: x, y: y, alpha: 0 }, 400, egret.Ease.sineIn);
            }
        }
    };
    /**
     * 获取图片列表
     */
    ChipsShowComponent.prototype.cloneImgList = function (sourceList) {
        var imgList = new Array();
        var imgLen = sourceList.length;
        var img;
        var sourceImg;
        for (var j = 0; j < imgLen; j++) {
            sourceImg = sourceList[j];
            img = new eui.Image(sourceImg.source);
            img.x = sourceImg.x;
            img.y = sourceImg.y;
            img.alpha = 1;
            img.scaleX = sourceImg.scaleX;
            img.scaleY = sourceImg.scaleY;
            imgList.push(img);
            this.addChild(img);
        }
        this._allImgList.push(imgList);
        return imgList;
    };
    /**
     * 移除下注条
    */
    ChipsShowComponent.prototype.remove = function () {
        egret.Tween.get(this.chipBar).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(this.runOver, this);
        this.clear();
    };
    ChipsShowComponent.prototype.runOver = function () {
        this._callBack.invoke();
    };
    /**
     * 清除图片列表和移除子项
    */
    ChipsShowComponent.prototype.clear = function () {
        var imgLen;
        var img;
        for (var _i = 0, _a = this._allImgList; _i < _a.length; _i++) {
            var imgList = _a[_i];
            imgLen = imgList.length;
            for (var i = 0; i < imgLen; i++) {
                img = imgList[i];
                egret.Tween.removeTweens(img);
                this.removeChild(img);
            }
            imgList.length = 0;
        }
        this._allImgList.length = 0;
    };
    return ChipsShowComponent;
}(BaseComponent));
__reflect(ChipsShowComponent.prototype, "ChipsShowComponent");
/**
 * 筹码位置
*/
var ChipsPosType;
(function (ChipsPosType) {
    /**
     * 左边显示
     */
    ChipsPosType[ChipsPosType["Left"] = 1] = "Left";
    /**
     * 右边显示
     */
    ChipsPosType[ChipsPosType["Right"] = 2] = "Right";
})(ChipsPosType || (ChipsPosType = {}));
//# sourceMappingURL=ChipsShowComponent.js.map