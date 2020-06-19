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
var Keyset = (function (_super) {
    __extends(Keyset, _super);
    function Keyset() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.KeySetSkin;
        return _this;
    }
    Keyset.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        for (var i = 0; i < 10; i++) {
            this["key" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickKeyFun, this);
        }
        this.keyRevise.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reviseFun, this);
        this.keyOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitFun, this);
        this.RectBj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitFun, this);
    };
    Object.defineProperty(Keyset.prototype, "num", {
        get: function () {
            return this._num;
        },
        set: function (value) {
            this._num = value;
            if (this._num !== 0) {
                this.target.text = this._num.toString();
            }
            else {
                this.target.text = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    Keyset.prototype.clickKeyFun = function (e) {
        var name = e.target.source.split("_")[0];
        var temp = parseInt(name.split("key")[1]);
        this.num = this.num * 10 + temp;
    };
    Keyset.prototype.init = function (target) {
        this.target = target;
        this.num = 0;
    };
    Keyset.prototype.reviseFun = function () {
        this.num = 0;
    };
    Keyset.prototype.submitFun = function () {
        this.visible = false;
    };
    return Keyset;
}(eui.Component));
__reflect(Keyset.prototype, "Keyset");
