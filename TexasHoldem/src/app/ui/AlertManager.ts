/**
 * 弹窗管理器
 */
class AlertManager
{
	/**
	 * 显示提示框
	 */
	public static showAlert(msg: string, onConfirm?: Function, onCancel?: Function, onConfirmParam?: any, title?: string, subTitle?: string, confirmLabel?: string, cancelLabel?: string, onCancelParam?: any)
	{
		let alertInfo: AlertInfo = PoolUtil.GetObject<AlertInfo>(AlertInfo);
		alertInfo.title = title;
		alertInfo.subTitle = subTitle;
		alertInfo.message = msg;
		alertInfo.OnConfirm = onConfirm;
		alertInfo.OnCancel = onCancel;
		alertInfo.confirmParam = onConfirmParam;
		alertInfo.cancleParam = onCancelParam;
		alertInfo.confirmLabel = confirmLabel;
		alertInfo.cancelLabel = cancelLabel;
		AlertManager.showAlertInfo(alertInfo);
	}
	/**
	 * 显示确认框
	 */
	public static showConfirm(msg: string, onConfirm?: Function, onCancel?: Function, onConfirmParam?: any, title?: string, subTitle?: string, confirmLabel?: string, cancelLabel?: string, onCancelParam?: any)
	{
		let alertInfo: AlertInfo = PoolUtil.GetObject<AlertInfo>(AlertInfo);
		alertInfo.title = title;
		alertInfo.subTitle = subTitle;
		alertInfo.message = msg;
		alertInfo.OnConfirm = onConfirm;
		alertInfo.OnCancel = onCancel;
		alertInfo.confirmParam = onConfirmParam;
		alertInfo.cancleParam = onCancelParam;
		alertInfo.confirmLabel = confirmLabel;
		alertInfo.cancelLabel = cancelLabel;
		alertInfo.isSingle = false;
		AlertManager.showAlertInfo(alertInfo);
	}
	/**
	 * 显示对话框 基于alertinfo
	 */
	public static showAlertInfo(alertInfo: AlertInfo)
	{
		UIManager.showPanel(UIModuleName.AlertInfoPanel, alertInfo);
	}
	/**
	 * 显示对话框 基于obj
	 */
	public static showAlertObj(obj: any)
	{
		UIManager.showPanel(UIModuleName.AlertInfoPanel, obj);
	}
	/**
	 * 显示提示框
	 */
	public static showAlertByString(msg: string)
	{
		UIManager.showPanel(UIModuleName.AlertInfoPanel, { isSingle: true, message: msg });
	}
	/**
	 * 显示确认框
	 */
	public static showConfirmByString(msg: string)
	{
		UIManager.showPanel(UIModuleName.AlertInfoPanel, { message: msg });
	}
}