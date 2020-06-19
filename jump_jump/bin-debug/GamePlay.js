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
var GamePlay = (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay(gameIndex) {
        var _this = _super.call(this) || this;
        _this.game_start = false;
        _this.ui_loaded = false;
        _this.resultAniNumber = 1;
        // ==========================================================================================================
        /**固定两个跳跃点 */
        // 左侧跳跃点
        _this.leftOrigin = { "x": 138, "y": 794 };
        // 右侧跳跃点
        _this.rightOrigin = { "x": 499, "y": 794 };
        // 方块资源列表
        _this.blockStrArr = [
            "block1_png", "block2_png", "block3_png"
        ];
        // 所有砖块集合
        _this.blockArr = [];
        /**
         * 生成砖块的方向
         * 1 = 右   -1 = 左
         */
        _this.direction = 1;
        // 随机盒子的最大最小水平距离
        _this.minDistance = 220;
        _this.maxDistance = 320;
        // tanθ角度值
        _this.tanAngle = 0.5;
        // 开始按压的时间
        _this.startT = 0;
        // 按压之后每秒的速度(水平方向)
        _this.speed = 300;
        // 按压之后在x轴移动的距离
        _this.distancX = 0;
        // 积分
        _this.score = 0;
        _this.skinName = skins.GamePlaySkin;
        _this.gameIndex = gameIndex;
        return _this;
    }
    GamePlay.prototype.refresh = function () {
        this.startGame();
    };
    GamePlay.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.ui_loaded = true;
        // this.btn_refresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshData, this);
        this.init();
    };
    GamePlay.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                mouse.enable(this.stage);
                this.startGame();
                return [2 /*return*/];
            });
        });
    };
    GamePlay.prototype.returnGame = function () {
        egret.Tween.removeAllTweens();
        if (this.gameIndex)
            this.gameIndex.returnGame();
    };
    GamePlay.prototype.initDBAction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    GamePlay.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.game_start)
                    return [2 /*return*/];
                this.clear();
                soundController.playBG("gameBgm_mp3");
                soundController.setBGVolumeByUrl("gameBgm_mp3", 0.4);
                this.game_start = true;
                this.lockWorld(false);
                // timeController.addAlarm(1000 / 60, this.timeTicker, this, true);
                this.addEvent();
                this.initBlock();
                return [2 /*return*/];
            });
        });
    };
    GamePlay.prototype.overGame = function (isShowResult) {
        if (isShowResult === void 0) { isShowResult = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.game_start = false;
                soundController.stopBG("gameBgm_mp3");
                soundController.stopEffect("tip_sound_mp3");
                egret.Tween.removeAllTweens();
                this.lockWorld(true);
                if (isShowResult) {
                    if (!this.result) {
                        this.result = new GameResult(this);
                    }
                    this.addChild(this.result);
                    this.result.showPage(true, 5);
                }
                return [2 /*return*/];
            });
        });
    };
    GamePlay.prototype.lockWorld = function (lock) {
        this.gameGroup.touchEnabled = !lock;
        this.gameGroup.touchChildren = !lock;
    };
    GamePlay.prototype.clear = function () {
        if (!this.ui_loaded)
            return;
        if (this.result && this.result.parent) {
            this.result.parent.removeChild(this.result);
            this.result = null;
        }
        for (var i = 0; i < this.blockArr.length; i++) {
            this.gameGroup.removeChild(this.blockArr[i]);
        }
        this.blockArr = [];
        this.direction = 1;
        this.score = 0;
    };
    /**
     * 添加事件监听
     */
    GamePlay.prototype.addEvent = function () {
        this.gameGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.gameGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    /**
     * 需要初始化第一块砖块和人物的落脚点
     */
    GamePlay.prototype.initBlock = function () {
        // 第一个砖块固定出现在左下角
        this.standBlock = this.getBlockItem();
        this.standBlock.x = this.leftOrigin.x;
        this.standBlock.y = this.leftOrigin.y;
        // 将人物移动到砖块上
        this.img_player.x = this.standBlock.x;
        this.img_player.y = this.standBlock.y;
        this.gameGroup.addChild(this.standBlock);
        // 固定第一步向右边跳
        this.direction = 1;
        // 生成下一个砖块
        this.setNextBlock();
        this.setScoreNum();
    };
    /**
     * 获取一个block块
     */
    GamePlay.prototype.getBlockItem = function () {
        var block = new eui.Image();
        // 随机获取一张图片资源
        var idx = Math.floor(Math.random() * 3);
        block.source = this.blockStrArr[idx];
        block.anchorOffsetX = 222;
        block.anchorOffsetY = 78;
        // 将当前的砖块存储起来方便后边移动位置和删除
        this.blockArr.push(block);
        return block;
    };
    /**
     * 生成下一个砖块
     */
    GamePlay.prototype.setNextBlock = function () {
        var block = this.getBlockItem();
        // 需要知道当前站立的砖块的位置
        var pos = new egret.Point(this.standBlock.x, this.standBlock.y);
        // 计算一段位移距离
        var distance = Math.floor(Math.random() * (this.maxDistance - this.minDistance) + this.minDistance);
        // 根据方向计算坐标
        // if (this.direction > 0) {
        //     // 向右
        //     // x坐标
        //     block.x = pos.x + distance;
        // } else {
        //     // 向左
        //     // x坐标
        //     block.x = pos.x - distance;
        // }
        block.x = pos.x + distance * this.direction;
        // 计算y坐标，利用正切值
        block.y = pos.y - distance * this.tanAngle;
        this.standBlock = block;
        this.gameGroup.addChild(block);
    };
    /**
     * 按压开始
     */
    GamePlay.prototype.touchBegin = function () {
        this.startT = timeController.getSystemTime();
        // 小人按压效果
        egret.Tween.get(this.img_player).to({ scaleY: 0.8 }, 500);
    };
    /**
     * 按压结束
     */
    GamePlay.prototype.touchEnd = function () {
        var _this = this;
        // 小人恢复
        this.img_player.scaleY = 1;
        // 开始时间
        var endT = timeController.getSystemTime();
        // 计算时间差
        var distanceT = (endT - this.startT) / 1000;
        // 根据时间差计算在x轴移动的距离
        this.distancX = this.speed * distanceT;
        // 屏蔽掉点击事件
        this.lockWorld(true);
        // 移动小人
        this.tagPose = new egret.Point();
        // 计算公式
        this.tagPose.x = this.img_player.x + this.distancX * this.direction;
        this.tagPose.y = this.img_player.y + this.distancX * this.direction * (this.img_player.y - this.standBlock.y) / (this.img_player.x - this.standBlock.x);
        egret.Tween.removeAllTweens();
        // 执行跳跃的动画
        // 轨迹按照贝塞尔曲线绘制
        egret.Tween.get(this).to({ factor: 1 }, 500).call(function () {
            // 移动结束之后的处理
            _this.checkResult();
        });
        // 让人物在空中翻滚
        // 先将人物的锚点设置在中间
        this.img_player.anchorOffsetX = this.img_player.width >> 1;
        this.img_player.anchorOffsetY = this.img_player.height >> 1;
        egret.Tween.get(this.img_player).to({ rotation: 360 * this.direction }, 200).call(function () {
            _this.img_player.anchorOffsetX = _this.img_player.width >> 1;
            _this.img_player.anchorOffsetY = _this.img_player.height - 20;
        });
    };
    /**
     * 检测跳跃结果
     */
    GamePlay.prototype.checkResult = function () {
        var _this = this;
        // this.standBlock
        // z^2 = x^2 + y^2
        var area = (this.maxDistance - this.minDistance - 15) * (this.maxDistance - this.minDistance - 15);
        var dis = (this.standBlock.x - this.img_player.x) * (this.standBlock.x - this.img_player.x) + (this.standBlock.y - this.img_player.y) * (this.standBlock.y - this.img_player.y);
        if (dis <= area) {
            // 成功
            // 添加积分
            ++this.score;
            this.setScoreNum();
            // 确定下一次跳跃的方向
            this.direction = Math.random() > 0.5 ? 1 : -1;
            // 计算偏移值
            var nextStartPos = new egret.Point(this.direction < 0 ? this.rightOrigin.x : this.leftOrigin.x, this.direction > 0 ? this.rightOrigin.y : this.leftOrigin.y);
            var diffX = nextStartPos.x - this.standBlock.x;
            var diffY = nextStartPos.y - this.standBlock.y;
            this.resetBlock(diffX, diffY);
            // 小人也需要对应的偏移
            egret.Tween.get(this.img_player).to({ x: this.img_player.x + diffX, y: this.img_player.y + diffY }, 1000).call(function () {
                // 移动结束,可以继续点击界面
                _this.lockWorld(false);
                // 生成新块
                _this.setNextBlock();
            });
        }
        else {
            // 失败
            // console.log("游戏结束");
            this.overGame();
        }
    };
    /**
     * 整体移动所有砖块的位置
     */
    GamePlay.prototype.resetBlock = function (diffX, diffY) {
        for (var i = this.blockArr.length - 1; i >= 0; i--) {
            var posX = this.blockArr[i].x + diffX;
            var posY = this.blockArr[i].y + diffY;
            if (this.blockArr[i].x <= -100
                || this.blockArr[i].y >= this.gameGroup.height + 100
                || this.blockArr[i].x >= this.gameGroup.width + 100) {
                // 超出范围之后，把当前的砖块删掉
                this.gameGroup.removeChild(this.blockArr[i]);
                this.blockArr.splice(i, 1);
            }
            else {
                // 移动还在场景中的砖块
                egret.Tween.get(this.blockArr[i]).to({ x: posX, y: posY }, 1000);
            }
            // (function () {
            //     let posX: number = this.blockArr[i].x + diffX;
            //     let posY: number = this.blockArr[i].y + diffY;
            //     let idx: number = i;
            //     egret.Tween.get(this.blockArr[i]).to({ x: posX, y: posY }, 1000).call(() => {
            //         if (posX <= -100
            //             || posY >= this.gameGroup.height + 100
            //             || posX >= this.gameGroup.width + 100) {
            //             // 超出范围之后，把当前的砖块删掉
            //             this.gameGroup.removeChild(this.blockArr[idx]);
            //             this.blockArr.splice(idx, 1);
            //         }
            //     })
            // }.bind(this))()
        }
    };
    /**
     * 更新分数显示
     */
    GamePlay.prototype.setScoreNum = function () {
        this["score_lab"].text = "\u5F97\u5206: " + this.score.toString();
    };
    Object.defineProperty(GamePlay.prototype, "factor", {
        get: function () {
            return 0;
        },
        /**
         * 贝塞尔曲线的原理参考   https://bbs.egret.com/thread-54151-1-1.html
         * 控制点取中线上的一个点
         */
        set: function (t) {
            this.img_player.x = (1 - t) * (1 - t) * this.img_player.x + 2 * t * (1 - t) * (this.img_player.x + this.tagPose.x) / 2 + t * t * (this.tagPose.x);
            this.img_player.y = (1 - t) * (1 - t) * this.img_player.y + 2 * t * (1 - t) * (this.tagPose.y - 300) + t * t * (this.tagPose.y);
        },
        enumerable: true,
        configurable: true
    });
    return GamePlay;
}(eui.Component));
__reflect(GamePlay.prototype, "GamePlay");
