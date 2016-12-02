const { out } = require('../../helpers');

out('0 parameters', () => {
  return (() => 5)() === 5;
});

out('1 parameter, no brackets', () => {
  var b = x => x + "foo";
  return (b("fee fie foe ") === "fee fie foe foo");
});

out('multiple parameters', () => {
  var c = (v, w, x, y, z) => "" + v + w + x + y + z;
  return (c(6, 5, 4, 3, 2) === "65432");
});

out('lexical "this" binding', () => {
  var d = { x : "bar", y : function() { return z => this.x + z; }}.y();
  var e = { x : "baz", y : d };
  return d("ley") === "barley" && e.y("ley") === "barley";
});

out('"this" unchanged by call or apply', () => {
  var d = { x : "foo", y : function() { return () => this.x; }};
  var e = { x : "bar" };
  return d.y().call(e) === "foo" && d.y().apply(e) === "foo";
});

out('can\'t be bound, can be curried', () => {
  var d = { x : "bar", y : function() { return z => this.x + z; }};
  var e = { x : "baz" };
  return d.y().bind(e, "ley")() === "barley";
});

out('lexical "arguments" binding', () => {
  var f = (function() { return z => arguments[0]; }(5));
  return f(6) === 5;
});

out('no line break between params and =>', () => {
  return (() => {
    try { Function("x\n => 2")(); } catch(e) { return true; }
  })();
});

out('correct precedence', () => {
  return (() => {
    try { Function("0 || () => 2")(); } catch(e) { return true; }
  })();
});

out('no "prototype" property', () => {
  var a = () => 5;
  return !a.hasOwnProperty("prototype");
});

out('lexical "super" binding in constructors', () => {
  var received;

  class B {
    constructor (arg) {
      received = arg;
    }
  }
  class C extends B {
    constructor () {
      var callSuper = () => super('foo');
      callSuper();
    }
  }
  return new C instanceof C && received === 'foo'
});

out('lexical "super" binding in methods', () => {
  class B {
    qux() {
      return "quux";
    }
  }
  class C extends B {
    baz() {
      return x => super.qux();
    }
  }
  var arrow = new C().baz();
  return arrow() === "quux";
});

out('lexical "new.target" binding', () => {
  function C() {
    return x => new.target;
  }
  return new C()() === C && C()() === undefined;
});

