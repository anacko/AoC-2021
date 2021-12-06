let example = `3,4,3,1,2`

const formatInput = function(input) {
  return input.split(',').map(day => Number(day))
}

example = formatInput(example)
console.log(example)

const passDays = function(lanterfish, numberOfDays) {

  let amounts = Array(9).fill(0);
  lanterfish.map(fish => amounts[fish]++);

  const passDay = function(amounts) {
    const newAmounts = new Array(9);
    newAmounts[0] = amounts[1]
    newAmounts[1] = amounts[2]
    newAmounts[2] = amounts[3]
    newAmounts[3] = amounts[4]
    newAmounts[4] = amounts[5]
    newAmounts[5] = amounts[6]
    newAmounts[6] = amounts[7] + amounts[0] // repro fish
    newAmounts[7] = amounts[8]
    newAmounts[8] = amounts[0] // new fish

    return newAmounts;
  }

  for(let i = 1; i <= numberOfDays; i++) {
    amounts = passDay(amounts);
  }

  return amounts.reduce((p, c) => p + c, 0);
}

console.log("Number of Lanterfish after 256 days (example): ", passDays(example, 256))

// Challenge 2

const fs = require('fs');
fs.readFile('./Day6.txt', 'utf8', (err, data) => {
  let input = formatInput(data)
  console.log('Number of Lanterfish after 256 days (6-2): ', passDays(input, 256))
})