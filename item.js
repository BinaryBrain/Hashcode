'use strict'

let Item = {
	weights: [],

	getWeight(type) {
		return this.weights[type];
	},

	setWeight(type, weight) {
		this.weights[type] = weight;
	}
}

module.exports = Item
