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
 * 游戏功能配置定义
 */
var ProjectDefined = (function (_super) {
    __extends(ProjectDefined, _super);
    function ProjectDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProjectDefined.GetInstance = function () {
        if (ProjectDefined._instance == null) {
            ProjectDefined._instance = new ProjectDefined();
        }
        if (DefinedManager.IsParsed(ProjectDefined.projectConfig) == false) {
            ProjectDefined._instance.initialize();
        }
        return ProjectDefined._instance;
    };
    ProjectDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(ProjectDefined.projectConfig);
        this.projectObj = ShortNameDefined.GetInstance().convertEnter(obj);
        this.round = this.projectObj.round;
        this.playWay = this.projectObj.playWay;
        this.antes = this.projectObj.antes;
        this.bringRoomCard = this.projectObj.bringRoomCard;
        this.gameFeedback = this.projectObj.gameFeedback;
        this.vipSpeed = this.projectObj.vipSpeed;
        ProjectDefined.giveOnceGoldNum = this.projectObj.giveOnceGoldNum;
        if (this.round) {
            this.round.forEach(function (rv, ri, rarr) {
                rv.groupName = "round";
                rv.isRound = true;
            });
        }
        if (this.playWay) {
            this.playWay.forEach(function (pv, pi, parr) {
                pv.groupName = "playWay";
            });
        }
        if (this.antes) {
            this.antes.forEach(function (value, index, array) {
                value.groupName = "antes";
            });
        }
        if (this.vipSpeed) {
            this.vipSpeed.forEach(function (vv, vi, varr) {
                vv.groupName = "vipSpeed";
            });
        }
    };
    ProjectDefined.prototype.getValue = function (key) {
        if (this.projectObj) {
            return this.projectObj[key];
        }
        return null;
    };
    ProjectDefined.prototype.getPlayWayDefinition = function (playWay) {
        for (var _i = 0, _a = this.playWay; _i < _a.length; _i++) {
            var way = _a[_i];
            if (way.type == playWay) {
                return way;
            }
        }
        return null;
    };
    ProjectDefined.prototype.getAnteDefinition = function (score) {
        for (var _i = 0, _a = this.antes; _i < _a.length; _i++) {
            var ante = _a[_i];
            if (ante.score == score) {
                return ante;
            }
        }
        return null;
    };
    ProjectDefined.prototype.getRoundDefinition = function (roundNum) {
        for (var _i = 0, _a = this.round; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.num == roundNum) {
                return def;
            }
        }
        return null;
    };
    ProjectDefined.prototype.getBringRoomCardDefinition = function (type) {
        for (var _i = 0, _a = this.bringRoomCard; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.type == type) {
                return def;
            }
        }
        return null;
    };
    ProjectDefined.prototype.getVipSpeedDefinition = function (type) {
        for (var _i = 0, _a = this.vipSpeed; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.type == type) {
                return def;
            }
        }
        return null;
    };
    ProjectDefined.projectConfig = "project";
    /**
     * 游戏客户端版本号
     */
    ProjectDefined.version = "version";
    /**
     * socket连接超时
     */
    ProjectDefined.onTimeOut = "onTimeOut";
    /**
     * 内网登录IP
     */
    ProjectDefined.intranetIp = "intranetIp";
    /**
     * 内容登录端口
     */
    ProjectDefined.intranetPort = "intranetPort";
    /**
     * 服务器拥挤人数限定
     */
    ProjectDefined.serverCrowded = "serverCrowded";
    /**
     * 等待碰杠时间 超时不给碰杠
     */
    ProjectDefined.waitActionTimeClient = "waitActionTimeClient";
    /**
     * 出牌超时时间 超时自动本次出牌
     */
    ProjectDefined.putTimeoutClient = "putTimeoutClient";
    /**
     * 出牌超时次数 超过次次数 则托管
     */
    ProjectDefined.putTimeoutTimes = "putTimeoutTimes";
    /**
    * 初始化出牌时间 庄家第一次出牌
    */
    ProjectDefined.initPutTimeOutClient = "initPutTimeOutClient";
    /**
     * 准备时间倒计时
     */
    ProjectDefined.waitReadyTime = "waitReadyTime";
    /**
     * 解散房间等待时间
     */
    ProjectDefined.waitDisbandTime = "waitDisbandTime";
    /**
     * 登录地址
     */
    ProjectDefined.address = "address";
    /**
     * 登录端口
     */
    ProjectDefined.port = "port";
    /**
     * 测试登录地址
     */
    ProjectDefined.testAddress = "testAddress";
    /**
     * 测试登录端口
     */
    ProjectDefined.testPort = "testPort";
    /**
     * 聊天最大记录时间
     */
    ProjectDefined.chatMaxRecordTime = "chatMaxRecordTime";
    /**
     * 语音地址
     */
    ProjectDefined.voiceHost = "voiceHost";
    /**
     * 语音测试地址
     */
    ProjectDefined.voiceHostTest = "voiceHostTest";
    /**
     * 语音上传地址
     */
    ProjectDefined.voicePath = "voicePath";
    /**
     * 版本验证文件
     */
    ProjectDefined.versionUrl = "versionUrl";
    /**
     * 维护内容路径
     */
    ProjectDefined.maintainUrl = "maintainUrl";
    /**
     * 安装包地址路径
     */
    ProjectDefined.updateUrl = "updateUrl";
    /**
     * vip等级经验
     */
    ProjectDefined.vipLevel = "vipLevel";
    return ProjectDefined;
}(BaseDefined));
__reflect(ProjectDefined.prototype, "ProjectDefined");
/**
 * 局数定义
 */
var RoundDefinition = (function () {
    function RoundDefinition() {
    }
    return RoundDefinition;
}());
__reflect(RoundDefinition.prototype, "RoundDefinition");
/**
 * 玩法定义
 */
var PlayWayDefinition = (function () {
    function PlayWayDefinition() {
    }
    return PlayWayDefinition;
}());
__reflect(PlayWayDefinition.prototype, "PlayWayDefinition");
/**
 * 底分定义
 */
var AntesDefinition = (function () {
    function AntesDefinition() {
    }
    return AntesDefinition;
}());
__reflect(AntesDefinition.prototype, "AntesDefinition");
/**
 * 底分定义
 */
var BringRoomCardDefinition = (function () {
    function BringRoomCardDefinition() {
    }
    return BringRoomCardDefinition;
}());
__reflect(BringRoomCardDefinition.prototype, "BringRoomCardDefinition");
/**
 * 游戏反馈
*/
var GameFeedbackDefinition = (function () {
    function GameFeedbackDefinition() {
    }
    return GameFeedbackDefinition;
}());
__reflect(GameFeedbackDefinition.prototype, "GameFeedbackDefinition");
/**
 * 游戏成长速度
 */
var VipSpeedDefinition = (function () {
    function VipSpeedDefinition() {
    }
    return VipSpeedDefinition;
}());
__reflect(VipSpeedDefinition.prototype, "VipSpeedDefinition");
//# sourceMappingURL=ProjectDefined.js.map