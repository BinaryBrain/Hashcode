'use strict';

class Drone {
	constructor(id, maxWeight, location) {
		this.id = id;
		this.maxWeight = maxWeight;
		this.location = location;
		this.items = [];
		this.currentWeight = 0;
		this.currentOrder = this.world.orders.pop();
		this.currentCommand = [];
		this.remainingTicks = -1;
		this.tickNb;
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

	computeNextStep() {
		if (this.order.isComplete()) {
			if (this.world.orders.length == 0) {
				// DRONE FINISHED ITS WORK :)
				var nbToWait = this.world.turns - this.tickNb;
				this.currentCommand = ["WAIT", nbToWait];
				this.remainingTicks = nbToWait;
				wait(nbToWait);
			} else {
				this.order = this.world.orders.pop();
				// LOAD THE NEXT ORDER
			}
		}
		if (this.items.length == 0) {
			var required = this.order.getRequired();
			// Looking for an uncompleted type
			for (var type in required) {
				if (required[type] == 0) {
					continue;
				}
				// Look for warehouses containing the item's type
				var warehouses = this.world.warehouses;
				for (var warehouse in warehouses) {
					// Counting number of items in that warehouse
					var count = 0;
					for (var item in warehouse.items) {
						if (item == type) {
							count++;
						}
					}
					if (count > 0) {
						// SET ORDER TO GO TO THAT WAREHOUSE
						break;
					}
				}
			}
			this.
		} else {
			// Set command to DELIVER to the order's position
		}
	}

	tick() {
		if (this.remainingTicks > 0) {
			this.remainingTicks--;
		} else {
			this.computeNextStep();
			this.remainingTicks--;
		}
		this.tickNb++;
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

	wait(nbTurns) {
		Journal.wait(this.id, nbTurns);
	}

	deliver(item) {
		if (Array.isArray(item)) {
			for (let i of item) {
				deliver(item);
			}
		}

		let found = false;
		for (let i = 0; i < this.items; i++) {
			if (this.items[i].type == item.type) {
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
}

module.exports = Drone;
