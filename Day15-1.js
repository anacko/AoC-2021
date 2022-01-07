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

example = formatInput(example);
console.log(example)

const path = 'iijjjjjjijiijiiiji'
console.log(sumPath(path.split(''), example))
// For now, it sums the total risk for a given path.