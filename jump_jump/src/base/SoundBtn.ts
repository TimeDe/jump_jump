class SoundBtn extends eui.Component {
	public constructor() {
		super();
		// this.skinName
		this.skinName = skins.SoundBtnSkin;
	}

	public display: eui.Image;
	private isPlay: boolean = false;
	private soundSource: string = "";
	private playIndex: number = 3;

	protected createChildren() {
		super.createChildren();
		buttonTapAction(this.display, this.onSoundBtnClick, this);
	}

	private onSoundBtnClick() {
		if (!this.soundSource || this.soundSource == "")
			return;

		// soundController.playEffect("click_mp3", 0, 1);
		if (!this.isPlay) {
			this.playSound();
		} else {
			this.isPlay = false;
			this.tryPlaySoundAction(false);
		}
	}

	private soundDisplayAction() {
		this.playIndex++;
			if (this.playIndex > 3)
				this.playIndex = 1;

			this.display.source = "sound_play_" + this.playIndex + "_png"
	}

	private tryPlaySoundAction(play: boolean) {
	

		if (play) {
			timeController.addAlarm(300, this.soundDisplayAction, this, true);
		} else {
			timeController.removeAlarm( this.soundDisplayAction, this);
			this.playIndex = 3;
			this.display.source = "sound_play_" + this.playIndex + "_png"
		}
	}

	public playSound() {
		if (!this.soundSource || this.soundSource == "")
			return;
		soundController.playEffect(this.soundSource, 0, 1).playEnd = () => {
			this.isPlay = false;
			this.tryPlaySoundAction(false);
		}
		this.isPlay = true;
		this.tryPlaySoundAction(true);
	}

	public setSoundSource(source: string) {
		this.soundSource = source;
	}
}