class GameResult extends eui.Component {
	public constructor(parent: GamePlay) {
		super();
		this.skinName = skins.GameResultSkin;
		this._owner = parent;

	}

	public replay_btn: eui.Image;

	public rightCountLabel: eui.Label;


	public resultGroup: eui.Group;
	public numberImage: eui.Image;
	public backGroup: eui.Group;
	public titleGroup: eui.Group;
	// public wrongAnswer: WrongAnswers;

	public topIcon: eui.Image;




	private enterAction: egret.tween.TweenGroup;
	private _owner: GamePlay;

	private try: Armature;

	protected createChildren() {
		super.createChildren();
		// this.wrongAnswer.y = -1080;
		// this.replay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplayBtnClick, this);
		buttonTapAction(this.replay_btn, this.onReplayBtnClick, this);
		this.titleGroup.visible = false;

		this.enterAction.addEventListener("complete", this.onEnterActionComplete, this);
		// soundController.playEffect("wancheng_mp3");
	}


	private onReplayBtnClick() {
		// soundController.playEffect("click_mp3", 0, 1);
		soundController.stopEffect("huanhu_mp3");
		soundController.stopEffect("fail_mp3");
		if (this._owner) {
			this._owner.returnGame();
		}

	}

	private backBoard: Armature;
	private backDB2: Armature;
	private async addBackGroundArmuture(ani: number) {
		// if (!this.backDB2) {
		// 	this.backDB2 = await dbFactory.createArmature("caiqi", "light360");
		// 	this.backDB2.display.x = this.width / 2;
		// 	this.backDB2.display.y = this.height / 2;
		// 	this.backGroup.addChild(this.backDB2.display);
		// }

		// this.backDB2.play("light360");

		if (!this.backBoard) {
			this.backBoard = await dbFactory.createArmature("endpage", "endpage");
			this.backBoard.display.x = (this.width / 2);
			this.backBoard.display.y = (this.height / 2) + 200;
			this.backGroup.addChild(this.backBoard.display);
		}
		// let slot = this.backBoard.getSlot("5star")

		// if (slot) {
		// 	let result = new egret.Bitmap();
		// 	let texture: egret.Texture = RES.getRes("topIcon_png");
		// 	result.texture = texture;
		// 	result.anchorOffsetX = result.width >> 1;
		// 	result.anchorOffsetY = result.height >> 1;
		// 	slot.display = result;
		// }

		this.backBoard.display.visible = true;
		this.backBoard.play("end", 1, 0.5);
		this.backBoard.addAnimationCompleteListener().then(() => {
			this.titleGroup.visible = GameDevice.isShowReturn;
            window.platform.sendMessage(CMD.CODE.ANSWER, `结束`, CMD.AnswerCode.Complete, CMD.FinishCode.Finish);
		});
	}

	private onEnterActionComplete() {
		// this.showStar();
		// timeController.addAlarm(gameDefines.resultShowTime, () => {
		// 	this.onReplayBtnClick();
		// }, this);
		// timeController.addAlarm(2000, () => {
			if (this.showWrongBook) {
				this.titleGroup.visible = false;
				// this.wrongAnswer.visible = true;
				if (this.backBoard)
					this.backBoard.display.visible = false;
				// egret.Tween.get(this.wrongAnswer).to({ y: 0 }, 800, egret.Ease.bounceOut).call(() => {
				// 	this.replay_btn.visible = true;
				// })
				this.replay_btn.visible = true;
			} else {
				this.replay_btn.visible = true;

			}

		// }, this);

	}

	private showWrongBook: boolean = false;

	/** 
	 * ani 1 welldone 0 tryagain
	*/
	public showPage(show: boolean, ani: number = 0) {
		this.visible = show;
		this.touchEnabled = show;
		this.titleGroup.visible = false;
		// this.wrongAnswer.y = -700;
		// this.showWrongBook = (wrongList[0].length > 0 || wrongList[1].length > 0);

		// let icon = "result_" + ani + "_png";
		// this.topIcon.source = icon;
		
		// let wrongCount = wrongList[0].length;
		// if (wrongList[1].length < wrongCount)
		// 	wrongCount = wrongList[1].length;
		this.rightCountLabel.text = ani.toString();
		// if (this.showWrongBook)
		// 	this.wrongAnswer.openPage(wrongList)
		soundController.playEffect("huanhu_mp3", 0, 1);
		// this.addBackGroundArmuture(ani);
		// timeController.addAlarm(400, () => {
			this.titleGroup.visible = GameDevice.isShowReturn;
			this.enterAction.play(0);
		// }, this);
	}
}