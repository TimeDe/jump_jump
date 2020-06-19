class Keyset extends eui.Component {
	target: eui.Label;
	public keySetGroup: eui.Group;
	private key1: eui.Image;
	private key2: eui.Image;
	private key3: eui.Image;
	private key4: eui.Image;
	private key5: eui.Image;
	private key6: eui.Image;
	private key7: eui.Image;
	private key8: eui.Image;
	private key9: eui.Image;
	private key0: eui.Image;
	private keyRevise: eui.Button;
	private keyOk: eui.Button;
	private RectBj: eui.Rect;

	public constructor() {
		super();
		this.skinName = skins.KeySetSkin;
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		for (var i = 0; i < 10; i++) {
			this["key" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickKeyFun, this)
		}
		this.keyRevise.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reviseFun, this);
		this.keyOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitFun, this);
		this.RectBj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitFun, this);
	}

	private _num: number;
	set num(value: number) {
		this._num = value;
		if (this._num !== 0) {
			this.target.text = this._num.toString();
		} else {
			this.target.text = "";
		}
	}

	get num() {
		return this._num;
	}
	private clickKeyFun(e: egret.TouchEvent): void {
		var name = (e.target.source as string).split("_")[0];
		const temp = parseInt(name.split("key")[1]);
		this.num = this.num * 10 + temp;
	}

	init(target: eui.Label) {
		this.target = target;
		this.num = 0;
	}

	private reviseFun(): void {
		this.num = 0;
	}

	public submitFun(): void {
		this.visible = false;
	}

}

