class TextUtil
{
	private static _htmlParser: egret.HtmlTextParser;
	public static get htmlParser(): egret.HtmlTextParser
	{
		if(TextUtil._htmlParser == null)
		{
			TextUtil._htmlParser = new egret.HtmlTextParser();
		}
		return TextUtil._htmlParser;
	}
	public static parser(htmltext: string):Array<egret.ITextElement>
	{
		return TextUtil.htmlParser.parser(htmltext);
	}
	public static parse(htmltext: string):egret.ITextElement[]
	{
		return TextUtil.htmlParser.parse(htmltext);
	}
}