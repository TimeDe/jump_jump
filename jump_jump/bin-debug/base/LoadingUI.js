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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/**
 * 农场加载
 */
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.bar_move = new eui.Image();
        _this.bar_mask = new eui.Image();
        _this.bar_bot = new eui.Image();
        _this.local_x = 650;
        _this.local_y = 697;
        _this.barLength = 100;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var my_bg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        my_bg = new eui.Rect;
                        my_bg.fillColor = 0xFEF9EC;
                        my_bg.width = this.stage.stageWidth;
                        my_bg.height = this.stage.stageHeight;
                        this.addChild(my_bg);
                        return [4 /*yield*/, this.addDBArmature()];
                    case 1:
                        _a.sent();
                        this.initLoading();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadingUI.prototype.initLoading = function () {
        var group = new eui.Group();
        group.x = this.stage.stageWidth / 2;
        group.y = this.local_y + 200;
        this.addChild(group);
        // 进度条
        this.bar_bot = new eui.Image(RES.getRes("loading_progress_bg_png"));
        this.bar_bot.x = group.width / 2;
        this.bar_bot.y = group.height / 2;
        group.addChild(this.bar_bot);
        this.bar_bot.anchorOffsetX = this.bar_bot.width / 2;
        this.bar_bot.anchorOffsetY = this.bar_bot.height / 2;
        var maskGroup = new eui.Group();
        group.addChild(maskGroup);
        maskGroup.y = -6;
        this.bar_move = new eui.Image("loading_progress_bar_png");
        maskGroup.addChild(this.bar_move);
        this.bar_move.anchorOffsetX = this.bar_move.width / 2;
        this.bar_move.anchorOffsetY = this.bar_move.height / 2;
        this.barLength = this.bar_move.width;
        this.bar_move.x -= this.barLength;
        this.bar_mask = new eui.Image("loading_progress_bar_png");
        maskGroup.addChild(this.bar_mask);
        this.bar_mask.anchorOffsetX = this.bar_mask.width / 2;
        this.bar_mask.anchorOffsetY = this.bar_mask.height / 2;
        maskGroup.mask = this.bar_mask;
        //文字
        this.textField = new egret.TextField();
        this.textField.fontFamily = "FZCuYuan-M03S";
        this.textField.text = "0%";
        this.textField.textAlign = "center";
        this.textField.size = 30;
        this.textField.textColor = 0xFFFFFF;
        // this.textField.y = 33;
        this.textField.width = this.stage.stageWidth;
        this.textField.height = 30;
        this.textField.anchorOffsetX = this.textField.width / 2;
        this.textField.anchorOffsetY = this.textField.height / 2;
        this.textField.y = -5;
        group.addChild(this.textField);
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "" + Math.floor((current / total) * 100).toString() + "%";
        this.bar_move.x = -this.barLength + this.barLength * (current / total);
    };
    //动画
    LoadingUI.prototype.addDBArmature = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbFactory.createArmature("loadingxiaoxiang", "xiaoxiangrunning").then(function (armature) {
                            _this.addChild(armature.display);
                            armature.display.x = _this.stage.stageWidth / 2;
                            armature.display.y = _this.local_y + 150;
                            var rect = new eui.Rect();
                            rect.fillColor = 0XFFFFFF;
                            rect.width = 804;
                            rect.height = 665;
                            rect.anchorOffsetX = rect.width >> 1;
                            rect.anchorOffsetY = rect.height >> 1;
                            rect.x = _this.stage.stageWidth / 2;
                            rect.y = _this.local_y - 50;
                            armature.display.mask = rect;
                            _this.addChild(rect);
                            armature.play("running", 0);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
