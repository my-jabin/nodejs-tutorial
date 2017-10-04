var moment = require('moment');

var now = moment();

// format displaying see: http://momentjs.com/docs/#/displaying/format/
now.add("1", 'd')
console.log(now.format("LLL"));
console.log(now.format('[tomorrow is] dddd'));

console.log(moment([2000, 0, 1]).fromNow());

var a = moment([2018, 0, 25]) // 1.25 2018
var b = moment([2017, 9, 1]) // 10.1 2017
console.log(a.from(b));
