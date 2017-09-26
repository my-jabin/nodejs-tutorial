const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

var data = {
  id: 10
}

// sign the data with a secretOrPrivateKey
var token = jwt.sign(data, "123abc"); // 123abc is the secret or the private key

console.log(token);

var decoded = jwt.verify(token, "123abc");
console.log(decoded);

// hashing password
var password = "123abc"
// generate a salt, rounds=10.
// salt is random adta that is used as an additional input to a hash function
bcrypt.genSalt(10).then((salt) => {
  console.log(salt);
  return bcrypt.hash(password, salt)
}).then((hash) => {
  // print the hashed value
  console.log(hash);
  // check if hashed password is equal to password
  return bcrypt.compare(password, hash)
}).then((result) => {
  console.log(`Are they same: ${result}`);
}).catch((e) => {
  console.log(e);
});
