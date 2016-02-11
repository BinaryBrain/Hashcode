'use strict'

const fs = require('fs');
const Item = require('./item.js')

let input = './input/busy_day.in'

let data = fs.readFileSync(input).toString().split("\n")

console.log(data);

let warehouses = []
let orders = []

let world = {}

let line = data[0].split(' ')
world.width = line[0]
world.height = line[1]
world.drones = line[2]
world.turns = line[3]
world.payload = line[4]
// console.log(world)

let weighs = data[2].split(' ')
// console.log(weighs)

let warehousesNb = parseInt(data[3])
let currLine = 4
for (let i = 0; i < warehousesNb;  i++) {
    let location = data[currLine].split(' ')
    let products = data[currLine + 1].split(' ')
    // console.log(products)

    products.forEach((n, t) => {
        // console.log(`- ${n} items of prod ${t}`);
        n = parseInt(n)
        for (var j = 0; j < n; ++j) {
            let item = new Item(t, weighs[t])
            warehouses.push(item)
        }
    })

    currLine += 2
}

let ordersNb = parseInt(data[currLine])
++currLine
for (let i = 0; i < ordersNb; ++i) {
    let deliveredLocation = data[currLine].split(' ')
    let productsNb = parseInt(data[currLine + 1])
    let productsType = parseInt(data[currLine + 2])
    // console.log(`deliveredLocation: ${deliveredLocation}`)
    // console.log(`productsNb: ${productsNb}`)
    // console.log(`productsType: ${productsType}`)

    for (let j = 0; j < productsNb; ++j) {
        let item = new Item(productsType, weighs[productsType])
        orders.push(item)
    }

    currLine += 3
}

console.log(warehouses)
console.log(orders)
