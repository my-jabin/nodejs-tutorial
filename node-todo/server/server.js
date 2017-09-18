const Mongoose = require('Mongoose');

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/TodoApp', {
  useMongoClient: true // add this options your mongoose > 4.11.0
});

var Todo = Mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: 'Cook dinner'
});

newTodo.save().then((doc) => {
  console.log(`Saved todo, ${doc}`);
}, (e) => {
  console.log('Unable to save todo');
});
