class SoundController {
    constructor() {
    }

    private _volume: number = 0.5;
    //设置所有音量
    set volume(volume: number) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._volume = volume;
        for (let url in this._effectHash) {
            this._effectHash[url].volume = volume;
        }
    }
    get volume() {
        return this._volume;
    }

    private _effectHash: { [url: string]: Sound } = {};
    playEffect(url: string, startTime?: number, loops?: number) {
        if (this._effectHash[url] && this._effectHash[url].loaded == 2) {
            this._effectHash[url].play(startTime, loops);
            if (this.isMuteEffect) {
                this._effectHash[url].mute();
            }
        } else {
            if (this._effectHash[url] && this._effectHash[url].loaded == 1) {
                return;
            }
            this._effectHash[url] = new Sound(url);
            this._effectHash[url].load().then(() => {
                this._effectHash[url].play(startTime, loops);
                if (this.isMuteEffect) {
                    this._effectHash[url].mute();
                }
            })
        }
        return this._effectHash[url];
    }
    stopEffect(url: string) {
        if (this._effectHash[url]) {
            this._effectHash[url].stop();
        }
    }


    setEffectVolumeByUrl(url: string, volume: number) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        if (this._effectHash[url]) {
            this._effectHash[url].volume = volume;
        }
    }

    getEffectVolumeByUrl(url: string) {
        if (this._effectHash[url]) {
            return this._effectHash[url].volume
        } else {
            return null;
        }
    }
    /**
     * 静音
     */
    isMuteEffect = false;
    public muteEffect(): void {
        for (let url in this._effectHash) {
            this._effectHash[url].mute();
        }
        egret.localStorage.setItem("muteEffect", "0")
        this.isMuteEffect = true;
    }

    /**
     * 恢复音量
     */
    public restoreEffectVolume(): void {
        for (let url in this._effectHash) {
            this._effectHash[url].restoreVolume();
        }
        egret.localStorage.setItem("muteEffect", "1")
        this.isMuteEffect = false;
    }

    private _bgMusicHash: { [url: string]: Sound } = {};

    public lastBg: string;

    playBG(url: string, startTime?: number, loops?: number) {
        if (this._bgMusicHash[url] && this._bgMusicHash[url].loaded == 2) {
            this._bgMusicHash[url].play(startTime, loops);
            if (this.isMuteBG) {
                this._bgMusicHash[url].mute();
            }
        } else {
            if (this._bgMusicHash[url] && this._bgMusicHash[url].loaded == 1) {
                return;
            }
            this._bgMusicHash[url] = new Sound(url);
            this._bgMusicHash[url].load().then(() => {
                this._bgMusicHash[url].play(startTime, loops);
                if (this.isMuteBG) {
                    this._bgMusicHash[url].mute();
                }
            })
        }
        return this._bgMusicHash[url];
    }
    stopBG(url: string) {
        if (this._bgMusicHash[url]) {
            this._bgMusicHash[url].stop();
        }
    }
    setBGVolumeByUrl(url: string, volume: number) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        if (this._bgMusicHash[url]) {
            this._bgMusicHash[url].volume = volume;
        }
    }
    getBGVolumeByUrl(url: string) {
        if (this._bgMusicHash[url]) {
            return this._bgMusicHash[url].volume
        } else {
            return null;
        }
    }
    /**
     * 静音
     */
    isMuteBG = false;
    public muteBG(): void {
        for (let url in this._bgMusicHash) {
            this._bgMusicHash[url].mute();
        }
        this.isMuteBG = true;
    }

    /**
     * 恢复音量
     */
    public restoreBGVolume(): void {
        for (let url in this._bgMusicHash) {
            this._bgMusicHash[url].restoreVolume();
        }
        this.isMuteBG = false;
    }


}
class Sound {
    private _currentChannel: egret.SoundChannel;
    private _currentSound: egret.Sound;
    private _isPlay = false;
    private _load = 0;
    constructor(private url: string) {

    }

    load() {
        return new Promise((resolve, reject) => {
            this._load = 1;
            this._currentSound = new egret.Sound();
            if (RES.getRes(this.url)) {
                this._currentSound = RES.getRes(this.url)
                this._load = 2;
                resolve(this._currentSound);
            } else {
                console.log("音频通过原生load")
                let tempListener = (e: egret.Event) => {
                    this._currentSound.removeEventListener(egret.Event.COMPLETE, tempListener, this);
                    this._load = 2;
                    resolve(this._currentSound);
                }
                this._currentSound.addEventListener(egret.Event.COMPLETE, tempListener, this);
                this._currentSound.load((typeof RES_ROOT === 'undefined' ? 'resource/' : RES_ROOT) + this.url);
            }
        })
    }

    get loaded() {
        return this._load;
    }


    play(startTime?: number, loops?: number) {
        if (!this._isPlay) {
            if (startTime == undefined) {
                startTime = 0;
            }
            if (loops == undefined) {
                loops = 0;
            }
            this._currentChannel = this._currentSound.play(startTime, loops);
            if (this._mute) {
                this._currentChannel.volume = 0;
            } else {
                this._currentChannel.volume = this._volume;
            }
            this._isPlay = true;
            this._currentChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.playOver, this);
        }
    }
    private playOver() {
        this._currentChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.playOver, this);
        this.playEnd();
        this._isPlay = false;
    }
    playEnd() {

    }
    stop() {
        if (this._isPlay) {
            this._currentChannel.stop();
            this._isPlay = false;
        }
    }
    private _volume: number = 0.5;
    set volume(value: number) {
        this._volume = value;
        if (this._isPlay) {
            this._currentChannel.volume = value;
        }
    }
    get volume() {
        return this._volume;
    }

    private _mute: boolean = false;
    /**
     * 静音
     */
    public mute(): void {
        this._mute = true;
        if (this._currentChannel && this._isPlay) {
            this._currentChannel.volume = 0;
        }
    }

    /**
     * 恢复音量
     */
    public restoreVolume(): void {
        this._mute = false;
        if (this._currentChannel && this._isPlay) {
            this._currentChannel.volume = this._volume;
        }
    }

}

const soundController = new SoundController();
var RES_ROOT: string;