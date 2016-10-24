const { out, __createIterableObject } = require('../../helpers');
out.setIdent(50);

out('with arrays', () => {
  var [a, , [b], c] = [5, null, [6]];
  return a === 5 && b === 6 && c === undefined;
});

out('with sparse arrays', () => {
  var [a, , b] = [,,,];
  return a === undefined && b === undefined;
});

out('with strings', () => {
  var [a, b, c] = "ab";
  return a === "a" && b === "b" && c === undefined;
});

out('with astral plane strings', () => {
  var [c] = "𠮷𠮶";
  return c === "𠮷";
});

out('with generator instances', () => {
  var [a, b, c] = (function*(){ yield 1; yield 2; }());
  return a === 1 && b === 2 && c === undefined;
});

out('with generic iterables', () => {
  var [a, b, c] = __createIterableObject([1, 2]);
  return a === 1 && b === 2 && c === undefined;
});

out('with instances of generic iterables', () => {
  var [a, b, c] = Object.create(__createIterableObject([1, 2]));
  return a === 1 && b === 2 && c === undefined;
});

out('iterator closing', () => {
  var closed = false;
  var iter = __createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  var [a, b] = iter;
  return closed;
});

out('trailing commas in iterable patterns', () => {
  var [a,] = [1];
  return a === 1;
});

out('with objects', () => {
  var {c, x:d, e} = {c:7, x:8};
  return c === 7 && d === 8 && e === undefined;
});

out('object destructuring with primitives', () => {
  var {toFixed} = 2;
  var {slice} = '';
  return toFixed === Number.prototype.toFixed
    && slice === String.prototype.slice;
});

out('trailing commas in object patterns', () => {
  var {a,} = {a:1};
  return a === 1;
});

out('throws on null and undefined', () => {
  try {
    var {a} = null;
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  try {
    var {b} = undefined;
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  return true;
});

out('computed properties', () => {
  var qux = "corge";
  var { [qux]: grault } = { corge: "garply" };
  return grault === "garply";
});

out('multiples in a single var statement', () => {
  var [a,b] = [5,6], {c,d} = {c:7,d:8};
  return a === 5 && b === 6 && c === 7 && d === 8;
});

out('nested', () => {
  var [e, {x:f, g}] = [9, {x:10}];
  var {h, x:[i]} = {h:11, x:[12]};
  return e === 9 && f === 10 && g === undefined
    && h === 11 && i === 12;
});

out('in for-in loop heads', () => {
  for(var [i, j, k] in { qux: 1 }) {
    return i === "q" && j === "u" && k === "x";
  }
});

out('in for-of loop heads', () => {
  for(var [i, j, k] of [[1,2,3]]) {
    return i === 1 && j === 2 && k === 3;
  }
});

out('in catch heads', () => {
  try {
    throw [1,2];
  } catch([i,j]) {
    try {
      throw { k: 3, l: 4 };
    } catch({k, l}) {
      return i === 1 && j === 2 && k === 3 && l === 4;
    }
  }
});

out('rest', () => {
  var [a, ...b] = [3, 4, 5];
  var [c, ...d] = [6];
  return a === 3 && b instanceof Array && (b + "") === "4,5" &&
    c === 6 && d instanceof Array && d.length === 0;
});

out('defaults', () => {
  var {a = 1, b = 0, z:c = 3} = {b:2, z:undefined};
  var [d = 0, e = 5, f = 6] = [4,,undefined];
  return a === 1 && b === 2 && c === 3
    && d === 4 && e === 5 && f === 6;
});

out('defaults, let temporal dead zone', () => {
  var {a, b = 2} = {a:1};
  try {
    eval("let {c = c} = {};");
    return false;
  } catch(e){}
  try {
    eval("let {c = d, d} = {d:1};");
    return false;
  } catch(e){}
  return a === 1 && b === 2;
});




