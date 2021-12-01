// Challenge 1:
const example = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

const countDiffPosWindow = function (arr, winSize = 3) {
  let diffPos = 0;
  for (i = winSize; i < arr.length; i++) {
    arr[i] - arr[i - winSize] > 0 ? diffPos++ : null;
  }
  return diffPos;
}

console.log('Example:', countDiffPosWindow(example));

//Input 2:
const fs = require('fs');
fs.readFile('./Day1-1.txt', 'utf8', (err, data) => {
  const input1 = data.split('\n').map(elem => Number(elem));
  console.log('Input 2:', countDiffPosWindow(input1));
})