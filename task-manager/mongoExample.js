
// prerequisition: 
// install mongodb view brew https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
// start mongodb server: brew services start mongodb-community


// CRUD operation

//https://www.npmjs.com/package/mongodb

const { MongoClient, ObjectID } = require('mongodb')

const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'task-manager';


// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    userDao = db.collection("users")
    client.close();

});

