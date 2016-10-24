const { out } = require('../../helpers');

out('basic support', () => {
  const foo = 123;
  return (foo === 123);
});

out('is block-scoped', () => {
  const bar = 123;
  { const bar = 456; }
  return bar === 123;
});

out('cannot be in statements', () => {
  const bar = 1;
  try {
    Function("if(true) const baz = 1;")();
  } catch(e) {
    return true;
  }
});

out('redefining a const is an error', () => {
  const baz = 1;
  try {
    Function("const foo = 1; foo = 2;")();
  } catch(e) {
    return true;
  }
});

out('for loop statement scope', () => {
  const baz = 1;
  for(const baz = 0; false;) {}
  return baz === 1;
});

out('for-in loop iteration scope', () => {
  var scopes = [];
  for(const i in { a:1, b:1 }) {
    scopes.push(function(){ return i; });
  }
  return (scopes[0]() === "a" && scopes[1]() === "b");
});

out('for-of loop iteration scope', () => {
  var scopes = [];
  for(const i of ['a','b']) {
    scopes.push(function(){ return i; });
  }
  return (scopes[0]() === "a" && scopes[1]() === "b");
});

out('temporal dead zone', () => {
  var passed = (function(){ try { qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }
  const qux = 456;
  fn();
  return passed;
});

out('basic support (strict mode)', () => {
  "use strict";
  const foo = 123;
  return (foo === 123);
});

out('is block-scoped (strict mode)', () => {
  "use strict";
  const bar = 123;
  { const bar = 456; }
  return bar === 123;
});

out('cannot be in statements (strict mode)', () => {
  "use strict";
  const bar = 1;
  try {
    Function("if(true) const baz = 1;")();
  } catch(e) {
    return true;
  }
});

out('redefining a const is an error (strict mode)', () => {
  "use strict";
  const baz = 1;
  try {
    Function("const foo = 1; foo = 2;")();
  } catch(e) {
    return true;
  }
});

out('for loop statement scope (strict mode)', () => {
  "use strict";
  const baz = 1;
  for(const baz = 0; false;) {}
  return baz === 1;
});

out('for-in loop iteration scope (strict mode)', () => {
  "use strict";
  var scopes = [];
  for(const i in { a:1, b:1 }) {
    scopes.push(function(){ return i; });
  }
  return (scopes[0]() === "a" && scopes[1]() === "b");
});

out('for-of loop iteration scope (strict mode)', () => {
  "use strict";
  var scopes = [];
  for(const i of ['a','b']) {
    scopes.push(function(){ return i; });
  }
  return (scopes[0]() === "a" && scopes[1]() === "b");
});

out('temporal dead zone (strict mode)', () => {
  "use strict";
  var passed = (function(){ try { qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }
  const qux = 456;
  fn();
  return passed;
});


