const { out } = require('../../helpers');

out('in strings', () => {
  return '\u{1d306}' == '\ud834\udf06';
});

out('in identifiers', () => {
  var \u{102C0} = { \u{102C0} : 2 };
  return \u{102C0}['\ud800\udec0'] === 2;
});


console.log('\ud834\udf06');
