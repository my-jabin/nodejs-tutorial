var UserLiked = require("./../models/userLiked");
var express = require('express');
var router = express.Router();
var utils = require("./../utils/utils");
var codeEnum = require("./../utils/enum");

// http://localhost:8888/like/Yanbin/3
router.get("/:username/:commentid", (req, res) => {
  var username = req.params.username;
  var commentid = req.params.commentid;
  UserLiked.findOne({
      where: {
        userName: username,
        commentID: commentid
      }
    }).then((userLiked) => {
      var liked = false;
      // if not found or user does not like it, set like to be false
      if (userLiked && userLiked.liked) {
        liked = true;
      }
      utils.sendUserLikedResponse(res, {
        username: username,
        commentid: commentid,
        like: liked
      });
    })
    .catch((e) => {
      utils.sendErrorResponse(res, e);
    })
})

// http://localhost:8888/like
// body: {username:xxx, commentid:xxx, like:xxx}
router.post("/", (req, res) => {
  var username = req.body.username;
  var commentid = req.body.commentid;
  var like = req.body.like; // if like if null, then this request will do nothing, but only updata the updatedAt column

  UserLiked.upsert({
      userName: username,
      commentID: commentid,
      liked: like
    }).then((created) => {
      utils.sendUserLikedResponse(res, {
        username,
        commentid,
        like
      });
    })
    .catch((e) => {
      utils.sendErrorResponse(res, e);
    })
})




module.exports = router;
