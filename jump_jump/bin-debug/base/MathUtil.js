//从三角形中获取一个随机点坐标
function getPointFromTriangle(vertexs) {
    var random1 = Math.random();
    var random2 = Math.random();
    var x = (1 - Math.sqrt(random1)) * vertexs[0].x + Math.sqrt(random1) * (1 - random2) * vertexs[1].x + Math.sqrt(random1) * random2 * vertexs[2].x;
    var y = (1 - Math.sqrt(random1)) * vertexs[0].y + Math.sqrt(random1) * (1 - random2) * vertexs[1].y + Math.sqrt(random1) * random2 * vertexs[2].y;
    return { x: x, y: y };
}
/**
 * 从很多顶点组成的图形中获取一个随机点坐标
 * @param vertexs 顶点数列
 */
function getPointFromVertexs(vertexs) {
    var tempVertexs = vertexs.concat();
    var random1 = Math.floor(Math.random() * tempVertexs.length);
    var result1 = tempVertexs[random1];
    tempVertexs.splice(random1, 1);
    var random2 = Math.floor(Math.random() * tempVertexs.length);
    var result2 = tempVertexs[random2];
    tempVertexs.splice(random2, 1);
    var random3 = Math.floor(Math.random() * tempVertexs.length);
    var result3 = tempVertexs[random3];
    return getPointFromTriangle([result1, result2, result3]);
}
// 从很多顶点组成的图形中判断点是否相交
function isPointInVertexs(vertexs, point) {
    var shape = drawShape(vertexs, 0xffffff, 1);
    return shape.hitTestPoint(point.x, point.y, true);
}
function getRandomFromArray(tempRandom) {
    var index = Math.floor(tempRandom.length * Math.random());
    var result = tempRandom[index];
    tempRandom.splice(index, 1);
    return result;
}
function randomInt(min, max) {
    var length = max - min;
    return Math.floor(length * Math.random()) + min;
}
function getRandomFromArrayNoSplice(tempRandom) {
    var index = Math.floor(tempRandom.length * Math.random());
    var result = tempRandom[index];
    return result;
}
function copyArray(arr) {
    var list = [];
    for (var i = 0; i < arr.length; i++) {
        list.push(arr[i]);
    }
    return list;
}
function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}
