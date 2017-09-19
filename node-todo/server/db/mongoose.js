var Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/TodoApp', {
  useMongoClient: true // add this options your mongoose > 4.11.0
});

module.exports = {
  mongoose: Mongoose
}
