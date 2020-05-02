console.log('start app.');


// ==============part 1==============
// const fs = require('fs');
// const os = require('os');
// var user = os.userInfo();
// console.log(`user:  ${user.username}`);

// fs.appendFile('greeting.txt','Hello ' + user.username + "\n", function (err) {
//     if (err) {
//       console.log('unable to write to file');
//     }
// });

// Sync: immediatelly write text to file
// fs.writeFileSync("greeting.txt",`Hello World ${user.username} \n`)

// chanlleage: append a message to greeting.txt
// 1. use appendFileSync to append to the File
// 2. run the script
// 3. check your work by opeting the file and viewing the appended text
// fs.appendFileSync('greeting.txt','introduction:Me\n')




//==============part 2==============
// var notes = require('./notes.js');
// // import an js file and use its exported function or variables
// const utils = require('./utils.js')

// console.log(utils.add(1,2))

// // get exported variable
// console.log(`your are ${notes.age}`);
// // get exported function
// console.log('invoke notes.addNote method, result : ' + notes.addNote());
// // add two numbers
// console.log(utils.add(4, 5));



// ============part 2 extension ===============
// command : npm init  is going to creat a package.json file. 
// In that file, we could find somem info about the project name,version, main etc.
// in the dependency section there are dependencies that used in the project.
// for example: validator(https://www.npmjs.com/package/validator)
// use command: npm i validator  to install the package.
// if any dependencies in the package.json are missing, just execute npm install

// const validator = require('validator');
// const chalk = require('chalk')
// const log = console.log
// console.log(validator.isEmail("jdadd2u@163.com"))
// console.log(chalk.blue(validator.isEmail("jdadd2u.com")))

// log(chalk.blue.bgRed.bold('Hello world!'));
// log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);
// log(chalk.keyword('orange')('Yay for orange colored text!'))
// log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// log(chalk.hex('#DEADED').bold('Bold gray!'));

// const error = chalk.bold.red;
// const warning = chalk.keyword('orange');
// console.log(error('Error!'));
// console.log(warning('Warning!'));


//==============part 3============== Using yargs to get arguments from command
// const args = require("yargs").argv;
// const notes = require('./notes');

// console.log(process.argv); // run the app :  node app.js Add
// process.argv.forEach((val, index) => {
//     console.log(`${index} : ${val}`);
// });

// console.log(args);
// var command = args._[0];
// if (command === 'Add') {
//     console.log("adding a new note");
//     notes.addNote(args.title, args.body) // run app with : node app.js Add --title="hyb" --body="he is cool"
// } else if (command === 'List') {
//     console.log("Listing all notes");
//     notes.getAll();   // run app with: node app.js List
// } else {
//     console.log("command cannot recognized");
// }


//==============part 3 new============== Using yargs to get arguments from command
// const yargs = require("yargs");
// const notes = require('./notes');

// console.log(process.argv); // run the app :  node app.js Add

// yargs.command({
//     command: "add",
//     description: "Add a new note",
//     handler: function () {
//         console.log("Adding a new note!")
//     }
// })

// console.log(yargs.argv)

// yargs.command({
//     command: "delete",
//     description: "delete a note",
//     builder: {
//         id: {
//             describe: "note id",
//             demandOption: true,
//             type: "int"
//         },
//         cascede:{
//             describe: "cascade delete",
//             type: "boolean"
//         }
//     },
//     handler: function (argv) {
//         console.log(`Deleting a note with id = ${argv.id}, cascade=${argv.cascede}`) 
//     }

// })

// yargs.help().argv

// run the command:
// node app.js delete --id="4"
// node app.js delete --id=3 --cascade



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


// ==============part 4 new============== save date to a json file

const yargs = require("yargs");
const notes = require('./notes');
const chalk = require('chalk')

console.log(process.argv); // run the app :  node app.js Add

yargs.command({
    command: "add",
    description: "Add a new note",
    handler: (argv) => notes.addNote(argv.title, argv.body)
})

yargs.command({
    command: "list",
    description: "list all notes",
    handler: (argv) => {
        notes.getAll().forEach(note => {
            console.log(chalk.blue(note.title), chalk.red(note.body))
        });
    }
})

console.log(yargs.argv)

yargs.command({
    command: "delete",
    description: "delete a note",
    builder: {
        title: {
            describe: "note title, case insensitive",
            demandOption: true,
            type: "string"
        },
        cascede: {
            describe: "cascade delete",
            type: "boolean"
        }
    },
    handler: (argv) => {
        console.log(`Deleting a note with id = ${argv.title}, cascade=${argv.cascede}`)
        let removed = notes.removeNote(argv.title)
        console.log(chalk.bgRed(`note is removed ${removed}`))
    }

})

yargs.help().argv

//==============part 5============== Advanced Yargs
// const titleOption = {
//   describe: 'Title of note',
//   demand: true,
//   alias : 't'
// };

// const bodyOption = {
//   describe: 'Body of note',
//   demand: true,
//   alias : 'b'
// }

// const args = require("yargs")
//   .command( 'add', 'add a new note', {
//     title:titleOption,
//     body:bodyOption
//   })
//   .command( 'list', 'List all notes')
//   .command( 'read', 'Read a note', {
//     title:titleOption
//   })
//   .help()
//   .argv;

// run followings command to see different result
// node app.js --help
// node app.js add
// node app.js add -t='title'
// node app.js add -t='title' -b='body'
// node app.js read
// node app.js read --title='title'






console.log('end the app');
