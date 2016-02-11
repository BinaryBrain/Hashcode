'use strict'

class Order {
	// Constructor
	// @param position Array [x, y]
	// @param required map of required items. Keys are types, values are number of items of that type still needed.
	//                 Example : required = {1: 8, 3: 7} -> 8 items of type 1 and 7 items of type 3
	constructor(position, required) {
		this.position = position;
		this.required = required;
		this.completed = false;
	}

	// Deliver an item or an array of items
	// @param items Item or array of Items
	deliver(items) {
		if (Array.isArray(items)) {
			for (var i = 0; i < items.length; i++) {
				item = items[i];
				this.addItem(item);
			}
		} else {
			this.additem(items);
		}
	}

	// Returns the position where to deliver the items.
	getPosition() {
		return this.position;
	}

	// Returns a map of required items. Keys are types, values are number of items of that type still needed.
	getRequired() {
		return this.required;
	}

	// Return true if the order is completed, false if there is at least one remaining item to deliver
	isComplete() {
		if (this.completed) {
			return true;
		}
		// Checking if order is complete
		for (var key in this.required) {
			if (this.required[key] > 0) {
				return false;
			}
		}
		this.completed = true;
		return this.completed;
	}


	/////////////////////////////////////////
	/////////////////////////////////////////
	// PRIVATE FUNCTIONS DO NOT USE OUTSIDE /
	addItem(item) {
		type = item.getType();
		if (type in this.required) {
			if (this.required[type] > 0) {
				this.required[type]--;
			} else {
				console.error("Tried to deliver more items (id "+ type +") that asked for");
			}
		} else {
			console.error("Tried to deliver an item (id "+ type +") that wasn't asked for");
		}
	}

}

module.exports = Order