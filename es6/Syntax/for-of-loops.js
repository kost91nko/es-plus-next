const { out, __createIterableObject } = require('../../helpers');
/**
 * http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements
 */

out('with arrays', () => {
  var arr = [5];
  for (var item of arr)
    return item === 5;
});

out('with sparse arrays', () => {
  var arr = [,,];
  var count = 0;
  for (var item of arr)
    count += (item === undefined);
  return count === 2;
});

out('with strings', () => {
  var str = "";
  for (var item of "foo")
    str += item;
  return str === "foo";
});

out('with astral plane strings', () => {
  var str = "";
  for (var item of "𠮷𠮶")
    str += item + " ";
  return str === "𠮷 𠮶 ";
});

out('with generator instances', () => {
  var result = "";
  var iterable = (function*(){ yield 1; yield 2; yield 3; }());
  for (var item of iterable) {
    result += item;
  }
  return result === "123";
});

out('with generic iterables', () => {
  try{
    var result = "";
    var iterable = __createIterableObject([1, 2, 3]);
    for (var item of iterable) {
      result += item;
    }
    return result === "123";
  } catch (e){
    return '__createIterableObject isn\' supported';
  }
});

out('with instances of generic iterables', () => {
  try{
    var result = "";
    var iterable = __createIterableObject([1, 2, 3]);
    for (var item of Object.create(iterable)) {
      result += item;
    }
    return result === "123";
  } catch (e){
    return '__createIterableObject isn\'t supported';
  }
});

out('iterator closing, break', () => {
  try{
    var closed = false;
    var iter = __createIterableObject([1, 2, 3], {
      'return': function(){ closed = true; return {}; }
    });
    for (var it of iter) break;
    return closed;
  } catch (e){
    return '__createIterableObject isn\'t supported';
  }
});

out('iterator closing, throw', () => {
  var closed = false;
  var iter = __createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  try {
    for (var it of iter) throw 0;
  } catch(e){}
  return closed;
});

