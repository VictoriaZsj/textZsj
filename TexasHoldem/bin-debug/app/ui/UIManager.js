var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 界面显示管理
 */
var UIManager = (function () {
    function UIManager() {
    }
    Object.defineProperty(UIManager, "panelDict", {
        get: function () {
            return UIManager._panelDict;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.initialize = function (stage) {
        UIManager._gameLayer = new eui.Group();
        UIManager._mainUiLayer = new eui.Group();
        UIManager._moduleLayer = new eui.Group();
        UIManager._tipsLayer = new eui.Group();
        UIManager._guideLayer = new eui.Group();
        UIManager._warnLayer = new eui.Group();
        stage.addChild(UIManager._gameLayer);
        stage.addChild(UIManager._mainUiLayer);
        stage.addChild(UIManager._moduleLayer);
        stage.addChild(UIManager._tipsLayer);
        stage.addChild(UIManager._guideLayer);
        stage.addChild(UIManager._warnLayer);
        UIManager._panelDict = new Dictionary();
        UIManager._layerDict = new Dictionary();
        UIManager._layerDict.add(UILayerType.GameContent, UIManager._gameLayer);
        UIManager._layerDict.add(UILayerType.MainUI, UIManager._mainUiLayer);
        UIManager._layerDict.add(UILayerType.Module, UIManager._moduleLayer);
        UIManager._layerDict.add(UILayerType.Tips, UIManager._tipsLayer);
        UIManager._layerDict.add(UILayerType.Guide, UIManager._guideLayer);
        UIManager._layerDict.add(UILayerType.Warn, UIManager._warnLayer);
        var layerList = UIManager._layerDict.getValues();
        var layer;
        for (var i = 0; i < layerList.length; i++) {
            layer = layerList[i];
            layer.touchEnabled = false;
            layer.width = GameSetting.StageWidth;
            layer.height = GameSetting.StageHeight;
        }
        if (true) {
            stage.addChild(new TestPanel());
        }
    };
    UIManager.showPanel = function (panelName, data) {
        var targetPanel;
        targetPanel = UIManager._panelDict.getValue(panelName);
        if (!targetPanel) {
            var PanelClass = egret.getDefinitionByName(panelName);
            if (PanelClass) {
                targetPanel = new PanelClass();
                UIManager._panelDict.add(panelName, targetPanel);
            }
        }
        if (targetPanel) {
            var con = UIManager.getLayerContainer(targetPanel.layer);
            UIManager.setAlignInfo(targetPanel);
            targetPanel.init(data);
            if (con) {
                con.addChild(targetPanel);
            }
        }
    };
    UIManager.closePanel = function (panel) {
        var targetPanel;
        if (typeof panel == "string") {
            targetPanel = UIManager.getPanel(panel);
        }
        else if (panel instanceof BasePanel) {
            targetPanel = panel;
        }
        if (targetPanel && targetPanel.parent) {
            targetPanel.parent.removeChild(targetPanel);
        }
    };
    UIManager.getPanel = function (panelName) {
        if (panelName) {
            var panel = UIManager._panelDict.getValue(panelName);
            return panel;
        }
        throw new Error("面板名为空！");
    };
    UIManager.getLayerContainer = function (layer) {
        if (layer != UILayerType.None) {
            return UIManager._layerDict.getValue(layer);
        }
        return null;
    };
    UIManager.showFloatTips = function (tips) {
        UIManager.showPanel(UIModuleName.TextTipsPanel, tips);
    };
    /**
     * 对面板的visible属性设置，不触发面板的初始化流程
     */
    UIManager.showPanelByVisible = function (name, flag) {
        var panel = UIManager.getPanel(name);
        if (panel) {
            panel.visible = flag;
        }
    };
    UIManager.takeToTopLayer = function (panel) {
        var targetPanel;
        var con;
        if (typeof panel == "string") {
            targetPanel = UIManager.getPanel(panel);
            con = UIManager.getLayerContainer(targetPanel.layer);
        }
        else if (panel instanceof BasePanel) {
            targetPanel = panel;
            con = UIManager.getLayerContainer(panel.layer);
        }
        if (con && targetPanel) {
            targetPanel.parent.addChild(targetPanel);
        }
    };
    /**
     * 面板是否显示 根据面板名
     */
    UIManager.isShowPanel = function (panelName) {
        var panel = UIManager.getPanel(panelName);
        return UIManager.isShowPanelObj(panel);
    };
    /**
     * 面板是否显示
     */
    UIManager.isShowPanelObj = function (panel) {
        if (panel) {
            if (panel.parent && panel.visible) {
                return true;
            }
        }
        return false;
    };
    /*设置对齐方式*/
    UIManager.setAlignInfo = function (target) {
        if (!target.tweenGroup) {
            return;
        }
        target.top = NaN;
        target.bottom = NaN;
        target.left = NaN;
        target.right = NaN;
        target.horizontalCenter = NaN;
        target.verticalCenter = NaN;
        switch (target.panelAlignType) {
            case PanelAlignType.Center_Top:
                target.tweenGroup.horizontalCenter = target.offsetH;
                target.tweenGroup.top = target.offsetV;
                break;
            case PanelAlignType.Center_Center:
                target.tweenGroup.horizontalCenter = target.offsetH;
                target.tweenGroup.verticalCenter = target.offsetV;
                break;
            case PanelAlignType.Center_Bottom:
                target.tweenGroup.horizontalCenter = target.offsetH;
                target.tweenGroup.bottom = target.offsetV;
                break;
            case PanelAlignType.Left_Top:
                target.tweenGroup.left = target.offsetH;
                target.tweenGroup.top = target.offsetV;
                break;
            case PanelAlignType.Left_Bottom:
                target.tweenGroup.left = target.offsetH;
                target.tweenGroup.bottom = target.offsetV;
                break;
            case PanelAlignType.Left_Center:
                target.tweenGroup.left = target.offsetH;
                target.tweenGroup.verticalCenter = target.offsetV;
                break;
            case PanelAlignType.Right_Top:
                target.tweenGroup.right = target.offsetH;
                target.tweenGroup.top = target.offsetV;
                break;
            case PanelAlignType.Right_Center:
                target.tweenGroup.right = target.offsetH;
                target.tweenGroup.verticalCenter = target.offsetV;
                break;
            case PanelAlignType.Right_Bottom:
                target.tweenGroup.right = target.offsetH;
                target.tweenGroup.bottom = target.offsetV;
                break;
        }
    };
    /**
     * 添加事件
     */
    UIManager.addEventListener = function (moduleName, eventName, listener, thisObject) {
        UIManager._eventDispatcher.addListener(moduleName + eventName, listener, thisObject);
    };
    /**
     * 移除事件
     */
    UIManager.removeEventListener = function (moduleName, eventName, listener, thisObject) {
        UIManager._eventDispatcher.removeListener(moduleName + eventName, listener, thisObject);
    };
    /**
     * 广播事件
     */
    UIManager.dispatchEvent = function (moduleName, eventName, data) {
        UIManager._eventDispatcher.dispatch(moduleName + eventName, data);
    };
    /**
     * 清除所有事件
     */
    UIManager.removeAllEvent = function () {
        UIManager._eventDispatcher.clear();
    };
    UIManager._eventDispatcher = new CallDispatcher();
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map