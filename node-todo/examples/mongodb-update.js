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

  //findOneAndUpdate
  db.collection("Todos").findOneAndUpdate({
    _id: new ObjectID(`59c00a857be663416816f479`)
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false // return the updated object, not the original object
  }).then((result) => {
    console.log(result);
  });

});
