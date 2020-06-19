class GameSetting extends eui.Component {
	public constructor() {
		super();
		this.skinName = skins.GameSettingSkin;
	}

	public btnGroup: eui.Group;
	public bg: eui.Image;
	public maskRect: eui.Rect;
	public btn_set: eui.Image;


	private btnList: string[] = ["restart", "sound"];

	private maskRectHeight: number = 20;

	private isOpen: boolean = false;

	private soundOpen: boolean = true;

	protected createChildren() {
		super.createChildren();
		this.initBtnList();
		this.btnGroup.visible = true;
		buttonTapAction(this.btn_set, this.onSettingBtnClick, this);
		this.btn_set.name = "set";
		this.btnGroup.mask = this.maskRect;
		let btnH: number = 120;
		for (let i = 0; i < this.btnList.length; i++) {
			let name = this.btnList[i];
			let resName = name;
			if (name == "sound")
				resName = name + "_on"
			let btn = new eui.Image("btn_" + resName + "_png");
			btn.name = name;
			this.btnGroup.addChild(btn);
			btn.anchorOffsetX = btn.width / 2;
			btn.anchorOffsetY = btn.height / 2;
			buttonTapAction(btn, this.onSettingBtnClick, this);			
			btn.x = this.btnGroup.width / 2;
			btn.y = 80 + i * btnH + btnH / 2;
		}
		this.maskRectHeight =  btnH * this.btnList.length + 80;
		this.bg.height = this.maskRectHeight;
		// this.btnGroup.y -= this.maskRectHeight;
		// this.maskRect.y = this.maskRectHeight;
		// this.maskRect.height = this.maskRectHeight;


	}

	private initBtnList() {
		let checkList = [];
		for (let i: number = 0; i < this.btnList.length; i++) {
			let name = this.btnList[i];
			//判度是否显示返回按钮
			if ((name == "restart" || name == "refresh") && !GameDevice.isShowSettingBtn) {
				continue;
			}
			checkList.push(name);
		}
		this.btnList = checkList;
	}

	private isPlayAction: boolean = false;
	private playOpenAction() {
		egret.Tween.removeTweens(this.maskRect);
		egret.Tween.removeTweens(this.btnGroup)
		this.isPlayAction = true;
		let time = 200;
		if (this.isOpen) {
			egret.Tween.get(this.maskRect).to({ height: 0 }, time).call(() => {
				this.isOpen = false;
				this.isPlayAction = false;
			});
			// egret.Tween.get(this.btnGroup).to({ y: 70 }, time);
		} else {
			egret.Tween.get(this.maskRect).to({ height: this.maskRectHeight }, time).call(() => {
				this.isOpen = true;
				this.isPlayAction = false;
			});
			// egret.Tween.get(this.btnGroup).to({ y: 70 - this.maskRectHeight }, time);

		}
	}
	private onSettingBtnClick(e: egret.TouchEvent) {
		if (this.isPlayAction)
			return;
		let name = e.currentTarget.name;
		switch (name) {
			case "set":
				this.playOpenAction();
				break;
			case "refresh":
				this.onRefreshBtnClick();
				this.playOpenAction();
				break;
			case "restart":
				this.onReStartBtnClick();
				this.playOpenAction();
				break;	
			case "sound":
				this.onMusickBtnClick(e);
				break;
			default:
				break;
		}
		soundController.playEffect("click_mp3", 0, 1);
	}

	/**
	 * 刷新按钮回调
	 */
	public onRefreshBtnClick() {
	}

	/**
	 * 重玩按钮回调
	 */
	public onReStartBtnClick() {
	}

	private isPlayMusic: boolean = true;
	public onMusickBtnClick(e: egret.TouchEvent) {
		this.isPlayMusic = !this.isPlayMusic;
		let target: eui.Image = e.currentTarget as eui.Image;
        if (!this.isPlayMusic) {
            target.source = "btn_sound_off_png";
            soundController.muteBG();
        } else {
            target.source = "btn_sound_on_png";
            soundController.restoreBGVolume();
        }
	}
}