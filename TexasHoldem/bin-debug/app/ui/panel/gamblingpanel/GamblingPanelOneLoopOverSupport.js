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
 * 公共牌支持
 */
var GamblingPanelOneLoopOverSupport = (function (_super) {
    __extends(GamblingPanelOneLoopOverSupport, _super);
    function GamblingPanelOneLoopOverSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelOneLoopOverSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.hideCard();
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.cardList) {
            this.target.cardTypeGroup.visible = false;
            this._lastCardLen = GamblingManager.roomInfo.cardList.length;
            var cardFace = void 0;
            var point = void 0;
            for (var i = 0; i < this._lastCardLen; i++) {
                cardFace = this.target.cardList[i];
                cardFace.visible = true;
                cardFace.init(GamblingManager.roomInfo.cardList[i]);
                //重置位置缩放和大小
                point = GamblingPanelSetting.boardPosList[i];
                cardFace.horizontalCenter = point.x;
                cardFace.verticalCenter = point.y;
                cardFace.alpha = 1;
                cardFace.scaleX = cardFace.scaleY = 1;
            }
        }
        else {
            this._lastCardLen = 0;
        }
    };
    GamblingPanelOneLoopOverSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.OneLoopOverEvent.addListener(this.oneLoopOverHandler, this);
        GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
    };
    GamblingPanelOneLoopOverSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.OneLoopOverEvent.removeListener(this.oneLoopOverHandler, this);
        GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
    };
    GamblingPanelOneLoopOverSupport.prototype.oneLoopOverHandler = function () {
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.cardList.length) {
            var nowLen = GamblingManager.roomInfo.cardList.length;
            var offset = nowLen - this._lastCardLen;
            this._lastCardLen = nowLen;
            var card = void 0;
            if (offset > 1) {
                for (var i = this._lastCardLen; i < nowLen; i++) {
                    card = this.target.cardList[i];
                    card.visible = true;
                    this.runBoardAppearAnim(card, GamblingPanelSetting.boardPosList[i], i * 350, this.runOVer, this);
                }
            }
            else {
                if (nowLen == 4) {
                    card = this.target.cardList[3];
                    card.visible = true;
                    this.runBoardAppearAnim(card, GamblingPanelSetting.boardPosList[3], 0, this.runOVer, this);
                }
                else if (nowLen == 5) {
                    card = this.target.cardList[4];
                    card.visible = true;
                    this.runBoardAppearAnim(card, GamblingPanelSetting.boardPosList[4], 0, this.runOVer, this);
                }
            }
            if (GamblingManager.roomInfo.potChips) {
                this.target.potChipsList.visible = true;
                if (this.target.potChipsList.dataProvider) {
                    var lastLen = this._lastChips ? this._lastChips.length : 0;
                    var nowLen_1 = GamblingManager.roomInfo.potChips.length;
                    for (var i = lastLen; i < nowLen_1; i++) {
                        this.target.potChipsList.dataProvider.addItem(GamblingManager.roomInfo.potChips[i]);
                    }
                }
                else {
                    this.target.potChipsList.dataProvider = new eui.ArrayCollection(GamblingManager.roomInfo.potChips);
                }
                this._lastChips = GamblingManager.roomInfo.potChips.concat();
            }
        }
    };
    /**
    * 跑公共牌动画
    */
    GamblingPanelOneLoopOverSupport.prototype.runBoardAppearAnim = function (target, point, delay, callback, thisObj) {
        if (delay === void 0) { delay = 0; }
        if (!this._actionList1) {
            this._actionList1 = new Dictionary();
            this._actionList2 = new Dictionary();
        }
        var run = this._actionList1.getValue(target);
        var run2 = this._actionList2.getValue(target);
        if (!run) {
            run = AnimationFactory.getCardFaceAnimation(AnimationType.CardFaceBoardAppear);
        }
        if (!run2) {
            run2 = AnimationFactory.getCardFaceAnimation(AnimationType.CardFaceTurnToFace);
        }
        run.nextAnimation = run2;
        run.nextAnimation.callback = new Delegate(callback, thisObj);
        run.run(point, delay);
    };
    GamblingPanelOneLoopOverSupport.prototype.runOVer = function () {
        if (GamblingManager.roomInfo && GamblingManager.roomInfo.handCardList) {
            var result = GamblingCardTypeMatch.matchCardType(GamblingManager.roomInfo.handCardList);
            if (result && GamblingCardTypeMatch.resultList && GamblingCardTypeMatch.resultList.length > 0) {
                /**
                 * 牌型显示
                 */
                this.target.cardDeslabel.text = GamblingCardTypeMatch.getCardDes(GamblingCardTypeMatch.cardType);
                this.target.cardTypeGroup.visible = true;
                var len = this.target.cardList.length;
                var card = void 0;
                for (var i = 0; i < len; i++) {
                    card = this.target.cardList[i];
                    if (card.visible && card.bindData) {
                        for (var _i = 0, _a = GamblingCardTypeMatch.resultList; _i < _a.length; _i++) {
                            var resultInfo = _a[_i];
                            if (resultInfo[2] == 1 && resultInfo[0] == card.bindData[0] && resultInfo[1] == card.bindData[1]) {
                                card.showMaxFlag(true);
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
    GamblingPanelOneLoopOverSupport.prototype.hideCard = function () {
        var len = this.target.cardList.length;
        for (var i = 0; i < len; i++) {
            this.target.cardList[i].visible = false;
        }
    };
    GamblingPanelOneLoopOverSupport.prototype.nextRoundStartHandler = function () {
        this.clear();
    };
    GamblingPanelOneLoopOverSupport.prototype.clear = function () {
        _super.prototype.clear.call(this);
        if (this._lastChips) {
            this._lastChips.length = 0;
        }
        this.target.potChipsList.dataProvider.removeAll();
    };
    return GamblingPanelOneLoopOverSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelOneLoopOverSupport.prototype, "GamblingPanelOneLoopOverSupport");
//# sourceMappingURL=GamblingPanelOneLoopOverSupport.js.map