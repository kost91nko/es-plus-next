const { out, __createIterableObject } = require('../../helpers');

out('with arrays', () => {
  return function([a, , [b], c]) {
    return a === 5 && b === 6 && c === undefined;
  }([5, null, [6]]);
});

out('with sparse arrays', () => {
  return function([a, , b]) {
    return a === undefined && b === undefined;
  }([,,,]);
});

out('with strings', () => {
  return function([a, b, c]) {
    return a === "a" && b === "b" && c === undefined;
  }("ab");
});

out('with astral plane strings', () => {
  return function([c]) {
    return c === "𠮷";
  }("𠮷𠮶");
});

out('with generator instances', () => {
  return function([a, b, c]) {
    return a === 1 && b === 2 && c === undefined;
  }(function*(){ yield 1; yield 2; }());
});

out('with generic iterables', () => {
  return function([a, b, c]) {
    return a === 1 && b === 2 && c === undefined;
  }(__createIterableObject([1, 2]));
});

out('with instances of generic iterables', () => {
  return function([a, b, c]) {
    return a === 1 && b === 2 && c === undefined;
  }(Object.create(__createIterableObject([1, 2])));
});

out('iterator closing', () => {
  var closed = false;
  var iter = global.__createIterableObject([1, 2, 3], {
    'return': function(){ closed = true; return {}; }
  });
  (function([a,b]) {}(iter));
  return closed;
});

out('trailing commas in iterable patterns', () => {
  return function([a,]) {
    return a === 1;
  }([1]);
});

out('with objects', () => {
  return function({c, x:d, e}) {
    return c === 7 && d === 8 && e === undefined;
  }({c:7, x:8});
});

out('object destructuring with primitives', () => {
  return function({toFixed}, {slice}) {
    return toFixed === Number.prototype.toFixed
      && slice === String.prototype.slice;
  }(2,'');
});

out('trailing commas in object patterns', () => {
  return function({a,}) {
    return a === 1;
  }({a:1});
});

out('throws on null and undefined', () => {
  try {
    (function({a}){}(null));
    return false;
  } catch(e) {}
  try {
    (function({b}){}(undefined));
    return false;
  } catch(e) {}
  return true;
});

out('computed properties', () => {
  var qux = "corge";
  return function({ [qux]: grault }) {
    return grault === "garply";
  }({ corge: "garply" });
});

out('nested', () => {
  return function([e, {x:f, g}], {h, x:[i]}) {
    return e === 9 && f === 10 && g === undefined
      && h === 11 && i === 12;
  }([9, {x:10}],{h:11, x:[12]});
});

out('arguments\' interaction', () => {
  return (function({a, x:b, y:e}, [c, d]) {
    return arguments[0].a === 1 && arguments[0].x === 2
      && !("y" in arguments[0]) && arguments[1] + '' === "3,4";
  }({a:1, x:2}, [3, 4]));
});

out('new Function() support', () => {
  return new Function("{a, x:b, y:e}","[c, d]",
    "return a === 1 && b === 2 && c === 3 && "
    + "d === 4 && e === undefined;"
  )({a:1, x:2}, [3, 4]);
});

out('in parameters, function \'length\' property', () => {
  return function({a, b}, [c, d]){}.length === 2;
});

out('rest', () => {
  return function([a, ...b], [c, ...d]) {
    return a === 3 && b instanceof Array && (b + "") === "4,5" &&
      c === 6 && d instanceof Array && d.length === 0;
  }([3, 4, 5], [6]);
});

out('empty patterns', () => {
  return function ([],{}){
    return arguments[0] + '' === "3,4" && arguments[1].x === "foo";
  }([3,4],{x:"foo"});
});

out('defaults', () => {
  return (function({a = 1, b = 0, c = 3, x:d = 0, y:e = 5},
    [f = 6, g = 0, h = 8]) {
    return a === 1 && b === 2 && c === 3 && d === 4 &&
      e === 5 && f === 6 && g === 7 && h === 8;
  }({b:2, c:undefined, x:4},[, 7, undefined]));
});

out('defaults, separate scope', () => {
  return (function({a=function(){
    return typeof b === 'undefined';
  }}){
    var b = 1;
    return a();
  }({}));
});

out('defaults, new Function() support', () => {
  return new Function("{a = 1, b = 0, c = 3, x:d = 0, y:e = 5}",
    "return a === 1 && b === 2 && c === 3 && d === 4 && e === 5;"
  )({b:2, c:undefined, x:4});
});

