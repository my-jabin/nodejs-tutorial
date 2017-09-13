// var personString = '{"firstName":"Yanbin", "secondName":"Hu" ,"age" : 13}';
//
// var person = JSON.parse(personString);
//
// console.log(typeof person);
// console.log(person);
// console.log(person.firstName);


const fs = require('fs');

var originalNote = {
  title: 'some title',
  body: 'some body'
};

fs.writeFileSync('notes.json',JSON.stringify(originalNote));

var noteString = fs.readFileSync('notes.json');
var noteJson  =  JSON.parse(noteString);
console.log(typeof noteJson);
console.log(noteJson.title);
