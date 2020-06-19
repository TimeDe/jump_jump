class DBFactory {
    public baseFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
    private armatureList: Armature[] = [];
    constructor() {
    }

    pushDBtoFactory(name: string) {
        const getDragonbonesData: Promise<any> = RES.getResAsync(name + "_ske_json") as any;
        const getTextureData = RES.getResAsync(name + "_tex_json") as any;
        const getTexture = RES.getResAsync(name + "_tex_png") as any;
        return Promise.all([getDragonbonesData, getTextureData, getTexture]).then((result) => {
            const dragonbonesData = result[0];
            const textureData = result[1];
            const texture = result[2];
            this.baseFactory.parseDragonBonesData(dragonbonesData);
            this.baseFactory.parseTextureAtlasData(textureData, texture);
        }).catch((err) => {
            console.error('解析龙骨失败');
        });
    }
    private nameHash = {};
    public async createArmature(name: string, acttionName?: string): Promise<Armature> {
        if (!this.nameHash[name]) {
            await this.pushDBtoFactory(name);
            this.nameHash[name] = 1;
        }
        let armatureName = acttionName;
        if (!armatureName) {
            armatureName = name;
        }
        const dbAramature = await this.baseFactory.buildArmature(armatureName);
        let armature: Armature = this.getArmatureInPool();
        armature.initData(dbAramature, this.baseFactory);
        return armature;
    }

    releaseArmature(armature: Armature) {
        if (armature) {
            armature.dispose(this.baseFactory);
            this.armatureList.push(armature);
        }
    }
    private getArmatureInPool() {
        if (this.armatureList.length > 0) {
            return this.armatureList.pop();
        } else {
            return new Armature();
        }
    }
}

class Armature {
    private _armature: dragonBones.Armature;
    public constructor() {
    }

    play(animationName?: string, playTimes?: number, timeScale = 1) {
        this._armature.animation.play(animationName, playTimes).timeScale = timeScale;
    }

    stop(animationName: string) {
        this._armature.animation.stop(animationName);
    }
    gotoAndPlayByFrame(animationName: string, frame?: number, playTimes?: number) {
        return this._armature.animation.gotoAndPlayByFrame(animationName, frame, playTimes);
    }
    goToAndStopFrame(animationName: string, frameNum: number = 0) {
        this._armature.animation.gotoAndStopByFrame(animationName, frameNum);
    }

    get display() {
        return this._armature.display;
    }
    get eventDispatcher() {
        return this._armature.eventDispatcher;
    }


    initData(armature: dragonBones.Armature, factory: dragonBones.EgretFactory) {
        this._armature = armature;
        factory.clock.add(this._armature);
    }

    get armatureName() {
        return this._armature.name;
    }
    get animation() {
        return this._armature.animation;
    }

    private static AnimationCompleteCallbackHash: { [key: number]: Function } = {}
    /**
     * 特殊用法，获取动画播放完成
     */
    addAnimationCompleteListener(): Promise<Armature> {
        return new Promise((resolve, reject) => {
            let animationComplete = () => {
                delete Armature.AnimationCompleteCallbackHash[this._armature.hashCode];
                this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, animationComplete, this);
                resolve(this);
            };
            Armature.AnimationCompleteCallbackHash[this._armature.hashCode] = animationComplete;
            if (!this._armature.eventDispatcher.hasDBEventListener(dragonBones.EventObject.COMPLETE)) {
                this._armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.COMPLETE, animationComplete, this);
            }
        })


    }

    clearAnimationCompleteListener() {
        const animationComplete = Armature.AnimationCompleteCallbackHash[this._armature.hashCode];
        this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, animationComplete, this);
        delete Armature.AnimationCompleteCallbackHash[this._armature.hashCode];
    }

    private static AnimationFRAMECallbackHash: { [key: number]: Function } = {}
    /**
     * 特殊用法，监听帧事件
     */
    addAnimationFRAMEListener(callback: Function) {
        let FRAME_EVENT = () => {
            delete Armature.AnimationFRAMECallbackHash[this._armature.hashCode];
            this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.FRAME_EVENT, FRAME_EVENT, this);
            callback();
        };
        Armature.AnimationCompleteCallbackHash[this._armature.hashCode] = FRAME_EVENT;
        if (!this._armature.eventDispatcher.hasDBEventListener(dragonBones.EventObject.FRAME_EVENT)) {
            this._armature.eventDispatcher.addDBEventListener(dragonBones.EventObject.FRAME_EVENT, FRAME_EVENT, this);
        }
    }
    clearAnimationFRAMEListener() {
        const FRAME_EVENT = Armature.AnimationFRAMECallbackHash[this._armature.hashCode];
        this._armature.eventDispatcher.removeDBEventListener(dragonBones.EventObject.COMPLETE, FRAME_EVENT, this);
        delete Armature.AnimationFRAMECallbackHash[this._armature.hashCode];
    }

    getSlot(slotName: string) {
        return this._armature.getSlot(slotName);
    }

    dispose(factory: dragonBones.EgretFactory) {
        factory.clock.remove(this._armature);
        this._armature.dispose();
    }
    set cacheframerate(value: number) {
        this._armature.cacheFrameRate = value;
    }

}


const dbFactory = new DBFactory();