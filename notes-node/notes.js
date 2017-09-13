console.log('starting notes.js');


const fs = require('fs');
const fileName = 'notes-data.json'
// export an variable
// module.exports.age = 18;
//
// exports.add = (a, b) => {
//   return a + b;
// };

var notes = [] ;

var addNote = (title, body) => {
  fetchNotes();
  var note = {
    title: title,
    body: body
  }

  // check if file contains duplicated notes.if yes, do nothing, if no, easy append to file
  if (!hasDuplicatedNote(title)) {
    notes.push(note);
    fs.appendFileSync(fileName, JSON.stringify(notes));
  }




  // fs.access('notes-data.json', 'r', (err, fd) => {
  //   var appendable = true; // if no duplicated item exists, then append this note
  //   if (err) {
  //     if (err.code === 'ENOENT') {
  //       console.log('notes-data.json does not exist');
  //       notes.push(note);
  //     }
  //   } else {
  //     var notesString = fs.readFileSync('notes-data.json')
  //     notes = JSON.parse(notesString);
  //     var hasDuplicatedNote = notes.filter((note) => notes.title === title);
  //     if (hasDuplicatedNote) {
  //       appendable = false;
  //       console.log('has already exist same note!');
  //     } else {
  //       notes.push(note);
  //     }
  //   }
  //   if (appendable)
  //     fs.appendFileSync('notes-data.json', JSON.stringify(notes));
  // });

};

var exists = () => {
  try {
    fs.accessSync(fileName, 'r');
    return true;
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('File is not exist');
      return false;
    }
  }
};

var fetchNotes = () => {
  if (exists()) {
    var notesString = fs.readFileSync(fileName)
    notes = JSON.parse(notesString);
  }
};

var hasDuplicatedNote = (title) => {
  if(notes.length === 0 )
    fetchNotes();
  var duplicatedNumber = notes.filter((note) => note.title === title );
  return duplicatedNumber.length > 0;
};

var saveNotes = (notes) => {

};

var getAll = () => {
  console.log('Geting all notes');
}

module.exports = {
  addNote, // is same as addOneNote:addOneNote
  getAll,
  exists,
  fetchNotes,
  hasDuplicatedNote
}
