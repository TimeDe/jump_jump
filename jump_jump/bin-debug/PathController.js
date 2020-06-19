/**
 *  外部使用id访问，传入两个点，
 *  case (0,12);
 *  1 通过y=kx+b 方程确定唯一一个直线，将k_b作为key值索引
 *  2 求出两点之间的其余点
 *  3   <1>当前没有这条直线 导入
 *      <2>存在，判断首联，尾联，还是这是两条断开的线。
 *              （1）链接，将数值不同的按照顺序塞入当前数组，然后遍历整个大数组，依次查找链接{""}
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PathController = (function () {
    function PathController() {
        /**
         * [(0,0),(1,0),(2,0),(3,0)]
         * [(0,1),(1,1),(2,1),(3,1)]
         * [(0,2),(1,2),(2,2),(3,2)]
         * [(0,3),(1,3),(2,3),(3,3)]
         * 会将横竖斜三种情况的切线合并
         */
        this.pathsPoint = {};
    }
    PathController.prototype.clear = function () {
        this.pathsPoint = {};
    };
    PathController.prototype.pushPoint2 = function (pos1, pos2) {
        if (pos1 == pos2) {
            console.error("PathController 传入pos1==pos2,请检查逻辑");
            return false;
        }
        //斜率
        var equation = this.getEquationByPoss(pos1, pos2);
        //补充的中间的端点
        var coordinate = this.addGapCoordinate(pos1, pos2);
        //删除已经被裁减的线段
        // coordinate = this.sliceCutCoordinate(equation, coordinate);
        if (coordinate.length > 0) {
            if (this.pathsPoint[equation] == undefined) {
                this.pathsPoint[equation] = [];
                this.pathsPoint[equation].push(coordinate);
            }
            else {
                this.checkPrevPoint(coordinate, equation);
            }
        }
        // console.log(this.pathsPoint[equation])
    };
    PathController.prototype.getPathPoint = function (ignore) {
        if (ignore === void 0) { ignore = []; }
        var result = [];
        for (var name_1 in this.pathsPoint) {
            if (ignore.indexOf(name_1) == -1) {
                for (var _i = 0, _a = this.pathsPoint[name_1]; _i < _a.length; _i++) {
                    var path = _a[_i];
                    result.push(path);
                }
            }
        }
        return result;
    };
    PathController.prototype.checkPrevPoint = function (points, equation) {
        var start = points[0];
        var end = points[points.length - 1];
        for (var index = 0; index < this.pathsPoint[equation].length; index++) {
            var pathPoint = this.pathsPoint[equation][index];
            //先有尾，向前补充
            if (this.equalPoints(pathPoint[0], end)) {
                points.pop();
                pathPoint = points.concat(pathPoint);
                this.pathsPoint[equation].splice(index, 1);
                this.checkPrevPoint(pathPoint, equation);
                return;
            }
            //先有头，向后补充
            if (this.equalPoints(pathPoint[pathPoint.length - 1], start)) {
                pathPoint.pop();
                pathPoint = pathPoint.concat(points);
                this.pathsPoint[equation].splice(index, 1);
                this.checkPrevPoint(pathPoint, equation);
                return;
            }
        }
        if (this.pathsPoint[equation].indexOf(points) == -1) {
            this.pathsPoint[equation].push(points);
        }
        return;
    };
    PathController.prototype.sliceCutCoordinate = function (equation, points) {
        var pathsPoint = this.pathsPoint[equation];
        if (pathsPoint == undefined) {
            return points;
        }
        var hasPoint = [];
        for (var _i = 0, pathsPoint_1 = pathsPoint; _i < pathsPoint_1.length; _i++) {
            var pathPoint = pathsPoint_1[_i];
            for (var _a = 0, points_1 = points; _a < points_1.length; _a++) {
                var point = points_1[_a];
                var index = this.indexOfPointInPoints(point, pathPoint);
                //已经存在这个点，并且这个点不在首尾
                if (index > 0 && index !== pathPoint.length - 1) {
                    hasPoint.push(point);
                }
            }
        }
        for (var _b = 0, hasPoint_1 = hasPoint; _b < hasPoint_1.length; _b++) {
            var point = hasPoint_1[_b];
            var index = this.indexOfPointInPoints(point, points);
            points.splice(index, 1);
        }
        return points;
    };
    PathController.prototype.indexOfPointInPoints = function (target, points) {
        var index = -1;
        for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
            var point = points_2[_i];
            if (this.equalPoints(target, point)) {
                index = points.indexOf(point);
            }
        }
        return index;
    };
    PathController.prototype.equalPoints = function (point1, point2) {
        return point1.x == point2.x && point1.y == point2.y;
    };
    PathController.prototype.getEquationByPoss = function (pos1, pos2) {
        var x, y, k, b;
        if (pos1.x == pos2.x) {
            x = pos1.x;
            b = 0;
            return x + "-" + y + "-" + k + "-" + b;
        }
        if (pos1.y == pos2.y) {
            y = pos1.y;
            b = pos1.y;
            k = (pos2.y - pos1.y) / (pos2.x - pos1.x);
            return x + "-" + y + "-" + k + "-" + b;
        }
        k = (pos2.y - pos1.y) / (pos2.x - pos1.x);
        b = pos2.y - k * pos2.x;
        return x + "-" + y + "-" + k + "-" + b;
    };
    PathController.prototype.addGapCoordinate = function (pos1, pos2) {
        var start;
        var end;
        if (pos1.x == pos2.x) {
            if (pos1.y < pos2.y) {
                start = pos1;
                end = pos2;
            }
            else {
                start = pos2;
                end = pos1;
            }
        }
        else {
            if (pos1.x < pos2.x) {
                start = pos1;
                end = pos2;
            }
            else {
                start = pos2;
                end = pos1;
            }
        }
        var result = [start];
        //补充垂直于x轴的,y值判断
        if (start.x == end.x) {
            //没有中间的
            if (end.y - start.y == 1) {
                result.push(end);
            }
            else {
                for (var y = start.y + 1; y < end.y; y++) {
                    result.push({ x: start.x, y: y });
                }
                result.push(end);
            }
        }
        else {
            //普通，直接看x
            if (end.x - start.x == 1) {
                result.push(end);
            }
            else {
                for (var x = start.x + 1; x < end.x; x++) {
                    var y = end.y - (end.x - x) * (end.y - start.y) / (end.x - start.x);
                    if (Number.isInteger(y)) {
                        result.push({ x: x, y: y });
                    }
                }
                result.push(end);
            }
        }
        return result;
    };
    return PathController;
}());
__reflect(PathController.prototype, "PathController");
