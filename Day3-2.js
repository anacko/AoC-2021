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

const formatInput = function(input) {
  return input.split('\n')
}
example = formatInput(example)
console.log(example)

const getMostOccurrences = function(input) {

  const binSize = input[0].length

  // get occurrences of 0 and 1 by position
  const occ0 = Array(binSize).fill(0)
  const occ1 = Array(binSize).fill(0)
  input.map(elem => (
    [...elem].forEach((letter, index) => letter === '0' ? occ0[index]++ : occ1[index]++)
  ))

  // get gamma (most occurrences for each position) and epsilon (least occurrences)
  const gamma = [];
  const epsilon = [];
  let gammaDec = 0;
  let epsilonDec = 0;
  for(let i = 0; i < binSize; i++) {
    // occ0[i] > occ1[i] ? gamma.push(0) : gamma.push(1);
    // epsilon.push(1 - gamma[i]);

    let add = 2 ** (binSize - 1 - i);

    occ0[i] > occ1[i] ? epsilonDec += add : gammaDec += add ;

  }

  // convert gamma and epsilon to decimal base
  // let gammaDec = 0;
  // let epsilonDec = 0;
  // for(let i = 0; i < binSize; i++) {
  //   gammaDec += gamma[i] * (2 ** (binSize - 1 - i))
  //   epsilonDec += epsilon[i] * (2 ** (binSize - 1 - i))
  // }

  return [gammaDec * epsilonDec, gammaDec, epsilonDec]
}

console.log(getMostOccurrences(example))

// Challenge 1

const fs = require('fs');
fs.readFile('./Day3.txt', 'utf8', (err, data) => {
  let input = formatInput(data)
  console.log('Answer 3-1:', getMostOccurrences(input))
})