var {
  User
} = require("./../models/user")
var authenticate = (req, res, next) => {
  var token = req.get("x-auth");
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject("User found");
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send(e);
  });
}

module.exports = {
  authenticate
};
