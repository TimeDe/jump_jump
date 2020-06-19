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
var StarItem = (function (_super) {
    __extends(StarItem, _super);
    function StarItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.StarSkin;
        return _this;
    }
    StarItem.prototype.showStar = function (withSound) {
        if (withSound === void 0) { withSound = true; }
        this.star.scaleX = 0;
        this.star.scaleY = 0;
        egret.Tween.removeTweens(this.star);
        this.star.visible = true;
        if (withSound)
            soundController.playEffect("star_mp3", 0, 1);
        egret.Tween.get(this.star).to({ scaleX: 1.5, scaleY: 1.5 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    StarItem.prototype.changeSkin = function (bg, display) {
        this.bg.source = bg;
        this.star.source = display;
    };
    StarItem.prototype.clear = function () {
        this.star.visible = false;
    };
    return StarItem;
}(eui.Component));
__reflect(StarItem.prototype, "StarItem");
