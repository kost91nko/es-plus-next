const { out } = require('../../helpers');

out('basic support', () => {
  let foo = 123;
  return (foo === 123);
});

out('is block-scoped', () => {
  let bar = 123;
  { let bar = 456; }
  return bar === 123;
});

out('cannot be in statements', () => {
  let bar = 1;
  try {
    Function("if(true) let baz = 1;")();
  } catch(e) {
    return true;
  }
});

out('for loop statement scope', () => {
  let baz = 1;
  for(let baz = 0; false;) {}
  return baz === 1;
});

out('temporal dead zone', () => {
  var passed = (function(){ try {  qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }
  let qux = 456;
  fn();
  return passed;
});

out('for/for-in loop iteration scope', () => {
  let scopes = [];
  for(let i = 0; i < 2; i++) {
    scopes.push(function(){ return i; });
  }
  let passed = (scopes[0]() === 0 && scopes[1]() === 1);

  scopes = [];
  for(let i in { a:1, b:1 }) {
    scopes.push(function(){ return i; });
  }
  passed &= (scopes[0]() === "a" && scopes[1]() === "b");
  return passed;
});

