class y {
  constructor(){
    this.x = 10;
  }
}

class x extends y{
  constructor(){
    this.yy = 11;
  }
}

let yy = new y();

console.log(yy.x);
