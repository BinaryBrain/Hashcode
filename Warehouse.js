'use strict';

class Warehouse {
	constructor(id, location, items) {
		this.id = id;
		this.location = location;
		this.items = items;
	}

	/**
	 * Remove item(s)
	 * @param  {Array|Int} items
	 */
	remove(items) {

		if (Array.isArray(items)) {
			items.forEach(item => this.remove(item))
		} else {

			let found = false;
			for (let i = 0; i < this.items; ++i) {
				if (this.items[i] == items) {
					this.items[i].splice(i, 1)
					found = true
					break
				}
			}

			if (!found) {
				console.error('Item not found.')
			}
		}

	}
}

module.exports = Warehouse;
