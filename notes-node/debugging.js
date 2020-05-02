// run: node inspect debugging.js
// recommanded way to use nodemon inspect with debugger;  nodemon inspect debugging.js
// everytime when we change the code, it will rerun the app

// n: next line
// c: continue
var person = {
  name : 'Hans'
};

person.age= 10;

person.name = 'hyb';

person.sex='F';

debugger;   // debuger stop here
console.log('debugger here');
console.log(person);


// to debug on chorme, run:
// node --inspect-brk debugging.js  or
// nodemon --inspect-brk debugging.js

// A more detail on how to debug program using Visual Studio Code in the https://code.visualstudio.com/docs/editor/debugging