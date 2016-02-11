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

	canLoadItem(type) {
		let itemWeight = 0;
		
		if (Array.isArray) {
			for (let t of type) {
				itemWeight += Item.getWeight(type);
			}
		} else {
			itemWeight = Item.getWeight(type);
		}

		return (itemWeight + this.currentWeight <= this.maxWeight);
	}

	load(type) {
		if (!canLoadItem(type)) {
			console.error("Drone cannot load item.");
		} else {
			if (Array.isArray(type)) {
				for (let t of type) {
					load(type);
				}
			} else {
				this.items.push(type);
				this.currentWeight += Item.getWeight(type);
			}
		}
	}

	deliver(type) {
		if (Array.isArray(type)) {
			type.forEach(t => this.remove(t))
		} else {
			let found = false;
			for (let i = 0; i < this.items; ++i) {
				if (this.items[i] == type) {
					this.items[i].splice(i, 1)
					found = true
					break
				}
			}

			if (found) {
				this.currentWeight -= item.getWeight();
			} else {
				console.error("Drone cannot deliver.")
			}
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
