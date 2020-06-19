//从三角形中获取一个随机点坐标
function getPointFromTriangle(vertexs: { x: number, y: number }[]) {
    const random1 = Math.random();
    const random2 = Math.random();
    const x = (1 - Math.sqrt(random1)) * vertexs[0].x + Math.sqrt(random1) * (1 - random2) * vertexs[1].x + Math.sqrt(random1) * random2 * vertexs[2].x;
    const y = (1 - Math.sqrt(random1)) * vertexs[0].y + Math.sqrt(random1) * (1 - random2) * vertexs[1].y + Math.sqrt(random1) * random2 * vertexs[2].y;
    return { x, y }
}
/**
 * 从很多顶点组成的图形中获取一个随机点坐标
 * @param vertexs 顶点数列
 */
function getPointFromVertexs(vertexs: { x: number, y: number }[]) {
    const tempVertexs = vertexs.concat();

    const random1 = Math.floor(Math.random() * tempVertexs.length);
    const result1 = tempVertexs[random1];
    tempVertexs.splice(random1, 1);
    const random2 = Math.floor(Math.random() * tempVertexs.length);
    const result2 = tempVertexs[random2];
    tempVertexs.splice(random2, 1);
    const random3 = Math.floor(Math.random() * tempVertexs.length);
    const result3 = tempVertexs[random3];
    return getPointFromTriangle([result1, result2, result3])

}

// 从很多顶点组成的图形中判断点是否相交
function isPointInVertexs(vertexs: { x: number, y: number }[], point: { x: number, y: number }) {
    const shape = drawShape(vertexs, 0xffffff, 1);
    return shape.hitTestPoint(point.x, point.y, true);
}


function getRandomFromArray<T>(tempRandom: T[]): T {
    let index = Math.floor(tempRandom.length * Math.random());
    let result = tempRandom[index];
    tempRandom.splice(index, 1);
    return result;
}

function randomInt(min: number, max: number): number {
    let length = max - min;
    return Math.floor(length * Math.random()) + min;
}

function getRandomFromArrayNoSplice<T>(tempRandom: T[]): T {
    let index = Math.floor(tempRandom.length * Math.random());
    let result = tempRandom[index];
    return result;
}

function copyArray<T>(arr: T[]): T[] {
    let list = [];
    for (let i = 0; i < arr.length; i++) {
        list.push(arr[i]);
    }
    return list;
}

function getDistance(p1: {x: number, y: number}, p2: {x: number, y: number}) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x)  + (p1.y - p2.y) * (p1.y - p2.y));
}