const jwt = require("jsonwebtoken")

var data = {
  id: 10
}

// sign the data with a secretOrPrivateKey
var token = jwt.sign(data, "123abc"); // 123abc is the secret or the private key

console.log(token);

var decoded = jwt.verify(token, "123abc");
console.log(decoded);
