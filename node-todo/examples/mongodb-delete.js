const {
  MongoClient,
  ObjectID
} = require('mongodb');
var url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log(`Unable to connect to Mongodb`);
    return;
  }
  console.log("Connected correctly to Mongodb server");

  // deleteMany API: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#deleteMany
  // db.collection('Todos').deleteMany({
  //   text: 'Walk the dog'
  // }).then((result) => {
  //   console.log(`deleted count: ${result.deletedCount}`);
  // });

  // deleteOne API: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#deleteOne
  // db.collection('Todos').deleteOne({
  //   text: 'Clean the house'
  // }).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete API:http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndDelete
  // just delete one document
  db.collection('Todos').findOneAndDelete({
    completed: true
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });


  //db.close();

});
