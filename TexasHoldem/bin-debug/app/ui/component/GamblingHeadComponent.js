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
 * 牌局玩家头像组件
 */
var GamblingHeadComponent = (function (_super) {
    __extends(GamblingHeadComponent, _super);
    function GamblingHeadComponent() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GamblingHeadComponent.prototype, "nowState", {
        /**
         * 当前状态
         */
        get: function () {
            return this._nowState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "cardAnimationSpt", {
        get: function () {
            return this._cardAnimationSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "emptyState", {
        /**
         * 空状态
         */
        get: function () {
            return this._emptyState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "waitNextActionState", {
        /**
         * 等待下一局状态
         */
        get: function () {
            return this._waitNextState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "foldState", {
        /**
         * 弃牌状态
         */
        get: function () {
            return this._foldState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "actionedState", {
        /**
         * 已说话状态
         */
        get: function () {
            return this._actionedState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "waitActionState", {
        /**
         * 等待说话状态
         */
        get: function () {
            return this._waitActionState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "onActionState", {
        /**
         * 说话中状态
         */
        get: function () {
            return this._onActionState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "sitDownState", {
        /**
         * 坐下状态
         */
        get: function () {
            return this._sitDownState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "roundStartState", {
        /**
         * 一局开始
         */
        get: function () {
            return this._roundStartState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "thanTheCard", {
        /**
         * 比牌状态
         */
        get: function () {
            return this._thanTheCard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "pitIndex", {
        get: function () {
            return this._pitIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "flopIndex", {
        /**
         * 发牌索引
         */
        get: function () {
            return this._flopIndex;
        },
        set: function (value) {
            this.showHaveCardImg(false);
            if (this.pitIndex <= GamblingPanelSetting.centerNum) {
                if (value == 1) {
                    this.leftCard1.visible = true;
                }
                else if (value == 2) {
                    this.leftCard1.visible = this.leftCard2.visible = true;
                }
            }
            else {
                if (value == 1) {
                    this.rightCard1.visible = true;
                }
                else if (value == 2) {
                    this.rightCard1.visible = this.rightCard2.visible = true;
                }
            }
            this._flopIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    GamblingHeadComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        /**
         * 坐下转动动画
         */
        this.turnAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.CommonMoveToRelativelyPos);
        this.turnAnim.setTarget(this);
        /**
         * 弃牌动画
         */
        this.foldCardAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
        this.foldCardAnim.setTarget(this.foldBackCard);
        this._winChipsAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.WinChips);
        this._winChipsAnim.setTarget(this.chipsAnimLabel);
        this._emptyState = new GamblingHeadEmptyState(this);
        this._waitNextState = new GamblingHeadWiatNextState(this);
        this._foldState = new GamblingHeadFoldState(this);
        this._actionedState = new GamblingHeadActionedState(this);
        this._waitActionState = new GamblingHeadWaitActionState(this);
        this._onActionState = new GamblingHeadOnActionState(this);
        this._sitDownState = new GamblingHeadSitDownState(this);
        this._roundStartState = new GamblingHeadRoundStartState(this);
        this._thanTheCard = new GamblingHeadThanTheCardState(this);
        this._cardAnimationSpt = new GamblingHeadCardAnimationSupport(this);
    };
    GamblingHeadComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        this.changeState(this._emptyState);
    };
    /**
     * 断线重连
     */
    GamblingHeadComponent.prototype.offlineConnect = function () {
        if (this.bindData) {
            var state = this.getState();
            if (state) {
                this.changeState(state);
            }
            else {
                console.log("玩家状态异常：" + this.bindData.state + PlayerInfo.getStateDes(this.bindData.state));
            }
        }
    };
    /**
     * 设置坑位
     */
    GamblingHeadComponent.prototype.setPit = function (pit) {
        this._pitIndex = pit;
    };
    GamblingHeadComponent.prototype.changeState = function (state) {
        if (this._nowState) {
            this._nowState.onDisable();
        }
        this._nowState = state;
        this._nowState.run();
    };
    GamblingHeadComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
    };
    GamblingHeadComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    GamblingHeadComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        if (this._nowState) {
            this._nowState.onDisable();
        }
    };
    /**
    * 隐藏全部
    */
    GamblingHeadComponent.prototype.hideAll = function () {
        this.headIcon.visible = false;
        this.vipGroup.visible = false;
        this.infoLabel.visible = false;
        this.chipsLabel.visible = false;
        this.chipsAnimLabel.visible = false;
        this.winEffectImg.visible = false;
        this.maskImg.visible = false;
        this.cdImg.visible = false;
        this.foldBackCard.visible = false;
        this.cdComponent.visible = false;
        this.cardFace1.visible = false;
        this.cardFace2.visible = false;
        this.sitDown.visible = false;
        this.showHaveCardImg(false);
        this.chipsShowComponent.visible = false;
    };
    /**
     * 显示有牌状态
     */
    GamblingHeadComponent.prototype.showHaveCardImg = function (flag) {
        if (flag) {
            this.showHaveCardImg(false);
            if (this.pitIndex <= GamblingPanelSetting.centerNum) {
                if (this.flopIndex == 1) {
                    this.leftCard1.visible = true;
                }
                else if (this.flopIndex == 2) {
                    this.leftCard1.visible = this.leftCard2.visible = true;
                }
            }
            else {
                if (this.flopIndex == 1) {
                    this.rightCard1.visible = true;
                }
                else if (this.flopIndex == 2) {
                    this.rightCard1.visible = this.rightCard2.visible = true;
                }
            }
        }
        else {
            this.leftCard1.visible = this.leftCard2.visible = flag;
            this.rightCard1.visible = this.rightCard2.visible = flag;
        }
    };
    /**
     * 显示基本的元素
     */
    GamblingHeadComponent.prototype.showBase = function () {
        this.bgImg.visible = true;
        this.headIcon.visible = true;
        this.infoLabel.visible = true;
        this.chipsLabel.visible = true;
    };
    /**
     * 赢取筹码动画
     */
    GamblingHeadComponent.prototype.runWinChipsAnim = function () {
        this.chipsLabel.visible = true;
        this._winChipsAnim.run();
    };
    /**
    * 获取状态
    */
    GamblingHeadComponent.prototype.getState = function () {
        var state;
        if (!this.bindData) {
            return this._emptyState;
        }
        switch (this.bindData.state) {
            case PlayerState.WaitNext://等待下一局
                state = this._waitNextState;
                break;
            case PlayerState.Fold://弃牌
                state = this._foldState;
                break;
            case PlayerState.Check:
            case PlayerState.Raise:
            case PlayerState.Call:
            case PlayerState.AllIn:
            case PlayerState.Blind://已说话
                state = this._actionedState;
                break;
            case PlayerState.WaitAction://等待说话
                state = this._waitActionState;
                break;
            case PlayerState.Action://说话中
                state = this._onActionState;
                break;
            default://都没有则为等待下一局状态
                state = this._waitNextState;
                break;
        }
        return state;
    };
    GamblingHeadComponent.prototype.showChipsComponent = function (reNum) {
        if (reNum > 0 && reNum != this.chipsShowComponent.bindData) {
            this.chipsShowComponent.init(reNum);
        }
        if (this.chipsShowComponent.bindData > 0) {
            this.chipsShowComponent.visible = true;
        }
        else {
            this.chipsShowComponent.visible = false;
        }
    };
    return GamblingHeadComponent;
}(BaseComponent));
__reflect(GamblingHeadComponent.prototype, "GamblingHeadComponent");
//# sourceMappingURL=GamblingHeadComponent.js.map