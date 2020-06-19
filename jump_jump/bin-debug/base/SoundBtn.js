var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SoundBtn = (function (_super) {
    __extends(SoundBtn, _super);
    function SoundBtn() {
        var _this = _super.call(this) || this;
        _this.isPlay = false;
        _this.soundSource = "";
        _this.playIndex = 3;
        // this.skinName
        _this.skinName = skins.SoundBtnSkin;
        return _this;
    }
    SoundBtn.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        buttonTapAction(this.display, this.onSoundBtnClick, this);
    };
    SoundBtn.prototype.onSoundBtnClick = function () {
        if (!this.soundSource || this.soundSource == "")
            return;
        // soundController.playEffect("click_mp3", 0, 1);
        if (!this.isPlay) {
            this.playSound();
        }
        else {
            this.isPlay = false;
            this.tryPlaySoundAction(false);
        }
    };
    SoundBtn.prototype.soundDisplayAction = function () {
        this.playIndex++;
        if (this.playIndex > 3)
            this.playIndex = 1;
        this.display.source = "sound_play_" + this.playIndex + "_png";
    };
    SoundBtn.prototype.tryPlaySoundAction = function (play) {
        if (play) {
            timeController.addAlarm(300, this.soundDisplayAction, this, true);
        }
        else {
            timeController.removeAlarm(this.soundDisplayAction, this);
            this.playIndex = 3;
            this.display.source = "sound_play_" + this.playIndex + "_png";
        }
    };
    SoundBtn.prototype.playSound = function () {
        var _this = this;
        if (!this.soundSource || this.soundSource == "")
            return;
        soundController.playEffect(this.soundSource, 0, 1).playEnd = function () {
            _this.isPlay = false;
            _this.tryPlaySoundAction(false);
        };
        this.isPlay = true;
        this.tryPlaySoundAction(true);
    };
    SoundBtn.prototype.setSoundSource = function (source) {
        this.soundSource = source;
    };
    return SoundBtn;
}(eui.Component));
__reflect(SoundBtn.prototype, "SoundBtn");
