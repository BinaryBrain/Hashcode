'use strict';

let Item = require('./item.js');

class Drone {
	constructor(maxWeight, location, world) {
		this.maxWeight = maxWeight;
		this.location = location;
		this.items = [];
		this.currentWeight = 0;
		this.world = world;
	}

	canLoadItem(types) {
		let itemWeight = 0;
		
		if (!Array.isArray(types)) {
			types = [types];
		}

		for (let t of types) {
			itemWeight += Item.getWeight(types);
		}

		return (itemWeight + this.currentWeight <= this.maxWeight);
	}

	load(types, warehouseId) {
		if (!Array.isArray(types)) {
			types = [types];
		}

		if (!canLoadItem(types)) {
			console.error("Drone cannot load item.");
		} else {
			let knowTypes = [];

			for (let type of types) {
				if (!knowTypes[type]) {
					knowTypes[type] = 1;
				} else {
					knowTypes[type]++;
				}

				for (var i = 0; i < knowTypes; i++) {
					if (knowTypes[type]) {
						Journal.load(this.id, warehouseId, i, knowTypes[i]);
					}
				}
			}

			for (let type of types) {
				this.items.push(type);
				this.currentWeight += Item.getWeight(type);
			}
		}
	}

	deliver(types, warehouseId) {
		if (!Array.isArray(types)) {
			types = [types]
		}

		for (let type of types) {
			let found = false;

			for (let i = 0; i < this.items; ++i) {
				if (this.items[i] == type) {
					this.items[i].splice(i, 1)
					found = true
					break
				}
			}
		}

		for (let type of types) {
			if (!knowTypes[type]) {
				knowTypes[type] = 1;
			} else {
				knowTypes[type]++;
			}

			for (var i = 0; i < knowTypes; i++) {
				if (knowTypes[type]) {
					Journal.deliver(this.id, warehouseId, i, knowTypes[i]);
				}
			}
		}

		if (found) {
			this.currentWeight -= item.getWeight();
		} else {
			console.error("Drone cannot deliver.")
		}
	}

	giveOrder(order) {
		this.order = order;
	}

	travel(dest) {
		this.dest = dest;
		this.tickToGo = dist(this.location, this.dest);
	}
}

function dist(a, b) {
	let x = Math.abs(a[0] - b[0]);
	let y = Math.abs(a[1] - b[1]);

	return Math.ceil(Math.sqrt(x * x + y * y));
}

module.exports = Drone;
