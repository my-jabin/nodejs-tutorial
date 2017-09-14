console.log('start app.');


//==============part 1==============
// const fs = require('fs');
// const os = require('os');
// var user = os.userInfo();
// console.log(`user:  ${user.username}`);
//
// fs.appendFile('greeting.txt','Hello ' + user.username + "\n", function (err) {
//     if (err) {
//       console.log('unable to write to file');
//     }
// });



//==============part 2==============
// var notes = require('./notes.js');
// const _ = require('lodash');
// // get exported variable
// console.log(`your are ${notes.age}`);
// // get exported function
// console.log('invoke notes.addNote method, result : ' + notes.addNote());
// // add two numbers
// console.log(notes.add(4, 5));
//
// console.log(_.isString('aa'));
// console.log(_.uniq([2,3,2,1,3,'hyb','hyb']));



//==============part 3============== Using yargs to get arguments from command
// const args = require("yargs").argv;
// const notes = require('./notes');
//
// console.log(process.argv); // run the app :  node app.js Add
// process.argv.forEach( (val,index) => {
//     console.log(`${index} : ${val}`);
// });
//
// var command = args._[0];
// if(command === 'Add'){
//     console.log("adding a new note");
//     notes.addNote(args.title,args.body) // run app with : node app.js Add --title="hyb" --body="he is cool"
// }else if (command === 'List') {
//   console.log("Listing all notes");
//   notes.getAll();   // run app with: node app.js List
// }else {
//   console.log("command cannot recognized");
// }


//==============part 4============== save date to a json file
// const args = require("yargs").argv;
// const notes = require('./notes');
//
// var command = args._[0];
// if(command === 'add'){
//     notes.addNote(args.title,args.body)
// }else if (command === 'list') {
//   var allNotes = notes.getAll();
//   allNotes.forEach( (note) => {
//     console.log(`title : ${note.title}, body: ${note.body} `);
//   });
//
// }else if (command === 'delete') {
//   var removed = notes.removeNote(args.title);
//   console.log( removed ?  'note removed' : 'nothing removed' );
// }else if (command === 'read') {
//   var note = notes.readNote(args.title);
//   if(note){
//     console.log(`note found:  title = ${note.title} , body=${note.body} ` );
//   }else {
//     console.log(`note ${args.title} not found`);
//   }
// }else {
//   console.log("command cannot recognized");
//   console.log(notes.hasDuplicatedNote('Atom is awosome') );
// }


//==============part 5============== Advanced Yargs
const titleOption = {
  describe: 'Title of note',
  demand: true,
  alias : 't'
};

const bodyOption = {
  describe: 'Body of note',
  demand: true,
  alias : 'b'
}

const args = require("yargs")
  .command( 'add', 'add a new note', {
    title:titleOption,
    body:bodyOption
  })
  .command( 'list', 'List all notes')
  .command( 'read', 'Read a note', {
    title:titleOption
  })
  .help()
  .argv;

  // run followings command to see different result
  // node app.js --help
  // node app.js add
  // node app.js add -t='title'
  // node app.js add -t='title' -b='body'
  // node app.js read
  // node app.js read --title='title'






console.log('end the app');
