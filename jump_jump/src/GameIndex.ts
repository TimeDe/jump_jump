class GameIndex extends eui.Component {
    public indexGroup: eui.Group;
    public startBtn: eui.Image;
    public studentGroup: eui.Group;

    private titleDb: Armature;




    // private game_start: boolean = false;

    constructor() {
        super();
        this.skinName = skins.GameIndexSkin;
    }

    async  createChildren() {
        super.createChildren();
        mouse.enable(this.stage);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayBtnClick, this);
        this.playScaleAction(true);
    }

    private onPlayBtnClick() {
        this.startGame();
    }

    private playScaleAction(play: boolean) {
        egret.Tween.removeTweens(this.startBtn);
        this.startBtn.scaleX = 1;
        this.startBtn.scaleY = 1;

        if (play) {
            let scale = 1.1, scale2 = 0.9;
            egret.Tween.get(this.startBtn, { loop: true }).to({ scaleX: scale, scaleY: scale }, 1000)
                .to({ scaleX: scale2, scaleY: scale2 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        }
    }

    private play: GamePlay;
    startGame() {
        this.indexGroup.visible = false;
        if (!this.play) {
            this.play = new GamePlay(this);
        }
        soundController.playEffect("sound_start_mp3", 0, 1);
        this.play.startGame();
        this.addChild(this.play);
    }

    returnGame = () => {
        soundController.playEffect("sound_back_mp3", 0, 1);
        this.playTitle();
        this.indexGroup.visible = true;
        this.play.overGame(false);
        this.removeChild(this.play);
        soundController.stopBG("gameBgm_mp3");
        this.playScaleAction(true);
    }

    playTitle() {

    }

    fredTap() {
        // this.fred.play("G4Fred", 1)
    }
}