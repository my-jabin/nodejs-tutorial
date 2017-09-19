const {
  mongoose
} = require("./../server/db/mongoose");
const {
  Todo
} = require("./../server/models/todo")

const {
  ObjectID
} = require("mongodb")
// MORE API: http://mongoosejs.com/docs/api.html#model_Model.find

var id = "59c0db3740441b1b1025313c";
console.log(ObjectID.isValid(id));

// find all that match the conditions
Todo.find({
  _id: id
}).then((todos) => {
  console.log(todos);
}, (e) => {
  console.log(e);
});

// find only one todo, even more are matched
Todo.findOne({
  completed: true
}).then((todo) => {
  console.log(todo);
}, (e) => {
  console.log(e);
});

id = "59c0db3740441b1b1025313c2333"
Todo.findById(id).then((todo) => {
  console.log(todo);
}, (e) => {
  console.log(e);
});
