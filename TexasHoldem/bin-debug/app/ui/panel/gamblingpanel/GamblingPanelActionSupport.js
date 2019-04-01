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
 * 行为操作支持 仅自己
 */
var GamblingPanelActionSupport = (function (_super) {
    __extends(GamblingPanelActionSupport, _super);
    function GamblingPanelActionSupport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._excludePanel = [UIModuleName.GamblingPanel, UIModuleName.MarqueePanel];
        return _this;
    }
    GamblingPanelActionSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    GamblingPanelActionSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.PlayerStateChangeEvent.addListener(this.playerStateChangeHandler, this);
    };
    GamblingPanelActionSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.PlayerStateChangeEvent.removeListener(this.playerStateChangeHandler, this);
    };
    GamblingPanelActionSupport.prototype.playerStateChangeHandler = function (obj) {
        if (obj.roleId == UserManager.userInfo.roleId) {
            if (!this._panelShowStateList) {
                this._panelShowStateList = new Dictionary();
            }
            if (obj.state == PlayerState.Action) {
                var panels = UIManager.panelDict.getKeys();
                var state = void 0;
                for (var _i = 0, panels_1 = panels; _i < panels_1.length; _i++) {
                    var panel = panels_1[_i];
                    state = UIManager.isShowPanel(UIModuleName.BuyAccessGamePanel);
                    if (this._excludePanel.indexOf(panel) == -1 && state) {
                        this._panelShowStateList.add(panel, state);
                        UIManager.showPanelByVisible(panel, false);
                    }
                }
                this._toNum = this.target.gameGroup.x;
                if (this._toNum > 0) {
                    this.target.moveSpt.move();
                }
            }
            else {
                var panels = this._panelShowStateList.getKeys();
                for (var _a = 0, panels_2 = panels; _a < panels_2.length; _a++) {
                    var panel = panels_2[_a];
                    UIManager.showPanelByVisible(panel, true);
                }
                this._panelShowStateList.clear();
                if (this._toNum > 0) {
                    this.target.moveSpt.move();
                }
            }
            this.changeState(GamblingManager.getPlayerState(obj.roleId));
        }
    };
    /**
     * 状态变更
     */
    GamblingPanelActionSupport.prototype.changeState = function (state) {
        switch (state) {
            case PlayerState.Empty:
            case PlayerState.WaitNext:
                this.target.actionGroup.visible = false;
                break;
            case PlayerState.WaitAction:
                this.target.actionGroup.visible = true;
                this.target.actionGroup.hideAll();
                this.target.actionGroup.preActionGroup.visible = true;
                break;
            case PlayerState.Check:
            case PlayerState.Raise:
            case PlayerState.AllIn:
            case PlayerState.Call:
            case PlayerState.Blind:
                this.target.actionGroup.visible = false;
                break;
            case PlayerState.Fold://弃牌
                this.target.actionGroup.visible = true;
                this.target.actionGroup.hideAll();
                this.target.actionGroup.brightCardBtn.visible = true;
                break;
            case PlayerState.Action://说话
                if (GamblingManager.isPassOrFold) {
                    if (GamblingManager.isCanCheck) {
                        GamblingManager.reqAction(PlayerState.Check);
                    }
                    else {
                        GamblingManager.reqAction(PlayerState.Fold);
                    }
                }
                else if (GamblingManager.isCallAny) {
                    this.doDefaultAction();
                }
                else {
                    this.target.actionGroup.visible = true;
                    this.target.actionGroup.hideAll();
                    this.target.actionGroup.raiseGroup.visible = true;
                    this.target.actionGroup.actionGroup.visible = true;
                    this.target.actionGroup.raiseBtn.visible = true;
                    if (GamblingManager.isCanCheck) {
                        this.target.actionGroup.callBtn.label = "过牌";
                    }
                    else if (GamblingManager.isNeedAllIn) {
                        this.target.actionGroup.raiseGroup.visible = false;
                        this.target.actionGroup.raiseBtn.visible = false;
                        this.target.actionGroup.callBtn.label = "全下";
                    }
                    else if (GamblingManager.callNum > 0) {
                        this.target.actionGroup.callBtn.label = GamblingManager.callNum + "\n跟注";
                    }
                }
                break;
        }
    };
    GamblingPanelActionSupport.prototype.onClick = function (target) {
        switch (target) {
            case this.target.actionGroup.brightCardBtn://结束时亮牌
                GamblingManager.reqBrightCard();
                break;
            case this.target.actionGroup.passOrDropBtn://过或弃
                GamblingManager.isPassOrFold = !GamblingManager.isPassOrFold;
                break;
            case this.target.actionGroup.callAnyBtn://一律跟
                GamblingManager.isCallAny = !GamblingManager.isCallAny;
                break;
            case this.target.actionGroup.oneOfThreeBtn://加注1/3底池
                this.oneKeyRaise(GamblingPanelActionSupport._quicklyPhase1);
                break;
            case this.target.actionGroup.oneOfTwoBtn://加注1/2底池
                this.oneKeyRaise(GamblingPanelActionSupport._quicklyPhase2);
                break;
            case this.target.actionGroup.twoOfThreeBtn://加注2/3底池
                this.oneKeyRaise(GamblingPanelActionSupport._quicklyPhase3);
                break;
            case this.target.actionGroup.oneBtn://加注 底池*1
                this.oneKeyRaise(GamblingPanelActionSupport._quicklyPhase4);
                break;
            case this.target.actionGroup.raiseBtn://加注
                if (GamblingManager.roomInfo && GamblingManager.self) {
                    var obj = { minChips: GamblingManager.roomInfo.minRaiseNum, maxChips: GamblingManager.maxRaiseChips, bBlind: GamblingManager.roomInfo.bBlind };
                    UIManager.showPanel(UIModuleName.AddChipsPanel, obj);
                }
                break;
            case this.target.actionGroup.foldBtn://弃牌
                GamblingManager.reqAction(PlayerState.Fold);
                break;
            case this.target.actionGroup.callBtn://跟注
                this.doDefaultAction();
                break;
        }
    };
    /**
     * 执行默认的行为
     */
    GamblingPanelActionSupport.prototype.doDefaultAction = function () {
        if (GamblingManager.isCanCheck) {
            GamblingManager.reqAction(PlayerState.Check);
        }
        else if (GamblingManager.isNeedAllIn) {
            if (GamblingManager.self) {
                GamblingManager.reqAction(PlayerState.AllIn, GamblingManager.self.bankRoll);
            }
        }
        else if (GamblingManager.callNum > 0) {
            GamblingManager.reqAction(PlayerState.Call, GamblingManager.callNum);
        }
    };
    /**
     * 一键加注
     */
    GamblingPanelActionSupport.prototype.oneKeyRaise = function (proportion) {
        if (GamblingManager.roomInfo && GamblingManager.self) {
            var raiseNum = Math.floor(GamblingManager.totalPotChips * proportion / GamblingManager.roomInfo.bBlind);
            raiseNum *= GamblingManager.roomInfo.bBlind;
            if (raiseNum >= GamblingManager.self.bankRoll) {
                GamblingManager.reqAction(PlayerState.AllIn, GamblingManager.self.bankRoll);
            }
            else {
                GamblingManager.reqAction(PlayerState.Raise, raiseNum); //加注
            }
        }
    };
    /**
    * 快捷加注比例
    */
    GamblingPanelActionSupport._quicklyPhase1 = 1 / 3;
    GamblingPanelActionSupport._quicklyPhase2 = 1 / 2;
    GamblingPanelActionSupport._quicklyPhase3 = 2 / 3;
    GamblingPanelActionSupport._quicklyPhase4 = 1;
    GamblingPanelActionSupport._quicklyPhase5 = 2;
    return GamblingPanelActionSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelActionSupport.prototype, "GamblingPanelActionSupport");
//# sourceMappingURL=GamblingPanelActionSupport.js.map