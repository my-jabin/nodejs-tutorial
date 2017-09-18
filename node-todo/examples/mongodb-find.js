const {
  MongoClient,
  ObjectID
} = require('mongodb');
var url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log("Unable to connect to Mongodb server", err);
    return;
  }

  console.log("Connected correctly to Mongodb server");

  // search a document
  // db.collection("Todos").find({
  //   // find completed is true and id is 59bfd93caa4611f87b18af5c
  //   completed: true,
  //   _id: new ObjectID('59bfd93caa4611f87b18af5c')
  // }).toArray().then((docs) => {
  //   console.log(`Todos:`);
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (error) => {
  //   console.log('Unable to fetch docs.', error);
  // });

  // db.collection("Todos").find().count().then((count) => {
  //   console.log(`count : ${count}`);
  // }, (error) => {
  //   console.log(error);
  // })

  // Exercise
  db.collection("Users").find({
    name: 'Yanbin'
  }).toArray().then((users) => {
    console.log(`Users: ${users.length} `);
    console.log(JSON.stringify(users, undefined, 2));
  }, (error) => {
    console.log('Unable to fetch docs.', error);
  });


  //db.close();
});
