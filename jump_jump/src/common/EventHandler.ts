class EventHandler {
	public constructor() {
    }
	private _hander_maps = {};

	//注册消息
	public on(event: string, callBack, obj: any) {
		let list = this._hander_maps[event] || [];
		list.push({cb: callBack, target: obj});
		this._hander_maps[event] = list;
	}

	//发送消息
	public fire(event: string, data?) {
		let list = this._hander_maps[event] || [];
		if (list.length == 0) {
			console.log("消息发送失败，无效的event事件：  ", event);
		}
		for (let i = 0; i < list.length; i++) {
			let info = list[i];
			info["cb"].call(info['target'], data);
		}
	}

	public removeListener(event: string, callBack, obj: any) {
		let list = this._hander_maps[event] || []
		if (list.length == 0) {
			console.log("事件移除失败，无效的event事件：  ", event);
		}
		let temp_list = [];
		for (let i = 0; i < list.length; i++) {
			let info = list[i];
			if (info["cb"] === callBack && info["target"] === obj )
				continue;

			temp_list.push(info);	
		}
		this._hander_maps[event] = temp_list;
	}

	public removeAll() {
		this._hander_maps = {};
	}
}