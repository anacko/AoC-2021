let example = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const formatInput = function(input) {
  // Make string to array and adding a border of 9's
  input = input.split('\n').map(line => `9${line}9`.split('').map(pos => Number(pos)))
  input.unshift(Array(input[0].length).fill(9))
  input.push(Array(input[0].length).fill(9))
  return input
}

example = formatInput(example)

const mapBasinCenters = function(input) {

  // 1. Map all basin centers
  let basinCenters = [];
  for (let j = 1; j < input.length - 1; j++) {
    for (let i = 1; i < input[j].length - 1; i++) {
      const n = input[j][i]
      if (n < input[j][i - 1]) {
        if(n < input[j][i + 1]) {
          if(n < input[j - 1][i]) {
            if(n < input[j + 1][i]) {
              basinCenters.push([j][i]);
            }
          }
        }
      }
    }
  }

  // 2. Extract the size of basin, by its center
  let center = [3,2]

  // a. read up-down-left-right. If any of them is !9 and is not registered yet, add position to the array.
  // b. read the next term of the array keeper with (a) criteria.
  // c. when no more adds to the keeper are there, return the length of the array.

  return basinCenters;
}

const input = example
const mapBasinSize = function(centerPos) {
  const allPos = [[centerPos[0], centerPos[1]]]     // ex. [ [3, 2] ]
  const allPosStr = [centerPos[0]+'-'+centerPos[1]] // ex. [ '3-2' ]

  let n = 0;
  while (n < allPos.length) {
    const x = allPos[n][0]
    const y = allPos[n][1]

    if ((input[x - 1][y] !== 9) && !allPosStr.includes((x - 1) + '-' + y)) {
      allPos.push([x - 1, y]);
      allPosStr.push((x - 1) + '-' + y);
    }

    n++;
  }

  return allPos.length
}

console.log('Total risk of the Lower Points (example): ', calculateTotalRisk(example))
console.assert(typeof calculateTotalRisk(example) === 'number', 'Function does not return a number.')
console.assert(calculateTotalRisk(example) === 15, 'Function does not return correct value.')

const fs = require('fs');
fs.readFile('./Day9.txt', 'utf8', (err, data) => {
  let input = formatInput(data);
  console.log('Total risk of the Lower Points (8-1): ', calculateTotalRisk(input));
})