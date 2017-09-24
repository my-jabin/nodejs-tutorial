const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const _ = require("lodash");

var userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// override the toJson method, when we send the user object, user calss toJSON method
userSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject(); // converts the mongoose document into a plain javascript object
  return _.pick(userObject, ["_id", "email"]);
}

// create an instance methods. this represent the instance
userSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt.sign({
    _id: user._id.toHexString(), //user._id is an ObjectId object, it has an toHexString method
    access
  }, 'abc123').toString() // secret value should be read from config or file
  user.tokens.push({
    access,
    token
  });
  return user.save().then(() => {
    return token; // token is a string, can be passed to next method call
  });
}

// create an Model mehtod
userSchema.statics.findByToken = function(token) {
  // this is a model User, not an instance user
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject("Token is changed. Reject to send request");
  } finally {

  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

var User = mongoose.model('User', userSchema);

module.exports = {
  User
}
