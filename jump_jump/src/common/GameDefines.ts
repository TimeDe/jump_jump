// TypeScript file

class GameDefins {

    //小球出生x坐标
    ballBornX: number = 1628;
    //小球第一次快速进入屏幕的位置
    ballFirstEnterY: number = 700;
    ballEndPoint: { x: number, y: number } = { x: 297, y: 980 };
    ballSize = { width: 155, height: 165 };

    stepTime: number = 500;

    itemFlySpeed: number = 3500 / 1000; //道具飞行速度 每秒2000个像素

    ballSpeed: number = 150 / 1000;
    ballSpeed4: number = 200 / 1000 * 5;
    resultShowTime: number = 4000;

    MaxCount = 7;

    /**地图的宽度 */
    mapWidth = 10;
    /**地图的高度 */
    mapHeight = 9;
    roundTime: number = 200;
}

const gameDefines = new GameDefins();
