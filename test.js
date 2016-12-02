function *gen1(){
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
  yield;
}

//var gg = gen1();

function createArrayIterator(arr) {
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        return { done: false, value: arr[index++] };
      } else {
        return { done: true };
      }
    }
  }
}

var gg = {
  [Symbol.iterator]: function() {
    const arr = [89, 5645, 86767];
    let i = -1;
    return {
      next(){
        i += 1;
        return {value: i < 3 ? arr[i] : undefined, done: i >= 3}
      },
    }
  }
};
//var iter = createArrayIterator([55, 66, 77]);
var arr = [1, 2, 3];
var iter = arr[Symbol.iterator]();
console.log(...gg);
