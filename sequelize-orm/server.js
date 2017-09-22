const express = require('express');
const bodyParser = require('body-parser');

var comments = require("./routes/comments");
var CommentViewed = require("./routes/commentsViewed");

var app = express();

app.use(bodyParser.json());

app.use("/comments", comments);

app.use("/CommentViewed", CommentViewed);

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

app.listen(8888, () => {
  console.log(`Start on port 8888`);
})
