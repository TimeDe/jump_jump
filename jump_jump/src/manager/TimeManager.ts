class GameTimeController {

    public eventList: Array<{ startTime: number, delay: number, callback: Function, thisObject: any, isLoop: boolean }>;
    passTime: number = 0;
    private lastTime: number = 0;
    constructor() {
        this.eventList = [];

    }

    public startTicker() {
        this.lastTime = new Date().getTime();
        egret.startTick(this.update, this);
    }

    public addAlarm(delay: number, callback: Function, thisObject: any, isLoop = false) {
        const currentTime = this.getSystemTime();
        this.eventList.push({ startTime: currentTime, delay, callback, thisObject, isLoop });
    }

    public removeAlarm(callback: Function, thisObject: any) {
        for (let i = 0; i < this.eventList.length; i++) {
            const eventObject = this.eventList[i];
            if (eventObject.callback == callback && eventObject.thisObject == thisObject) {
                this.eventList.splice(i, 1);
            }
        }
    }

    public setDelayTime(delay: number, callback: Function, thisObject: any) {
        for (let i = 0; i < this.eventList.length; i++) {
            const eventObject = this.eventList[i];
            if (eventObject.callback == callback && eventObject.thisObject == thisObject) {
                // this.eventList.splice(i, 1);
                this.eventList[i].delay = delay;
            }
        }

    }

    public check(sysTime: number) {
        const eventList = this.eventList.slice();
        for (let i = 0; i < eventList.length; i++) {
            const eventObject = eventList[i];
            const { startTime, delay, callback, thisObject, isLoop } = eventObject;
            if (sysTime < startTime + delay) {
                continue;
            }
            // 时间到了
            callback.call(thisObject, sysTime);
            if (isLoop) {
                eventList[i].startTime = sysTime;
            } else {
                this.removeAlarm(callback, thisObject);
            }
        }
        return true;
    }

    public getSystemTime() {
        return new Date().getTime();
    }

    public dispose() {
        this.eventList = [];
        egret.stopTick(this.update, this);
    }

    private update() {
        const sysTime = this.getSystemTime();
        this.check(sysTime);
        if (sysTime - this.lastTime >= 500) {
            let offset = sysTime - this.lastTime;
            this.passTime = this.passTime + offset;
            this.lastTime = new Date().getTime();
        }
        return true;
    }
}
const timeController = new GameTimeController();