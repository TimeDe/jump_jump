/**
 *  外部使用id访问，传入两个点，
 *  case (0,12);
 *  1 通过y=kx+b 方程确定唯一一个直线，将k_b作为key值索引
 *  2 求出两点之间的其余点
 *  3   <1>当前没有这条直线 导入
 *      <2>存在，判断首联，尾联，还是这是两条断开的线。
 *              （1）链接，将数值不同的按照顺序塞入当前数组，然后遍历整个大数组，依次查找链接{""}
 */

class PathController {
    /**
     * [(0,0),(1,0),(2,0),(3,0)]
     * [(0,1),(1,1),(2,1),(3,1)]
     * [(0,2),(1,2),(2,2),(3,2)]
     * [(0,3),(1,3),(2,3),(3,3)]
     * 会将横竖斜三种情况的切线合并
     */
    private pathsPoint: { [key: string]: { x: number, y: number }[][] } = {};
    constructor() {

    }

    clear() {
        this.pathsPoint = {};
    }

    pushPoint2(pos1: { x: number, y: number }, pos2: { x: number, y: number }) {
        if (pos1 == pos2) {
            console.error("PathController 传入pos1==pos2,请检查逻辑")
            return false;
        }
        //斜率
        let equation = this.getEquationByPoss(pos1, pos2);
        //补充的中间的端点
        let coordinate = this.addGapCoordinate(pos1, pos2);
        //删除已经被裁减的线段
        // coordinate = this.sliceCutCoordinate(equation, coordinate);
        if (coordinate.length > 0) {
            if (this.pathsPoint[equation] == undefined) {
                this.pathsPoint[equation] = []
                this.pathsPoint[equation].push(coordinate)
            } else {
                this.checkPrevPoint(coordinate, equation)
            }
        }
        // console.log(this.pathsPoint[equation])
    }

    getPathPoint(ignore: string[] = []): { x: number; y: number; }[][] {
        let result: { x: number; y: number; }[][] = [];
        for (let name in this.pathsPoint) {
            if (ignore.indexOf(name) == -1) {
                for (let path of this.pathsPoint[name]) {
                    result.push(path);
                }
            }
        }
        return result;
    }

    private checkPrevPoint(points: { x: number, y: number }[], equation: string) {
        const start = points[0];
        const end = points[points.length - 1];
        for (let index = 0; index < this.pathsPoint[equation].length; index++) {
            let pathPoint = this.pathsPoint[equation][index];
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
    }

    private sliceCutCoordinate(equation: string, points: { x: number, y: number }[]) {
        let pathsPoint = this.pathsPoint[equation];
        if (pathsPoint == undefined) {
            return points;
        }
        let hasPoint: { x: number, y: number }[] = []
        for (let pathPoint of pathsPoint) {
            for (let point of points) {
                const index = this.indexOfPointInPoints(point, pathPoint);
                //已经存在这个点，并且这个点不在首尾
                if (index > 0 && index !== pathPoint.length - 1) {
                    hasPoint.push(point);
                }
            }
        }
        for (let point of hasPoint) {
            const index = this.indexOfPointInPoints(point, points);
            points.splice(index, 1);
        }

        return points;
    }
    private indexOfPointInPoints(target: { x: number, y: number }, points: { x: number, y: number }[]) {
        let index = -1;
        for (let point of points) {
            if (this.equalPoints(target, point)) {
                index = points.indexOf(point);
            }
        }
        return index;
    }
    private equalPoints(point1: { x: number, y: number }, point2: { x: number, y: number }) {
        return point1.x == point2.x && point1.y == point2.y;
    }

    private getEquationByPoss(pos1: { x: number, y: number }, pos2: { x: number, y: number }) {
        let x, y, k, b;
        if (pos1.x == pos2.x) {
            x = pos1.x;
            b = 0;
            return `${x}-${y}-${k}-${b}`;
        }
        if (pos1.y == pos2.y) {
            y = pos1.y;
            b = pos1.y;
            k = (pos2.y - pos1.y) / (pos2.x - pos1.x);
            return `${x}-${y}-${k}-${b}`;
        }
        k = (pos2.y - pos1.y) / (pos2.x - pos1.x);
        b = pos2.y - k * pos2.x;
        return `${x}-${y}-${k}-${b}`;
    }

    private addGapCoordinate(pos1: { x: number, y: number }, pos2: { x: number, y: number }) {
        let start: { x: number, y: number };
        let end: { x: number, y: number };

        if (pos1.x == pos2.x) {
            if (pos1.y < pos2.y) {
                start = pos1;
                end = pos2;
            } else {
                start = pos2;
                end = pos1;
            }
        } else {
            if (pos1.x < pos2.x) {
                start = pos1;
                end = pos2;
            } else {
                start = pos2;
                end = pos1;
            }
        }

        let result = [start];
        //补充垂直于x轴的,y值判断
        if (start.x == end.x) {
            //没有中间的
            if (end.y - start.y == 1) {
                result.push(end)
            } else {
                for (let y = start.y + 1; y < end.y; y++) {
                    result.push({ x: start.x, y: y });
                }
                result.push(end)
            }
        } else {
            //普通，直接看x
            if (end.x - start.x == 1) {
                result.push(end)
            } else {
                for (let x = start.x + 1; x < end.x; x++) {
                    let y = end.y - (end.x - x) * (end.y - start.y) / (end.x - start.x)
                    if (Number.isInteger(y)) {
                        result.push({ x: x, y: y });
                    }
                }
                result.push(end)
            }
        }
        return result;
    }
}