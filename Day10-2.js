let example = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

const formatInput = function(input) {
  return input.split('\n').map(line => line.split(''))
}

example = formatInput(example)

const isCorrupt = function(line) {
  let isCorrupt = false;
  const validOpen = ['(', '[', '{', '<'];
  const validClose = [')', ']', '}', '>'];
  
  let i = 0;
  while (i < line.length) {
    if (validClose.includes(line[i])) {
      const validPos = validClose.indexOf(line[i]);
      // when is closing char, check if the position before matches as opening
      // if matches, remove both and reset
      if (line[i-1] === validOpen[validPos]) {
        line.splice(i - 1, 2);
        i = 0;
        continue;
      // if does not match, it is corrupt
      } else {
        isCorrupt = true;
        break;
      }
    }
    i++;
  }
  return isCorrupt
}

const calculateScore = function(line) {

  const validOpen = ['(', '[', '{', '<'];
  const validClose = [')', ']', '}', '>'];
  
  // Clean to let only open valids remain
  let i = 0;
  while (i < line.length) {
    if (validClose.includes(line[i])) {
      const validPos = validClose.indexOf(line[i]);
      if (line[i-1] === validOpen[validPos]) {
        line.splice(i - 1, 2);
        i = 0;
        continue;
      }
    }
    i++;
  }
  // Score = valid position + 1
  // reverse order bc it is autocomplete to close
  const charPos = line.map(char => validOpen.indexOf(char))
  const lineScore = charPos.reverse().reduce((p, c) => (p * 5) + (c + 1), 0)
  
  return lineScore;
}


const getMiddlePoints = function(input) {
  const validLines = [];
  input.map(line => !isCorrupt(line) ? validLines.push(line) : null);
  
  scores = validLines.map(line => calculateScore(line))
  scores.sort((a, b) => a - b)
  // length of scores will always be odd
  return scores[(scores.length - 1) / 2];
}

console.log('Middle score of autocorrect (example): ', getMiddlePoints(example));
console.assert(typeof getMiddlePoints(example) === 'number', 'Function does not return a number.')
console.assert(getMiddlePoints(example) === 288957, 'Function does not return correct value.')

// Challenge 2
const fs = require('fs');
fs.readFile('./Day10.txt', 'utf8', (err, data) => {
  let input = formatInput(data);
  console.log('Middle score of autocorrect (10-2): ', getMiddlePoints(input));
})