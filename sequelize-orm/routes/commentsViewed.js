var CommentViewed = require("./../models/commentViewed");
var express = require('express');
var router = express.Router();
var utils = require("./../utils/utils");
var codeEnum = require("./../utils/enum");



router.get("/", (req, res) => {
  var ecu = req.query.ecu;
  var errorCode = req.query.errorcode;

  var condition = {};
  condition.ecu = ecu;
  condition.errorCode = errorCode;

  CommentViewed.findOrCreate({
    where: condition,
    default: condition
  }).spread((viewed, created) => {
    utils.sendCommentViewedResponse(res, {
      created,
      ecu: viewed.dataValues.ecu,
      errorCode: viewed.dataValues.errorCode,
      viewed: viewed.dataValues.totalViewed
    });

  }).catch((e) => {
    utils.sendCommentViewedResponse(res, {
      httpStatus: 400,
      code: codeEnum.get("ERROR").key,
      message: e.errors[0].message
    })
  });
});

router.put("/", (req, res) => {
  var ecu = req.query.ecu;
  var errorCode = req.query.errorcode;

  CommentViewed.findOrCreate({
      where: {
        ecu,
        errorCode
      },
      defaults: {
        ecu,
        errorCode
      }
    })
    .spread((commentViewed, created) => {
      return commentViewed.increment('totalViewed');
    })
    .then((commentViewed) => {
      return commentViewed.reload();
    })
    .then((commentViewed) => {
      utils.sendCommentViewedResponse(res, {
        ecu: commentViewed.ecu,
        errorCode: commentViewed.errorCode,
        viewed: commentViewed.totalViewed
      });
    })
    .catch((e) => {
      utils.sendCommentViewedResponse(res, {
        httpStatus: 400,
        code: codeEnum.get("ERROR").key,
        message: e.errors[0].message
      })
    })
});


module.exports = router;
