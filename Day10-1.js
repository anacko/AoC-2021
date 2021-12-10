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
//console.log(example)

const isCorrupt = function(line) {
  let isCorrupt = false;
  let corruptChar = '';
  let errorPoints = 0;

  const validOpen = ['(', '[', '{', '<'];
  const validClose = [')', ']', '}', '>'];
  const points = [3, 57, 1197, 25137];
  
  let i = 0;
  while (i < line.length) {

    // check if line[i] is a closing char
    if (validClose.includes(line[i])) {
      const validPos = validClose.indexOf(line[i])

      // read the before one, if matches, remove both and reset
      if (line[i-1] === validOpen[validPos]) {
        line.splice(i - 1, 2);
        i = 0;
        continue;

      // if pairs not match: it's corrupt!
      } else {
        isCorrupt = true;
        corruptChar = line[i];
        errorPoints = points[validPos]
        break;
      }
    }
    i++;
  }
  
  return { isCorrupt, errorPoints, corruptChar }
}

const addAllPoints = function(input) {
  sumPoints = 0;

  for(i = 0; i < input.length; i++) {
    sumPoints += isCorrupt(input[i]).errorPoints;
  }

  return sumPoints;
}

console.log("Sum of corruption points: ", addAllPoints(example));
console.assert(typeof addAllPoints(example) === 'number', 'Function does not return a number.')
console.assert(addAllPoints(example) === 26397, 'Function does not return correct value.')