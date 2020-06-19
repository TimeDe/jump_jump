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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GameIndex = (function (_super) {
    __extends(GameIndex, _super);
    // private game_start: boolean = false;
    function GameIndex() {
        var _this = _super.call(this) || this;
        _this.returnGame = function () {
            soundController.playEffect("sound_back_mp3", 0, 1);
            _this.playTitle();
            _this.indexGroup.visible = true;
            _this.play.overGame(false);
            _this.removeChild(_this.play);
            soundController.stopBG("gameBgm_mp3");
            _this.playScaleAction(true);
        };
        _this.skinName = skins.GameIndexSkin;
        return _this;
    }
    GameIndex.prototype.createChildren = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.createChildren.call(this);
                mouse.enable(this.stage);
                this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayBtnClick, this);
                this.playScaleAction(true);
                return [2 /*return*/];
            });
        });
    };
    GameIndex.prototype.onPlayBtnClick = function () {
        this.startGame();
    };
    GameIndex.prototype.playScaleAction = function (play) {
        egret.Tween.removeTweens(this.startBtn);
        this.startBtn.scaleX = 1;
        this.startBtn.scaleY = 1;
        if (play) {
            var scale = 1.1, scale2 = 0.9;
            egret.Tween.get(this.startBtn, { loop: true }).to({ scaleX: scale, scaleY: scale }, 1000)
                .to({ scaleX: scale2, scaleY: scale2 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        }
    };
    GameIndex.prototype.startGame = function () {
        this.indexGroup.visible = false;
        if (!this.play) {
            this.play = new GamePlay(this);
        }
        soundController.playEffect("sound_start_mp3", 0, 1);
        this.play.startGame();
        this.addChild(this.play);
    };
    GameIndex.prototype.playTitle = function () {
    };
    GameIndex.prototype.fredTap = function () {
        // this.fred.play("G4Fred", 1)
    };
    return GameIndex;
}(eui.Component));
__reflect(GameIndex.prototype, "GameIndex");
