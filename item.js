'use strict'

class Item {
	constructor(type, weight) {
		this.type = type;
		this.weight = weight;
	}

	getWeight() {
		return this.weight;
	}

	getType() {
		return this.type;
	}
}

module.exports = Item