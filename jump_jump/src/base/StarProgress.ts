class StarProgress extends eui.Component {
	public constructor() {
		super();
		this.skinName = skins.StarProgressSkin;
	}

	public progressGroup: eui.Group;
	public maskImage: eui.Image;
	public progressImg: eui.Image;
	public star0: StarItem;
	public star1: StarItem;
	public star2: StarItem;
	public star3: StarItem;
	public star4: StarItem;

	private maxStar: number = 5;
	private currentStar: number = 0;
	private baseY = 532;
	private MaxHeight = 518;

	protected createChildren() {
		super.createChildren();
		this.progressGroup.mask = this.maskImage;
		this.progressImg.visible = true;
		this.baseY = this.maskImage.y + this.maskImage.height;
		this.MaxHeight = this.maskImage.height;
		this.clear();
	}

	private updateStarProgress() {
		let progress = this.currentStar / this.maxStar;
		this.progressImg.y = this.baseY - progress * this.MaxHeight;
		
	}

	setProgress(value: number) {
		value = Math.min(value, this.maxStar);
		value = Math.max(0, value);
		if (value == this.currentStar)
			return;
		for (let i = this.currentStar; i < value; i++) {
			(this["star" + i] as StarItem).showStar();
		}
		this.currentStar = value;
		this.updateStarProgress();
	}

	clear() {
		this.currentStar = 0;
		for (let i = 0; i < this.maxStar; i++) {
			(this["star" + i] as StarItem).clear();
		}
		this.updateStarProgress();
	}
}