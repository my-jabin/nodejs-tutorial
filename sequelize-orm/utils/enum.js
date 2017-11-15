var Enum = require('enum');

var codeEnum = new Enum({
  "COMMENT_NOT_FOUND": "Comment not found.",
  "COMMENT_DELETED": "Comment has been deleted.",
  "COMMENT_CREATED": "Comment has been created.",
  "COMMENT_FOUND": "Comment found.",
  "COMMENT_UPDATED": "Comment updated.",
  "MISSING_ECU_ERRORCODE_ID": "Please specify ecu and errorcode or comment id.",
  "DELETE_ERROR": "Unable to delete. Error occurs.",
  "SUCCESS": "Success.",
  "ERROR": "Error occurs.",
  "COMMENT_VIEWED_UPDATED": "Total viewed updated.",
  "COMMENTS_TOTAL_LIKED": "The number of times that users like thess comments has been calculated.",
  "COMMENTS_TOTAL_COUNT": "Amount of comments.",
  "MISSING_PARAMETERS": "Some parameters are missing."
});

//console.log(codeEnum.get("1").key);

module.exports = codeEnum
