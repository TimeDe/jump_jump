var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
        this.itemConfig = [
            // I
            [
                [1],
                [1],
                [1],
                [1],
            ],
            // J
            [
                [0, 1],
                [0, 1],
                [1, 1]
            ],
            // L
            [
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            // O
            [
                [1, 1],
                [1, 1]
            ],
            // Z
            [
                [1, 1, 0],
                [0, 1, 1]
            ],
            // T
            [
                [0, 1, 0],
                [1, 1, 1]
            ],
            // S
            [
                [0, 1, 1],
                [1, 1, 0]
            ],
        ];
    }
    GameData.prototype.getItems = function () {
        var list = [].concat(this.itemConfig);
        return list;
    };
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
var gameData = new GameData();
