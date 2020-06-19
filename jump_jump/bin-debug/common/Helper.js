var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.copyArr = function (arr) {
        var list = [];
        for (var i = 0; i < arr.length; i++) {
            list.push(arr[i]);
        }
        return list;
    };
    Helper.prototype.hasCapital = function (str) {
        var result = str.match(/^.*[A-Z]+.*$/);
        if (result == null)
            return false;
        return true;
    };
    //替换数组中组件的层级 这里的层级关系通过位置确定 y值越大，层级越高， y值相同时，x值越大，层级越高
    Helper.prototype.changeDisplayZIndex = function (parent, list) {
        var copyArr = [].concat(list);
        copyArr.sort(function (a, b) {
            if (a.y > b.y)
                return 1;
            else
                return -1;
        });
        for (var i = 0; i < copyArr.length; i++) {
            parent.setChildIndex(copyArr[i], i);
        }
        copyArr = [];
    };
    return Helper;
}());
__reflect(Helper.prototype, "Helper");
var helper = new Helper();
