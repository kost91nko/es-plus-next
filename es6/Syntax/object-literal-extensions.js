const { out, __createIterableObject } = require('../../helpers');

out('computed properties', () => {
  var x = 'y';
  return ({ [x]: 1 }).y === 1;
});

out('shorthand properties', () => {
  var a = 7, b = 8, c = {a,b};
  return c.a === 7 && c.b === 8;
});

out('shorthand methods', () => {
  return ({ y() { return 2; } }).y() === 2;
});

out('string-keyed shorthand methods', () => {
  return ({ "foo bar"() { return 4; } })["foo bar"]() === 4;
});

out('computed shorthand methods', () => {
  var x = 'y';
  return ({ [x](){ return 1 } }).y() === 1;
});

out('computed accessors', () => {
  var x = 'y',
    valueSet,
    obj = {
      get [x] () { return 1 },
      set [x] (value) { valueSet = value }
    };
  obj.y = 'foo';
  return obj.y === 1 && valueSet === 'foo';
});

