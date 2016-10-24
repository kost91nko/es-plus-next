const { out, __createIterableObject } = require('../../helpers');

out('basic functionality', () => {
  return (function (foo, ...args) {
    return args instanceof Array && args.toString() === "bar,baz";
  }("foo", "bar", "baz"));
});

out('function "length" property', () => {
  return function(a, ...b){}.length === 1 && function(...c){}.length === 0;
});

out('arguments object interaction', () => {
  return (function (foo, ...args) {
    foo = "qux";
    // The arguments object is not mapped to the
    // parameters, even outside of strict mode.
    return arguments.length === 3
      && arguments[0] === "foo"
      && arguments[1] === "bar"
      && arguments[2] === "baz";
  }("foo", "bar", "baz"));
});

out('can\'t be used in setters', () => {
  return (function (...args) {
    try {
      eval("({set e(...args){}})");
    } catch(e) {
      return true;
    }
  }());
});

out('new Function() support', () => {
  return new Function("a", "...b",
    "return b instanceof Array && a+b === 'foobar,baz';"
  )('foo','bar','baz');
});



