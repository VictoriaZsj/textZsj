/**
 * ui工具类
 */
class UIUtil
{
	/**
	 * 绑定列表数据源
	 */
	public static bindRender(group: eui.DataGroup, render: any, dataSource?: Array<any>): void
	{
		if (!group || !render)
		{
			return;
		}
		if (dataSource != undefined)
		{
			let bingData: eui.ArrayCollection = new eui.ArrayCollection(dataSource);
			group.dataProvider = bingData;
		}
		if (!group.itemRenderer)
		{
			if (typeof render == "string")
			{
				group.itemRendererSkinName = render;
			}
			else if (typeof render == "function")
			{
				group.itemRenderer = render;
			}
		}
	}
	/**
	 * 列表项渲染
	 */
	public static listRenderer(list: eui.List, scroller: eui.Scroller, renderer: any, dir?: ScrollViewDirection, operation?: string, data?: Array<any>, useVirtualLayout: boolean = false)
	{
		if (!list || !scroller || !renderer)
		{
			console.log("初始化失败！绑定的组件对象不能为空！");
			return;
		}
		if (dir != undefined && operation != undefined)
		{
			scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
			switch (dir)
			{
				case ScrollViewDirection.Horizontal_L_R:
					scroller.scrollPolicyH = operation;
					break;
				case ScrollViewDirection.Vertical_T_D:
					scroller.scrollPolicyV = operation;
					break;
			}
		}
		else
		{
			scroller.scrollPolicyH = eui.ScrollPolicy.AUTO;
			scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
		}
		UIUtil.bindRender(list, renderer, data);
		list.useVirtualLayout = useVirtualLayout;
		scroller.viewport = list;
	}
	/**
	 * 滚动到指定的索引
	 */
	public static scrollToIndex(scroller: eui.Scroller, itemSize: number, selectIndex: number)
	{
		if (scroller && scroller.viewport)
		{
			let v: number = itemSize * selectIndex;
			if (scroller.scrollPolicyH != eui.ScrollPolicy.OFF)
			{
				scroller.viewport.scrollH = v;
			}
			if (scroller.scrollPolicyV != eui.ScrollPolicy.OFF)
			{
				scroller.viewport.scrollV = v;
			}
		}
	}
	/**
	 * 隐藏滚动条
	 */
	public static hideScrollerBar(scroller: eui.Scroller, h: boolean = true, v: boolean = true)
	{
		if (h && scroller && scroller.horizontalScrollBar)
		{
			scroller.horizontalScrollBar.autoVisibility = false;
			scroller.horizontalScrollBar.visible = false;
		}
		if (v && scroller && scroller.verticalScrollBar)
		{
			scroller.verticalScrollBar.autoVisibility = false;
			scroller.verticalScrollBar.visible = false;
		}
	}
	/**
	 * 获取水平布局
	 */
	public static getHTileLayout(hGap?: number, reqRc: number = 1, align: string = egret.HorizontalAlign.LEFT)
	{
		let ly: eui.TileLayout = new eui.TileLayout();
		ly.horizontalAlign = align;
		if (hGap != undefined)
		{
			ly.horizontalGap = hGap;
		}
		if (reqRc != undefined)
		{
			ly.requestedRowCount = reqRc;
		}
		return ly;
	}
	/**
	 * 获取垂直布局
	 */
	public static getVTileLayout(vGap?: number, reqCc: number = 1, align: string = egret.VerticalAlign.TOP)
	{
		let ly: eui.TileLayout = new eui.TileLayout();
		ly.verticalAlign = align;
		if (vGap != undefined)
		{
			ly.verticalGap = vGap;
		}
		if (reqCc != undefined)
		{
			ly.requestedColumnCount = reqCc;
		}
		return ly;
	}
	/**
	 * 获取网格布局
	 */
	public static getTileLayout(hGap?: number, vGap?: number, reqRc?: number, reqCc?: number, hAlign?: string, vAlign?: string)
	{
		let ly: eui.TileLayout = new eui.TileLayout();
		if (hGap != undefined)
		{
			ly.horizontalGap = hGap;
		}
		if (vGap != undefined)
		{
			ly.verticalGap = vGap;
		}
		if (reqRc != undefined)
		{
			ly.requestedRowCount = reqRc;
		}
		if (reqCc != undefined)
		{
			ly.requestedColumnCount = reqCc;
		}
		if (hAlign != undefined)
		{
			ly.horizontalAlign = hAlign;
		}
		if (vAlign != undefined)
		{
			ly.verticalAlign = vAlign;
		}
		return ly;
	}
	/**
	 * 获取性别图片资源
	 */
	public static getSexImgSource(sex: number): string
	{
		if (sex == Sex.Female)
		{
			return ImageSource.FemaleImg;
		}
		else if (sex == Sex.Male)
		{
			return ImageSource.MaleImg;
		}
		return StringConstant.empty;
	}
	/**
	 * 对容器进行子项重排
	 */
	public static refreshSortContainer<T extends egret.DisplayObjectContainer, U extends egret.DisplayObjectContainer>(list: Array<T>, container: U)
	{
		if (container && list)
		{
			for (let i: number = 0; i < list.length; i++)
			{
				container.addChild(list[i]);
			}
		}
	}
	private static _imgList: Array<eui.Image> = new Array<eui.Image>();
	/**
	 * 图片缓存处理
	 */
	public static containerImgOper(container: egret.DisplayObjectContainer)
	{
		ArrayUtil.Clear(UIUtil._imgList);
		let numImg: eui.Image;
		for (let i: number = 0; i < container.numChildren; i++)
		{
			numImg = container.getChildAt(i) as eui.Image;
			if (numImg instanceof eui.Image)
			{
				numImg.source = "";
				UIUtil._imgList.push(numImg);
			}
		}
		container.removeChildren();
	}
	/**
	 * 显示积分
	 */
	public static ShowScoreImg(score: number, container: egret.DisplayObjectContainer, scaleX: number = 1, scaleY: number = 1, isShowAction: boolean = true, isJiFen: boolean = false)
	{
		if (container)
		{
			UIUtil.containerImgOper(container);
			let numImg: eui.Image;
			let tmpScore: number = Math.abs(score);
			let str: string = tmpScore.toString();
			let numList: Array<number> = [];
			for (let i: number = 0; i < str.length; i++)
			{
				numList.push(parseInt(str.slice(i, i + 1)));
			}
			let preName: string;
			let actionStr: string = StringConstant.empty;
			let fenImg: eui.Image;

			if (score >= 0)
			{
				preName = ResPrefixName.NumGreen;
				if (isShowAction)
				{
					actionStr = "jia";
				}
			}
			else if (score < 0)
			{
				preName = ResPrefixName.NumRed;
				if (isShowAction)
				{
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

			for (let i: number = 0; i < numList.length; i++)
			{
				numImg = UIUtil.getExistImg(scaleX, scaleY);
				numImg.source = preName + numList[i].toString() + ResSuffixName.PNGSuffix;
				container.addChild(numImg);
			}
			if (!isJiFen)
			{
				container.addChild(fenImg);
			}
			numList = null;
			str = null;
		}
	}
	public static getExistImg(scaleX: number = 1, scaleY: number = 1): eui.Image
	{
		let img: eui.Image = UIUtil._imgList.pop();
		if (!img)
		{
			img = new eui.Image();
		}
		img.scaleX = scaleX;
		img.scaleY = scaleY;
		return img;
	}
	/**
	 * 获取数字颜色资源
	 */
	public static getNumImg(num: number, type: NumResType = NumResType.Red)
	{
		if (num >= 0 && num <= 9)
		{
			switch (type)
			{
				case NumResType.Red:
					return ResPrefixName.NumRed + num.toString() + ResSuffixName.PNGSuffix;
				case NumResType.Green:
					return ResPrefixName.NumGreen + num.toString() + ResSuffixName.PNGSuffix;
				case NumResType.Yellow:
					return ResPrefixName.NumYellow + num.toString() + ResSuffixName.PNGSuffix;
			}
		}
	}
	/**
	 * 显示头像
	 */
	public static ShowHead(img: eui.Image, source: string)
	{
		if (img)
		{
			if (source)
			{
				img.source = source;
			}
			else
			{
				img.source = ImageSource.Default_Head;
			}
		}
	}
	private static colorFilterList: Array<egret.ColorMatrixFilter>;
	private static colorFilter: egret.ColorMatrixFilter;
	public static setGlowerFilter(img: eui.UIComponent)
	{
		if (!UIUtil.colorFilterList)
		{
			UIUtil.colorFilterList = new Array<egret.ColorMatrixFilter>();
		}
		if (!UIUtil.colorFilter)
		{
			let colorMatrix = [
				1, 0, 0, 0, 10,
				0, 1, 0, 0, 10,
				0, 0, 1, 0, 10,
				0, 0, 0, 1, 0
			];
			UIUtil.colorFilter = new egret.ColorMatrixFilter(colorMatrix);
			UIUtil.colorFilterList[0] = UIUtil.colorFilter;
		}
		if (img)
		{
			img.filters = UIUtil.colorFilterList;
		}
	}
	private static emptyFilterList: Array<any> = [];
	public static clearFilters(img: eui.UIComponent)
	{
		if (img)
		{
			img.filters = UIUtil.emptyFilterList;
		}
	}
}
