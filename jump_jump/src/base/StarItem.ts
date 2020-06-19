class StarItem extends eui.Component {
	public constructor() {
		super();
		this.skinName = skins.StarSkin;
	}
	public star: eui.Image;
	public bg: eui.Image;


	showStar(withSound: boolean = true) {
		this.star.scaleX = 0;
		this.star.scaleY = 0;
		egret.Tween.removeTweens(this.star);
		this.star.visible = true;
		if (withSound)
			soundController.playEffect("star_mp3", 0, 1);
		egret.Tween.get(this.star).to({ scaleX: 1.5, scaleY: 1.5 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
	}

	changeSkin(bg: string, display: string) {
		this.bg.source = bg;
		this.star.source = display;
	}

	clear() {
		this.star.visible = false;
	}
}