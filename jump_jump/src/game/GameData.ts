class GameData {
	itemConfig: {

	}[] = [
		// I
		[
			[1],
			[1],
			[1],
			[1],
		],
		// J
		[
			[0, 1],
			[0, 1],
			[1, 1]
		],
		// L
		[
			[1, 0],
			[1, 0],
			[1, 1]
		],
		// O
		[
			[1, 1],
			[1, 1]
		],
		// Z
		[
			[1, 1, 0],
			[0, 1, 1]
		],
		// T
		[
			[0, 1, 0],
			[1, 1, 1]
		],
		// S
		[
			[0, 1, 1],
			[1, 1, 0]
		],
	]
	getItems() {
		let list = [].concat(this.itemConfig);
		return list;
	}
}
let gameData = new GameData();
