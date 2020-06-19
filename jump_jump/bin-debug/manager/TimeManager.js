var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameTimeController = (function () {
    function GameTimeController() {
        this.passTime = 0;
        this.lastTime = 0;
        this.eventList = [];
    }
    GameTimeController.prototype.startTicker = function () {
        this.lastTime = new Date().getTime();
        egret.startTick(this.update, this);
    };
    GameTimeController.prototype.addAlarm = function (delay, callback, thisObject, isLoop) {
        if (isLoop === void 0) { isLoop = false; }
        var currentTime = this.getSystemTime();
        this.eventList.push({ startTime: currentTime, delay: delay, callback: callback, thisObject: thisObject, isLoop: isLoop });
    };
    GameTimeController.prototype.removeAlarm = function (callback, thisObject) {
        for (var i = 0; i < this.eventList.length; i++) {
            var eventObject = this.eventList[i];
            if (eventObject.callback == callback && eventObject.thisObject == thisObject) {
                this.eventList.splice(i, 1);
            }
        }
    };
    GameTimeController.prototype.setDelayTime = function (delay, callback, thisObject) {
        for (var i = 0; i < this.eventList.length; i++) {
            var eventObject = this.eventList[i];
            if (eventObject.callback == callback && eventObject.thisObject == thisObject) {
                // this.eventList.splice(i, 1);
                this.eventList[i].delay = delay;
            }
        }
    };
    GameTimeController.prototype.check = function (sysTime) {
        var eventList = this.eventList.slice();
        for (var i = 0; i < eventList.length; i++) {
            var eventObject = eventList[i];
            var startTime = eventObject.startTime, delay = eventObject.delay, callback = eventObject.callback, thisObject = eventObject.thisObject, isLoop = eventObject.isLoop;
            if (sysTime < startTime + delay) {
                continue;
            }
            // 时间到了
            callback.call(thisObject, sysTime);
            if (isLoop) {
                eventList[i].startTime = sysTime;
            }
            else {
                this.removeAlarm(callback, thisObject);
            }
        }
        return true;
    };
    GameTimeController.prototype.getSystemTime = function () {
        return new Date().getTime();
    };
    GameTimeController.prototype.dispose = function () {
        this.eventList = [];
        egret.stopTick(this.update, this);
    };
    GameTimeController.prototype.update = function () {
        var sysTime = this.getSystemTime();
        this.check(sysTime);
        if (sysTime - this.lastTime >= 500) {
            var offset = sysTime - this.lastTime;
            this.passTime = this.passTime + offset;
            this.lastTime = new Date().getTime();
        }
        return true;
    };
    return GameTimeController;
}());
__reflect(GameTimeController.prototype, "GameTimeController");
var timeController = new GameTimeController();
