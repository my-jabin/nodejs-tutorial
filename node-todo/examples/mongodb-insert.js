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

  db.collection('Todos').insertMany([{
      text: 'Something to do',
      completed: true
    },
    {
      text: 'Buy some food',
      completed: false
    },
    {
      text: 'Walk the dog',
      completed: false
    },
    {
      text: 'Clean the house',
      completed: true
    }
  ], (error, result) => {
    if (error) {
      return console.log("Unable to insert documents into Mongodb", error);
    }
    console.log(`Inserted results : ${result.ops.length}`);
  })

  db.close();

});
