const { out } = require('../../helpers');

out('class statement', () => {
  class C {}
  return typeof C === "function";
});

out('is block-scoped', () => {
  class C {}
  var c1 = C;
  {
    class C {}
    var c2 = C;
  }
  return C === c1;
});

out('class expression', () => {
  return typeof class C {} === "function";
});

out('anonymous class', () => {
  return typeof class {} === "function";
});

out('constructor', () => {
  class C {
    constructor() { this.x = 1; }
  }
  return C.prototype.constructor === C
    && new C().x === 1;
});

out('prototype methods', () => {
  class C {
    method() { return 2; }
  }
  return typeof C.prototype.method === "function"
    && new C().method() === 2;
});

out('string-keyed methods', () => {
  class C {
    "foo bar"() { return 2; }
  }
  return typeof C.prototype["foo bar"] === "function"
    && new C()["foo bar"]() === 2;
});

out('computed prototype methods', () => {
  var foo = "method";
  class C {
    [foo]() { return 2; }
  }
  return typeof C.prototype.method === "function"
    && new C().method() === 2;
});

out('optional semicolons', () => {
  class C {
    ;
    method() { return 2; };
    method2() { return 2; }
    method3() { return 2; };
  }
  return typeof C.prototype.method === "function"
    && typeof C.prototype.method2 === "function"
    && typeof C.prototype.method3 === "function";
});

out('static methods', () => {
  class C {
    static method() { return 3; }
  }
  return typeof C.method === "function"
    && C.method() === 3;
});

out('computed static methods', () => {
  var foo = "method";
  class C {
    static [foo]() { return 3; }
  }
  return typeof C.method === "function"
    && C.method() === 3;
});

out('accessor properties', () => {
  var baz = false;
  class C {
    get foo() { return "foo"; }
    set bar(x) { baz = x; }
  }
  new C().bar = true;
  return new C().foo === "foo" && baz;
});

out('computed accessor properties', () => {
  var garply = "foo", grault = "bar", baz = false;
  class C {
    get [garply]() { return "foo"; }
    set [grault](x) { baz = x; }
  }
  new C().bar = true;
  return new C().foo === "foo" && baz;
});

out('static accessor properties', () => {
  var baz = false;
  class C {
    static get foo() { return "foo"; }
    static set bar(x) { baz = x; }
  }
  C.bar = true;
  return C.foo === "foo" && baz;
});

out('class name is lexically scoped', () => {
  class C {
    method() { return typeof C === "function"; }
  }
  var M = C.prototype.method;
  C = undefined;
  return C === undefined && M();
});

out('computed names, temporal dead zone', () => {
  try {
    var B = class C {
      [C](){}
    }
  } catch(e) {
    return true;
  }
});

out('methods aren\'t enumerable', () => {
  class C {
    foo() {}
    static bar() {}
  }
  return !C.prototype.propertyIsEnumerable("foo") && !C.propertyIsEnumerable("bar");
});

out('implicit strict mode', () => {
  class C {
    static method() { return this === undefined; }
  }
  return (0, C.method)();
});

out('constructor requires new', () => {
  class C {}
  try {
    C();
  }
  catch(e) {
    return true;
  }
});

out('extends', () => {
  class B {}
  class C extends B {}
  return new C() instanceof B
    && B.isPrototypeOf(C);
});

out('extends expressions', () => {
  var B;
  class C extends (B = class {}) {}
  return new C() instanceof B
    && B.isPrototypeOf(C);
});

out('extends null', () => {
  class C extends null {
    constructor() { return Object.create(null); }
  }
  return Function.prototype.isPrototypeOf(C)
    && Object.getPrototypeOf(C.prototype) === null;
});

out('new.target', () => {
  var passed = false;
  new function f() {
    passed = new.target === f;
  }();

  class A {
    constructor() {
      passed &= new.target === B;
    }
  }
  class B extends A {}
  new B();
  return passed;
});
