let example = `16,1,2,0,4,2,7,1,2,14`

const formatInput = function(input) {
  return input.split(',').map(elem => Number(elem))
}
example = formatInput(example)
console.log(example)

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

console.log(findMinFuelCost(example))