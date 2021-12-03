let example = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

const formatInput = input => input.split('\n')

example = formatInput(example)

const getPowerConsumption = function(input) {

  const binSize = input[0].length;

  // get occurrences of 0 and 1 by position
  const occ0 = Array(binSize).fill(0);
  const occ1 = Array(binSize).fill(0);
  input.map(elem => (
    [...elem].forEach((letter, index) => letter === '0' ? occ0[index]++ : occ1[index]++)
  ));

  // associate each most occurrence to gamma or epsilon (decimal measurements)
  let gamma = 0;
  let epsilon = 0;

  for(let i = 0; i < binSize; i++) {
    let add = 2 ** (binSize - 1 - i);
    occ0[i] > occ1[i] ? epsilon += add : gamma += add ;
  }

  return gamma * epsilon;
}

console.log('Power Consumption (example): ',getPowerConsumption(example));
console.assert(typeof getPowerConsumption(example) === 'number', 'Function not returning number.');
console.assert(getPowerConsumption(example) === 198, 'Function not returning correct value.');

// Challenge 1

const fs = require('fs');
fs.readFile('./Day3.txt', 'utf8', (err, data) => {
  let input = formatInput(data)
  console.log('Power Consumption (3-1): ', getPowerConsumption(input))
})