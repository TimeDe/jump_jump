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
class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
    }
    private async createView() {
        let my_bg: eui.Rect = new eui.Rect;
        my_bg.fillColor = 0xFEF9EC;
        my_bg.width = this.stage.stageWidth;
        my_bg.height = this.stage.stageHeight;
        this.addChild(my_bg);
        await this.addDBArmature();
        this.initLoading();
    }
    /**百分比位图 */
    // private loadingContainer: egret.DisplayObjectContainer;
    private textField: egret.TextField;
    public bar_move: eui.Image = new eui.Image();
    public bar_mask: eui.Image = new eui.Image();
    public bar_bot: eui.Image = new eui.Image();
    public local_x = 650;
    public local_y = 697;
    private barLength: number = 100;
    private initLoading() {

        let group = new eui.Group();
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
        

        let maskGroup = new eui.Group();
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
    }

    public onProgress(current: number, total: number): void {
        this.textField.text = "" + Math.floor((current / total) * 100).toString() + "%";
        this.bar_move.x = -this.barLength + this.barLength * (current / total);
    }
    //动画
        public  async addDBArmature()  {
                await  dbFactory.createArmature("loadingxiaoxiang","xiaoxiangrunning").then((armature)  =>  {
                        this.addChild(armature.display);
                        armature.display.x  =  this.stage.stageWidth  /  2;
                        armature.display.y  =  this.local_y + 150 ;

                        let rect  =  new  eui.Rect();
                        rect.fillColor  =  0XFFFFFF;
                        rect.width  =  804;
                        rect.height  =  665;
                        rect.anchorOffsetX  =  rect.width  >>  1;
                        rect.anchorOffsetY  =  rect.height  >>  1;
                        rect.x  =  this.stage.stageWidth  /  2;
                        rect.y  =  this.local_y  -  50;
                        armature.display.mask  =  rect;

                        this.addChild(rect);
                        armature.play("running",  0)
                })
        }
}
