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
var GameSetting = (function (_super) {
    __extends(GameSetting, _super);
    function GameSetting() {
        var _this = _super.call(this) || this;
        _this.btnList = ["restart", "sound"];
        _this.maskRectHeight = 20;
        _this.isOpen = false;
        _this.soundOpen = true;
        _this.isPlayAction = false;
        _this.isPlayMusic = true;
        _this.skinName = skins.GameSettingSkin;
        return _this;
    }
    GameSetting.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initBtnList();
        this.btnGroup.visible = true;
        buttonTapAction(this.btn_set, this.onSettingBtnClick, this);
        this.btn_set.name = "set";
        this.btnGroup.mask = this.maskRect;
        var btnH = 120;
        for (var i = 0; i < this.btnList.length; i++) {
            var name_1 = this.btnList[i];
            var resName = name_1;
            if (name_1 == "sound")
                resName = name_1 + "_on";
            var btn = new eui.Image("btn_" + resName + "_png");
            btn.name = name_1;
            this.btnGroup.addChild(btn);
            btn.anchorOffsetX = btn.width / 2;
            btn.anchorOffsetY = btn.height / 2;
            buttonTapAction(btn, this.onSettingBtnClick, this);
            btn.x = this.btnGroup.width / 2;
            btn.y = 80 + i * btnH + btnH / 2;
        }
        this.maskRectHeight = btnH * this.btnList.length + 80;
        this.bg.height = this.maskRectHeight;
        // this.btnGroup.y -= this.maskRectHeight;
        // this.maskRect.y = this.maskRectHeight;
        // this.maskRect.height = this.maskRectHeight;
    };
    GameSetting.prototype.initBtnList = function () {
        var checkList = [];
        for (var i = 0; i < this.btnList.length; i++) {
            var name_2 = this.btnList[i];
            //判度是否显示返回按钮
            if ((name_2 == "restart" || name_2 == "refresh") && !GameDevice.isShowSettingBtn) {
                continue;
            }
            checkList.push(name_2);
        }
        this.btnList = checkList;
    };
    GameSetting.prototype.playOpenAction = function () {
        var _this = this;
        egret.Tween.removeTweens(this.maskRect);
        egret.Tween.removeTweens(this.btnGroup);
        this.isPlayAction = true;
        var time = 200;
        if (this.isOpen) {
            egret.Tween.get(this.maskRect).to({ height: 0 }, time).call(function () {
                _this.isOpen = false;
                _this.isPlayAction = false;
            });
            // egret.Tween.get(this.btnGroup).to({ y: 70 }, time);
        }
        else {
            egret.Tween.get(this.maskRect).to({ height: this.maskRectHeight }, time).call(function () {
                _this.isOpen = true;
                _this.isPlayAction = false;
            });
            // egret.Tween.get(this.btnGroup).to({ y: 70 - this.maskRectHeight }, time);
        }
    };
    GameSetting.prototype.onSettingBtnClick = function (e) {
        if (this.isPlayAction)
            return;
        var name = e.currentTarget.name;
        switch (name) {
            case "set":
                this.playOpenAction();
                break;
            case "refresh":
                this.onRefreshBtnClick();
                this.playOpenAction();
                break;
            case "restart":
                this.onReStartBtnClick();
                this.playOpenAction();
                break;
            case "sound":
                this.onMusickBtnClick(e);
                break;
            default:
                break;
        }
        soundController.playEffect("click_mp3", 0, 1);
    };
    /**
     * 刷新按钮回调
     */
    GameSetting.prototype.onRefreshBtnClick = function () {
    };
    /**
     * 重玩按钮回调
     */
    GameSetting.prototype.onReStartBtnClick = function () {
    };
    GameSetting.prototype.onMusickBtnClick = function (e) {
        this.isPlayMusic = !this.isPlayMusic;
        var target = e.currentTarget;
        if (!this.isPlayMusic) {
            target.source = "btn_sound_off_png";
            soundController.muteBG();
        }
        else {
            target.source = "btn_sound_on_png";
            soundController.restoreBGVolume();
        }
    };
    return GameSetting;
}(eui.Component));
__reflect(GameSetting.prototype, "GameSetting");
