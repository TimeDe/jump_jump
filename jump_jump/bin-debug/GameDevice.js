var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDevice = (function () {
    function GameDevice() {
    }
    Object.defineProperty(GameDevice, "isShowReturn", {
        /**
         * 只用在结算页
         * 结算页的再玩一次按钮，omo显示 Ai课不显示
         */
        get: function () {
            // omo 返回按钮 ai课不显示
            if (window.__math2_res_config__ != undefined) {
                return true;
            }
            else if (window["isAI"]) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDevice, "isShowRefresh", {
        get: function () {
            // omo 显示刷新按钮 ai课不显示
            if (window.__math2_res_config__ != undefined) {
                return true;
            }
            else if (window["isAI"]) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDevice, "isShowSettingBtn", {
        /**
         * 控制设置按钮内的刷新或者返回按钮显隐
         * 游戏中的返回或者刷新，如果有结算页的这种，就把按钮隐藏掉，如果有的交互不需要结算页，就不隐藏了
         */
        get: function () {
            if (window.__math2_res_config__ != undefined) {
                return false;
            }
            else if (window["isAI"]) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    return GameDevice;
}());
__reflect(GameDevice.prototype, "GameDevice");
