var CommentViewed = require("./../models/commentViewed");
var express = require('express');
var router = express.Router();

// var findOrCreate = (ecu, errorcode) => {
//   CommentViewed.findOrCreate({
//     where: {
//       ecu: "ALC213",
//       errorCode: "B10010"
//     },
//     default: {
//       ecu,
//       errorcode
//     }
//   }).spread((viewed, created) => {
//     console.log(`created?: ${created}`);
//     console.log(viewed);
//     return viewed;
//   });
//};

module.exports = router;
// Comment
//   .findOrCreate({
//     where: {
//       userName: "yanbin"
//     },
//     defaults: {
//       ecu: "ALC213",
//       errorCode: "B10010",
//       text: "this is a testing comment"
//     }
//   })
//   .spread((comment, created) => {
//     console.log(comment);
//     console.log(`created  :  ${created}`);
//   });
