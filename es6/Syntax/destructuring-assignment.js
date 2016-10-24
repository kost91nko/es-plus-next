const { out, __createIterableObject } = require('../../helpers');

out('with arrays', () => {
  var a,b,c;
  [a, , [b], c] = [5, null, [6]];
  return a === 5 && b === 6 && c === undefined;
});

out('with sparse arrays', () => {
  var a, b;
  [a, , b] = [,,,];
  return a === undefined && b === undefined;
});

out('with strings', () => {
  var a,b,c;
  [a, b, c] = "ab";
  return a === "a" && b === "b" && c === undefined;
});

out('with astral plane strings', () => {
  var c;
  [c] = "𠮷𠮶";
  return c === "𠮷";
});

out('with generator instances', () => {
  var a,b,c;
  [a, b, c] = (function*(){ yield 1; yield 2; }());
  return a === 1 && b === 2 && c === undefined;
});

out('with generic iterables', () => {
  var a,b,c;
  [a, b, c] = __createIterableObject([1, 2]);
  return a === 1 && b === 2 && c === undefined;
});

out('with instances of generic iterables', () => {
  var a,b,c;
  [a, b, c] = Object.create(global.__createIterableObject([1, 2]));
  return a === 1 && b === 2 && c === undefined;
});

out('terator closing', () => {
  var closed = false;
  var iter = __createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  var a,b;
  [a, b] = iter;
  return closed;
});

out('iterable destructuring expression', () => {
  var a, b, iterable = [1,2];
  return ([a, b] = iterable) === iterable;
});

out('chained iterable destructuring', () => {
  var a,b,c,d;
  [a,b] = [c,d] = [1,2];
  return a === 1 && b === 2 && c === 1 && d === 2;
});

out('trailing commas in iterable patterns', () => {
  var a;
  [a,] = [1];
  return a === 1;
});

out('with objects', () => {
  var c,d,e;
  ({c, x:d, e} = {c:7, x:8});
  return c === 7 && d === 8 && e === undefined;
});

out('object destructuring with primitives', () => {
  var toFixed, slice;
  ({toFixed} = 2);
  ({slice} = '');
  return toFixed === Number.prototype.toFixed
    && slice === String.prototype.slice;
});

out('trailing commas in object patterns', () => {
  var a;
  ({a,} = {a:1});
  return a === 1;
});

out('object destructuring expression', () => {
  var a, b, obj = { a:1, b:2 };
  return ({a,b} = obj) === obj;
});

out('parenthesised left-hand-side is a syntax error', () => {
  var a, b;
  ({a,b} = {a:1,b:2});
  try {
    eval("({a,b}) = {a:3,b:4};");
  }
  catch(e) {
    return a === 1 && b === 2;
  }
});

out('chained object destructuring', () => {
  var a,b,c,d;
  ({a,b} = {c,d} = {a:1,b:2,c:3,d:4});
  return a === 1 && b === 2 && c === 3 && d === 4;
});

out('throws on null and undefined', () => {
  var a,b;
  try {
    ({a} = null);
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  try {
    ({b} = undefined);
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  return true;
});

out('computed properties', () => {
  var grault, qux = "corge";
  ({ [qux]: grault } = { corge: "garply" });
  return grault === "garply";
});

out('nested', () => {
  var e,f,g,h,i;
  [e, {x:f, g}] = [9, {x:10}];
  ({h, x:[i]} = {h:11, x:[12]});
  return e === 9 && f === 10 && g === undefined
    && h === 11 && i === 12;
});

out('nested rest', () => {
  var a = [1, 2, 3], first, last;
  [first, ...[a[2], last]] = a;
  return first === 1 && last === 3 && (a + "") === "1,2,2";
});

out('empty patterns', () => {
  [] = [1,2];
  ({} = {a:1,b:2});
  return true;
});

out('defaults', () => {
  var a,b,c,d,e,f;
  ({a = 1, b = 0, z:c = 3} = {b:2, z:undefined});
  [d = 0, e = 5, f = 6] = [4,,undefined];
  return a === 1 && b === 2 && c === 3
    && d === 4 && e === 5 && f === 6;
});
