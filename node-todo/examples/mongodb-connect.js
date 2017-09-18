//const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb'); // is identical as above, but we have an another object ObjectID here
// for knowing which object of package mongodb look the api online : http://mongodb.github.io/node-mongodb-native/2.2/api/

// we can new an unique object ID by using ObjectID object
// var obj = new ObjectID();
// console.log(obj);

// object destructuring
// var user = {
//   name: 'Thomas',
//   age: 18
// };
// var {
//   name,
//   age
// } = user;
// console.log(`${name} ${age} `);


// connect to TodoApp database
var url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log("Unable to connect to Mongodb server", err);
    return;
  }

  console.log("Connected correctly to Mongodb server");

  // insert a new document into Todos table
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //insert a new document into Users table
  // db.collection('Users').insertOne({
  //   name: 'Yanbin',
  //   age: 18,
  //   location: 'Tuebingen'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   // result.ops means all the docments inserted using insertOne/insertMany/replaceOne.
  //   // API: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~insertOneWriteOpResult
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
