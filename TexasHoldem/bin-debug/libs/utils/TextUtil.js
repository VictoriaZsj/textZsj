var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextUtil = (function () {
    function TextUtil() {
    }
    Object.defineProperty(TextUtil, "htmlParser", {
        get: function () {
            if (TextUtil._htmlParser == null) {
                TextUtil._htmlParser = new egret.HtmlTextParser();
            }
            return TextUtil._htmlParser;
        },
        enumerable: true,
        configurable: true
    });
    TextUtil.parser = function (htmltext) {
        return TextUtil.htmlParser.parser(htmltext);
    };
    TextUtil.parse = function (htmltext) {
        return TextUtil.htmlParser.parse(htmltext);
    };
    return TextUtil;
}());
__reflect(TextUtil.prototype, "TextUtil");
//# sourceMappingURL=TextUtil.js.map