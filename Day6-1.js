let example = `3,4,3,1,2`

const formatInput = function(input) {
  return input.split(',').map(day => Number(day))
}

example = formatInput(example)
console.log(example)

const passDays = function(lanterfish, numberOfDays) {

  const passDay = function(lanterfish) {
    const after = [];
    lanterfish.map(day => {
      if (day) {
        after.push(day - 1);
      } else {
        after.push(6);
        after.push(8);
      }
    });
    return after;
  }

  for(i = 1; i <= numberOfDays; i++) {
    lanterfish = passDay(lanterfish);
  }

  return(lanterfish.length);
}

console.log("Number of Lanterfish after 80 days (example): ", passDays(example, 80))

// Challenge 1

const fs = require('fs');
fs.readFile('./Day6.txt', 'utf8', (err, data) => {
  let input = formatInput(data)
  console.log('Number of Lanterfish after 80 days (6-1): ', passDays(input, 80))
})