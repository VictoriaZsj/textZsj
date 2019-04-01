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
 * 牌局结算支持
 */
var GamblingPanelRoundOverSupport = (function (_super) {
    __extends(GamblingPanelRoundOverSupport, _super);
    function GamblingPanelRoundOverSupport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._runIndex = 0;
        return _this;
    }
    GamblingPanelRoundOverSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    GamblingPanelRoundOverSupport.prototype.onEnable = function () {
        this.onEnable();
        GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
    };
    GamblingPanelRoundOverSupport.prototype.onDisable = function () {
        this.onDisable();
        GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
    };
    GamblingPanelRoundOverSupport.prototype.roundOverHandler = function () {
        if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.potList) {
            this._runIndex = 0;
            this.runNext();
        }
    };
    GamblingPanelRoundOverSupport.prototype.runNext = function () {
        var potAwardInfo;
        var headComponent;
        var pInfo;
        var pointList = new Array();
        potAwardInfo = GamblingManager.roundOverInfo.potList[this._runIndex];
        for (var _i = 0, _a = potAwardInfo.roleId; _i < _a.length; _i++) {
            var roleId = _a[_i];
            if (GamblingManager.roomInfo && GamblingManager.roomInfo.cardList && GamblingManager.roomInfo.cardList.length >= GamblingManager.MaxBoardNum) {
                this.showCardMaskImg(roleId, headComponent); //公共牌有最后一张尝试显示牌型
            }
            pInfo = GamblingManager.getPlayerInfo(roleId);
            if (pInfo) {
                headComponent = this.target.getHeadComponent(pInfo.pos);
                if (headComponent) {
                    pointList.push(new egret.Point(headComponent.x, headComponent.y));
                }
            }
        }
        var dp = this.target.potChipsList.dataProvider;
        if (dp && dp.source && pointList.length > 0) {
            var len = dp.source.length;
            //todo
            var render = this.target.potChipsList.getElementAt(this._runIndex);
            render.chips.winChipsTween(pointList, this.runOver, this);
        }
    };
    GamblingPanelRoundOverSupport.prototype.runOver = function () {
        this._runIndex++;
        if (this._runIndex < GamblingManager.roundOverInfo.potList.length) {
            this.runNext();
        }
        else {
            this.target.potChipsList.visible = false;
            GamblingManager.reqNextRoundStart(); //请求3601
        }
    };
    /**
     * 显示灰暗
     */
    GamblingPanelRoundOverSupport.prototype.showCardMaskImg = function (roleId, headComponent) {
        var matchResult;
        for (var _i = 0, _a = GamblingManager.roundOverInfo.roleHandCardList; _i < _a.length; _i++) {
            var cardInfo = _a[_i];
            if (cardInfo.roleId == roleId) {
                matchResult = GamblingCardTypeMatch.matchCardType(cardInfo.cardList);
                headComponent.infoLabel.text = GamblingCardTypeMatch.getCardDes(GamblingCardTypeMatch.cardType);
                break;
            }
        }
        if (!matchResult) {
            return;
        }
        var len = this.target.cardList.length;
        var card;
        headComponent.cardFace1.showMask(true);
        headComponent.cardFace2.showMask(true);
        for (var i = 0; i < len; i++) {
            card = this.target.cardList[i];
            if (card.visible) {
                card.showMask(true);
            }
        }
        for (var _b = 0, _c = GamblingCardTypeMatch.resultList; _b < _c.length; _b++) {
            var resultInfo = _c[_b];
            for (var i = 0; i < len; i++) {
                card = this.target.cardList[i];
                if (card.visible && card.bindData) {
                    if (resultInfo[2] == 1 && resultInfo[0] == card.bindData[0] && resultInfo[1] == card.bindData[1]) {
                        card.showMask(false);
                        break;
                    }
                }
            }
            if (resultInfo[2] == 1 && headComponent.cardFace1.bindData &&
                resultInfo[0] == headComponent.cardFace1.bindData[0] && resultInfo[1] == headComponent.cardFace1.bindData[1]) {
                headComponent.cardFace1.showMask(false);
            }
            if (resultInfo[2] == 1 && headComponent.cardFace2.bindData &&
                resultInfo[0] == headComponent.cardFace2.bindData[0] && resultInfo[1] == headComponent.cardFace2.bindData[1]) {
                headComponent.cardFace2.showMask(false);
            }
        }
    };
    return GamblingPanelRoundOverSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelRoundOverSupport.prototype, "GamblingPanelRoundOverSupport");
//# sourceMappingURL=GamblingPanelRoundOverSupport.js.map