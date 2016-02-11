'use strict';

let Item = require('./item.js');

class Drone {
	constructor(id, maxWeight, location, world) {
		this.id = id;
		this.maxWeight = maxWeight;
		this.location = location;
		this.items = [];
		this.currentWeight = 0;
		this.currentOrder = this.world.orders.pop();
		this.currentCommand = [];
		this.remainingTicks = -1;
		this.currentItemsId = 0;
		this.currentItemsCount = 0;
		this.tickNb = 0;
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

	computeNextStep() {
		if (this.currentOrder.isComplete()) {
			if (this.world.orders.length == 0) {
				// DRONE FINISHED ITS WORK :)
				var nbToWait = this.world.turns - this.tickNb;
				this.currentCommand = ["WAIT", nbToWait];
				this.remainingTicks = nbToWait;
				this.wait(nbToWait);
			} else {
				this.currentOrder = this.world.orders.pop();
				// LOAD THE NEXT ORDER
			}
		}
		if (this.items.length == 0) {
			var required = this.currentOrder.getRequired();
			// Looking for an uncompleted type
			for (var type in required) {
				if (required[type] == 0) {
					continue;
				}
				// Look for warehouses containing the item's type
				var warehouses = this.world.warehouses;
				for (var warehouse in warehouses) {
					// Counting number of items in that warehouse
					var available = 0;
					for (var item in warehouse.items) {
						if (item == type) {
							available++;
						}
					}
					if (available > 0) {
						var nbToTake = Math.min(available, required[type]);
						// SET ORDER TO GO TO THAT WAREHOUSE
						this.remainingTicks = dist(this.location, warehouse.location);
						this.currentCommand = ["LOAD", warehouse.id, type, nbToTake];
						this.location = warehouse.location;
						this.currentWeight = type * Item.getWeight(type);
						this.currentItemsId = type;
						this.currentItemsCount = nbToTake;
						// CREATE ITEMS LIST
						var itemsList = [];
						for (var i = 0; i < nbToTake; i++) {
							itemsList.push(type);
						}
						this.load(itemsList, warehouse.id);
						warehouse.remove(itemsList);
						break;
					}
				}
			}
		} else {
			// Set command to DELIVER to the order's position
			this.currentCommand = ["DELIVER", this.currentOrder.position, this.currentItemsId, this.currentItemsCount];
			this.remainingTicks = dist(this.location, this.currentOrder.position);
			this.currentWeight = 0;
			this.currentItemsId = -1;
			this.currentItemsCount = 0;
			this.location = this.currentOrder.position;
			this.deliver(this.currentItemsId, this.currentOrder.id);
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

	wait(nbTurns) {
		Journal.wait(this.id, nbTurns);
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
		this.remainingTicks = dist(this.location, this.dest);
	}
}

function dist(a, b) {
	let x = Math.abs(a[0] - b[0]);
	let y = Math.abs(a[1] - b[1]);

	return Math.ceil(Math.sqrt(x * x + y * y));
}

module.exports = Drone;
