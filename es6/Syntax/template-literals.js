const { out } = require('../../helpers');

out('basic functionality', () => {
  var a = "ba", b = "QUX";
  return `foo bar
${a + "z"} ${b.toLowerCase()}` === "foo bar\nbaz qux";
});

out('toString conversion', () => {
  var a = {
    toString: function() { return "foo"; },
    valueOf: function() { return "bar"; },
  };
  return `${a}` === "foo";
});

out('tagged template literals', () => {
  var called = false;
  function fn(parts, a, b) {
    called = true;
    return parts instanceof Array &&
      parts[0]     === "foo"      &&
      parts[1]     === "bar\n"    &&
      parts.raw[0] === "foo"      &&
      parts.raw[1] === "bar\\n"   &&
      a === 123                   &&
      b === 456;
  }
  return fn `foo${123}bar\n${456}` && called;
});

out('passed array is frozen', () => {
  return (function(parts) {
    return Object.isFrozen(parts) && Object.isFrozen(parts.raw);
  }) `foo${0}bar${0}baz`;
});

out('line break normalisation', () => {
  var cr   = eval("`x" + String.fromCharCode(13)    + "y`");
  var lf   = eval("`x" + String.fromCharCode(10)    + "y`");
  var crlf = eval("`x" + String.fromCharCode(13,10) + "y`");

  return cr.length === 3 && lf.length === 3 && crlf.length === 3
    && cr[1] === lf[1] && lf[1] === crlf[1] && crlf[1] === '\n';
});
