'use strict';

let Journal = {
	commands: [],

	getOutput: function () {
		// Q, the number of drone commands
		return this.commands.length + '\n' + this.commands.join('\n');
	},

	load: function (droneId, warehouseId, productTypeId, numberOfItem) {
		this.commands.push(`${droneId} L ${warehouseId} ${productTypeId} ${numberOfItem}`);
	},
	
	unload: function (droneId, warehouseId, productTypeId, numberOfItem) {
		this.commands.push(`${droneId} U ${warehouseId} ${productTypeId} ${numberOfItem}`);
	},
	
	deliver: function (droneId, customerId, productTypeId, numberOfItem) {
		this.commands.push(`${droneId} D ${customerId} ${productTypeId} ${numberOfItem}`);
	},
	
	wait: function (droneId, numberOfTurn) {
		this.commands.push(`${droneId} W ${numberOfTurn}`);
	}
}

module.exports = Journal;
