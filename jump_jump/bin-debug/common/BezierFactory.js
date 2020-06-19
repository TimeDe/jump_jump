/**
 * 使用通过设置start，anchor, end 三个点，通过控制 progerss[0,1] 来模拟贝塞尔曲线运动，
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BezierFactory = (function () {
    function BezierFactory() {
        this._progress = 0;
        this._bazier_x = 0;
        this._bazier_y = 0;
        this._star_point = { x: 0, y: 0 };
        this._achor_point = { x: 0, y: 0 };
        this._end_point = { x: 0, y: 0 };
    }
    Object.defineProperty(BezierFactory.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        /**
         * 贝塞尔曲线 t 值，范围[0,1]
         */
        set: function (value) {
            if (value < 0)
                value = 0;
            if (value > 1) {
                value = 1;
            }
            this._progress = value;
            this._bazier_x = (1 - value) * (1 - value) * this._star_point.x + 2 * value * (1 - value) * this._achor_point.x + value * value * this._end_point.x;
            this._bazier_y = (1 - value) * (1 - value) * this._star_point.y + 2 * value * (1 - value) * this._achor_point.y + value * value * this._end_point.y;
            this.onValueChange(this._bazier_x, this._bazier_y);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 通过此方法检测，贝塞尔曲线值发生改变
     */
    BezierFactory.prototype.onValueChange = function (x, y) { };
    BezierFactory.prototype.setBezierPoint = function (startPoint, anchorpoint, endPoints) {
        this._star_point = startPoint;
        this._achor_point = anchorpoint;
        this._end_point = endPoints;
    };
    return BezierFactory;
}());
__reflect(BezierFactory.prototype, "BezierFactory");
