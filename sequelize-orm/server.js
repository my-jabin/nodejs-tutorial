const express = require('express');
const bodyParser = require('body-parser');

var comments = require("./routes/comments");
var CommentViewed = require("./routes/commentsViewed");
var user = require("./routes/user");
var userLiked = require("./routes/userLiked");
var timeout = require('connect-timeout')

var app = express();

app.use(timeout('5s'))

app.use(bodyParser.json());

app.use(haltOnTimedout)

app.use("/comments", comments);

app.use("/CommentViewed", CommentViewed);

app.use("/user", user);

app.use("/like", userLiked);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('URL is not valid');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    // if get any errors, should show the errorMessage to user and send a report back
    errorMessage: err.message
  });
});


function haltOnTimedout(req, res, next) {
  if (!req.timedout) {
    next()
  } else {
    console.log("connection time out");
  }
}

var server = app.listen(8888, () => {
  console.log(`Start on port 8888`);
})
