class Helper {
	copyArr(arr: any[]) {
		let list = [];
		for (let i = 0; i < arr.length; i++) {
			list.push(arr[i])
		}
		return list;
	}

	hasCapital(str) {
		var result = str.match(/^.*[A-Z]+.*$/);
		if (result == null) return false;
		return true;
	}

	//替换数组中组件的层级 这里的层级关系通过位置确定 y值越大，层级越高， y值相同时，x值越大，层级越高
	changeDisplayZIndex(parent: eui.Group, list: egret.DisplayObject[]) {
		let copyArr = [].concat(list)
		copyArr.sort((a, b)=>{
			if (a.y > b.y)
				return 1;
			else 
				return -1;	
		})
		for (let i = 0; i < copyArr.length; i++) {
			parent.setChildIndex(copyArr[i], i);
		}
		copyArr = [];
	}
}

const helper = new Helper();