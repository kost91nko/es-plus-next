const { out, __createIterableObject } = require('../../helpers');

out('with arrays, in function calls', () => {
  return Math.max(...[1, 2, 3]) === 3
});

out('with arrays, in array literals', () => {
  return [...[1, 2, 3]][2] === 3;
});

out('with sparse arrays, in function calls', () => {
  var a = Array(...[,,]);
  return "0" in a && "1" in a && '' + a[0] + a[1] === "undefinedundefined";
});

out('with sparse arrays, in array literals', () => {
  var a = [...[,,]];
  return "0" in a && "1" in a && '' + a[0] + a[1] === "undefinedundefined";
});

out('with strings, in function calls', () => {
  return Math.max(..."1234") === 4;
});

out('with strings, in array literals', () => {
  return ["a", ..."bcd", "e"][3] === "d";
});

out('with astral plane strings, in function calls', () => {
  return Array(..."𠮷𠮶")[0] === "𠮷";
});

out('with astral plane strings, in array literals', () => {
  return [..."𠮷𠮶"][0] === "𠮷";
});

out('with generator instances, in calls', () => {
  var iterable = (function*(){ yield 1; yield 2; yield 3; }());
  return Math.max(...iterable) === 3;
});

out('with generator instances, in arrays', () => {
  var iterable = (function*(){ yield "b"; yield "c"; yield "d"; }());
  return ["a", ...iterable, "e"][3] === "d";
});

out('with generic iterables, in calls', () => {
  try {
    var iterable = global.__createIterableObject([1, 2, 3]);
  } catch (e){
    return "__createIterableObject is not defined";
  }
  return Math.max(...iterable) === 3;
});

out('with generic iterables, in calls', () => {
  try {
    var iterable = global.__createIterableObject(["b", "c", "d"]);
  } catch (e){
    return "__createIterableObject is not defined";
  }
  return ["a", ...iterable, "e"][3] === "d";
});

out('with instances of iterables, in calls', () => {
  try {
    var iterable = global.__createIterableObject([1, 2, 3]);
    return Math.max(...Object.create(iterable)) === 3;
  } catch (e){
    return "__createIterableObject is not defined";
  }
});

out('with instances of iterables, in arrays', () => {
  try {
    var iterable = global.__createIterableObject(["b", "c", "d"]);
    return ["a", ...Object.create(iterable), "e"][3] === "d";
  } catch (e){
    return "__createIterableObject is not defined";
  }
});

out('spreading non-iterables is a runtime error', () => {
  try {
    Math.max(...2);
  } catch(e) {
    return Math.max(...[1, 2, 3]) === 3;
  }
});
