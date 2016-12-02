var ident = 30;

const out = (prefix, func) => {
  const resultIdent = ident - prefix.length;
  const identStr = resultIdent > 0
    ? Array(resultIdent).fill(" ").join("")
    : '';
  console.log(`<${prefix}>:${identStr}${func()}`);
};

out.setIdent = (identIn) => {
  ident = identIn;
}

module.exports.out = out;

module.exports.__createIterableObject = (arr, methods) => {
  methods = methods || {};
  if (typeof Symbol !== 'function' || !Symbol.iterator) {
    return {};
  }
  arr.length++;
  var iterator = {
    next: function() {
      return { value: arr.shift(), done: arr.length <= 0 };
    },
    'return': methods['return'],
    'throw': methods['throw']
  };
  var iterable = {};
  iterable[Symbol.iterator] = function(){ return iterator; }
  return iterable;
}
