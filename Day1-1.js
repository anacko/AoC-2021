// Challenge 1:
const example = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

const countDiffPos = function(arr) {
  let diffNeg = 0;
  for (i = 1; i < arr.length; i++) {
    arr[i] - arr[i-1] > 0 ? diffNeg++ : null;
  }
  return diffNeg
}

console.log('Example:', countDiffPos(example))

// Input 1:
const fs = require('fs');
fs.readFile('./Day1-input.txt', 'utf8', (err, data) => {
  const input1 = data.split('\n').map(elem => Number(elem)); 
  console.log('Input 1:', countDiffPos(input1))
})