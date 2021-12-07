let example = `16,1,2,0,4,2,7,1,2,14`

const formatInput = function(input) {
  return input.split(',').map(elem => Number(elem))
}
example = formatInput(example)

const findFuelCostToPos = function(input, pos) {
  const fuelCost = [];
  input.map(originalPos => fuelCost.push(Math.abs(originalPos - pos)))
  return fuelCost.reduce((p, c) => p + c, 0)
}

const findMinFuelCost = function(input) {
  input.sort((a, b) => a - b)

  const allFuels = [...Array(input[input.length - 1] - input[0] + 1).keys()]

  for(let i = 0; i < allFuels.length; i++) {
    allFuels[i] = findFuelCostToPos(input, allFuels[i] + input[0])
  }

  let minFuel = allFuels.reduce((p, c) => c < p ? c : p)

  return minFuel
}

console.log("Minimum fuel cost (example): ",findMinFuelCost(example))
console.assert(typeof findMinFuelCost(example) === 'number', 'Function does not return a number.')
console.assert(findMinFuelCost(example) === 37, 'Function does not return correct value.')

// Challenge 1

const fs = require('fs');
fs.readFile('./Day7.txt', 'utf8', (err, data) => {
  let input = formatInput(data)
  console.log('Minimum fuel cost (7-1): ', findMinFuelCost(input))
})