'use strict';

let Journal = {
	commands = [];

	getOutput: function () {
		// Q, the number of drone commands
		let output = commands.length + '\n' + commands.join('\n');
	},

	load: function (droneId, warehouseId, productTypeId, numberOfItem) {
		commands.push(`${droneId} L ${warehouseId} ${productTypeId} ${numberOfItem}`);
	},
	
	unload: function (droneId, warehouseId, productTypeId, numberOfItem) {
		commands.push(`${droneId} U ${warehouseId} ${productTypeId} ${numberOfItem}`);
	},
	
	deliver: function (droneId, customerId, productTypeId, numberOfItem) {
		commands.push(`${droneId} D ${customerId} ${productTypeId} ${numberOfItem}`);
	},
	
	wait: function (droneId, numberOfTurn) {
		commands.push(`${droneId} W ${numberOfTurn}`);
	}
}

module.exports = Journal;
