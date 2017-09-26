var Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;
Mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true // add this options your mongoose > 4.11.0
});

module.exports = {
  mongoose: Mongoose
}
