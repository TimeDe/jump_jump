// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDefins = (function () {
    function GameDefins() {
        //小球出生x坐标
        this.ballBornX = 1628;
        //小球第一次快速进入屏幕的位置
        this.ballFirstEnterY = 700;
        this.ballEndPoint = { x: 297, y: 980 };
        this.ballSize = { width: 155, height: 165 };
        this.stepTime = 500;
        this.itemFlySpeed = 3500 / 1000; //道具飞行速度 每秒2000个像素
        this.ballSpeed = 150 / 1000;
        this.ballSpeed4 = 200 / 1000 * 5;
        this.resultShowTime = 4000;
        this.MaxCount = 7;
        /**地图的宽度 */
        this.mapWidth = 10;
        /**地图的高度 */
        this.mapHeight = 9;
        this.roundTime = 200;
    }
    return GameDefins;
}());
__reflect(GameDefins.prototype, "GameDefins");
var gameDefines = new GameDefins();
