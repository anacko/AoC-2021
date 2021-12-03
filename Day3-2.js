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
console.log(example)

const getLifeSupport = function(input) {

  let oxyGenIdx = [...Array(input.length).keys()];
  let CoScrubberIdx = [...Array(input.length).keys()];

  const checkPopularity = function(input, pos) {
    let idx0 = [];
    let idx1 = [];
    input.map((elem, index) => elem[pos] === '0' ? idx0.push(index) : idx1.push(index))
    return { idx0, idx1 }
  }

  let pos = 0;
  while(oxyGenIdx.length > 1) {
    console.log("input before all:", input)
    let indexes = checkPopularity(input, pos)
    console.log("Indexes: ", indexes, "pos: ", pos)

    if (indexes.idx0.length > indexes.idx1.length) {
      input = input.filter((value, index) => indexes.idx0.includes(index))
      oxyGenIdx = oxyGenIdx.filter(elem => indexes.idx0.includes(elem))
    
    } else {
      input = input.filter((value, index) => indexes.idx1.includes(index))
      oxyGenIdx = oxyGenIdx.filter(elem => indexes.idx1.includes(elem))
    }
    console.log("oxyGenIdx: ", oxyGenIdx)
    pos++;
  }
  console.log(input[oxyGenIdx[0]])

  pos = 0;
  while(CoScrubberIdx.length > 1 & pos < 15) {
    let indexes = checkPopularity(CoScrubberIdx, pos)
    if (indexes.idx0.length > indexes.idx1.length) {
      CoScrubberIdx = CoScrubberIdx.filter(elem => indexes.idx1.includes(elem))
    } else {
      CoScrubberIdx = CoScrubberIdx.filter(elem => indexes.idx0.includes(elem))
    }
    pos++;
  }

    return [oxyGenIdx, CoScrubberIdx]
    //return Number(input[oxyGenIdx[0]]) * Number(input[CoScrubberIdx[0]])
}

console.log(getLifeSupport(example))

// Challenge 1

// const fs = require('fs');
// fs.readFile('./Day3.txt', 'utf8', (err, data) => {
//   let input = formatInput(data)
//   console.log('Answer 3-1:', getLifeSupport(input))
// })