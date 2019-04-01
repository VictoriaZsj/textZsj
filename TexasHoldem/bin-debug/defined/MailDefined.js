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
 * 邮件定义
 */
var MailDefined = (function (_super) {
    __extends(MailDefined, _super);
    function MailDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailDefined.GetInstance = function () {
        if (!MailDefined._instance) {
            MailDefined._instance = new MailDefined();
        }
        if (DefinedManager.IsParsed(MailDefined.mailConfig) == false) {
            MailDefined._instance.initialize();
        }
        return MailDefined._instance;
    };
    MailDefined.prototype.initialize = function () {
        var obj = DefinedManager.GetData(MailDefined.mailConfig);
        this.dataList = ShortNameDefined.GetInstance().convertEnter(obj);
    };
    MailDefined.mailConfig = "mail";
    return MailDefined;
}(BaseDefined));
__reflect(MailDefined.prototype, "MailDefined");
var MailDefintion = (function () {
    function MailDefintion() {
    }
    return MailDefintion;
}());
__reflect(MailDefintion.prototype, "MailDefintion");
//# sourceMappingURL=MailDefined.js.map