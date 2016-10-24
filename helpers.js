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

module.exports.__createIterableObject = (arr) => {
  const obj = {};
  let index = 0;
  obj[Symbol.iterator] = function () {
    return {
      next() {
        if (index < arr.length) {
          return { done: false, value: arr[index++] };
        } else {
          return { done: true };
        }
      }
    }
  };
  return obj;
};
