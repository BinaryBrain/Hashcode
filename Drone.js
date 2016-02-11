'use strict';

class Drone {
	constructor(maxWeight, location) {
		this.maxWeight = maxWeight;
		this.location = location;
		this.items = [];
		this.currentWeight = 0;
	}

	canLoadItem(item) {
		return (item.getWeight() + this.currentWeight <= this.maxWeight);
	}

	// Load ONE item
	load(item) {
		if (!canLoadItem) {
			console.log("Drone cannot load item");
		} else {
			this.items.push(item);
			this.currentWeight += item.getWeight();
		}
	}

	// Deliver ONE item
	deliver(item) {
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
		}
	}
}

module.export = Drone;
