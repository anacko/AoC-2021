// Example Day 2
let example = `forward 5
down 5
forward 8
up 3
down 8
forward 2`
example = example.split('\n').map(step => step.split(' '))
// [['forward', '5'], ['down', '5'], ['forward', '8'], ['up', '3'], ['down', '8'], ['forward', '2']];

const getProdPos = function(instructions) {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  instructions.map(step => {
    const x = Number(step[1])

    if (step[0] === 'forward') {
      horizontal += x
      depth += aim * x

    } else if (step[0] === 'down') {
      aim += x

    // specification required because input has 1 extra line
    } else if (step[0] === 'up') {
      aim -= x
    }
  })
  return depth * horizontal;
}

console.assert(typeof getProdPos(example) === 'number', 'Does not return a number.')
console.assert(getProdPos(example) === 900, 'Result different than expected.')


// Challenge 2

const fs = require('fs');
fs.readFile('./Day2.txt', 'utf8', (err, data) => {
  let input = data.split('\n').map(step => step.split(' '));
  console.log('Answer 2-2:', getProdPos(input))
})
