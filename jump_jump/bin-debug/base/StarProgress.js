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
var StarProgress = (function (_super) {
    __extends(StarProgress, _super);
    function StarProgress() {
        var _this = _super.call(this) || this;
        _this.maxStar = 5;
        _this.currentStar = 0;
        _this.baseY = 532;
        _this.MaxHeight = 518;
        _this.skinName = skins.StarProgressSkin;
        return _this;
    }
    StarProgress.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.progressGroup.mask = this.maskImage;
        this.progressImg.visible = true;
        this.baseY = this.maskImage.y + this.maskImage.height;
        this.MaxHeight = this.maskImage.height;
        this.clear();
    };
    StarProgress.prototype.updateStarProgress = function () {
        var progress = this.currentStar / this.maxStar;
        this.progressImg.y = this.baseY - progress * this.MaxHeight;
    };
    StarProgress.prototype.setProgress = function (value) {
        value = Math.min(value, this.maxStar);
        value = Math.max(0, value);
        if (value == this.currentStar)
            return;
        for (var i = this.currentStar; i < value; i++) {
            this["star" + i].showStar();
        }
        this.currentStar = value;
        this.updateStarProgress();
    };
    StarProgress.prototype.clear = function () {
        this.currentStar = 0;
        for (var i = 0; i < this.maxStar; i++) {
            this["star" + i].clear();
        }
        this.updateStarProgress();
    };
    return StarProgress;
}(eui.Component));
__reflect(StarProgress.prototype, "StarProgress");
