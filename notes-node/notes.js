console.log('starting notes.js');


const fs = require('fs');
const FILENAME = 'notes-data.json'



var age = 18

var notes = [];

// this is a function takes two parameters: title and body
var addNote = (title, body) => {
  fetchNotes();
  var note = {
    title: title,
    body: body
  }

  // check if file contains duplicated notes.if yes, do nothing, if no, easy append to file
  if (!hasDuplicatedNote(title)) {
    notes.push(note);
    saveNotes(notes);
  } else {
    console.log(`duplicated Note: title ${note.title} has exists`);
  }
};

// this function takes no parameter but return a boolean value
var exists = () => {
  // this is the way how to check if a file exists
  try {
    fs.accessSync(FILENAME, 'r');
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
    var notesString = fs.readFileSync(FILENAME)
    notes = JSON.parse(notesString);
  }
};

var hasDuplicatedNote = (title) => {
  if (notes.length === 0)
    fetchNotes();

  return notes.find((note) => note.title === title) !== undefined
};

var saveNotes = (notes) => {
  fs.writeFileSync(FILENAME, JSON.stringify(notes));
  notes = []; // clear the array
};

var getAll = () => {
  fetchNotes();
  return notes;
}

var removeNote = (title) => {
  if (notes.length === 0)
    fetchNotes();
  // filter the notes that not same as the input title
  var filterNotes = notes.filter((note) => note.title.toString().toUpperCase() !== title.toUpperCase());
  saveNotes(filterNotes);
  return notes.length !== filterNotes.length
}

var readNote = (title) => {
  if (notes.length === 0)
    fetchNotes();
  var filterNotes = notes.filter((note) => note.title === title);
  return filterNotes[0];
}

module.exports = {
  age,
  addNote, // is same as addOneNote:addOneNote
  getAll,
  exists,
  fetchNotes,
  hasDuplicatedNote,
  removeNote,
  readNote
}
