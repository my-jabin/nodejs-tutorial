var Comment = require("./../models/comment");
var express = require('express');
var router = express.Router();
var utils = require("./../utils/utils");
var codeEnum = require("./../utils/enum");

// 400 : not Found
// 400 : bad request
// 422 : bad request URL(missing paramaters)

//http: //localhost:8888/comments?ecu=xxx&errorcode=xxx

router.get("/", (req, res) => {
  var ecu = req.query.ecu;
  var errorcode = req.query.errorcode;

  var condition = {};
  condition.ecu = ecu;
  condition.errorcode = errorcode;

  // should we get all comments?
  if (!ecu && !errorcode) {
    // return utils.sendCommentResponse(res, {
    //   httpStatus: 422,
    //   code: codeEnum.get("MISSING_ECU_ERRORCODE_ID").key,
    //   message: codeEnum.get("MISSING_ECU_ERRORCODE_ID").value
    // })
  }

  if (!ecu)
    delete condition.ecu;
  if (!errorcode)
    delete condition.errorcode;

  console.log(condition);


  Comment.findAll({
      where: condition
    })
    .then((comments) => {
      if (comments.length === 0) {
        return utils.sendCommentResponse(res, {
          httpStatus: 404,
          code: codeEnum.get("COMMENT_NOT_FOUND").key,
          message: codeEnum.get("COMMENT_NOT_FOUND").value
        });
      }

      utils.sendCommentResponse(res, {
        code: codeEnum.get("COMMENT_FOUND").key,
        message: codeEnum.get("COMMENT_FOUND").value,
        comments: comments
      });
    })
    .catch((e) => {
      utils.sendCommentResponse(res, {
        httpStatus: 400,
        code: codeEnum.get("ERROR").key,
        message: e.errors[0].message
      });
    })

})

// search a comment with specified ID, not allow to search all comments
router.get("/:id", (req, res) => {
  var id = req.params.id;
  Comment.findById(id).then((comment) => {
    if (!comment) {
      return utils.sendCommentResponse(res, {
        httpStatus: 404,
        code: codeEnum.get("COMMENT_NOT_FOUND").key,
        message: codeEnum.get("COMMENT_NOT_FOUND").value
      });
    }
    var comments = [];
    comments.push(comment);
    utils.sendCommentResponse(res, {
      code: codeEnum.get("COMMENT_FOUND").key,
      message: codeEnum.get("COMMENT_FOUND").value,
      comments: comments
    });

  }).catch((e) => {
    utils.sendCommentResponse(res, {
      httpStatus: 400,
      code: codeEnum.get("ERROR").key,
      message: e.errors[0].message
    });
  });
});

// create a comment, not allow specified an ID
router.post("/", (req, res) => {
  Comment.create({
    ecu: req.body.ecu,
    errorCode: req.body.errorCode,
    text: req.body.text,
    userName: req.body.userName
  }).then((comment) => {
    var comments = [];
    comments.push(comment);
    utils.sendCommentResponse(res, {
      code: codeEnum.get("COMMENT_CREATED").key,
      message: codeEnum.get("COMMENT_CREATED").value,
      comments: comments
    });
  }).catch((e) => {
    utils.sendCommentResponse(res, {
      httpStatus: 400,
      code: codeEnum.get("ERROR").key,
      message: e.errors[0].message
    });
  });
});

router.delete("/:id?", (req, res) => {
  var id = req.params.id
  if (id) {
    // delete one comment
    Comment.destroy({
      where: {
        commentID: id
      }
    }).then((rowDeleted) => {
      if (rowDeleted > 0) {
        utils.sendCommentResponse(res, {
          code: codeEnum.get("COMMENT_DELETED").key,
          message: codeEnum.get("COMMENT_DELETED").value
        });
      } else {
        utils.sendCommentResponse(res, {
          httpStatus: 404,
          code: codeEnum.get("COMMENT_NOT_FOUND").key,
          message: codeEnum.get("COMMENT_NOT_FOUND").value + " Delete failed"
        });
      }
    }).catch((e) => {
      utils.sendCommentResponse(res, {
        httpStatus: 400,
        code: codeEnum.get("DELETE_ERROR").key,
        message: codeEnum.get("DELETE_ERROR").value
      });
    })
  } else {
    // delete all comments
    utils.sendCommentResponse(res, {
      httpStatus: 400,
      code: codeEnum.get("DELETE_ERROR").key,
      message: "Really want to delete all comments? Not support!"
    });
  }
})

module.exports = router;
