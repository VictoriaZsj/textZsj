var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ui工具类
 */
var UIUtil = (function () {
    function UIUtil() {
    }
    /**
     * 绑定列表数据源
     */
    UIUtil.bindRender = function (group, render, dataSource) {
        if (!group || !render) {
            return;
        }
        if (dataSource != undefined) {
            var bingData = new eui.ArrayCollection(dataSource);
            group.dataProvider = bingData;
        }
        if (!group.itemRenderer) {
            if (typeof render == "string") {
                group.itemRendererSkinName = render;
            }
            else if (typeof render == "function") {
                group.itemRenderer = render;
            }
        }
    };
    /**
     * 列表项渲染
     */
    UIUtil.listRenderer = function (list, scroller, renderer, dir, operation, data, useVirtualLayout) {
        if (useVirtualLayout === void 0) { useVirtualLayout = false; }
        if (!list || !scroller || !renderer) {
            console.log("初始化失败！绑定的组件对象不能为空！");
            return;
        }
        if (dir != undefined && operation != undefined) {
            scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
            switch (dir) {
                case ScrollViewDirection.Horizontal_L_R:
                    scroller.scrollPolicyH = operation;
                    break;
                case ScrollViewDirection.Vertical_T_D:
                    scroller.scrollPolicyV = operation;
                    break;
            }
        }
        else {
            scroller.scrollPolicyH = eui.ScrollPolicy.AUTO;
            scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
        }
        UIUtil.bindRender(list, renderer, data);
        list.useVirtualLayout = useVirtualLayout;
        scroller.viewport = list;
    };
    /**
     * 滚动到指定的索引
     */
    UIUtil.scrollToIndex = function (scroller, itemSize, selectIndex) {
        if (scroller && scroller.viewport) {
            var v = itemSize * selectIndex;
            if (scroller.scrollPolicyH != eui.ScrollPolicy.OFF) {
                scroller.viewport.scrollH = v;
            }
            if (scroller.scrollPolicyV != eui.ScrollPolicy.OFF) {
                scroller.viewport.scrollV = v;
            }
        }
    };
    /**
     * 隐藏滚动条
     */
    UIUtil.hideScrollerBar = function (scroller, h, v) {
        if (h === void 0) { h = true; }
        if (v === void 0) { v = true; }
        if (h && scroller && scroller.horizontalScrollBar) {
            scroller.horizontalScrollBar.autoVisibility = false;
            scroller.horizontalScrollBar.visible = false;
        }
        if (v && scroller && scroller.verticalScrollBar) {
            scroller.verticalScrollBar.autoVisibility = false;
            scroller.verticalScrollBar.visible = false;
        }
    };
    /**
     * 获取水平布局
     */
    UIUtil.getHTileLayout = function (hGap, reqRc, align) {
        if (reqRc === void 0) { reqRc = 1; }
        if (align === void 0) { align = egret.HorizontalAlign.LEFT; }
        var ly = new eui.TileLayout();
        ly.horizontalAlign = align;
        if (hGap != undefined) {
            ly.horizontalGap = hGap;
        }
        if (reqRc != undefined) {
            ly.requestedRowCount = reqRc;
        }
        return ly;
    };
    /**
     * 获取垂直布局
     */
    UIUtil.getVTileLayout = function (vGap, reqCc, align) {
        if (reqCc === void 0) { reqCc = 1; }
        if (align === void 0) { align = egret.VerticalAlign.TOP; }
        var ly = new eui.TileLayout();
        ly.verticalAlign = align;
        if (vGap != undefined) {
            ly.verticalGap = vGap;
        }
        if (reqCc != undefined) {
            ly.requestedColumnCount = reqCc;
        }
        return ly;
    };
    /**
     * 获取网格布局
     */
    UIUtil.getTileLayout = function (hGap, vGap, reqRc, reqCc, hAlign, vAlign) {
        var ly = new eui.TileLayout();
        if (hGap != undefined) {
            ly.horizontalGap = hGap;
        }
        if (vGap != undefined) {
            ly.verticalGap = vGap;
        }
        if (reqRc != undefined) {
            ly.requestedRowCount = reqRc;
        }
        if (reqCc != undefined) {
            ly.requestedColumnCount = reqCc;
        }
        if (hAlign != undefined) {
            ly.horizontalAlign = hAlign;
        }
        if (vAlign != undefined) {
            ly.verticalAlign = vAlign;
        }
        return ly;
    };
    /**
     * 获取性别图片资源
     */
    UIUtil.getSexImgSource = function (sex) {
        if (sex == Sex.Female) {
            return ImageSource.FemaleImg;
        }
        else if (sex == Sex.Male) {
            return ImageSource.MaleImg;
        }
        return StringConstant.empty;
    };
    /**
     * 对容器进行子项重排
     */
    UIUtil.refreshSortContainer = function (list, container) {
        if (container && list) {
            for (var i = 0; i < list.length; i++) {
                container.addChild(list[i]);
            }
        }
    };
    /**
     * 图片缓存处理
     */
    UIUtil.containerImgOper = function (container) {
        ArrayUtil.Clear(UIUtil._imgList);
        var numImg;
        for (var i = 0; i < container.numChildren; i++) {
            numImg = container.getChildAt(i);
            if (numImg instanceof eui.Image) {
                numImg.source = "";
                UIUtil._imgList.push(numImg);
            }
        }
        container.removeChildren();
    };
    /**
     * 显示积分
     */
    UIUtil.ShowScoreImg = function (score, container, scaleX, scaleY, isShowAction, isJiFen) {
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        if (isShowAction === void 0) { isShowAction = true; }
        if (isJiFen === void 0) { isJiFen = false; }
        if (container) {
            UIUtil.containerImgOper(container);
            var numImg = void 0;
            var tmpScore = Math.abs(score);
            var str = tmpScore.toString();
            var numList = [];
            for (var i = 0; i < str.length; i++) {
                numList.push(parseInt(str.slice(i, i + 1)));
            }
            var preName = void 0;
            var actionStr = StringConstant.empty;
            var fenImg = void 0;
            if (score >= 0) {
                preName = ResPrefixName.NumGreen;
                if (isShowAction) {
                    actionStr = "jia";
                }
            }
            else if (score < 0) {
                preName = ResPrefixName.NumRed;
                if (isShowAction) {
                    actionStr = "jian";
                }
            }
            fenImg = UIUtil.getExistImg(scaleX, scaleY);
            // if (isJiFen) //积分显示在前面
            // {
            // 	fenImg.source = ResPrefixName.JiFen + ResSuffixName.PNGSuffix;
            // 	container.addChild(fenImg);
            // }
            // else
            // { //分
            fenImg.source = preName + ResPrefixName.Fen + ResSuffixName.PNGSuffix;
            // }
            numImg = UIUtil.getExistImg(scaleX, scaleY);
            numImg.source = preName + actionStr + ResSuffixName.PNGSuffix;
            container.addChild(numImg);
            for (var i = 0; i < numList.length; i++) {
                numImg = UIUtil.getExistImg(scaleX, scaleY);
                numImg.source = preName + numList[i].toString() + ResSuffixName.PNGSuffix;
                container.addChild(numImg);
            }
            if (!isJiFen) {
                container.addChild(fenImg);
            }
            numList = null;
            str = null;
        }
    };
    UIUtil.getExistImg = function (scaleX, scaleY) {
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        var img = UIUtil._imgList.pop();
        if (!img) {
            img = new eui.Image();
        }
        img.scaleX = scaleX;
        img.scaleY = scaleY;
        return img;
    };
    /**
     * 获取数字颜色资源
     */
    UIUtil.getNumImg = function (num, type) {
        if (type === void 0) { type = NumResType.Red; }
        if (num >= 0 && num <= 9) {
            switch (type) {
                case NumResType.Red:
                    return ResPrefixName.NumRed + num.toString() + ResSuffixName.PNGSuffix;
                case NumResType.Green:
                    return ResPrefixName.NumGreen + num.toString() + ResSuffixName.PNGSuffix;
                case NumResType.Yellow:
                    return ResPrefixName.NumYellow + num.toString() + ResSuffixName.PNGSuffix;
            }
        }
    };
    /**
     * 显示头像
     */
    UIUtil.ShowHead = function (img, source) {
        if (img) {
            if (source) {
                img.source = source;
            }
            else {
                img.source = ImageSource.Default_Head;
            }
        }
    };
    UIUtil.setGlowerFilter = function (img) {
        if (!UIUtil.colorFilterList) {
            UIUtil.colorFilterList = new Array();
        }
        if (!UIUtil.colorFilter) {
            var colorMatrix = [
                1, 0, 0, 0, 10,
                0, 1, 0, 0, 10,
                0, 0, 1, 0, 10,
                0, 0, 0, 1, 0
            ];
            UIUtil.colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            UIUtil.colorFilterList[0] = UIUtil.colorFilter;
        }
        if (img) {
            img.filters = UIUtil.colorFilterList;
        }
    };
    UIUtil.clearFilters = function (img) {
        if (img) {
            img.filters = UIUtil.emptyFilterList;
        }
    };
    UIUtil._imgList = new Array();
    UIUtil.emptyFilterList = [];
    return UIUtil;
}());
__reflect(UIUtil.prototype, "UIUtil");
//# sourceMappingURL=UIUtil.js.map