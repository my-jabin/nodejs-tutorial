var Options = require("options")
var codeEnum = require("./../utils/enum");

var baseOptions = {
  httpStatus: 200,
  code: codeEnum.get("SUCCESS").key,
  message: codeEnum.get("SUCCESS").value
}

var sendCommentResponse = (res, options) => {
  var defaultOptions = baseOptions;
  defaultOptions.comments = [];

  var opts = new Options(defaultOptions);
  opts = opts.merge(options);

  var comments = [];
  for (var i = 0; i < opts.value.comments.length; i++) {
    var c = opts.value.comments[i];
    comments.push(c.dataValues);
  }

  var data = {
    httpStatus: opts.value.httpStatus,
    message: opts.value.message,
    code: opts.value.code,
    comments: comments
  }

  res.status(opts.value.httpStatus).send(data);
}


var sendCommentViewedResponse = (res, options) => {
  var defaultOptions = baseOptions;
  defaultOptions.viewed = 0;
  defaultOptions.created = false;
  defaultOptions.ecu = "";
  defaultOptions.errorCode = "";

  console.log(options);
  var opts = new Options(defaultOptions);
  opts = opts.merge(options);

  var data = {
    httpStatus: opts.value.httpStatus,
    message: opts.value.message,
    code: opts.value.code,
    ecu: opts.value.ecu,
    errorCode: opts.value.errorCode,
    viewed: opts.value.viewed,
    created: opts.value.created
  }

  res.status(opts.value.httpStatus).send(data);
}


module.exports = {
  sendCommentResponse,
  sendCommentViewedResponse
}