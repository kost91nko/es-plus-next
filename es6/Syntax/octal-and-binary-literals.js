const { out } = require('../../helpers');

out('octal literals', () => {
  return 0o10 === 8 && 0O10 === 8;
});

out('binary literals', () => {
  return 0b10 === 2 && 0B10 === 2;
});

out('octal supported by Number()', () => {
  return Number('0o1') === 1;
});

out('binary supported by Number()', () => {
  return Number('0b1') === 1;
});
