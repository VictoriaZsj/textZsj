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
 * 音乐音效配置表
 */
var MusicDefined = (function (_super) {
    __extends(MusicDefined, _super);
    function MusicDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MusicDefined.GetInstance = function () {
        if (MusicDefined._instance == null) {
            MusicDefined._instance = new MusicDefined();
        }
        if (DefinedManager.IsParsed(MusicDefined.musicConfig) == false) {
            MusicDefined._instance.initialize();
        }
        return MusicDefined._instance;
    };
    MusicDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(MusicDefined.musicConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
        if (this.dataList) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.boy) {
                    def.boy = def.boy.toString().split(SeparatorType.semicolon);
                }
                if (def.girl) {
                    def.girl = def.girl.toString().split(SeparatorType.semicolon);
                }
            }
        }
    };
    /**
     * 根据性别、行为、牌、获取一个音效，随机
     */
    MusicDefined.prototype.getSexMusicDefinition = function (sex, action, pai) {
        var def = this.getMusicDefinition(action, pai);
        if (def) {
            var index = 0;
            if (sex == Sex.Female && def.girl) {
                index = MathUtil.getRandom(0, def.girl.length - 1);
                return def.girl[index];
            }
            else if (sex == Sex.Male && def.boy) {
                index = MathUtil.getRandom(0, def.boy.length - 1);
                return def.boy[index];
            }
            else {
                if (def.boy) {
                    index = MathUtil.getRandom(0, def.boy.length - 1);
                    return def.boy[index];
                }
            }
        }
        return StringConstant.empty;
    };
    /**
     * 获取音效定义
     */
    MusicDefined.prototype.getMusicDefinition = function (action, pai) {
        if (!this.dataList) {
            return null;
        }
        var len = this.dataList.length;
        var def;
        if (action == "any") {
            if (pai != undefined) {
                for (var i = 0; i < len; i++) {
                    def = this.dataList[i];
                    if (def.pai == pai) {
                        return def;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                def = this.dataList[i];
                if (def.action == action) {
                    return def;
                }
            }
        }
    };
    MusicDefined.musicConfig = "music";
    return MusicDefined;
}(BaseDefined));
__reflect(MusicDefined.prototype, "MusicDefined");
/**
 * 错误码定义
 */
var MusicDefinition = (function () {
    function MusicDefinition() {
    }
    return MusicDefinition;
}());
__reflect(MusicDefinition.prototype, "MusicDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=MusicDefined.js.map