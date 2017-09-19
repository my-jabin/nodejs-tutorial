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

// remove all doc
// Todo.remove({}).then((result) => {
//   console.log(result);
// }).catch((e) => {
//   console.log(e);
// });


// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()
