var User = require("./../models/user");
var express = require('express');
var router = express.Router();
var utils = require("./../utils/utils");
var codeEnum = require("./../utils/enum");


router.get("/login", (req, res) => {
  var username = req.query.username;
  var password = req.query.password;

  if (!username || !password) {
    return res.status(400).send();
  }

  User.findOne({
      where: {
        username,
        password
      }
    }).then((user) => {
      if (!user) {
        return res.status(400).send();
      }
      res.send();
    })
    .catch((e) => {
      res.status(400).send();
    })
});

router.post("/register", (req, res) => {
  var username = req.query.username;
  var password = req.query.password;
  if (!username || !password) {
    return res.status(400).send();
  }

  User.create({
      username,
      password
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.status(400).send();
    })
})

module.exports = router;
