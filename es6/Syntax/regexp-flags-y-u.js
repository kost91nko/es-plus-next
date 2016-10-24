const { out } = require("../../helpers");

out('"y" flag', () => {
  var re = new RegExp('\\w', 'y');
  re.exec('xy');
  return (re.exec('xy')[0] === 'y' && re.lastIndex === 2);
});

out('"y" flag, lastIndex', () => {
  var re = new RegExp('yy', 'y');
  re.lastIndex = 3;
  var result = re.exec('xxxyyxx')[0];
  return result === 'yy' && re.lastIndex === 5;
});

out('"u" flag', () => {
  return "𠮷".match(/^.$/u)[0].length === 2;
});

out('"u" flag, Unicode code point escapes', () => {
  return "𝌆".match(/\u{1d306}/u)[0].length === 2;
});

out('"u" flag, case folding', () => {
  return "ſ".match(/S/iu) && "S".match(/ſ/iu);
});


const result = "ſ".match(/S/iu);
console.log(result);
