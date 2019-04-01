/**
 * 牌局信息刷新
 */
class GamblingPanelInfoRefreshSupport extends BaseGamblingPanelSupport
{
	public initialize()
	{
		super.initialize();
		if (GamblingManager.roomInfo)
		{
			this.refresh();
		}
	}
	public refresh()
	{
		this.target.roomIdLabel.text = GamblingManager.roomInfo.id.toString();

		this.target.usualBlindGroup.visible = false;
		this.target.anteGroup.visible = false;
		this.target.championshipBlindGroup.visible = false;

		switch (GamblingManager.roomInfo.gamblingType)
		{
			case GamblingType.Common:
				this.target.usualBlindGroup.visible = true;
				break;
			case GamblingType.Championship:
				this.target.championshipBlindGroup.visible = true;
				this.target.anteGroup.visible = true;
				break;
			case GamblingType.Personal:
				break;
		}

		this.refreshBlindLabel();
		this.refreshPotLabel();
	}
	public onEnable()
	{
		super.onEnable();
		GamblingManager.PotChipsChangeEvent.addListener(this.potChipsChangeHandler, this);
		GamblingManager.PlayerStateChangeEvent.addListener(this.potChipsChangeHandler, this);
		GamblingManager.BlindChangeEvent.addListener(this.blindChangeHandler, this);
	}
	public onDisable()
	{
		super.onDisable();
		GamblingManager.PotChipsChangeEvent.removeListener(this.potChipsChangeHandler, this);
		GamblingManager.BlindChangeEvent.removeListener(this.blindChangeHandler, this);
		GamblingManager.PlayerStateChangeEvent.removeListener(this.potChipsChangeHandler, this);
	}
	private potChipsChangeHandler()
	{
		this.refreshPotLabel();
	}
	private blindChangeHandler()
	{
		this.refreshBlindLabel();
	}
	private refreshPotLabel()
	{
		this.target.potLabel.text = GamblingManager.totalPotChips.toString();
	}
	private refreshBlindLabel()
	{
		this.target.championshipBlindLabel.text = this.target.usualblindLabel.text = GamblingManager.roomInfo.sBlind.toString() + "/" + GamblingManager.roomInfo.bBlind.toString();
		this.target.anteLabel.text = GamblingManager.roomInfo.ante.toString();
	}
}