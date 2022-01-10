const { genPaths } = require('./Day15-aux.js')

let example = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const formatInput = function(input) {
  return input.split('\n').map(line => line.split('').map(elem => parseInt(elem)))
}

const sumPath = function(sequence, input) {
  // sequence is array: [i, i, i, i, i, j, j, i, i, j, j, j, i, i, j, j, i...]
  let i = 0;
  let j = 0;
  let sumPath = 0;
  sequence.map(move => {
    move === 'i' ? i++ : j++;
    sumPath += input[i][j];
  });
  
  return sumPath;
}

const calculateLowestRisk = function(input) {
  const n = input[0].length - 1;
  const t = n + input.length - 1;
  const allPaths = genPaths(n, t);
  let lowestRisk = sumPath(allPaths[0].split(''), input);
  allPaths.map(path => {
    const risk = sumPath(path.split(''), input);
    if (risk < lowestRisk) { lowestRisk = risk }
  })
  return lowestRisk;
}

example = formatInput(example);
console.log("Lowest Risk: ", calculateLowestRisk(example))
console.assert(typeof calculateLowestRisk(example) === 'number', 
  'Function does not return a number.');
console.assert(calculateLowestRisk(example) === 40, 
  'Function does not return correct value.');

