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

const calculateTotalRisk = function(input) {
  let sumOfLowerPointsRisk = 0;
  // Input has a border of nines for comparison
  for (let j = 1; j < input.length - 1; j++) {
    for (let i = 1; i < input[j].length - 1; i++) {
      const n = input[j][i]
      if (n < input[j][i - 1]) {
        if(n < input[j][i + 1]) {
          if(n < input[j - 1][i]) {
            if(n < input[j + 1][i]) {
              sumOfLowerPointsRisk += n + 1;
            }
          }
        }
      }
    }
  }
  return sumOfLowerPointsRisk;
}

console.log('Total risk of the Lower Points (example): ', calculateTotalRisk(example))
console.assert(typeof calculateTotalRisk(example) === 'number', 'Function does not return a number.')
console.assert(calculateTotalRisk(example) === 15, 'Function does not return correct value.')

const fs = require('fs');
fs.readFile('./Day9.txt', 'utf8', (err, data) => {
  let input = formatInput(data);
  console.log('Total risk of the Lower Points (8-1): ', calculateTotalRisk(input));
})