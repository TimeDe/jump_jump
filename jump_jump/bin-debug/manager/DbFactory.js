var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
var DBFactory = (function () {
    function DBFactory() {
        this.baseFactory = new dragonBones.EgretFactory();
        this.armatureList = [];
        this.nameHash = {};
    }
    DBFactory.prototype.pushDBtoFactory = function (name) {
        var _this = this;
        var getDragonbonesData = RES.getResAsync(name + "_ske_json");
        var getTextureData = RES.getResAsync(name + "_tex_json");
        var getTexture = RES.getResAsync(name + "_tex_png");
        return Promise.all([getDragonbonesData, getTextureData, getTexture]).then(function (result) {
            var dragonbonesData = result[0];
            var textureData = result[1];
            var texture = result[2];
            _this.baseFactory.parseDragonBonesData(dragonbonesData);
            _this.baseFactory.parseTextureAtlasData(textureData, texture);
        }).catch(function (err) {
            console.error('解析龙骨失败');
        });
    };
    DBFactory.prototype.createArmature = function (name, acttionName) {
        return __awaiter(this, void 0, void 0, function () {
            var armatureName, dbAramature, armature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.nameHash[name]) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pushDBtoFactory(name)];
                    case 1:
                        _a.sent();
                        this.nameHash[name] = 1;
                        _a.label = 2;
                    case 2:
                        armatureName = acttionName;
                        if (!armatureName) {
                            armatureName = name;
                        }
                        return [4 /*yield*/, this.baseFactory.buildArmature(armatureName)];
                    case 3:
                        dbAramature = _a.sent();
                        armature = this.getArmatureInPool();
                        armature.initData(dbAramature, this.baseFactory);
                        return [2 /*return*/, armature];
                }
            });
        });
    };
    DBFactory.prototype.releaseArmature = function (armature) {
        if (armature) {
            armature.dispose(this.baseFactory);
            this.armatureList.push(armature);
        }
    };
    DBFactory.prototype.getArmatureInPool = function () {
        if (this.armatureList.length > 0) {
            return this.armatureList.pop();
        }
        else {
            return new Armature();
        }
    };
    return DBFactory;
}());
__reflect(DBFactory.prototype, "DBFactory");
var Armature = (function () {
    function Armature() {
    }
    Armature.prototype.play = function (animationName, playTimes, timeScale) {
        if (timeScale === void 0) { timeScale = 1; }
        this._armature.animation.play(animationName, playTimes).timeScale = timeScale;
    };
    Armature.prototype.stop = function (animationName) {
        this._armature.animation.stop(animationName);
    };
    Armature.prototype.gotoAndPlayByFrame = function (animationName, frame, playTimes) {
        return this._armature.animation.gotoAndPlayByFrame(animationName, frame, playTimes);
    };
    Armature.prototype.goToAndStopFrame = function (animationName, frameNum) {
        if (frameNum === void 0) { frameNum = 0; }
        this._armature.animation.gotoAndStopByFrame(animationName, frameNum);
    };
    Object.defineProperty(Armature.prototype, "display", {
        get: function () {
            return this._armature.display;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Armature.prototype, "eventDispatcher", {
        get: function () {
            return this._armature.eventDispatcher;
        },
        enumerable: true,
        configurable: true
    });
    Armature.prototype.initData = function (armature, factory) {
        this._armature = armature;
        factory.clock.add(this._armature);
    };
    Object.defineProperty(Armature.prototype, "armatureName", {
        get: function () {
            return this._armature.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Armature.prototype, "animation", {
        get: function () {
            return this._armature.animation;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 特殊用法，获取动画播放完成
     */
    Armature.prototype.addAnimationCompleteListener = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var animationComplete = function () {
                delete Armature.AnimationCompleteCallbackHash[_this._armature.hashCode];
                _this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, animationComplete, _this);
                resolve(_this);
            };
            Armature.AnimationCompleteCallbackHash[_this._armature.hashCode] = animationComplete;
            if (!_this._armature.eventDispatcher.hasDBEventListener(dragonBones.EventObject.COMPLETE)) {
                _this._armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.COMPLETE, animationComplete, _this);
            }
        });
    };
    Armature.prototype.clearAnimationCompleteListener = function () {
        var animationComplete = Armature.AnimationCompleteCallbackHash[this._armature.hashCode];
        this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, animationComplete, this);
        delete Armature.AnimationCompleteCallbackHash[this._armature.hashCode];
    };
    /**
     * 特殊用法，监听帧事件
     */
    Armature.prototype.addAnimationFRAMEListener = function (callback) {
        var _this = this;
        var FRAME_EVENT = function () {
            delete Armature.AnimationFRAMECallbackHash[_this._armature.hashCode];
            _this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.FRAME_EVENT, FRAME_EVENT, _this);
            callback();
        };
        Armature.AnimationCompleteCallbackHash[this._armature.hashCode] = FRAME_EVENT;
        if (!this._armature.eventDispatcher.hasDBEventListener(dragonBones.EventObject.FRAME_EVENT)) {
            this._armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.FRAME_EVENT, FRAME_EVENT, this);
        }
    };
    Armature.prototype.clearAnimationFRAMEListener = function () {
        var FRAME_EVENT = Armature.AnimationFRAMECallbackHash[this._armature.hashCode];
        this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, FRAME_EVENT, this);
        delete Armature.AnimationFRAMECallbackHash[this._armature.hashCode];
    };
    Armature.prototype.getSlot = function (slotName) {
        return this._armature.getSlot(slotName);
    };
    Armature.prototype.dispose = function (factory) {
        factory.clock.remove(this._armature);
        this._armature.dispose();
    };
    Object.defineProperty(Armature.prototype, "cacheframerate", {
        set: function (value) {
            this._armature.cacheFrameRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Armature.AnimationCompleteCallbackHash = {};
    Armature.AnimationFRAMECallbackHash = {};
    return Armature;
}());
__reflect(Armature.prototype, "Armature");
var dbFactory = new DBFactory();
