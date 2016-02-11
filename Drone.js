'use strict';

class Drone {
	constructor(maxWeight, location) {
		this.maxWeight = maxWeight;
		this.location = location;
		this.items = [];
		this.currentWeight = 0;
	}

	canLoadItem(item) {
		let itemWeight = 0;
		
		if (Array.isArray) {
			for (let i of item) {
				itemWeight += i.getWeight();
			}
		} else {
			itemWeight = item.getWeight();
		}

		return (itemWeight + this.currentWeight <= this.maxWeight);
	}

	load(item) {
		if (!canLoadItem(item)) {
			console.error("Drone cannot load item.");
		} else {
			if (Array.isArray(item)) {
				for (let i of item) {
					load(item);
				}
			} else {
				this.items.push(item);
				this.currentWeight += item.getWeight();
			}
		}
	}

	deliver(item) {
		if (Array.isArray(item)) {
			for (let i of item) {
				deliver(item);
			}
		}

		let found = false;
		for (let i = 0; i < this.items; i++) {
			if (this.items[i].type === item.type) {
				this.items[i].splice(i, 1);
				found = true;
				break;
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
