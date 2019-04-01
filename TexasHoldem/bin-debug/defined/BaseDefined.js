var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseDefined = (function () {
    function BaseDefined() {
    }
    BaseDefined.prototype.getDefinition = function (id) {
        if (this.dataList != null) {
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].id == id) {
                    return this.dataList[i];
                }
            }
        }
        return null;
    };
    return BaseDefined;
}());
__reflect(BaseDefined.prototype, "BaseDefined");
//# sourceMappingURL=BaseDefined.js.map