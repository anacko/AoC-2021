// Example Day 2
let example = `forward 5
down 5
forward 8
up 3
down 8
forward 2`
example = example.split('\n').map(step => step.split(' '))
//const example = [['forward', '5'], ['down', '5'], ['forward', '8'], ['up', '3'], ['down', '8'], ['forward', '2']];

const getProdPos = function(instructions) {
  let depth = 0;
  let horizontal = 0;

  instructions.map(step => {

    if (step[0] === 'forward') {
      horizontal += Number(step[1])

    } else if (step[0] === 'down') {
      depth += Number(step[1])

    // specification required because input has 1 extra line
    } else if (step[0] === 'up') {
      depth -= Number(step[1])
    }
  })
  return depth * horizontal;
}

console.assert(typeof getProdPos(example) === 'number', 'Does not return a number.')
console.assert(getProdPos(example) === 150, 'Result different than expected.')


// Challenge 2

const fs = require('fs');
fs.readFile('./Day2.txt', 'utf8', (err, data) => {
  let input = data.split('\n').map(step => step.split(' '));
  console.log('Answer 2-1:', getProdPos(input))
})
