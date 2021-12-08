let example = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

const formatInput = function(input) {
  return input.split('\n').map(line => line.split(' | ').map(digit => digit.split(' ')))
}
example = formatInput(example)

const countUniques = function(input) {
  const uniqueSizes = [2, 3, 4, 7]; // correspond to digits: 1, 7, 4 and 8.
  let sumUniques = 0;
  input.map(line => line[1].map(digits => uniqueSizes.includes(digits.length) ? sumUniques ++ : null));
  return sumUniques;
};

console.log('Number of entries with unique values (example): ',countUniques(example));
console.assert(typeof countUniques(example) === 'number', 'Function does not return a number.');
console.assert(countUniques(example) === 26, 'Function does not return correct value.');


// Challenge 1

const fs = require('fs');
fs.readFile('./Day8.txt', 'utf8', (err, data) => {
  let input = formatInput(data);
  console.log('Number of entries with unique values (8-1): ', countUniques(input));
})