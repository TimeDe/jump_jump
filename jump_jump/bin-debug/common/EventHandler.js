var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventHandler = (function () {
    function EventHandler() {
        this._hander_maps = {};
    }
    //注册消息
    EventHandler.prototype.on = function (event, callBack, obj) {
        var list = this._hander_maps[event] || [];
        list.push({ cb: callBack, target: obj });
        this._hander_maps[event] = list;
    };
    //发送消息
    EventHandler.prototype.fire = function (event, data) {
        var list = this._hander_maps[event] || [];
        if (list.length == 0) {
            console.log("消息发送失败，无效的event事件：  ", event);
        }
        for (var i = 0; i < list.length; i++) {
            var info = list[i];
            info["cb"].call(info['target'], data);
        }
    };
    EventHandler.prototype.removeListener = function (event, callBack, obj) {
        var list = this._hander_maps[event] || [];
        if (list.length == 0) {
            console.log("事件移除失败，无效的event事件：  ", event);
        }
        var temp_list = [];
        for (var i = 0; i < list.length; i++) {
            var info = list[i];
            if (info["cb"] === callBack && info["target"] === obj)
                continue;
            temp_list.push(info);
        }
        this._hander_maps[event] = temp_list;
    };
    EventHandler.prototype.removeAll = function () {
        this._hander_maps = {};
    };
    return EventHandler;
}());
__reflect(EventHandler.prototype, "EventHandler");
