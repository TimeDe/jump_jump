var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundController = (function () {
    function SoundController() {
        this._volume = 0.5;
        this._effectHash = {};
        /**
         * 静音
         */
        this.isMuteEffect = false;
        this._bgMusicHash = {};
        /**
         * 静音
         */
        this.isMuteBG = false;
    }
    Object.defineProperty(SoundController.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        //设置所有音量
        set: function (volume) {
            volume = Math.min(volume, 1);
            volume = Math.max(volume, 0);
            this._volume = volume;
            for (var url in this._effectHash) {
                this._effectHash[url].volume = volume;
            }
        },
        enumerable: true,
        configurable: true
    });
    SoundController.prototype.playEffect = function (url, startTime, loops) {
        var _this = this;
        if (this._effectHash[url] && this._effectHash[url].loaded == 2) {
            this._effectHash[url].play(startTime, loops);
            if (this.isMuteEffect) {
                this._effectHash[url].mute();
            }
        }
        else {
            if (this._effectHash[url] && this._effectHash[url].loaded == 1) {
                return;
            }
            this._effectHash[url] = new Sound(url);
            this._effectHash[url].load().then(function () {
                _this._effectHash[url].play(startTime, loops);
                if (_this.isMuteEffect) {
                    _this._effectHash[url].mute();
                }
            });
        }
        return this._effectHash[url];
    };
    SoundController.prototype.stopEffect = function (url) {
        if (this._effectHash[url]) {
            this._effectHash[url].stop();
        }
    };
    SoundController.prototype.setEffectVolumeByUrl = function (url, volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        if (this._effectHash[url]) {
            this._effectHash[url].volume = volume;
        }
    };
    SoundController.prototype.getEffectVolumeByUrl = function (url) {
        if (this._effectHash[url]) {
            return this._effectHash[url].volume;
        }
        else {
            return null;
        }
    };
    SoundController.prototype.muteEffect = function () {
        for (var url in this._effectHash) {
            this._effectHash[url].mute();
        }
        egret.localStorage.setItem("muteEffect", "0");
        this.isMuteEffect = true;
    };
    /**
     * 恢复音量
     */
    SoundController.prototype.restoreEffectVolume = function () {
        for (var url in this._effectHash) {
            this._effectHash[url].restoreVolume();
        }
        egret.localStorage.setItem("muteEffect", "1");
        this.isMuteEffect = false;
    };
    SoundController.prototype.playBG = function (url, startTime, loops) {
        var _this = this;
        if (this._bgMusicHash[url] && this._bgMusicHash[url].loaded == 2) {
            this._bgMusicHash[url].play(startTime, loops);
            if (this.isMuteBG) {
                this._bgMusicHash[url].mute();
            }
        }
        else {
            if (this._bgMusicHash[url] && this._bgMusicHash[url].loaded == 1) {
                return;
            }
            this._bgMusicHash[url] = new Sound(url);
            this._bgMusicHash[url].load().then(function () {
                _this._bgMusicHash[url].play(startTime, loops);
                if (_this.isMuteBG) {
                    _this._bgMusicHash[url].mute();
                }
            });
        }
        return this._bgMusicHash[url];
    };
    SoundController.prototype.stopBG = function (url) {
        if (this._bgMusicHash[url]) {
            this._bgMusicHash[url].stop();
        }
    };
    SoundController.prototype.setBGVolumeByUrl = function (url, volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        if (this._bgMusicHash[url]) {
            this._bgMusicHash[url].volume = volume;
        }
    };
    SoundController.prototype.getBGVolumeByUrl = function (url) {
        if (this._bgMusicHash[url]) {
            return this._bgMusicHash[url].volume;
        }
        else {
            return null;
        }
    };
    SoundController.prototype.muteBG = function () {
        for (var url in this._bgMusicHash) {
            this._bgMusicHash[url].mute();
        }
        this.isMuteBG = true;
    };
    /**
     * 恢复音量
     */
    SoundController.prototype.restoreBGVolume = function () {
        for (var url in this._bgMusicHash) {
            this._bgMusicHash[url].restoreVolume();
        }
        this.isMuteBG = false;
    };
    return SoundController;
}());
__reflect(SoundController.prototype, "SoundController");
var Sound = (function () {
    function Sound(url) {
        this.url = url;
        this._isPlay = false;
        this._load = 0;
        this._volume = 0.5;
        this._mute = false;
    }
    Sound.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._load = 1;
            _this._currentSound = new egret.Sound();
            if (RES.getRes(_this.url)) {
                _this._currentSound = RES.getRes(_this.url);
                _this._load = 2;
                resolve(_this._currentSound);
            }
            else {
                console.log("音频通过原生load");
                var tempListener_1 = function (e) {
                    _this._currentSound.removeEventListener(egret.Event.COMPLETE, tempListener_1, _this);
                    _this._load = 2;
                    resolve(_this._currentSound);
                };
                _this._currentSound.addEventListener(egret.Event.COMPLETE, tempListener_1, _this);
                _this._currentSound.load((typeof RES_ROOT === 'undefined' ? 'resource/' : RES_ROOT) + _this.url);
            }
        });
    };
    Object.defineProperty(Sound.prototype, "loaded", {
        get: function () {
            return this._load;
        },
        enumerable: true,
        configurable: true
    });
    Sound.prototype.play = function (startTime, loops) {
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
            }
            else {
                this._currentChannel.volume = this._volume;
            }
            this._isPlay = true;
            this._currentChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.playOver, this);
        }
    };
    Sound.prototype.playOver = function () {
        this._currentChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.playOver, this);
        this.playEnd();
        this._isPlay = false;
    };
    Sound.prototype.playEnd = function () {
    };
    Sound.prototype.stop = function () {
        if (this._isPlay) {
            this._currentChannel.stop();
            this._isPlay = false;
        }
    };
    Object.defineProperty(Sound.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            this._volume = value;
            if (this._isPlay) {
                this._currentChannel.volume = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 静音
     */
    Sound.prototype.mute = function () {
        this._mute = true;
        if (this._currentChannel && this._isPlay) {
            this._currentChannel.volume = 0;
        }
    };
    /**
     * 恢复音量
     */
    Sound.prototype.restoreVolume = function () {
        this._mute = false;
        if (this._currentChannel && this._isPlay) {
            this._currentChannel.volume = this._volume;
        }
    };
    return Sound;
}());
__reflect(Sound.prototype, "Sound");
var soundController = new SoundController();
var RES_ROOT;
