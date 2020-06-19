class GamePlay extends eui.Component {
    constructor(gameIndex: GameIndex) {
        super();
        this.skinName = skins.GamePlaySkin;
        this.gameIndex = gameIndex;
    }

    private gameIndex: GameIndex;
    public gameGroup: eui.Group;
    private game_start: boolean = false;

    refresh() {
        this.startGame();
    }

    private ui_loaded: boolean = false;
    protected createChildren() {
        super.createChildren();
        this.ui_loaded = true;
        // this.btn_refresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshData, this);
        this.init();
    }

    async init() {
        mouse.enable(this.stage);
        this.startGame();
    }

    public returnGame() {
        egret.Tween.removeAllTweens();
        if (this.gameIndex)
            this.gameIndex.returnGame();
    }

    private async initDBAction() {

    }
    async   startGame() {
        if (this.game_start)
            return;
        this.clear();
        soundController.playBG("gameBgm_mp3");
        soundController.setBGVolumeByUrl("gameBgm_mp3", 0.4);
        this.game_start = true;
        this.lockWorld(false);
        // timeController.addAlarm(1000 / 60, this.timeTicker, this, true);

        this.addEvent();
        this.initBlock();
    }

    private result: GameResult;
    private resultAniNumber: number = 1;
    async   overGame(isShowResult = true) {
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
    }

    private lockWorld(lock: boolean) {
        this.gameGroup.touchEnabled = !lock;
        this.gameGroup.touchChildren = !lock;

    }

    clear() {
        if (!this.ui_loaded)
            return;
        if (this.result && this.result.parent) {
            this.result.parent.removeChild(this.result);
            this.result = null;
        }

        for (let i: number = 0; i < this.blockArr.length; i++) {
            this.gameGroup.removeChild(this.blockArr[i]);
        }
        this.blockArr = [];
        this.direction = 1;
        this.score = 0;
    }

    // ==========================================================================================================
    /**固定两个跳跃点 */
    // 左侧跳跃点
    private leftOrigin = { "x": 138, "y": 794 };
    // 右侧跳跃点
    private rightOrigin = { "x": 499, "y": 794 };
    // 方块资源列表
    private blockStrArr: string[] = [
        "block1_png", "block2_png", "block3_png"
    ]
    // 控制的角色
    private img_player: eui.Image;
    // 所有砖块集合
    private blockArr: eui.Image[] = [];
    /**
     * 生成砖块的方向
     * 1 = 右   -1 = 左
     */
    private direction: number = 1;
    // 当前站立的砖块
    private standBlock: eui.Image;
    // 随机盒子的最大最小水平距离
    private minDistance = 220;
    private maxDistance = 320;
    // tanθ角度值
    public tanAngle: number = 0.5;
    // 开始按压的时间
    private startT: number = 0;
    // 按压之后每秒的速度(水平方向)
    private speed: number = 300;
    // 按压之后在x轴移动的距离
    private distancX: number = 0;
    // 目标点的坐标
    private tagPose: egret.Point;
    // 积分
    private score: number = 0;

    /**
     * 添加事件监听
     */
    private addEvent() {
        this.gameGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.gameGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    /**
     * 需要初始化第一块砖块和人物的落脚点
     */
    private initBlock() {
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
    }

    /**
     * 获取一个block块
     */
    private getBlockItem(): eui.Image {
        let block = new eui.Image();
        // 随机获取一张图片资源
        let idx: number = Math.floor(Math.random() * 3);
        block.source = this.blockStrArr[idx];
        block.anchorOffsetX = 222;
        block.anchorOffsetY = 78;

        // 将当前的砖块存储起来方便后边移动位置和删除
        this.blockArr.push(block);
        return block;
    }

    /**
     * 生成下一个砖块
     */
    private setNextBlock() {
        let block = this.getBlockItem();
        // 需要知道当前站立的砖块的位置
        let pos: egret.Point = new egret.Point(this.standBlock.x, this.standBlock.y);
        // 计算一段位移距离
        let distance: number = Math.floor(Math.random() * (this.maxDistance - this.minDistance) + this.minDistance);

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
    }

    /**
     * 按压开始
     */
    private touchBegin() {
        this.startT = timeController.getSystemTime();

        // 小人按压效果
        egret.Tween.get(this.img_player).to({ scaleY: 0.8 }, 500);
    }

    /**
     * 按压结束
     */
    private touchEnd() {
        // 小人恢复
        this.img_player.scaleY = 1;
        // 开始时间
        let endT = timeController.getSystemTime();
        // 计算时间差
        let distanceT = (endT - this.startT) / 1000;
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
        egret.Tween.get(this).to({ factor: 1 }, 500).call(() => {
            // 移动结束之后的处理

            this.checkResult();
        });

        // 让人物在空中翻滚
        // 先将人物的锚点设置在中间
        this.img_player.anchorOffsetX = this.img_player.width >> 1;
        this.img_player.anchorOffsetY = this.img_player.height >> 1;
        egret.Tween.get(this.img_player).to({ rotation: 360 * this.direction }, 200).call(() => {
            this.img_player.anchorOffsetX = this.img_player.width >> 1;
            this.img_player.anchorOffsetY = this.img_player.height - 20;
        })
    }

    /**
     * 检测跳跃结果
     */
    private checkResult() {
        // this.standBlock
        // z^2 = x^2 + y^2
        const area = (this.maxDistance - this.minDistance - 15) * (this.maxDistance - this.minDistance - 15);
        let dis = (this.standBlock.x - this.img_player.x) * (this.standBlock.x - this.img_player.x) + (this.standBlock.y - this.img_player.y) * (this.standBlock.y - this.img_player.y);
        if (dis <= area) {
            // 成功
            // 添加积分
            ++this.score;
            this.setScoreNum();
            // 确定下一次跳跃的方向
            this.direction = Math.random() > 0.5 ? 1 : -1;
            // 计算偏移值
            let nextStartPos: egret.Point = new egret.Point(this.direction < 0 ? this.rightOrigin.x : this.leftOrigin.x, this.direction > 0 ? this.rightOrigin.y : this.leftOrigin.y);
            let diffX = nextStartPos.x - this.standBlock.x;
            let diffY = nextStartPos.y - this.standBlock.y;

            this.resetBlock(diffX, diffY);

            // 小人也需要对应的偏移
            egret.Tween.get(this.img_player).to({ x: this.img_player.x + diffX, y: this.img_player.y + diffY }, 1000).call(() => {
                // 移动结束,可以继续点击界面
                this.lockWorld(false);

                // 生成新块
                this.setNextBlock();
            });


        } else {
            // 失败
            // console.log("游戏结束");
            this.overGame();
        }
    }

    /**
     * 整体移动所有砖块的位置
     */
    private resetBlock(diffX: number, diffY: number) {
        for (let i: number = this.blockArr.length - 1; i >= 0; i--) {
            let posX: number = this.blockArr[i].x + diffX;
            let posY: number = this.blockArr[i].y + diffY;
            if (this.blockArr[i].x <= -100
                || this.blockArr[i].y >= this.gameGroup.height + 100
                || this.blockArr[i].x >= this.gameGroup.width + 100) {
                // 超出范围之后，把当前的砖块删掉
                this.gameGroup.removeChild(this.blockArr[i]);
                this.blockArr.splice(i, 1);
            } else {
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
    }

    /**
     * 更新分数显示
     */
    private setScoreNum() {
        this[`score_lab`].text = `得分: ${this.score.toString()}`;
    }

    public get factor(): number {
        return 0;
    }

    /**
     * 贝塞尔曲线的原理参考   https://bbs.egret.com/thread-54151-1-1.html
     * 控制点取中线上的一个点
     */
    public set factor(t: number) {
        this.img_player.x = (1 - t) * (1 - t) * this.img_player.x + 2 * t * (1 - t) * (this.img_player.x + this.tagPose.x) / 2 + t * t * (this.tagPose.x);
        this.img_player.y = (1 - t) * (1 - t) * this.img_player.y + 2 * t * (1 - t) * (this.tagPose.y - 300) + t * t * (this.tagPose.y);
    }
}