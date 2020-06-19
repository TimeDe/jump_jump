/**
 * 使用通过设置start，anchor, end 三个点，通过控制 progerss[0,1] 来模拟贝塞尔曲线运动，
 */

class BezierFactory {
	public constructor() {
	}


	private _progress: number = 0;

	private _bazier_x: number = 0;
	private _bazier_y: number = 0;

	private _star_point: { x: number, y: number } = { x: 0, y: 0 };
	private _achor_point: { x: number, y: number } = { x: 0, y: 0 };
	private _end_point: { x: number, y: number } = { x: 0, y: 0 };



	/**
	 * 贝塞尔曲线 t 值，范围[0,1]
	 */
	set progress(value: number) {
		if (value < 0)
			value = 0;
		if (value > 1) {
			value = 1;
		}
		this._progress = value;

		this._bazier_x = (1 - value) * (1 - value) * this._star_point.x + 2 * value * (1 - value) * this._achor_point.x + value * value * this._end_point.x;
		this._bazier_y = (1 - value) * (1 - value) * this._star_point.y + 2 * value * (1 - value) * this._achor_point.y + value * value * this._end_point.y;
		this.onValueChange(this._bazier_x, this._bazier_y);
}

	get progress() {
		return this._progress;
	}

	/**
	 * 通过此方法检测，贝塞尔曲线值发生改变
	 */
	onValueChange(x: number, y: number) {}

	setBezierPoint(startPoint: { x: number, y: number }, anchorpoint: { x: number, y: number }, endPoints: { x: number, y: number }) {
		this._star_point = startPoint;
		this._achor_point = anchorpoint;
		this._end_point = endPoints;
	}

}