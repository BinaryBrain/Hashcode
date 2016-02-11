'use strict'

const fs = require('fs');
const Item = require('./item.js')
const Warehouse = require('./Warehouse.js')
const Drone = require('./Drone.js')
const Order = require('./order.js')

let input = './input/busy_day.in'

let data = fs.readFileSync(input).toString().split("\n")

// console.log(data);

let world = {}

world.warehouses = []
world.orders = []

let line = data[0].split(' ')
world.width = line[0]
world.height = line[1]
world.dronesNb = line[2]
world.drones = []
world.turns = line[3]
world.payload = line[4]
// console.log(world)

let weighs = data[2].split(' ')
Item.weights = weighs;

let warehousesNb = parseInt(data[3])
let currLine = 4
for (let i = 0; i < warehousesNb;  i++) {
    let location = data[currLine].split(' ')
    let products = data[currLine + 1].split(' ')

    world.warehouses.push(new Warehouse(i, location, products));

    currLine += 2
}

let ordersNb = parseInt(data[currLine])
++currLine
for (let i = 0; i < ordersNb; ++i) {
    let deliveredLocation = data[currLine].split(' ')
    let productsNb = parseInt(data[currLine + 1])
    let productsType = parseInt(data[currLine + 2])

    world.orders.push(new Order(i, deliveredLocation, productsType));

    currLine += 3
}

/*
console.log(world.warehouses)
console.log(world.orders)
*/

// INIT
for (let i = 0; i < world.dronesNb; i++) {
	world.drones.push(new Drone(i, world.payload, world.warehouses[0].location, world));
}

let turnsLeft = world.turns;
while (turnsLeft) {
	// GAME LOGIC

	for (let drone of world.drones) {
		// drone.tick();
	}

	turnsLeft--;
}
