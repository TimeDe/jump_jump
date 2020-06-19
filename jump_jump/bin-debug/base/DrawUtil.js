function greyFlilter(image) {
    var colorMatrix = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
    image.filters = [colorFlilter];
}
/**
 * @param img 目标图片
 * @param color 光晕的颜色，十六进制，不包含透明度
 * @param alpha 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
 * @param blurX 水平模糊量。有效值为 0 到 255.0（浮点）
 * @param blurY 垂直模糊量。有效值为 0 到 255.0（浮点）
 * @param strength 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
 * @param quality 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
 * @param inner 指定发光是否为内侧发光，暂未实现
 * @param knockout 指定对象是否具有挖空效果，暂未实现
 */
function filterFun(img, color, alpha, blurX, blurY, strength, quality, inner, knockout) {
    if (color === void 0) { color = 0x33CCFF; }
    if (alpha === void 0) { alpha = 0.8; }
    if (blurX === void 0) { blurX = 35; }
    if (blurY === void 0) { blurY = 35; }
    if (strength === void 0) { strength = 2; }
    if (quality === void 0) { quality = 3 /* HIGH */; }
    if (inner === void 0) { inner = false; }
    if (knockout === void 0) { knockout = false; }
    var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
    img.filters = [glowFilter];
}
function clearFlilter(image) {
    image.filters = [];
}
function drawLine(start, end, thickness, color) {
    var shp = new egret.Shape();
    shp.graphics.lineStyle(thickness, color);
    shp.graphics.moveTo(start.x, start.y);
    shp.graphics.lineTo(end.x, end.y);
    shp.graphics.endFill();
    return shp;
}
function drawShape(poss, color, thickness) {
    var shp = new egret.Shape();
    shp.graphics.lineStyle(thickness, color);
    shp.graphics.beginFill(color);
    shp.graphics.moveTo(poss[0].x, poss[0].y);
    for (var index = 1; index < poss.length; index++) {
        shp.graphics.lineTo(poss[index].x, poss[index].y);
    }
    shp.graphics.lineTo(poss[0].x, poss[0].y);
    shp.graphics.endFill();
    return shp;
}
function flash(target) {
    egret.Tween.get(target).to({ alpha: 0 }, 300).to({ alpha: 1 }, 300).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
}
function shake(target) {
    var baseY = target.y;
    var baseX = target.x;
    var fixX = 5;
    egret.Tween.get(target).to({ x: baseX + fixX, y: baseY }, 50).to({ x: baseX, y: baseY }, 50)
        .to({ x: baseX - fixX, y: baseY }, 50).to({ x: baseX, y: baseY }, 50);
}
/**
 * 调用此方法模拟按钮点击动画，
 * 如果要使用鼠标滑动事件， 需要开启mouse.enable
 */
function buttonTapAction(target, tapFunc, obj) {
    var fixX = 0, fixY = 0, baseX, baseY, baseScaleX = 0, baseScaleY = 0;
    var scaleBig = 1.1, scaleSmall = 0.9;
    baseScaleX = target.scaleX;
    baseScaleY = target.scaleY;
    // 延时记录基础位置，防止位置还没有完成初始化
    setTimeout(function () {
        baseX = target.x;
        baseY = target.y;
    }, 100);
    var touchBegin = function () {
        fixX = (target.width * baseScaleX - (target.width) * baseScaleX * scaleSmall) * (0.5 - target.anchorOffsetX / target.width);
        fixY = (target.height * baseScaleY - (target.height) * baseScaleY * scaleSmall) * (0.5 - target.anchorOffsetY / target.height);
        // if (baseX == undefined || baseY == undefined) {
        //     baseX = target.x;
        //     baseY = target.y;
        // }
        target.x += fixX;
        target.y += fixY;
        target.scaleX = baseScaleX * scaleSmall;
        target.scaleY = baseScaleY * scaleSmall;
    };
    var touchEnd = function () {
        target.x = baseX;
        target.y = baseY;
        target.scaleX = baseScaleX;
        target.scaleY = baseScaleY;
    };
    var onTouchRollOver = function () {
        fixX = (target.width * baseScaleX - (target.width) * baseScaleX * scaleBig) * (0.5 - target.anchorOffsetX / target.width);
        fixY = (target.height * baseScaleY - (target.height) * baseScaleY * scaleBig) * (0.5 - target.anchorOffsetY / target.height);
        target.x += fixX;
        target.y += fixY;
        target.scaleX = baseScaleX * scaleBig;
        target.scaleY = baseScaleY * scaleBig;
    };
    var onTouchRollOut = function () {
        target.x = baseX;
        target.y = baseY;
        target.scaleX = baseScaleX;
        target.scaleY = baseScaleY;
    };
    target.addEventListener(mouse.MouseEvent.MOUSE_OVER, onTouchRollOver, this);
    target.addEventListener(mouse.MouseEvent.MOUSE_OUT, onTouchRollOut, this);
    target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchBegin, obj);
    target.addEventListener(egret.TouchEvent.TOUCH_END, touchEnd, obj);
    target.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchEnd, obj);
    target.addEventListener(egret.TouchEvent.TOUCH_TAP, tapFunc, obj);
}
function breathAction(target, start, end) {
    if (start === void 0) { start = 1; }
    if (end === void 0) { end = 1.2; }
    egret.Tween.removeTweens(target);
    target.scaleX = start;
    target.scaleY = start;
    egret.Tween.get(target, { loop: true }).to({ scaleX: end, scaleY: end }, 800).to({ scaleX: start, scaleY: start }, 800);
}
/**
 * 正确错误反馈动画
 */
function filterAction(target, right, cb) {
    var color = 0x2cd470;
    if (!right)
        color = 0xe72a30;
    var time = 200;
    filterFun(target, color, 0.8);
    egret.Tween.get(target).wait(time).call(function () {
        clearFlilter(target);
    }).wait(time).call(function () {
        filterFun(target, color, 0.8);
    }).wait(time).call(function () {
        clearFlilter(target);
    }).call(function () {
        if (cb)
            cb();
    });
}
