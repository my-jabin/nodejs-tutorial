var Comment = require("./../models/comment");
var express = require('express');
var router = express.Router();

// 400 : not Found
// 400 : bad request
// 422 : bad request URL(missing paramaters)

// search a comment with specified ID, not allow to search all comments
router.get("/:id?", (req, res) => {
  if (req.params.id) {
    // get comment by id
    var id = req.params.id;
    Comment.findById(id).then((comment) => {
      if (!comment) {
        return res.status(404).send();
      }
      res.send({
        comment: comment
      });

    }).catch((e) => {
      res.status(400).send({
        errorMessage: e.errors[0].message
      })
    });
  } else {
    // not allow to find all comments
    // 422: Unprocessable Entity
    res.status(422).send({
      errorMessage: "Please specify the ID of the comment"
    });
  }
});

// create a comment, not allow specified an ID
router.post("/", (req, res) => {
  Comment.create({
    ecu: req.body.ecu,
    errorCode: req.body.errorCode,
    text: req.body.text,
    userName: req.body.userName
  }).then((comment) => {
    res.send({
      comment: comment
    });
  }).catch((e) => {
    res.status(400).send({
      errorMessage: e.errors[0].message
    })
    //console.log(JSON.stringify(e, undefined, 2));
  });
});

router.delete("/:id?", (req, res) => {
  if (req.params.id) {
    // delete one comment

  } else {
    // delete all comments
  }
})


module.exports = router;



// var create = () => {
//   Comment.create({
//     ecu: "ALC213",
//     errorCode: "B10010",
//     text: "this is a testing comment",
//     userName: "yanbin"
//   }).then((comment) => {
//     console.log(comment);
//   }).catch((e) => {
//     console.log(JSON.stringify(e, undefined, 2));
//     console.log(e.errors[0].message);
//   });
// };


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
