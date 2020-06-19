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
var GameResult = (function (_super) {
    __extends(GameResult, _super);
    function GameResult(parent) {
        var _this = _super.call(this) || this;
        _this.showWrongBook = false;
        _this.skinName = skins.GameResultSkin;
        _this._owner = parent;
        return _this;
    }
    GameResult.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // this.wrongAnswer.y = -1080;
        // this.replay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplayBtnClick, this);
        buttonTapAction(this.replay_btn, this.onReplayBtnClick, this);
        this.titleGroup.visible = false;
        this.enterAction.addEventListener("complete", this.onEnterActionComplete, this);
        // soundController.playEffect("wancheng_mp3");
    };
    GameResult.prototype.onReplayBtnClick = function () {
        // soundController.playEffect("click_mp3", 0, 1);
        soundController.stopEffect("huanhu_mp3");
        soundController.stopEffect("fail_mp3");
        if (this._owner) {
            this._owner.returnGame();
        }
    };
    GameResult.prototype.addBackGroundArmuture = function (ani) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.backBoard) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, dbFactory.createArmature("endpage", "endpage")];
                    case 1:
                        _a.backBoard = _b.sent();
                        this.backBoard.display.x = (this.width / 2);
                        this.backBoard.display.y = (this.height / 2) + 200;
                        this.backGroup.addChild(this.backBoard.display);
                        _b.label = 2;
                    case 2:
                        // let slot = this.backBoard.getSlot("5star")
                        // if (slot) {
                        // 	let result = new egret.Bitmap();
                        // 	let texture: egret.Texture = RES.getRes("topIcon_png");
                        // 	result.texture = texture;
                        // 	result.anchorOffsetX = result.width >> 1;
                        // 	result.anchorOffsetY = result.height >> 1;
                        // 	slot.display = result;
                        // }
                        this.backBoard.display.visible = true;
                        this.backBoard.play("end", 1, 0.5);
                        this.backBoard.addAnimationCompleteListener().then(function () {
                            _this.titleGroup.visible = GameDevice.isShowReturn;
                            window.platform.sendMessage(CMD.CODE.ANSWER, "\u7ED3\u675F", CMD.AnswerCode.Complete, CMD.FinishCode.Finish);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    GameResult.prototype.onEnterActionComplete = function () {
        // this.showStar();
        // timeController.addAlarm(gameDefines.resultShowTime, () => {
        // 	this.onReplayBtnClick();
        // }, this);
        // timeController.addAlarm(2000, () => {
        if (this.showWrongBook) {
            this.titleGroup.visible = false;
            // this.wrongAnswer.visible = true;
            if (this.backBoard)
                this.backBoard.display.visible = false;
            // egret.Tween.get(this.wrongAnswer).to({ y: 0 }, 800, egret.Ease.bounceOut).call(() => {
            // 	this.replay_btn.visible = true;
            // })
            this.replay_btn.visible = true;
        }
        else {
            this.replay_btn.visible = true;
        }
        // }, this);
    };
    /**
     * ani 1 welldone 0 tryagain
    */
    GameResult.prototype.showPage = function (show, ani) {
        if (ani === void 0) { ani = 0; }
        this.visible = show;
        this.touchEnabled = show;
        this.titleGroup.visible = false;
        // this.wrongAnswer.y = -700;
        // this.showWrongBook = (wrongList[0].length > 0 || wrongList[1].length > 0);
        // let icon = "result_" + ani + "_png";
        // this.topIcon.source = icon;
        // let wrongCount = wrongList[0].length;
        // if (wrongList[1].length < wrongCount)
        // 	wrongCount = wrongList[1].length;
        this.rightCountLabel.text = ani.toString();
        // if (this.showWrongBook)
        // 	this.wrongAnswer.openPage(wrongList)
        soundController.playEffect("huanhu_mp3", 0, 1);
        // this.addBackGroundArmuture(ani);
        // timeController.addAlarm(400, () => {
        this.titleGroup.visible = GameDevice.isShowReturn;
        this.enterAction.play(0);
        // }, this);
    };
    return GameResult;
}(eui.Component));
__reflect(GameResult.prototype, "GameResult");
