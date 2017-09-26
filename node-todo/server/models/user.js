const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs")
const jwt_secret = process.env.JWT_SECRET;

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
  return _.pick(userObject, ["_id", "email", "password"]);
}

// create an instance methods. this represent the instance
userSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt.sign({
    _id: user._id.toHexString(), //user._id is an ObjectId object, it has an toHexString method
    access
  }, jwt_secret).toString() // secret value should be read from config or file
  user.tokens.push({
    access,
    token
  });
  return user.save().then(() => {
    return token; // token is a string, can be passed to next method call
  });
}

userSchema.methods.removeToken = function(token) {
  var user = this;
  // $pull: remove Items that match a specified $pull condition
  // if token matches the tokens:token, then the token will be removed
  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  }).catch((e) => {
    return Promise.reject(e)
  })
}

// create an Model mehtod
userSchema.statics.findByToken = function(token) {
  // this is a model User, not an instance user
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, jwt_secret);
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

// Model method: find by credential(email, password)
userSchema.statics.findByCredentials = function(email, password) {
  // password is plain text, not crypted hashed password

  // this is a model User, not an instance user
  var User = this;
  //var foundUser = null;
  return User.findOne({
    email
  }).then((user) => {
    if (!user) {
      return Promise.reject("Unable to find the user")
    }
    //foundUser = user;
    if (bcrypt.compareSync(password, user.password)) {
      return Promise.resolve(user)
    } else {
      return Promise.reject("Password is not correct")
    }

    // or If using async method, should write a promise and define a variable to store user variable
    // .then((result) => {
    //   if (result)
    //     return Promise.resolve(foundUser)
    //   else {
    //     return Promise.reject("Password is not correct");
    //   }
    // })

  }).catch((e) => {
    console.log(e);
    return Promise.reject(e)
  })

}


// before save method called, transform password to hashed password
userSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10).then((salt) => {
      console.log(salt);
      return bcrypt.hash(user.password, salt)
    }).then((hash) => {
      console.log(hash);
      user.password = hash;
      next();
    }).catch((e) => {
      console.log(e);
    })
  } else {
    next();
  }
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User
}
