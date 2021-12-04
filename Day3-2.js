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
01010`;
const formatInput = input => input.split('\n');
example = formatInput(example);

const getLifeSupport = function(input) {

  // Separates indexes with 0 and with 1 at a specific position
  const checkPopularity = function(input, pos) {
    let idx0 = [];
    let idx1 = [];
    input.map((elem, index) => elem[pos] === '0' ? idx0.push(index) : idx1.push(index))
    return { idx0, idx1 }
  }
  
  // Initial separation for 1st digit (position 0), common input
  let indexes = checkPopularity(input, 0)
  let oxyInput = [];
  let coInput = [];
  if (indexes.idx0.length > indexes.idx1.length) {
    oxyInput = input.filter((value, index) => indexes.idx0.includes(index))
    coInput = input.filter((value, index) => indexes.idx1.includes(index))
  } else {
    oxyInput = input.filter((value, index) => indexes.idx1.includes(index))
    coInput = input.filter((value, index) => indexes.idx0.includes(index))
  }
  
  // For Oxygen Generator Rating: gets most popular, by digit position
  let pos = 1;
  while(oxyInput.length > 1) {
    indexes = checkPopularity(oxyInput, pos);
    if (indexes.idx0.length > indexes.idx1.length) {
      oxyInput = oxyInput.filter((value, index) => indexes.idx0.includes(index));
    } else {
      oxyInput = oxyInput.filter((value, index) => indexes.idx1.includes(index));
    }
    pos++;
  }

  // For CO2 Scrubber Rating: gets least popular, by digit position
  pos = 1;
  while(coInput.length > 1 & pos < 15) {
    indexes = checkPopularity(coInput, pos);
    if (indexes.idx0.length > indexes.idx1.length) {
      coInput = coInput.filter((value, index) => indexes.idx1.includes(index))
    } else {
      coInput = coInput.filter((value, index) => indexes.idx0.includes(index))
    }
    pos++;
  }

  // Convert to decimal and multiply
  return parseInt(oxyInput[0], 2) * parseInt(coInput[0], 2);
};

// Run with example data:
console.log(getLifeSupport(example))
console.assert(typeof getLifeSupport(example) === 'number', 'Function not returning number.');
console.assert(getLifeSupport(example) === 230, 'Function not returning correct value.');

// Challenge 2
const fs = require('fs');
fs.readFile('./Day3.txt', 'utf8', (err, data) => {
  let input = formatInput(data)
  console.log('Answer 3-2:', getLifeSupport(input))
})